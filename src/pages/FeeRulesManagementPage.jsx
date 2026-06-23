import React from 'react';
import { Percent, Settings, Save } from 'lucide-react';

const feeRules = [
  { type: 'تحويل داخلي', fixed: '1000 SYP', percent: '0.5%', min: '500 SYP', max: '3000 SYP' },
  { type: 'دفع فواتير', fixed: '500 SYP', percent: '0.2%', min: '200 SYP', max: '1500 SYP' },
  { type: 'سحب نقدي', fixed: '1500 SYP', percent: '0.8%', min: '800 SYP', max: '4000 SYP' },
];

const FeeRulesManagementPage = () => {
  return (
    <div className="space-y-8" dir="rtl">
      <div>
        <h1 className="text-3xl font-bold text-primary">إدارة الرسوم</h1>
        <p className="text-gray-500 mt-2">اضبط قواعد الرسوم الثابتة والنسبية لكل نوع معاملة.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-primary">قواعد الرسوم الحالية</h2>
            <p className="text-sm text-gray-500">يمكنك تعديل القيم وحفظها فوراً.</p>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-3 bg-secondary text-dark rounded-full font-semibold hover:bg-secondary/90 transition">
            <Save className="w-4 h-4" /> حفظ التغييرات
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-right border-separate border-spacing-y-3">
            <thead>
              <tr className="text-sm text-gray-500 uppercase">
                <th className="px-4 py-3">نوع المعاملة</th>
                <th className="px-4 py-3">رسوم ثابتة</th>
                <th className="px-4 py-3">نسبة الرسوم</th>
                <th className="px-4 py-3">الحد الأدنى</th>
                <th className="px-4 py-3">الحد الأقصى</th>
              </tr>
            </thead>
            <tbody>
              {feeRules.map((rule) => (
                <tr key={rule.type} className="bg-slate-50 rounded-3xl">
                  <td className="px-4 py-4 font-semibold text-dark">{rule.type}</td>
                  <td className="px-4 py-4 text-gray-700">{rule.fixed}</td>
                  <td className="px-4 py-4 text-gray-700">{rule.percent}</td>
                  <td className="px-4 py-4 text-gray-700">{rule.min}</td>
                  <td className="px-4 py-4 text-gray-700">{rule.max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-3xl bg-slate-50 p-6 border border-dashed border-gray-200">
          <div className="flex items-center gap-3 text-secondary mb-3"><Percent className="w-5 h-5" /><span className="font-semibold">تلميح:</span></div>
          <p className="text-sm text-gray-600">يمكنك منح خصم للمعاملات الكبيرة، أو رفع الحد الأقصى للرسوم على أنواع المعاملات ذات المخاطر العالية.</p>
        </div>
      </div>
    </div>
  );
};

export default FeeRulesManagementPage;
