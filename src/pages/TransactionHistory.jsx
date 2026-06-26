import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Filter, Download, ChevronLeft, ChevronRight,
  ArrowUpRight, ArrowDownLeft, ArrowLeftRight,
  Receipt, CheckCircle, Clock, XCircle, AlertCircle,
  Calendar, X
} from 'lucide-react';

// =============================================
// بيانات وهمية
// =============================================
const dummyTransactions = [
  { id: '1',  type: 'deposit',          direction: 'in',  title: 'إيداع رصيد',               reference_number: 'TXN-20250601-001', amount: 500000,  fee: 0,      status: 'completed',  created_at: '2025-06-01T10:30:00' },
  { id: '2',  type: 'transfer',         direction: 'out', title: 'تحويل إلى أحمد البين',      reference_number: 'TXN-20250601-002', amount: 150000,  fee: 2000,   status: 'completed',  created_at: '2025-06-01T14:00:00' },
  { id: '3',  type: 'bill_payment',     direction: 'out', title: 'فاتورة الكهرباء',            reference_number: 'TXN-20250530-045', amount: 32500,   fee: 0,      status: 'completed',  created_at: '2025-05-30T09:15:00' },
  { id: '4',  type: 'merchant_payment', direction: 'out', title: 'دفع لمتجر الحسن',            reference_number: 'TXN-20250529-112', amount: 87000,   fee: 1500,   status: 'pending',    created_at: '2025-05-29T18:45:00' },
  { id: '5',  type: 'transfer',         direction: 'in',  title: 'استلام من حسين شيخو',        reference_number: 'TXN-20250528-077', amount: 200000,  fee: 0,      status: 'completed',  created_at: '2025-05-28T12:00:00' },
  { id: '6',  type: 'withdrawal',       direction: 'out', title: 'سحب نقدي',                   reference_number: 'TXN-20250527-033', amount: 300000,  fee: 5000,   status: 'completed',  created_at: '2025-05-27T11:00:00' },
  { id: '7',  type: 'deposit',          direction: 'in',  title: 'إيداع بنكي',                 reference_number: 'TXN-20250526-019', amount: 1000000, fee: 0,      status: 'completed',  created_at: '2025-05-26T08:30:00' },
  { id: '8',  type: 'bill_payment',     direction: 'out', title: 'فاتورة الماء',               reference_number: 'TXN-20250525-088', amount: 18000,   fee: 0,      status: 'failed',     created_at: '2025-05-25T16:20:00' },
  { id: '9',  type: 'transfer',         direction: 'out', title: 'تحويل إلى سارة محمد',        reference_number: 'TXN-20250524-055', amount: 75000,   fee: 2000,   status: 'completed',  created_at: '2025-05-24T13:45:00' },
  { id: '10', type: 'merchant_payment', direction: 'out', title: 'دفع لمطعم النور',             reference_number: 'TXN-20250523-041', amount: 45000,   fee: 500,    status: 'completed',  created_at: '2025-05-23T20:00:00' },
  { id: '11', type: 'deposit',          direction: 'in',  title: 'إيداع نقدي',                 reference_number: 'TXN-20250522-099', amount: 250000,  fee: 0,      status: 'completed',  created_at: '2025-05-22T10:00:00' },
  { id: '12', type: 'transfer',         direction: 'in',  title: 'استلام من مؤيد العاصي',      reference_number: 'TXN-20250521-066', amount: 100000,  fee: 0,      status: 'processing', created_at: '2025-05-21T15:30:00' },
];

const formatAmount = (n) => n.toLocaleString('ar-SY');
const formatDate = (s) => new Date(s).toLocaleDateString('ar-SY', { year: 'numeric', month: 'short', day: 'numeric' });
const formatTime = (s) => new Date(s).toLocaleTimeString('ar-SY', { hour: '2-digit', minute: '2-digit' });

const TYPE_LABELS = {
  deposit: 'إيداع', withdrawal: 'سحب', transfer: 'تحويل',
  bill_payment: 'فاتورة', merchant_payment: 'دفع تاجر', swap: 'تبادل',
};

const TxIcon = ({ type, direction }) => {
  if (direction === 'in')
    return <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-green-100"><ArrowDownLeft className="w-5 h-5 text-green-600" /></div>;
  if (type === 'bill_payment')
    return <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-orange-100"><Receipt className="w-5 h-5 text-orange-500" /></div>;
  if (type === 'withdrawal')
    return <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-red-100"><ArrowUpRight className="w-5 h-5 text-red-500" /></div>;
  if (type === 'transfer')
    return <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-blue-100"><ArrowLeftRight className="w-5 h-5 text-blue-600" /></div>;
  return <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-gray-100"><ArrowUpRight className="w-5 h-5 text-gray-500" /></div>;
};

const StatusBadge = ({ status }) => {
  const map = {
    completed:  { label: 'مكتملة',  cls: 'bg-green-100 text-green-700',   icon: <CheckCircle className="w-3 h-3" /> },
    pending:    { label: 'معلقة',   cls: 'bg-yellow-100 text-yellow-700', icon: <Clock className="w-3 h-3" /> },
    failed:     { label: 'فاشلة',   cls: 'bg-red-100 text-red-700',       icon: <XCircle className="w-3 h-3" /> },
    processing: { label: 'جارية',   cls: 'bg-blue-100 text-blue-700',     icon: <AlertCircle className="w-3 h-3" /> },
    reversed:   { label: 'مسترجعة', cls: 'bg-purple-100 text-purple-700', icon: <CheckCircle className="w-3 h-3" /> },
  };
  const s = map[status] || map.pending;
  return (
    <span className={"inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium " + s.cls}>
      {s.icon} {s.label}
    </span>
  );
};

const ITEMS_PER_PAGE = 7;

