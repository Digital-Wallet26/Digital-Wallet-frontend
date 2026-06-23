import React from 'react';
import { Globe, ShieldCheck, Zap, Wallet, Search } from 'lucide-react';

const merchants = [
  { id: 1, name: 'متجر النور', status: 'نشط', volume: '18,200,000 SYP' },
  { id: 2, name: 'سوق الشام', status: 'قيد التحقق', volume: '5,400,000 SYP' },
  { id: 3, name: 'رياض القهوة', status: 'معلق', volume: '740,000 SYP' },
  { id: 4, name: 'جميل للتجارة', status: 'نشط', volume: '12,800,000 SYP' },
];

const MerchantManagementPage = () => {
  return (
    <div className="space-y-8" dir="rtl">
      <div>
        <h1 className="text-3xl font-bold text-primary">إدارة التجار</h1>
        <p className="text-gray-500 mt-2">راقب التجار، وافق على الانضمام، وتحقق من حجم المدفوعات الواردة.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 w-full md:w-96">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث باسم التاجر أو الحالة"
              className="w-full bg-transparent outline-none text-right text-gray-700"
            />
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-3 bg-secondary text-dark rounded-full font-semibold hover:bg-secondary/90 transition">
            <Globe className="w-4 h-4" /> عرض الشبكة
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-right border-separate border-spacing-y-3">
            <thead>
              <tr className="text-sm text-gray-500 uppercase">
                <th className="px-4 py-3">التاجر</th>
                <th className="px-4 py-3">الحالة</th>
                <th className="px-4 py-3">حجم المدفوعات</th>
                <th className="px-4 py-3">خيارات</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((merchant) => (
                <tr key={merchant.id} className="bg-slate-50 rounded-3xl">
                  <td className="px-4 py-4 font-semibold text-dark">{merchant.name}</td>
                  <td className={`px-4 py-4 font-semibold ${merchant.status === 'نشط' ? 'text-green-600' : 'text-orange-600'}`}>{merchant.status}</td>
                  <td className="px-4 py-4 text-gray-700">{merchant.volume}</td>
                  <td className="px-4 py-4 flex justify-end gap-2">
                    <button className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 text-sm flex items-center gap-2"><Wallet className="w-4 h-4" /> كشف</button>
                    <button className="px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> تفعيل</button>
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

export default MerchantManagementPage;
