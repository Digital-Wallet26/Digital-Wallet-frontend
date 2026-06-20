import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { User, Store, Mail, Phone, Lock, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';

const RegisterPage = () => {
  const [step, setStep] = useState(1); // 1: Role, 2: Info, 3: OTP
  const [role, setRole] = useState('customer'); // customer or merchant

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-light flex items-center justify-center p-4 font-sans">
      {/* خلفية جمالية */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 relative z-10 border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="bg-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShieldCheck className="text-secondary w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-primary">إنشاء حساب جديد</h2>
          <p className="text-gray-500 mt-2">انضم إلى SmartWallet وابدأ بإدارة أموالك بذكاء</p>
          
          {/* شريط تقدم (Step Indicator) */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {s}
                </div>
                {s < 3 && <div className={`w-10 h-1 ${step > s ? 'bg-primary' : 'bg-gray-200'} transition-all`}></div>}
              </div>
            ))}
          </div>
        </div>

        {step === 1 ? (
          /* المرحلة 1: اختيار نوع الحساب */
          <div className="grid md:grid-cols-2 gap-6 animate-in fade-in zoom-in duration-300">
            <div 
              onClick={() => setRole('customer')}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${role === 'customer' ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-gray-100 bg-white'}`}
            >
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <User className={`w-6 h-6 ${role === 'customer' ? 'text-primary' : 'text-gray-400'}`} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">حساب عميل</h3>
              <p className="text-sm text-gray-600 leading-relaxed">لإدارة أموالك الشخصية، تحويل المبالغ، ودفع الفواتير بسهولة.</p>
            </div>

            <div 
              onClick={() => setRole('merchant')}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${role === 'merchant' ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-gray-100 bg-white'}`}
            >
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Store className={`w-6 h-6 ${role === 'merchant' ? 'text-primary' : 'text-gray-400'}`} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">حساب تاجر</h3>
              <p className="text-sm text-gray-600 leading-relaxed">لاستقبال المدفوعات عبر API، إدارة المبيعات، وتوسيع تجارتك.</p>
            </div>

            <button 
              onClick={() => setStep(2)}
              className="md:col-span-2 w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition shadow-lg flex items-center justify-center gap-2 mt-4"
            >
              متابعة <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
          </div>
        ) : step === 2 ? (
          /* المرحلة 2: البيانات الشخصية */
          <form onSubmit={handleNext} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 mr-1">الاسم الكامل</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"><User className="w-5 h-5" /></span>
                  <input type="text" required className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none text-right" placeholder="محمد أحمد" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 mr-1">رقم الهاتف</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"><Phone className="w-5 h-5" /></span>
                  <input type="text" required className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none text-right" placeholder="09xxxxxxxx" />
                </div>
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mr-1">البريد الإلكتروني</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"><Mail className="w-5 h-5" /></span>
                  <input type="email" required className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none text-right" placeholder="name@example.com" />
                </div>
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mr-1">كلمة المرور</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"><Lock className="w-5 h-5" /></span>
                  <input type="password" required className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none text-right" placeholder="••••••••" />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition">عودة</button>
              <button type="submit" className="flex-[2] py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition shadow-lg flex items-center justify-center gap-2">
                التالي <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
            </div>
          </form>
        ) : (
          /* المرحلة 3: التحقق OTP */
          <div className="text-center space-y-8 animate-in fade-in zoom-in duration-300">
            <div>
              <div className="bg-secondary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-secondary w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-primary">تفعيل الحساب</h3>
              <p className="text-gray-500 mt-2">أدخل رمز التحقق المكون من 4 أرقام المرسل إلى هاتفك</p>
            </div>

            <div className="flex justify-center gap-3" dir="ltr">
              {[1, 2, 3, 4].map((i) => (
                <input key={i} type="text" maxLength="1" className="w-14 h-14 text-center text-2xl font-bold bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
              ))}
            </div>

            <button 
              onClick={() => alert('تم إنشاء الحساب بنجاح! جاري توجيهك لصفحة الدخول...')}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition shadow-lg flex items-center justify-center gap-2"
            >
              إتمام التسجيل <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button onClick={() => setStep(2)} className="text-sm text-gray-500 hover:text-primary transition underline">تعديل البيانات</button>
          </div>
        )}

        <p className="text-center text-gray-600 mt-8">
          لديك حساب بالفعل؟ <RouterLink to="/login" className="text-primary font-bold hover:underline">تسجيل الدخول</RouterLink>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
