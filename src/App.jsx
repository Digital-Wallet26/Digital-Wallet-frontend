import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage'; // استيراد الصفحة الجديدة

// الصفحات الأخرى تبقى مؤقتة حتى نبنيها
const RegisterPage = () => <div className="min-h-screen flex items-center justify-center text-2xl">صفحة إنشاء الحساب (قيد الإنشاء...)</div>;
const ForgotPasswordPage = () => <div className="min-h-screen flex items-center justify-center text-2xl">صفحة استعادة كلمة المرور (قيد الإنشاء...)</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} /> {/* ربط الصفحة الحقيقية */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
