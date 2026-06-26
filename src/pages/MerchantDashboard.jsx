import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, ArrowDownLeft,
  CheckCircle, Clock, XCircle, AlertCircle,
  ChevronLeft, ShoppingBag, Wallet, Users,
  Calendar, BarChart2
} from 'lucide-react';

// =============================================
// بيانات وهمية
// =============================================
const dummyMerchant = {
  business_name: 'متجر دلير للإلكترونيات',
  business_type: 'إلكترونيات وتقنية',
  status: 'active',
  client_id: 'cli_delir_2025_prod',
};

const dummyStats = {
  today_received:    185000,
  today_count:       7,
  month_received:    3250000,
  month_count:       94,
  last_month:        2800000,
  total_customers:   38,
  wallet_balance:    1250000,
};

const dummyPayments = [
  { id: '1', payer: 'أحمد البين',    reference: 'TXN-20250601-201', amount: 75000,  status: 'completed',  created_at: '2025-06-01T10:30:00' },
  { id: '2', payer: 'سارة محمد',    reference: 'TXN-20250601-198', amount: 32000,  status: 'completed',  created_at: '2025-06-01T09:15:00' },
  { id: '3', payer: 'حسين شيخو',    reference: 'TXN-20250531-187', amount: 120000, status: 'completed',  created_at: '2025-05-31T18:00:00' },
  { id: '4', payer: 'مؤيد العاصي',  reference: 'TXN-20250531-175', amount: 45000,  status: 'pending',    created_at: '2025-05-31T14:30:00' },
  { id: '5', payer: 'رنا الأحمد',   reference: 'TXN-20250530-163', amount: 88000,  status: 'completed',  created_at: '2025-05-30T11:00:00' },
];

// بيانات الرسم البياني (آخر 7 أيام)
const chartData = [
  { day: 'إثنين',   amount: 320000 },
  { day: 'ثلاثاء',  amount: 185000 },
  { day: 'أربعاء',  amount: 450000 },
  { day: 'خميس',   amount: 290000 },
  { day: 'جمعة',   amount: 510000 },
  { day: 'سبت',    amount: 380000 },
  { day: 'أحد',    amount: 185000 },
];

const formatAmount = (n) => n.toLocaleString('ar-SY');
const formatDate = (s) => new Date(s).toLocaleDateString('ar-SY', { month: 'short', day: 'numeric' });
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

// رسم بياني بسيط بدون مكتبة خارجية
const SimpleBarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.amount));
  return (
    <div className="flex items-end gap-2 h-32 px-2">
      {data.map((d, i) => {
        const pct = (d.amount / max) * 100;
        const isLast = i === data.length - 1;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full relative group">
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                {formatAmount(d.amount)} ل.س
              </div>
              <div
                className={"w-full rounded-t-lg transition-all duration-500 " + (isLast ? 'bg-secondary' : 'bg-primary/70 hover:bg-primary')}
                style={{ height: pct + '%', minHeight: '8px' }}
              />
            </div>
            <span className="text-xs text-gray-400 truncate w-full text-center">{d.day.slice(0, 2)}</span>
          </div>
        );
      })}
    </div>
  );
};

// =============================================
// الصفحة الرئيسية
// =============================================
const MerchantDashboard = () => {
  const monthChange = dummyStats.month_received - dummyStats.last_month;
  const monthChangePct = Math.round((monthChange / dummyStats.last_month) * 100);

  return (
    <div className="space-y-6" dir="rtl">

      {/* العنوان */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">{dummyMerchant.business_name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-500">{dummyMerchant.business_type}</span>
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              نشط
            </span>
          </div>
        </div>
        <Link
          to="/merchant/api-keys"
          className="flex items-center gap-2 px-4 py-2.5 border border-primary/20 text-primary rounded-2xl text-sm font-semibold hover:bg-primary hover:text-white transition"
        >
          مفاتيح API
        </Link>
      </div>

      {/* بطاقات KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* اليوم */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-400">استلمت اليوم</p>
            <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-xl font-bold text-gray-800">{formatAmount(dummyStats.today_received)}</p>
          <p className="text-xs text-gray-400">ل.س — {dummyStats.today_count} عملية</p>
        </div>

        {/* الشهر */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-400">هذا الشهر</p>
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <BarChart2 className="w-4 h-4 text-primary" />
            </div>
          </div>
          <p className="text-xl font-bold text-gray-800">{formatAmount(dummyStats.month_received)}</p>
          <div className={"flex items-center gap-1 text-xs font-medium " + (monthChange >= 0 ? 'text-green-600' : 'text-red-500')}>
            {monthChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {monthChange >= 0 ? '+' : ''}{monthChangePct}% عن الشهر الماضي
          </div>
        </div>

        {/* العملاء */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-400">إجمالي العملاء</p>
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <p className="text-xl font-bold text-gray-800">{dummyStats.total_customers}</p>
          <p className="text-xs text-gray-400">عميل فريد</p>
        </div>

        {/* رصيد المحفظة */}
        <div className="bg-gradient-to-br from-primary to-blue-800 rounded-3xl p-5 text-white space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-blue-200">رصيد المحفظة</p>
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
          </div>
          <p className="text-xl font-bold">{formatAmount(dummyStats.wallet_balance)}</p>
          <Link to="/wallet" className="text-xs text-blue-200 hover:text-white flex items-center gap-1">
            إدارة المحفظة <ChevronLeft className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* الرسم البياني + آخر المدفوعات */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* الرسم البياني */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-800">الإيرادات (آخر 7 أيام)</h2>
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
          <SimpleBarChart data={chartData} />
          <div className="flex justify-between text-xs text-gray-400 pt-1 border-t border-gray-50">
            <span>أعلى يوم: {formatAmount(Math.max(...chartData.map(d => d.amount)))} ل.س</span>
          </div>
        </div>

        {/* آخر المدفوعات */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
            <h2 className="text-base font-bold text-gray-800">آخر المدفوعات الواردة</h2>
            <Link to="/merchant/payments" className="flex items-center gap-1 text-sm text-primary font-semibold hover:underline">
              عرض الكل <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="divide-y divide-gray-50">
            {dummyPayments.map((pay) => (
              <div key={pay.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/70 transition-colors">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <ArrowDownLeft className="w-5 h-5 text-green-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{pay.payer}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{pay.reference}</p>
                </div>

                <div className="hidden sm:block text-xs text-gray-400 shrink-0 text-left">
                  <p>{formatDate(pay.created_at)}</p>
                  <p className="mt-0.5">{formatTime(pay.created_at)}</p>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-sm font-bold text-green-600">
                    +{formatAmount(pay.amount)} ل.س
                  </span>
                  <StatusBadge status={pay.status} />
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/40">
            <Link
              to="/merchant/payments"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-primary/20 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              عرض كل المدفوعات
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
