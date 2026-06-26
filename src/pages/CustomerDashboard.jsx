/*[6/24/2026 9:48 PM] Dler Mamo: */import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, ArrowDownLeft, ArrowLeftRight,
  TrendingUp, TrendingDown, Eye, EyeOff,
  Plus, Download, Receipt,
  CheckCircle, Clock, XCircle, AlertCircle,
  ChevronLeft
} from 'lucide-react';

const dummyUser = {
  name: 'دلير معمو',
  kyc_level: 'Level 2 - Verified',
  kyc_badge: 'موثق',
};

const dummyWallet = {
  balance: 1250000,
  currency: 'ل.س',
  daily_limit: 1000000,
  daily_used: 320000,
  monthly_limit: 10000000,
  monthly_used: 2100000,
};

const dummyTransactions = [
  { id: '1', type: 'transfer',         direction: 'out', title: 'تحويل إلى أحمد البين',  reference_number: 'TXN-20250601-001', amount: 150000, status: 'completed', created_at: '2025-06-01T10:30:00' },
  { id: '2', type: 'deposit',          direction: 'in',  title: 'إيداع رصيد',             reference_number: 'TXN-20250531-088', amount: 500000, status: 'completed', created_at: '2025-05-31T14:00:00' },
  { id: '3', type: 'bill_payment',     direction: 'out', title: 'دفع فاتورة الكهرباء',    reference_number: 'TXN-20250530-045', amount: 32500,  status: 'completed', created_at: '2025-05-30T09:15:00' },
  { id: '4', type: 'merchant_payment', direction: 'out', title: 'دفع لمتجر الحسن',        reference_number: 'TXN-20250529-112', amount: 87000,  status: 'pending',   created_at: '2025-05-29T18:45:00' },
  { id: '5', type: 'transfer',         direction: 'in',  title: 'استلام من حسين شيخو',    reference_number: 'TXN-20250528-077', amount: 200000, status: 'completed', created_at: '2025-05-28T12:00:00' },
];

const dummyStats = {
  income_this_month: 700000,
  expenses_this_month: 269500,
  income_last_month: 500000,
  expenses_last_month: 310000,
};

const formatAmount = (amount) => amount.toLocaleString('ar-SY');

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ar-SY', { year: 'numeric', month: 'short', day: 'numeric' });
};

const TxIcon = ({ type, direction }) => {
  if (direction === 'in')
    return (
      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-green-100">
        <ArrowDownLeft className="w-5 h-5 text-green-600" />
      </div>
    );
  if (type === 'bill_payment')
    return (
      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-orange-100">
        <Receipt className="w-5 h-5 text-orange-500" />
      </div>
    );
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-blue-100">
      <ArrowUpRight className="w-5 h-5 text-blue-600" />
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const map = {
    completed:  { label: 'مكتملة', cls: 'bg-green-100 text-green-700',   icon: <CheckCircle className="w-3 h-3" /> },
    pending:    { label: 'معلقة',  cls: 'bg-yellow-100 text-yellow-700', icon: <Clock className="w-3 h-3" /> },
    failed:     { label: 'فاشلة',  cls: 'bg-red-100 text-red-700',       icon: <XCircle className="w-3 h-3" /> },
    processing: { label: 'جارية',  cls: 'bg-blue-100 text-blue-700',     icon: <AlertCircle className="w-3 h-3" /> },
  };
  const s = map[status] || map.pending;
  return (
    <span className={"inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium " + s.cls}>
      {s.icon} {s.label}
    </span>
  );
};

const LimitBar = ({ used, limit, label, colorClass }) => {
  const pct = Math.min((used / limit) * 100, 100);
  const warning = pct > 80;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-300">
        <span>{label}</span>
        <span className={warning ? 'text-red-300 font-semibold' : ''}>
          {formatAmount(used)} / {formatAmount(limit)} ل.س
        </span>
      </div>
      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className={"h-full rounded-full transition-all duration-500 " + (warning ? 'bg-red-400' : colorClass)}
          style={{ width: pct + '%' }}
        />
      </div>
    </div>
  );
};
/* [6/24/2026 9:48 PM] Dler Mamo: */ const UploadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4" />
  </svg>
);

