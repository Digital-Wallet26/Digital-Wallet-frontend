import React, { useState } from 'react';
import { Search, Filter, CreditCard, ShieldCheck, Eye, Clock3 } from 'lucide-react';

const transactions = [
  { id: 1012, user: 'سارة العلي', amount: '120,000 SYP', type: 'دفع فاتورة', status: 'نجاح', date: '2026-06-21' },
  { id: 1013, user: 'محمد خالد', amount: '420,000 SYP', type: 'سحب', status: 'مشتبه', date: '2026-06-21' },
  { id: 1014, user: 'ليلى حسن', amount: '75,000 SYP', type: 'تحويل', status: 'نجاح', date: '2026-06-20' },
  { id: 1015, user: 'أحمد مصطفى', amount: '250,000 SYP', type: 'شحن', status: 'نجاح', date: '2026-06-19' },
];

const TransactionManagementPage = () => {
  const [query, setQuery] = useState('');
  const filteredTransactions = transactions.filter((tx) =>
    tx.user.includes(query) || tx.amount.includes(query) || tx.type.includes(query) || tx.status.includes(query)
  );

  return (
    <div className="space-y-8" dir="rtl">
      <div>
        <h1 className="text-3xl font-bold text-primary">إدارة المعاملات</h1>
        <p className="text-gray-500 mt-2">عرض المعاملات مع فلترة متقدمة، وميزة تمييز العمليات المشبوهة.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 w-full md:w-96">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="بحث باسم المستخدم أو نوع المعاملة أو الحالة"
              className="w-full bg-transparent outline-none text-right text-gray-700"
            />
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-3 bg-secondary text-dark rounded-full font-semibold hover:bg-secondary/90 transition">
            <Filter className="w-4 h-4" /> فلتر متقدم
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-right border-separate border-spacing-y-3">
            <thead>
              <tr className="text-sm text-gray-500 uppercase">
                <th className="px-4 py-3">معرف</th>
                <th className="px-4 py-3">المستخدم</th>
                <th className="px-4 py-3">المبلغ</th>
                <th className="px-4 py-3">النوع</th>
                <th className="px-4 py-3">الحالة</th>
                <th className="px-4 py-3">التاريخ</th>
                <th className="px-4 py-3">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="bg-slate-50 rounded-3xl">
                  <td className="px-4 py-4 font-semibold">{tx.id}</td>
                  <td className="px-4 py-4 text-gray-700">{tx.user}</td>
                  <td className="px-4 py-4 text-gray-700">{tx.amount}</td>
                  <td className="px-4 py-4 text-gray-700">{tx.type}</td>
                  <td className={`px-4 py-4 font-semibold ${tx.status === 'مشتبه' ? 'text-orange-600' : 'text-green-600'}`}>{tx.status}</td>
                  <td className="px-4 py-4 text-gray-500">{tx.date}</td>
                  <td className="px-4 py-4 flex justify-end gap-2">
                    <button className="px-3 py-2 rounded-full bg-white border border-gray-200 text-gray-600 text-sm flex items-center gap-2"><Eye className="w-4 h-4" /> تفاصيل</button>
                    <button className="px-3 py-2 rounded-full bg-secondary/10 text-secondary text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> ابلاغ</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionManagementPage;
