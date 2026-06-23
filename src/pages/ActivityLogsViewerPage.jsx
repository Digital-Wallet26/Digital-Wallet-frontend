import React, { useState } from 'react';
import { Search, Clock3, FileText, Download } from 'lucide-react';

const logs = [
  { id: 'A001', user: 'سارة العلي', action: 'تسجيل دخول', ip: '192.168.1.12', date: '2026-06-21 10:14' },
  { id: 'A002', user: 'محمد خالد', action: 'سحب مبلغ', ip: '192.168.1.22', date: '2026-06-21 09:43' },
  { id: 'A003', user: 'ليلى حسن', action: 'تحديث ملف', ip: '192.168.1.30', date: '2026-06-20 18:05' },
  { id: 'A004', user: 'أحمد مصطفى', action: 'محاولة فاشلة', ip: '192.168.1.44', date: '2026-06-20 17:20' },
];

const ActivityLogsViewerPage = () => {
  const [query, setQuery] = useState('');
  const filteredLogs = logs.filter((log) =>
    log.user.includes(query) || log.action.includes(query) || log.ip.includes(query) || log.date.includes(query)
  );

  return (
    <div className="space-y-8" dir="rtl">
      <div>
        <h1 className="text-3xl font-bold text-primary">سجل النشاط</h1>
        <p className="text-gray-500 mt-2">راجع بروتوكولات الدخول، الإجراءات، ومحاولات الفشل مع تصدير CSV.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 w-full md:w-96">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث باسم المستخدم أو الإجراء أو الـ IP"
              className="w-full bg-transparent outline-none text-right text-gray-700"
            />
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-3 bg-secondary text-dark rounded-full font-semibold hover:bg-secondary/90 transition">
            <Download className="w-4 h-4" /> تصدير CSV
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-right border-separate border-spacing-y-3">
            <thead>
              <tr className="text-sm text-gray-500 uppercase">
                <th className="px-4 py-3">المعرف</th>
                <th className="px-4 py-3">المستخدم</th>
                <th className="px-4 py-3">الإجراء</th>
                <th className="px-4 py-3">IP</th>
                <th className="px-4 py-3">الوقت</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="bg-slate-50 rounded-3xl">
                  <td className="px-4 py-4 font-semibold text-dark">{log.id}</td>
                  <td className="px-4 py-4 text-gray-700">{log.user}</td>
                  <td className="px-4 py-4 text-gray-700">{log.action}</td>
                  <td className="px-4 py-4 text-gray-700">{log.ip}</td>
                  <td className="px-4 py-4 text-gray-500">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogsViewerPage;
