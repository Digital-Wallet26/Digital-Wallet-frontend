import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './layouts/MainLayout';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import UserManagementPage from './pages/UserManagementPage';
import TransactionManagementPage from './pages/TransactionManagementPage';
import KYCReviewPage from './pages/KYCReviewPage';
import MerchantManagementPage from './pages/MerchantManagementPage';
import FeeRulesManagementPage from './pages/FeeRulesManagementPage';
import ActivityLogsViewerPage from './pages/ActivityLogsViewerPage';

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
          <Route path="/dashboard" element={<AdminDashboardPage />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<UserManagementPage />} />
          <Route path="/admin/transactions" element={<TransactionManagementPage />} />
          <Route path="/admin/kyc" element={<KYCReviewPage />} />
          <Route path="/admin/merchants" element={<MerchantManagementPage />} />
          <Route path="/admin/fees" element={<FeeRulesManagementPage />} />
          <Route path="/admin/logs" element={<ActivityLogsViewerPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