const CustomerDashboard = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const incomeChange = dummyStats.income_this_month - dummyStats.income_last_month;
  const expenseChange = dummyStats.expenses_this_month - dummyStats.expenses_last_month;

  const quickActions = [
    { label: 'إيداع',  icon: <Download className="w-5 h-5" />,      path: '/wallet', color: 'bg-green-500 hover:bg-green-400' },
    { label: 'سحب',    icon: <UploadIcon />,                          path: '/wallet', color: 'bg-orange-500 hover:bg-orange-400' },
    { label: 'تحويل',  icon: <ArrowLeftRight className="w-5 h-5" />, path: '/wallet', color: 'bg-blue-500 hover:bg-blue-400' },
    { label: 'فاتورة', icon: <Receipt className="w-5 h-5" />,        path: '/bills',  color: 'bg-purple-500 hover:bg-purple-400' },
  ];

  return (
    <div className="space-y-6" dir="rtl">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">مرحباً، {dummyUser.name} 👋</h1>
          <p className="text-sm text-gray-500 mt-0.5">إليك ملخص حسابك اليوم</p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-3 py-1.5 rounded-full">
          <CheckCircle className="w-3.5 h-3.5" />
          {dummyUser.kyc_badge}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        <div className="lg:col-span-2 relative bg-gradient-to-br from-primary via-blue-800 to-blue-900 rounded-3xl p-6 text-white overflow-hidden shadow-lg">
          <div className="absolute top-0 left-0 w-48 h-48 bg-white/5 rounded-full -translate-x-16 -translate-y-16 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full translate-x-10 translate-y-10 pointer-events-none" />
          <div className="relative z-10 space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-blue-200 text-sm font-medium">الرصيد المتاح</p>
              <button
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="text-blue-300 hover:text-white transition p-1 rounded-full hover:bg-white/10"
              >
                {balanceVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold tracking-tight">
                {balanceVisible ? formatAmount(dummyWallet.balance) : '• • • • • •'}
              </span>
              <span className="text-blue-200 text-lg mb-1">{dummyWallet.currency}</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 space-y-3">
              <LimitBar used={dummyWallet.daily_used}   limit={dummyWallet.daily_limit}   label="الحد اليومي"  colorClass="bg-yellow-400" />
              <LimitBar used={dummyWallet.monthly_used} limit={dummyWallet.monthly_limit} label="الحد الشهري" colorClass="bg-green-400" />
            </div>
            <div className="grid grid-cols-4 gap-2 pt-1">
              {quickActions.map((btn) => (
                <Link
                  key={btn.label}
                  to={btn.path}
                  className={"flex flex-col items-center gap-1.5 py-3 rounded-2xl text-white text-xs font-semibold transition-all hover:scale-105 active:scale-95 " + btn.color}
                >
                  {btn.icon}
                  {btn.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
 <div className="space-y-4"> 
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-500">إجمالي الدخل</p>
              <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {formatAmount(dummyStats.income_this_month)}
              <span className="text-sm font-normal text-gray-400 mr-1">ل.س</span>
            </p>
            <div className={"flex items-center gap-1 text-xs font-medium " + (incomeChange >= 0 ? 'text-green-600' : 'text-red-500')}>
              {incomeChange >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {incomeChange >= 0 ? '+' : ''}{formatAmount(Math.abs(incomeChange))} ل.س عن الشهر الماضي
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-500">إجمالي المصروفات</p>
              <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-500" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {formatAmount(dummyStats.expenses_this_month)}
              <span className="text-sm font-normal text-gray-400 mr-1">ل.س</span>
            </p>
            <div className={"flex items-center gap-1 text-xs font-medium " + (expenseChange <= 0 ? 'text-green-600' : 'text-red-500')}>
              {expenseChange <= 0 ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
              {expenseChange >= 0 ? '+' : ''}{formatAmount(Math.abs(expenseChange))} ل.س عن الشهر الماضي
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-5">
            <p className="text-xs font-semibold text-yellow-700 mb-1">مستوى التوثيق</p>
            <p className="text-sm font-bold text-yellow-900">{dummyUser.kyc_level}</p>
            <Link to="/kyc" className="mt-2 inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline">
              رفع المستوى <ChevronLeft className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
          <h2 className="text-base font-bold text-gray-800">آخر المعاملات</h2>
          <Link to="/transactions" className="flex items-center gap-1 text-sm text-primary font-semibold hover:underline">
            عرض الكل <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {dummyTransactions.map((tx) => (
            <Link
              to={"/transactions/" + tx.id}
              key={tx.id}
              className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/70 transition-colors"
            >
              <TxIcon type={tx.type} direction={tx.direction} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{tx.title}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{tx.reference_number}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
[6/24/2026 9:48 PM] Dler Mamo: <span className={"text-sm font-bold " + (tx.direction === 'in' ? 'text-green-600' : 'text-gray-700')}>
                  {tx.direction === 'in' ? '+' : '-'} {formatAmount(tx.amount)} ل.س
                </span>
                <StatusBadge status={tx.status} />
              </div>
              <div className="hidden sm:block text-xs text-gray-400 shrink-0 w-24 text-left">
                {formatDate(tx.created_at)}
              </div>
            </Link>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/40">
          <Link
            to="/transactions"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-primary/20 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all"
          >
            <Plus className="w-4 h-4" />
            عرض كل المعاملات
          </Link>
        </div>
      </div>

    </div>
  );
};

export default CustomerDashboard;