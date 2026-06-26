import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './layouts/MainLayout';
import ProfilePage from './pages/ProfilePage';
import CustomerDashboard from './pages/CustomerDashboard';
import WalletPage from './pages/WalletPage';
import TransactionHistory from './pages/TransactionHistory';
import BillPaymentPage from './pages/BillPaymentPage';
import MerchantDashboard from './pages/MerchantDashboard';
// import MerchantApiKeys from './pages/MerchantApiKeys';
import IncomingPaymentsLog from './pages/IncomingPaymentsLog';
import WebhookSettings from './pages/WebhookSettings';

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
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/bills" element={<BillPaymentPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/transacions" element={<TransactionHistory/>} />
          <Route path="/merchant" element={<MerchantDashboard/>} />
          {/* <Route path="/merchant/api-keys" element={<MerchantApiKeys/>} /> */}
          <Route path="merchant/payments" element={<IncomingPaymentsLog/>} />
          <Route path="merchant/webhook" element={<WebhookSettings/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;