import React, { useState } from 'react';
import { Search, Filter, UserCheck, UserMinus, Eye } from 'lucide-react';

const users = [
  { id: 1, name: 'سارة العلي', role: 'عميل', status: 'نشط', kyc: 'Level 2' },
  { id: 2, name: 'محمد خالد', role: 'تاجر', status: 'معلق', kyc: 'Level 1' },
  { id: 3, name: 'ليلى حسن', role: 'عميل', status: 'نشط', kyc: 'Level 3' },
  { id: 4, name: 'أحمد مصطفى', role: 'تاجر', status: 'نشط', kyc: 'Level 2' },
];

const UserManagementPage = () => {
  const [query, setQuery] = useState('');
  const filteredUsers = users.filter((user) =>
    user.name.includes(query) || user.role.includes(query) || user.status.includes(query) || user.kyc.includes(query)
  );

  return (
    <div className="space-y-8" dir="rtl">
      <div>
        <h1 className="text-3xl font-bold text-primary">إدارة المستخدمين</h1>
        <p className="text-gray-500 mt-2">ابحث، صنف، وراقب حالات المستخدمين، مستويات KYC، وحالة الحساب.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 w-full md:w-96">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث باسم المستخدم أو الحالة أو مستوى KYC"
              className="w-full bg-transparent outline-none text-right text-gray-700"
            />
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition">
            <Filter className="w-4 h-4" /> تصفية
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-right border-separate border-spacing-y-3">
            <thead>
              <tr className="text-sm text-gray-500 uppercase">
                <th className="px-4 py-3">المستخدم</th>
                <th className="px-4 py-3">الدور</th>
                <th className="px-4 py-3">الحالة</th>
                <th className="px-4 py-3">KYC</th>
                <th className="px-4 py-3">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="bg-slate-50 rounded-3xl">
                  <td className="px-4 py-4 font-semibold text-dark">{user.name}</td>
                  <td className="px-4 py-4 text-gray-600">{user.role}</td>
                  <td className={`px-4 py-4 font-semibold ${user.status === 'نشط' ? 'text-green-600' : 'text-orange-600'}`}>{user.status}</td>
                  <td className="px-4 py-4 text-gray-600">{user.kyc}</td>
                  <td className="px-4 py-4 space-x-2 flex justify-end">
                    <button className="px-3 py-2 rounded-full bg-green-50 text-green-700 text-sm flex items-center gap-2"><UserCheck className="w-4 h-4" /> تفعيل</button>
                    <button className="px-3 py-2 rounded-full bg-red-50 text-red-700 text-sm flex items-center gap-2"><UserMinus className="w-4 h-4" /> تعليق</button>
                    <button className="px-3 py-2 rounded-full bg-white border border-gray-200 text-gray-600 text-sm flex items-center gap-2"><Eye className="w-4 h-4" /> عرض</button>
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

export default UserManagementPage;
