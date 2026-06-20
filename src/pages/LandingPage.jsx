import React from 'react';
// استيراد الرابط باسم RouterLink لمنع أي تضارب مع الأيقونات
import { Link as RouterLink } from 'react-router-dom'; 
import { Wallet, ShieldCheck, Zap, ArrowRight, CreditCard, Globe } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-light text-dark font-sans relative">
      
      {/* --- Navbar --- */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <Wallet className="text-secondary w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-primary tracking-tight">SmartWallet</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <a href="#features" className="hover:text-primary transition">المميزات</a>
          <a href="#how-it-works" className="hover:text-primary transition">كيف نعمل</a>
          <a href="#merchants" className="hover:text-primary transition">للتجار</a>
        </div>
        <div className="flex gap-4">
          <RouterLink to="/login" className="px-5 py-2 text-primary font-semibold hover:text-primary/80 transition">
            تسجيل الدخول
          </RouterLink>
          <RouterLink to="/register" className="px-5 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition shadow-md">
            ابدأ الآن
          </RouterLink>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header className="relative px-8 py-20 md:py-32 flex flex-col items-center text-center overflow-hidden">
        {/* تحسين Z-Index هنا لضمان عدم تغطية الأزرار */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-50 opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-primary leading-tight mb-6 relative z-10">
          مستقبل المدفوعات الرقمية <br /> <span className="text-secondary">في محافظة حلب</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-10 leading-relaxed relative z-10">
          منصة مالية متكاملة تمنحك التحكم الكامل بأموالك. تحويلات فورية، دفع فواتير بضغطة زر، وبوابة دفع آمنة للتجار. كل ذلك في تطبيق واحد سهل وآمن.
        </p>
        <div className="flex flex-col md:flex-row gap-4 relative z-10">
          <RouterLink to="/register" className="px-8 py-4 bg-primary text-white rounded-full text-lg font-bold hover:bg-primary/90 transition flex items-center justify-center gap-2 shadow-lg">
            أنشئ حسابك الآن <ArrowRight className="w-5 h-5 rotate-180" />
          </RouterLink>
          <button className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-full text-lg font-bold hover:bg-primary hover:text-white transition">
            تعرف على المزيد
          </button>
        </div>
      </header>

      {/* --- Features Section --- */}
      <section id="features" className="px-8 py-20 bg-white relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">لماذا تختار SmartWallet؟</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard 
            icon={<ShieldCheck className="w-8 h-8 text-primary" />} 
            title="أمان فائق" 
            desc="تشفير عسكري للبيانات مع نظام توثيق KYC لضمان أعلى معايير الأمان المالية." 
          />
          <FeatureCard 
            icon={<Zap className="w-8 h-8 text-primary" />} 
            title="سرعة فورية" 
            desc="حوّل الأموال أو ادفع فواتيرك في أجزاء من الثانية دون انتظار أو تعقيدات." 
          />
          <FeatureCard 
            icon={<CreditCard className="w-8 h-8 text-primary" />} 
            title="دفع الفواتير" 
            desc="سدد فواتير الكهرباء، المياه، والاتصالات مباشرة من محفظتك الرقمية." 
          />
        </div>
      </section>

      {/* --- Merchants Section --- */}
      <section id="merchants" className="px-8 py-20 bg-primary text-white relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">هل أنت صاحب عمل؟ <br /> انضم إلى شبكة تجارنا</h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              نوفر للتجار بوابة دفع متكاملة عبر API، تمكنك من استقبال المدفوعات من عملائك فوراً وبسهولة، مع لوحة تحكم لمراقبة مبيعاتك بدقة.
            </p>
            <RouterLink to="/register" className="px-8 py-3 bg-secondary text-dark rounded-full font-bold hover:bg-secondary/90 transition inline-block">
              سجل كتاجر الآن
            </RouterLink>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 text-center">
              <Globe className="w-10 h-10 mx-auto mb-4 text-secondary" />
              <p className="font-semibold">ربط سريع</p>
            </div>
            <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 text-center">
              <ShieldCheck className="w-10 h-10 mx-auto mb-4 text-secondary" />
              <p className="font-semibold">مدفوعات مؤمنة</p>
            </div>
            <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 text-center">
              <Zap className="w-10 h-10 mx-auto mb-4 text-secondary" />
              <p className="font-semibold">تقارير فورية</p>
            </div>
            <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 text-center">
              <Wallet className="w-10 h-10 mx-auto mb-4 text-secondary" />
              <p className="font-semibold">عمولات منخفضة</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-dark text-white px-8 py-12 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Wallet className="text-secondary w-6 h-6" />
          <span className="text-2xl font-bold tracking-tight">SmartWallet</span>
        </div>
        <p className="text-gray-400">© 2026 SmartWallet. جميع الحقوق محفوظة - مشروع تخرج هندسة المعلوماتية.</p>
      </footer>
    </div>
  );
};

// مكون صغير للبطاقات لتقليل تكرار الكود
const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 bg-light rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
    <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;