const TransactionHistory = () => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDirection, setFilterDirection] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return dummyTransactions.filter((tx) => {
      if (search && !tx.title.includes(search) && !tx.reference_number.includes(search)) return false;
      if (filterType !== 'all' && tx.type !== filterType) return false;
      if (filterStatus !== 'all' && tx.status !== filterStatus) return false;
      if (filterDirection !== 'all' && tx.direction !== filterDirection) return false;
      if (dateFrom && new Date(tx.created_at) < new Date(dateFrom)) return false;
      if (dateTo && new Date(tx.created_at) > new Date(dateTo + 'T23:59:59')) return false;
      return true;
    });
  }, [search, filterType, filterStatus, filterDirection, dateFrom, dateTo]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const resetFilters = () => {
    setSearch(''); setFilterType('all'); setFilterStatus('all');
    setFilterDirection('all'); setDateFrom(''); setDateTo(''); setPage(1);
  };

  const hasActiveFilters = search || filterType !== 'all' || filterStatus !== 'all' || filterDirection !== 'all' || dateFrom || dateTo;

  const totalIn  = filtered.filter(t => t.direction === 'in').reduce((s, t) => s + t.amount, 0);
  const totalOut = filtered.filter(t => t.direction === 'out').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-5" dir="rtl">

      {/* العنوان */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">سجل المعاملات</h1>
          <p className="text-sm text-gray-500 mt-0.5">جميع عملياتك المالية</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-2xl text-sm font-semibold hover:bg-blue-800 transition">
          <Download className="w-4 h-4" />
          تصدير PDF
        </button>
      </div>

      {/* بطاقات الملخص */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-xs text-gray-400 mb-1">إجمالي المعاملات</p>
          <p className="text-2xl font-bold text-gray-800">{filtered.length}</p>
        </div>
        <div className="bg-green-50 rounded-2xl border border-green-100 p-4 text-center">
          <p className="text-xs text-green-600 mb-1">إجمالي الوارد</p>
          <p className="text-lg font-bold text-green-700">+{formatAmount(totalIn)}</p>
        </div>
        <div className="bg-red-50 rounded-2xl border border-red-100 p-4 text-center">
          <p className="text-xs text-red-500 mb-1">إجمالي الصادر</p>
          <p className="text-lg font-bold text-red-600">-{formatAmount(totalOut)}</p>
        </div>
      </div>

      {/* شريط البحث والفلتر */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 space-y-3">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="بحث بالاسم أو رقم المرجع..."
              className="w-full pr-10 pl-4 py-2.5 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={"flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-sm font-semibold transition " +
              (showFilters ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary')}
          >
            <Filter className="w-4 h-4" />
            فلتر
            {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-red-400" />}
          </button>
          {hasActiveFilters && (
            <button onClick={resetFilters} className="flex items-center gap-1 px-3 py-2.5 rounded-2xl border border-red-200 text-red-500 text-sm hover:bg-red-50 transition">
              <X className="w-4 h-4" /> مسح
            </button>
          )}
        </div>

        {/* الفلاتر المتقدمة */}
        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-gray-50">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500">النوع</label>
              <select
                value={filterType}
                onChange={(e) => { setFilterType(e.target.value); setPage(1); }}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary"
              >
                <option value="all">الكل</option>
                <option value="deposit">إيداع</option>
                <option value="withdrawal">سحب</option>
                <option value="transfer">تحويل</option>
                <option value="bill_payment">فاتورة</option>
                <option value="merchant_payment">دفع تاجر</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500">الحالة</label>
              <select
                value={filterStatus}
                onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary"
              >
                <option value="all">الكل</option>
                <option value="completed">مكتملة</option>
                <option value="pending">معلقة</option>
                <option value="failed">فاشلة</option>
                <option value="processing">جارية</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500">الاتجاه</label>
              <select
                value={filterDirection}
                onChange={(e) => { setFilterDirection(e.target.value); setPage(1); }}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary"
              >
                <option value="all">الكل</option>
                <option value="in">وارد</option>
                <option value="out">صادر</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500">من تاريخ</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
        )}
      </div>

      {/* جدول المعاملات */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {paginated.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">لا توجد معاملات مطابقة</p>
            <p className="text-sm mt-1">جرّب تغيير معايير البحث</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {paginated.map((tx) => (
              <Link
                to={"/transactions/" + tx.id}
                key={tx.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/70 transition-colors group"
              >
                <TxIcon type={tx.type} direction={tx.direction} />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{tx.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{tx.reference_number}</p>
                </div>

                <div className="hidden md:block text-xs text-gray-400 shrink-0">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(tx.created_at)}
                  </div>
                  <p className="text-center mt-0.5">{formatTime(tx.created_at)}</p>
                </div>

                <div className="hidden sm:block shrink-0">
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-lg">
                    {TYPE_LABELS[tx.type]}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className={"text-sm font-bold " + (tx.direction === 'in' ? 'text-green-600' : 'text-gray-700')}>
                    {tx.direction === 'in' ? '+' : '-'} {formatAmount(tx.amount)} ل.س
                  </span>
                  {tx.fee > 0 && (
                    <span className="text-xs text-gray-400">رسوم: {formatAmount(tx.fee)} ل.س</span>
                  )}
                  <StatusBadge status={tx.status} />
                </div>

                <ChevronLeft className="w-4 h-4 text-gray-300 group-hover:text-primary transition shrink-0" />
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-50 bg-gray-50/40">
            <p className="text-xs text-gray-400">
              عرض {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} من {filtered.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={"w-8 h-8 rounded-xl text-sm font-semibold transition " +
                    (page === p ? 'bg-primary text-white' : 'border border-gray-200 text-gray-500 hover:border-primary hover:text-primary')}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
