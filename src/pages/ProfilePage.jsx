import React, { useState } from 'react';
import { User, Mail, Phone, Lock, ShieldCheck, Camera, Save, Edit3, ArrowRight } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // بيانات تجريبية تحاكي ما سيأتي من قاعدة البيانات v9.0
  const [user, setUser] = useState({
    name: 'مؤيد أحمد العاصي',
    email: 'moayad@example.com',
    phone: '0933xxxxxxx',
    kycLevel: 'Level 2 - Verified',
    dailyLimit: '1,000,000 SYP',
    monthlyLimit: '10,000,000 SYP',
    status: 'active'
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500" dir="rtl">
      {/* Header Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
        <div className="relative group">
          <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-secondary shadow-xl">
            م
          </div>
          <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:text-primary transition cursor-pointer">
            <Camera className="w-5 h-5" />
          </button>
        </div>
        
        <div className="text-center md:text-right flex-1">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <h1 className="text-3xl font-bold text-primary">{user.name}</h1>
            <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> {user.status === 'active' ? 'حساب نشط' : 'معلق'}
            </div>
          </div>
          <p className="text-gray-500 mb-4">عضو منذ يناير 2026 • محافظة حلب</p>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition shadow-md"
          >
            {isEditing ? <><Save className="w-4 h-4" /> حفظ التغييرات</> : <><Edit3 className="w-4 h-4" /> تعديل الملف الشخصي</>}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Right Column: Personal Info */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <User className="w-5 h-5" /> المعلومات الشخصية
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm text-gray-500 mr-1">الاسم الكامل</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"><User className="w-5 h-5" /></span>
                  <input 
                    disabled={!isEditing}
                    className={`w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-right transition ${isEditing ? 'bg-white border-primary ring-2 ring-primary/10' : 'cursor-not-allowed'}`}
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-500 mr-1">رقم الهاتف</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"><Phone className="w-5 h-5" /></span>
                  <input 
                    disabled={!isEditing}
                    className={`w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-right transition ${isEditing ? 'bg-white border-primary ring-2 ring-primary/10' : 'cursor-not-allowed'}`}
                    value={user.phone}
                    onChange={(e) => setUser({...user, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm text-gray-500 mr-1">البريد الإلكتروني</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"><Mail className="w-5 h-5" /></span>
                  <input 
                    disabled={!isEditing}
                    className={`w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-right transition ${isEditing ? 'bg-white border-primary ring-2 ring-primary/10' : 'cursor-not-allowed'}`}
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm text-gray-500 mr-1">كلمة المرور</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"><Lock className="w-5 h-5" /></span>
                  <input 
                    type="password"
                    disabled={!isEditing}
                    className={`w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-right transition ${isEditing ? 'bg-white border-primary ring-2 ring-primary/10' : 'cursor-not-allowed'}`}
                    value="••••••••"
                    readOnly
                  />
                </div>
                <p className="text-xs text-blue-600 mt-2 cursor-pointer hover:underline">تغيير كلمة المرور</p>
              </div>
            </div>
          </div>
        </div>

        {/* Left Column: KYC Status */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-secondary"></div>
            <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-secondary" /> حالة التوثيق
            </h3>
            
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-secondary/10 rounded-2xl mb-3">
                <ShieldCheck className="w-12 h-12 text-secondary" />
              </div>
              <p className="text-sm text-gray-500">مستوى التوثيق الحالي</p>
              <p className="text-2xl font-bold text-primary">{user.kycLevel}</p>
            </div>

            <div className="space-y-4 border-t border-gray-100 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">الحد اليومي:</span>
                <span className="font-bold text-dark">{user.dailyLimit}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">الحد الشهري:</span>
                <span className="font-bold text-dark">{user.monthlyLimit}</span>
              </div>
            </div>

            <button className="w-full mt-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition shadow-md flex items-center justify-center gap-2">
              ترقية المستوى <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; // تأكد من وجود هذا السطر في النهاية
