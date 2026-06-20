import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './layouts/MainLayout';
import ProfilePage from './pages/ProfilePage'; // استيراد الصفحة الجديدة

// الصفحات الأخرى تبقى مؤقتة
const Dashboard = () => <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 text-center text-2xl font-bold text-primary">🏠 لوحة التحكم الرئيسية (قيد التطوير بواسطة دلير)</div>;
const Wallet = () => <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 text-center text-2xl font-bold text-primary">💳 صفحة المحفظة الرقمية (قيد التطوير بواسطة دلير)</div>;
const Bills = () => <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 text-center text-2xl font-bold text-primary">📄 صفحة دفع الفواتير (قيد التطوير بواسطة دلير)</div>;

const ForgotPasswordPage = () => <div className="min-h-screen flex items-center justify-center text-2xl">صفحة استعادة كلمة المرور...</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/profile" element={<ProfilePage />} /> {/* ربط الصفحة الحقيقية */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
