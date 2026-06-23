import React from 'react';
import { Users, Wallet, TrendingUp, ShieldCheck, BarChart3, AlertTriangle } from 'lucide-react';

const stats = [
  { label: 'إجمالي المستخدمين', value: '12,842', icon: <Users className="w-6 h-6" /> },
  { label: 'معاملات اليوم', value: '1,245', icon: <Wallet className="w-6 h-6" /> },
  { label: 'حجم التداول', value: '28,300,000 SYP', icon: <TrendingUp className="w-6 h-6" /> },
  { label: 'تنبيهات مشبوهة', value: '18', icon: <AlertTriangle className="w-6 h-6" /> },
];

const AdminDashboardPage = () => {
  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">لوحة تحكم الإدارة</h1>
          <p className="text-gray-500 mt-2">نظرة عامة على أداء النظام، النشاط اليومي، والحالات الحرجة.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">{item.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-2xl font-bold text-dark mt-2">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-primary">حجم المعاملات اليومي</h2>
              <p className="text-sm text-gray-500">عرض بياني لمستوى النشاط عبر الأيام.</p>
            </div>
            <BarChart3 className="w-6 h-6 text-secondary" />
          </div>
          <div className="h-72 rounded-3xl bg-slate-50 border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
            مخطط عمودي تجريبي
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-primary mb-4">أحدث التحذيرات</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 rounded-2xl bg-red-50 p-4">
                <ShieldCheck className="w-5 h-5 text-red-500" />
                <div>
                  <p className="font-semibold">معاملة مشبوهة تم تمييزها</p>
                  <p className="text-sm text-gray-500">معرف المعاملة 78214 • منذ 15 دقيقة</p>
                </div>
              </li>
              <li className="flex items-center gap-3 rounded-2xl bg-yellow-50 p-4">
                <ShieldCheck className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="font-semibold">طلبات KYC قيد الانتظار</p>
                  <p className="text-sm text-gray-500">عدد 7 طلبات تحتاج مراجعة.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-primary mb-4">أهم المؤشرات</h2>
            <div className="grid gap-4">
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-gray-600">نسبة المستخدمين النشطين: 82%</div>
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-gray-600">وقت الاستجابة المتوسط: 320 مللي ثانية</div>
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-gray-600">معاملات مشبوهة اليوم: 4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
