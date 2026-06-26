import React, { useState, useMemo } from 'react';
import {
  Search, Filter, Download, ChevronLeft, ChevronRight,
  ArrowDownLeft, CheckCircle, Clock, XCircle, AlertCircle,
  Calendar, X, User, Hash
} from 'lucide-react';

// =============================================
// بيانات وهمية
// =============================================
const dummyPayments = [
  { id: '1',  payer: 'أحمد البين',    payer_phone: '0911234567', reference: 'TXN-20250601-201', amount: 75000,  fee: 1500, status: 'completed',  created_at: '2025-06-01T10:30:00', note: 'دفع طلب #1045' },
  { id: '2',  payer: 'سارة محمد',    payer_phone: '0932345678', reference: 'TXN-20250601-198', amount: 32000,  fee: 640,  status: 'completed',  created_at: '2025-06-01T09:15:00', note: 'شراء لابتوب' },
  { id: '3',  payer: 'حسين شيخو',    payer_phone: '0943456789', reference: 'TXN-20250531-187', amount: 120000, fee: 2400, status: 'completed',  created_at: '2025-05-31T18:00:00', note: 'طلب #1044' },
  { id: '4',  payer: 'مؤيد العاصي',  payer_phone: '0954567890', reference: 'TXN-20250531-175', amount: 45000,  fee: 900,  status: 'pending',    created_at: '2025-05-31T14:30:00', note: 'هاتف سامسونج' },
  { id: '5',  payer: 'رنا الأحمد',   payer_phone: '0965678901', reference: 'TXN-20250530-163', amount: 88000,  fee: 1760, status: 'completed',  created_at: '2025-05-30T11:00:00', note: 'طلب #1043' },
  { id: '6',  payer: 'كريم سالم',    payer_phone: '0976789012', reference: 'TXN-20250530-151', amount: 15000,  fee: 300,  status: 'failed',     created_at: '2025-05-30T08:45:00', note: 'سماعات' },
  { id: '7',  payer: 'نور الدين',    payer_phone: '0987890123', reference: 'TXN-20250529-139', amount: 200000, fee: 4000, status: 'completed',  created_at: '2025-05-29T20:00:00', note: 'لابتوب ديل' },
  { id: '8',  payer: 'ليلى حسن',     payer_phone: '0998901234', reference: 'TXN-20250529-127', amount: 55000,  fee: 1100, status: 'completed',  created_at: '2025-05-29T15:30:00', note: 'طلب #1042' },
  { id: '9',  payer: 'فادي يوسف',    payer_phone: '0909012345', reference: 'TXN-20250528-115', amount: 38000,  fee: 760,  status: 'processing', created_at: '2025-05-28T12:00:00', note: 'ماوس وكيبورد' },
  { id: '10', payer: 'ديمة خالد',    payer_phone: '0921123456', reference: 'TXN-20250528-103', amount: 95000,  fee: 1900, status: 'completed',  created_at: '2025-05-28T09:00:00', note: 'طلب #1041' },
];

const formatAmount = (n) => n.toLocaleString('ar-SY');
const formatDate = (s) => new Date(s).toLocaleDateString('ar-SY', { month: 'short', day: 'numeric', year: 'numeric' });
const formatTime = (s) => new Date(s).toLocaleTimeString('ar-SY', { hour: '2-digit', minute: '2-digit' });

const StatusBadge = ({ status }) => {
  const map = {
    completed:  { label: 'مكتملة',  cls: 'bg-green-100 text-green-700',   icon: <CheckCircle className="w-3 h-3" /> },
    pending:    { label: 'معلقة',   cls: 'bg-yellow-100 text-yellow-700', icon: <Clock className="w-3 h-3" /> },
    failed:     { label: 'فاشلة',   cls: 'bg-red-100 text-red-700',       icon: <XCircle className="w-3 h-3" /> },
    processing: { label: 'جارية',   cls: 'bg-blue-100 text-blue-700',     icon: <AlertCircle className="w-3 h-3" /> },
  };
  const s = map[status] || map.pending;
  return (
    <span className={"inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium " + s.cls}>
      {s.icon} {s.label}
    </span>
  );
};

