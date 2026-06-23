import React from 'react';
import { FileText, ImageIcon, CheckCircle, XCircle } from 'lucide-react';

const requests = [
  { id: 1, name: 'سارة العلي', type: 'جواز سفر', status: 'قيد المراجعة', date: '2026-06-20' },
  { id: 2, name: 'محمد خالد', type: 'هوية وطنية', status: 'قيد المراجعة', date: '2026-06-21' },
];

const KYCReviewPage = () => {
  return (
    <div className="space-y-8" dir="rtl">
      <div>
        <h1 className="text-3xl font-bold text-primary">مراجعة طلبات KYC</h1>
        <p className="text-gray-500 mt-2">عرض طلبات التوثيق المعلقة مع تفاصيل المستندات وخيارات الموافقة أو الرفض.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-6">
          {requests.map((request) => (
            <div key={request.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-dark">{request.name}</h2>
                  <p className="text-sm text-gray-500">نوع المستند: {request.type}</p>
                </div>
                <span className="text-sm px-3 py-1 rounded-full bg-secondary/10 text-secondary">{request.status}</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4 text-gray-600 flex items-center gap-3">
                  <ImageIcon className="w-6 h-6 text-secondary" /> صورة المستند المرفقة
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 text-gray-600 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-secondary" /> تاريخ الطلب: {request.date}
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition"><XCircle className="w-4 h-4" /> رفض مع سبب</button>
                <button className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition"><CheckCircle className="w-4 h-4" /> الموافقة وترقية</button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-primary mb-4">معاينة المستند</h2>
          <div className="h-96 rounded-3xl bg-slate-50 border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
            معاينة صورة المستند هنا
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCReviewPage;
