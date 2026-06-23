import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  Wallet, LayoutDashboard, CreditCard, Bell, 
  User, LogOut, Menu, X, ShieldCheck, Settings,
  Users, Activity, ClipboardList, Globe, Percent, FileText
} from 'lucide-react';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { icon: <LayoutDashboard />, label: 'لوحة التحكم', path: '/dashboard' },
    { icon: <Users />, label: 'إدارة المستخدمين', path: '/admin/users' },
    { icon: <ClipboardList />, label: 'إدارة المعاملات', path: '/admin/transactions' },
    { icon: <ShieldCheck />, label: 'مراجعة KYC', path: '/admin/kyc' },
    { icon: <Globe />, label: 'إدارة التجار', path: '/admin/merchants' },
    { icon: <Percent />, label: 'إدارة الرسوم', path: '/admin/fees' },
    { icon: <FileText />, label: 'سجل النشاط', path: '/admin/logs' },
    { icon: <User />, label: 'الملف الشخصي', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-light flex font-sans" dir="rtl">
      
      {/* --- Sidebar --- */}
      <aside className={`bg-primary text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col shadow-2xl relative`}>
        {/* Logo Section */}
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="bg-secondary p-2 rounded-lg shrink-0">
            <Wallet className="text-primary w-6 h-6" />
          </div>
          {isSidebarOpen && <span className="text-xl font-bold tracking-tight">SmartWallet</span>}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all group"
            >
              <div className="text-secondary group-hover:scale-110 transition-transform">{item.icon}</div>
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User Mini-Profile & Logout */}
        <div className="p-4 border-t border-white/10 bg-primary/50">
          <div className={`flex items-center gap-3 p-2 ${!isSidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-bold">م</div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">مؤيد العاصي</p>
                <p className="text-xs text-blue-200 truncate">عميل موثق</p>
              </div>
            )}
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="w-full mt-4 flex items-center gap-4 p-3 rounded-xl bg-red-500/20 text-red-200 hover:bg-red-500 hover:text-white transition-all"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="font-medium">تسجيل الخروج</span>}
          </button>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -left-3 top-20 bg-white text-primary rounded-full p-1 shadow-md border border-gray-200 hover:scale-110 transition"
        >
          {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-20 bg-white shadow-sm px-8 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-primary">مرحباً بك في لوحة التحكم</h2>
            <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> حساب موثق
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Notifications */}
            <div className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-full transition">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">3</span>
            </div>
            {/* Profile Link */}
            <Link to="/profile" className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-full transition">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">م</div>
              <span className="text-sm font-medium text-gray-700">حسابي</span>
            </Link>
          </div>
        </header>

        {/* Page Content (Dynamic) */}
        <main className="flex-1 overflow-y-auto p-8 bg-light">
          <div className="max-w-7xl mx-auto">
            {/* هنا سيتم عرض الصفحات المختلفة مثل Dashboard, Wallet... إلخ */}
            <Outlet /> 
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