const ITEMS_PER_PAGE = 7;

const IncomingPaymentsLog = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return dummyPayments.filter((p) => {
      if (search && !p.payer.includes(search) && !p.reference.includes(search) && !p.payer_phone.includes(search)) return false;
      if (filterStatus !== 'all' && p.status !== filterStatus) return false;
      if (dateFrom && new Date(p.created_at) < new Date(dateFrom)) return false;
      if (dateTo && new Date(p.created_at) > new Date(dateTo + 'T23:59:59')) return false;
      return true;
    });
  }, [search, filterStatus, dateFrom, dateTo]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const hasActiveFilters = search || filterStatus !== 'all' || dateFrom || dateTo;

  const resetFilters = () => {
    setSearch(''); setFilterStatus('all'); setDateFrom(''); setDateTo(''); setPage(1);
  };

  const totalReceived = filtered.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);
  const totalFees     = filtered.filter(p => p.status === 'completed').reduce((s, p) => s + p.fee, 0);
  const pendingCount  = filtered.filter(p => p.status === 'pending').length;

  return (
    <div className="space-y-5" dir="rtl">

      {/* العنوان */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">المدفوعات الواردة</h1>
          <p className="text-sm text-gray-500 mt-0.5">جميع المدفوعات المستلمة عبر API</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-2xl text-sm font-semibold hover:bg-blue-800 transition">
          <Download className="w-4 h-4" />
          تصدير CSV
        </button>
      </div>

      {/* بطاقات الملخص */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-2xl border border-green-100 p-4 text-center">
          <p className="text-xs text-green-600 mb-1">إجمالي المستلم</p>
          <p className="text-lg font-bold text-green-700">+{formatAmount(totalReceived)}</p>
          <p className="text-xs text-green-500 mt-0.5">ل.س</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-xs text-gray-400 mb-1">إجمالي الرسوم</p>
          <p className="text-lg font-bold text-gray-700">{formatAmount(totalFees)}</p>
          <p className="text-xs text-gray-400 mt-0.5">ل.س</p>
        </div>
        <div className="bg-yellow-50 rounded-2xl border border-yellow-100 p-4 text-center">
          <p className="text-xs text-yellow-600 mb-1">معلّقة</p>
          <p className="text-lg font-bold text-yellow-700">{pendingCount}</p>
          <p className="text-xs text-yellow-500 mt-0.5">عملية</p>
        </div>
      </div>

      {/* البحث والفلتر */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 space-y-3">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="بحث بالاسم أو الرقم أو المرجع..."
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

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-50">
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
              <label className="text-xs font-semibond text-gray-500">من تاريخ</label>
              <input type="date" value={dateFrom} onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500">إلى تاريخ</label>
              <input type="date" value={dateTo} onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary" />
            </div>
          </div>
        )}
      </div>

      {/* الجدول */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {paginated.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">لا توجد نتائج مطابقة</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {paginated.map((pay) => (
              <div key={pay.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/70 transition-colors">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <ArrowDownLeft className="w-5 h-5 text-green-600" />
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <p className="text-sm font-semibold text-gray-800 truncate">{pay.payer}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                    <p className="text-xs text-gray-400 truncate" dir="ltr">{pay.reference}</p>
                  </div>
                  {pay.note && <p className="text-xs text-gray-400 truncate">{pay.note}</p>}
                </div>

                <div className="hidden md:block text-xs text-gray-400 shrink-0 text-center">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(pay.created_at)}
                  </div>
                  <p className="mt-0.5">{formatTime(pay.created_at)}</p>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-sm font-bold text-green-600">
                    +{formatAmount(pay.amount)} ل.س
                  </span>
                  <span className="text-xs text-gray-400">رسوم: {formatAmount(pay.fee)} ل.س</span>
                  <StatusBadge status={pay.status} />
                </div>
              </div>
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
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition">
                <ChevronRight className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)}
                  className={"w-8 h-8 rounded-xl text-sm font-semibold transition " +
                    (page === p ? 'bg-primary text-white' : 'border border-gray-200 text-gray-500 hover:border-primary hover:text-primary')}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition">
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomingPaymentsLog;
