import React, { useState } from 'react';
import {
  Zap, Droplets, Phone, Wifi, Tv, Car,
  CheckCircle, AlertCircle, X, ChevronLeft,
  Search, Receipt, Info, Clock
} from 'lucide-react';

// =============================================
// بيانات وهمية
// =============================================
const dummyWalletBalance = 1250000;

const providers = [
  { id: 'electricity', name: 'الكهرباء',     icon: Zap,      color: 'bg-yellow-100 text-yellow-600', border: 'border-yellow-200' },
  { id: 'water',       name: 'المياه',        icon: Droplets, color: 'bg-blue-100 text-blue-600',    border: 'border-blue-200' },
  { id: 'phone',       name: 'الهاتف',        icon: Phone,    color: 'bg-green-100 text-green-600',  border: 'border-green-200' },
  { id: 'internet',    name: 'الإنترنت',      icon: Wifi,     color: 'bg-purple-100 text-purple-600',border: 'border-purple-200' },
  { id: 'tv',          name: 'الاشتراك التلفزيوني', icon: Tv, color: 'bg-red-100 text-red-600',     border: 'border-red-200' },
  { id: 'car',         name: 'ترخيص السيارة', icon: Car,      color: 'bg-orange-100 text-orange-600',border: 'border-orange-200' },
];

// محاكاة البيانات المسترجعة من الـ API
const fakeBillData = {
  electricity: { provider_name: 'شركة الكهرباء السورية', customer_name: 'دلير معمو', amount: 45000,  due_date: '2025-06-30', status: 'unpaid' },
  water:       { provider_name: 'مؤسسة المياه',           customer_name: 'دلير معمو', amount: 18500,  due_date: '2025-06-25', status: 'unpaid' },
  phone:       { provider_name: 'سيريتل',                 customer_name: 'دلير معمو', amount: 32000,  due_date: '2025-07-01', status: 'unpaid' },
  internet:    { provider_name: 'STE Internet',            customer_name: 'دلير معمو', amount: 55000,  due_date: '2025-06-28', status: 'unpaid' },
  tv:          { provider_name: 'الفضائية السورية',        customer_name: 'دلير معمو', amount: 25000,  due_date: '2025-07-05', status: 'unpaid' },
  car:         { provider_name: 'إدارة السير',             customer_name: 'دلير معمو', amount: 120000, due_date: '2025-08-01', status: 'unpaid' },
};

const formatAmount = (n) => n.toLocaleString('ar-SY');
const formatDate = (s) => new Date(s).toLocaleDateString('ar-SY', { year: 'numeric', month: 'long', day: 'numeric' });

