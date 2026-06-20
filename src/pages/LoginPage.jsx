import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Phone, Mail, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [step, setStep] = useState(1); // 1: Credentials, 2: OTP
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // محاكاة عملية تسجيل الدخول والانتقال لـ OTP
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-light flex items-center justify-center p-4 font-sans">
      {/* الدائرة الخلفية الجمالية */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative z-10 border border-gray-100">
        
        {/* الشعار */}
        <div className="text-center mb-10">
          <div className="bg-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShieldCheck className="text-secondary w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-primary">مرحباً بعودتك</h2>
          <p className="text-gray-500 mt-2">سجل دخولك للوصول إلى محفظتك الآمنة</p>
        </div>

        {step === 1 ? (
          /* المرحلة الأولى: بيانات الدخول */
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              {/* حقل الهاتف أو الإيميل */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1 mr-1">الهاتف أو البريد الإلكتروني</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                    <Phone className="w-5 h-5" />
                  </span>
                  <input 
                    type="text" 
                    required 
                    className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition outline-none text-right"
                    placeholder="09xxxxxxxx"
                  />
                </div>
              </div>

              {/* حقل كلمة المرور */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1 mr-1">كلمة المرور</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                    <Lock className="w-5 h-5" />
                  </span>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition outline-none text-right"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 hover:text-primary transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-primary font-semibold hover:underline">نسيت كلمة المرور؟</Link>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition shadow-lg flex items-center justify-center gap-2 group"
            >
              تسجيل الدخول <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition" />
            </button>

            <p className="text-center text-gray-600 mt-6">
              ليس لديك حساب؟ <Link to="/register" className="text-primary font-bold hover:underline">أنشئ حسابك الآن</Link>
            </p>
          </form>
        ) : (
          /* المرحلة الثانية: رمز التحقق OTP */
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-6">
              <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="text-secondary w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-primary">تحقق من هويتك</h3>
              <p className="text-gray-500 text-sm mt-2">أرسلنا رمز التحقق (OTP) إلى هاتفك المسجل</p>
            </div>

            <div className="flex justify-center gap-3" dir="ltr">
              {[1, 2, 3, 4].map((i) => (
                <input 
                  key={i}
                  type="text" 
                  maxLength="1" 
                  className="w-14 h-14 text-center text-2xl font-bold bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition outline-none"
                />
              ))}
            </div>

            <button 
              onClick={() => alert('تم تسجيل الدخول بنجاح!')}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition shadow-lg flex items-center justify-center gap-2"
            >
              تأكيد الرمز <ArrowRight className="w-5 h-5 rotate-180" />
            </button>

            <div className="text-center">
              <button 
                onClick={() => setStep(1)} 
                className="text-sm text-gray-500 hover:text-primary transition underline"
              >
                العودة لتعديل البيانات
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