// =============================================
// مكوّن تأكيد الدفع (Modal)
// =============================================
const ConfirmModal = ({ open, onClose, onConfirm, bill, provider, fee }) => {
  if (!open) return null;
  const total = bill.amount + fee;
  const insufficient = total > dummyWalletBalance;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="bg-gradient-to-br from-primary to-blue-800 p-6 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">تأكيد دفع الفاتورة</h3>
            <button onClick={onClose} className="hover:bg-white/20 p-1.5 rounded-full transition">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-1">راجع التفاصيل قبل الدفع</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">مزود الخدمة</span>
              <span className="font-bold text-gray-800">{bill.provider_name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">اسم المشترك</span>
              <span className="font-bold text-gray-800">{bill.customer_name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">مبلغ الفاتورة</span>
              <span className="font-bold text-gray-800">{formatAmount(bill.amount)} ل.س</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">رسوم الخدمة</span>
              <span className="font-bold text-red-500">{fee === 0 ? 'مجاني' : formatAmount(fee) + ' ل.س'}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between">
              <span className="font-bold text-gray-700">الإجمالي</span>
              <span className={"font-bold text-lg " + (insufficient ? 'text-red-500' : 'text-primary')}>
                {formatAmount(total)} ل.س
              </span>
            </div>
          </div>

          {insufficient && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-2xl p-3">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-xs text-red-600 font-medium">رصيدك غير كافٍ لإتمام هذه العملية</p>
            </div>
          )}

          <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-2xl p-3">
            <Info className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-700">بعد التأكيد ستُخصم المبلغ من محفظتك فوراً ولا يمكن التراجع.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={onClose} className="py-3 rounded-2xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition">
              إلغاء
            </button>
            <button
              onClick={onConfirm}
              disabled={insufficient}
              className="py-3 rounded-2xl bg-primary disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-sm hover:bg-blue-800 transition"
            >
              ادفع الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================
// مكوّن نجاح الدفع
// =============================================
const SuccessModal = ({ open, onClose, bill }) => {
  if (!open || !bill) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm mx-4 p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">تم الدفع بنجاح!</h3>
        <p className="text-gray-500 text-sm">
          تم دفع فاتورة <span className="font-bold text-primary">{bill.provider_name}</span> بمبلغ{' '}
          <span className="font-bold text-primary">{formatAmount(bill.amount)} ل.س</span>
        </p>
        <div className="bg-gray-50 rounded-2xl p-3 text-xs text-gray-500">
          رقم المرجع: TXN-{Date.now().toString().slice(-8)}
        </div>
        <button onClick={onClose} className="w-full py-3 bg-primary text-white rounded-2xl font-semibold hover:bg-blue-800 transition">
          حسناً
        </button>
      </div>
    </div>
  );
};

// =============================================
// الصفحة الرئيسية
// =============================================
const BillPaymentPage = () => {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [billRef, setBillRef] = useState('');
  const [step, setStep] = useState(1); // 1: اختيار المزود، 2: إدخال رقم الفاتورة، 3: عرض التفاصيل
  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paidBill, setPaidBill] = useState(null);

  const fee = 0; // دفع الفواتير مجاني حسب fee_rules

  const handleSelectProvider = (provider) => {
    setSelectedProvider(provider);
    setStep(2);
    setBillRef('');
    setBillData(null);
  };

  const handleVerify = () => {
    if (!billRef.trim()) return;
    setLoading(true);
    // محاكاة API call
    setTimeout(() => {
      const data = fakeBillData[selectedProvider.id];
      setBillData(data);
      setStep(3);
      setLoading(false);
    }, 1000);
  };

  const handleConfirmPay = () => {
    setShowConfirm(false);
    setPaidBill(billData);
    setShowSuccess(true);
  };

  const handleReset = () => {
    setSelectedProvider(null);
    setBillRef('');
    setBillData(null);
    setStep(1);
    setShowSuccess(false);
    setPaidBill(null);
  };

  const isOverdue = billData && new Date(billData.due_date) < new Date();

  return (
    <div className="space-y-6" dir="rtl">

      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmPay}
        bill={billData || {}}
        provider={selectedProvider}
        fee={fee}
      />
      <SuccessModal open={showSuccess} onClose={handleReset} bill={paidBill} />

      {/* العنوان */}
      <div>
        <h1 className="text-2xl font-bold text-primary">دفع الفواتير</h1>
        <p className="text-sm text-gray-500 mt-0.5">ادفع فواتيرك بسرعة وأمان</p>
      </div>

      {/* مؤشر الخطوات */}
      <div className="flex items-center gap-2">
        {['اختيار الخدمة', 'رقم الفاتورة', 'تأكيد الدفع'].map((label, i) => (
          <React.Fragment key={i}>
            <div className="flex items-center gap-2">
              <div className={"w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all " +
                (step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400')}>
                {step > i + 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              <span className={"text-xs font-medium hidden sm:block " + (step === i + 1 ? 'text-primary' : 'text-gray-400')}>
                {label}
              </span>
            </div>
            {i < 2 && <div className={"flex-1 h-0.5 rounded " + (step > i + 1 ? 'bg-green-400' : 'bg-gray-200')} />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* المحتوى الرئيسي */}
        <div className="lg:col-span-2 space-y-4">

          {/* الخطوة 1: اختيار المزود */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-bold text-gray-800 mb-4">اختر نوع الخدمة</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {providers.map((p) => {
                const Icon = p.icon;
                const isSelected = selectedProvider?.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProvider(p)}
                    className={"flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all hover:scale-105 active:scale-95 " +
                      (isSelected ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-100 hover:border-gray-200')}
                  >
                    <div className={"w-12 h-12 rounded-2xl flex items-center justify-center " + p.color}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={"text-sm font-semibold " + (isSelected ? 'text-primary' : 'text-gray-700')}>
                      {p.name}
                    </span>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* الخطوة 2: إدخال رقم الفاتورة */}
          {step >= 2 && selectedProvider && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-800">
                  أدخل رقم فاتورة {selectedProvider.name}
                </h2>
                <button
                  onClick={() => { setStep(1); setSelectedProvider(null); setBillData(null); }}
                  className="text-xs text-gray-400 hover:text-primary flex items-center gap-1"
                >
                  تغيير <ChevronLeft className="w-3 h-3" />
                </button>
              </div>

              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={billRef}
                  onChange={(e) => setBillRef(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                  placeholder="أدخل رقم المشترك أو رقم الفاتورة..."
                  className="w-full pr-10 pl-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-gray-800 transition"
                  dir="ltr"
                />
              </div>

              <button
                onClick={handleVerify}
                disabled={!billRef.trim() || loading}
                className="w-full py-3 bg-primary disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold rounded-2xl hover:bg-blue-800 transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    جارٍ التحقق...
                  </>
                ) : (
                  'تحقق من الفاتورة'
                )}
              </button>
            </div>
          )}

          {/* الخطوة 3: تفاصيل الفاتورة */}
          {step === 3 && billData && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h2 className="text-base font-bold text-gray-800">تفاصيل الفاتورة</h2>

              <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">مزود الخدمة</span>
                  <span className="font-bold text-gray-800">{billData.provider_name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">اسم المشترك</span>
                  <span className="font-bold text-gray-800">{billData.customer_name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">رقم الفاتورة</span>
                  <span className="font-bold text-gray-800" dir="ltr">{billRef}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">تاريخ الاستحقاق</span>
                  <span className={"font-bold " + (isOverdue ? 'text-red-500' : 'text-gray-800')}>
                    {formatDate(billData.due_date)}
                    {isOverdue && ' (متأخرة)'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">رسوم الخدمة</span>
                  <span className="font-bold text-green-600">مجاني</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-bold text-gray-700">المبلغ الإجمالي</span>
                  <span className="font-bold text-primary text-xl">{formatAmount(billData.amount)} ل.س</span>
                </div>
              </div>

              {isOverdue && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-2xl p-3">
                  <Clock className="w-4 h-4 text-red-500 shrink-0" />
                  <p className="text-xs text-red-600 font-medium">هذه الفاتورة متأخرة! يُرجى الدفع فوراً لتجنب الغرامات.</p>
                </div>
              )}

              <button
                onClick={() => setShowConfirm(true)}
                className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl transition text-lg"
              >
                ادفع {formatAmount(billData.amount)} ل.س
              </button>
            </div>
          )}
        </div>

        {/* الشريط الجانبي */}
        <div className="space-y-4">
          {/* الرصيد */}
          <div className="bg-gradient-to-br from-primary to-blue-800 rounded-3xl p-5 text-white">
            <p className="text-blue-200 text-xs mb-1">رصيدك المتاح</p>
            <p className="text-2xl font-bold">{formatAmount(dummyWalletBalance)}</p>
            <p className="text-blue-200 text-sm">ل.س</p>
          </div>

          {/* معلومات */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-3">
            <h3 className="text-sm font-bold text-gray-700">معلومات مهمة</h3>
            {[
              'دفع الفواتير مجاني تماماً بدون رسوم',
              'تُعالج العملية فوراً وتصل للجهة خلال دقائق',
              'احتفظ برقم المرجع كإثبات للدفع',
            ].map((info, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500">{info}</p>
              </div>
            ))}
          </div>

          {/* الخدمات المتاحة */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-gray-700 mb-3">الخدمات المتاحة</h3>
            <div className="space-y-2">
              {providers.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.id} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className={"w-7 h-7 rounded-lg flex items-center justify-center " + p.color}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    {p.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillPaymentPage;
