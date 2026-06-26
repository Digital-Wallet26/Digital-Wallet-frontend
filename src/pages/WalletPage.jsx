import React, { useState } from 'react';
import {
  Download, Upload, ArrowLeftRight,
  CheckCircle, AlertCircle, X,
  ChevronDown, Wallet, Info
} from 'lucide-react';

// =============================================
// بيانات وهمية - تُستبدل لاحقاً بـ API
// =============================================
const dummyWallet = {
  id: 'wallet-001',
  balance: 1250000,
  currency: 'ل.س',
  currency_code: 'SYP',
  is_active: true,
};

const dummyFeeRules = {
  deposit:    { fixed_fee: 0,      percent_fee: 0,    min_fee: 0,    max_fee: null },
  withdrawal: { fixed_fee: 5000,   percent_fee: 0.01, min_fee: 5000, max_fee: 50000 },
  transfer:   { fixed_fee: 2000,   percent_fee: 0.005,min_fee: 2000, max_fee: 20000 },
};

// حساب الرسوم
const calcFee = (type, amount) => {
  const rule = dummyFeeRules[type];
  if (!rule) return 0;
  const pctFee = amount * rule.percent_fee;
  let fee = rule.fixed_fee + pctFee;
  fee = Math.max(fee, rule.min_fee);
  if (rule.max_fee !== null) fee = Math.min(fee, rule.max_fee);
  return Math.round(fee);
};

const formatAmount = (amount) => amount.toLocaleString('ar-SY');

// =============================================
// مكوّن تأكيد العملية (Modal)
// =============================================
const ConfirmModal = ({ open, onClose, onConfirm, type, amount, fee, recipient }) => {
  if (!open) return null;
  const net = amount - fee;
  const typeLabel = { deposit: 'إيداع', withdrawal: 'سحب', transfer: 'تحويل' }[type];
  const typeColor = { deposit: 'text-green-600', withdrawal: 'text-orange-500', transfer: 'text-blue-600' }[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="bg-gradient-to-br from-primary to-blue-800 p-6 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">تأكيد العملية</h3>
            <button onClick={onClose} className="hover:bg-white/20 p-1.5 rounded-full transition">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-1">راجع التفاصيل قبل التأكيد</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">نوع العملية</span>
              <span className={"font-bold " + typeColor}>{typeLabel}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">المبلغ</span>
              <span className="font-bold text-gray-800">{formatAmount(amount)} ل.س</span>
            </div>
            {type === 'transfer' && recipient && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">المستلم</span>
                <span className="font-bold text-gray-800">{recipient}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">الرسوم</span>
              <span className="font-bold text-red-500">{formatAmount(fee)} ل.س</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between">
              <span className="font-bold text-gray-700">صافي المبلغ</span>
              <span className="font-bold text-primary text-lg">{formatAmount(type === 'deposit' ? amount : net)} ل.س</span>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-2xl p-3">
            <Info className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-700">بعد التأكيد لا يمكن التراجع عن العملية. تأكد من صحة البيانات.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onClose}
              className="py-3 rounded-2xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition"
            >
              إلغاء
            </button>
            <button
              onClick={onConfirm}
              className="py-3 rounded-2xl bg-primary text-white font-semibold text-sm hover:bg-blue-800 transition"
            >
              تأكيد العملية
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================
// مكوّن رسالة النجاح
// =============================================
const SuccessMessage = ({ type, amount, onClose }) => {
  const typeLabel = { deposit: 'الإيداع', withdrawal: 'السحب', transfer: 'التحويل' }[type];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm mx-4 p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">تمت العملية بنجاح!</h3>
        <p className="text-gray-500 text-sm">
          تم {typeLabel} بمبلغ <span className="font-bold text-primary">{formatAmount(amount)} ل.س</span> بنجاح
        </p>
        <button
          onClick={onClose}
          className="w-full py-3 bg-primary text-white rounded-2xl font-semibold hover:bg-blue-800 transition"
        >
          حسناً
        </button>
      </div>
    </div>
  );
};

// =============================================
// نموذج الإيداع
// =============================================
const DepositForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bank');
  const numAmount = parseInt(amount.replace(/,/g, '')) || 0;
  const fee = calcFee('deposit', numAmount);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">طريقة الإيداع</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'bank',  label: 'تحويل بنكي' },
            { value: 'cash',  label: 'إيداع نقدي' },
          ].map((m) => (
            <button
              key={m.value}
              onClick={() => setMethod(m.value)}
              className={"py-3 rounded-2xl border-2 text-sm font-semibold transition " +
                (method === m.value ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-500 hover:border-gray-300')}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">المبلغ (ل.س)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="أدخل المبلغ..."
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-gray-800 font-semibold text-lg transition"
        />
      </div>

      {numAmount > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">المبلغ</span>
            <span className="font-bold">{formatAmount(numAmount)} ل.س</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">الرسوم</span>
            <span className="font-bold text-green-600">{fee === 0 ? 'مجاني' : formatAmount(fee) + ' ل.س'}</span>
          </div>
          <div className="border-t border-green-200 pt-2 flex justify-between">
            <span className="font-bold text-gray-700">ستستلم</span>
            <span className="font-bold text-green-700 text-lg">{formatAmount(numAmount)} ل.س</span>
          </div>
        </div>
      )}

      <button
        onClick={() => numAmount > 0 && onSubmit('deposit', numAmount, fee)}
        disabled={numAmount <= 0}
        className="w-full py-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition"
      >
        إيداع الآن
      </button>
    </div>
  );
};

// =============================================
// نموذج السحب
// =============================================
const WithdrawForm = ({ balance, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const numAmount = parseInt(amount.replace(/,/g, '')) || 0;
  const fee = calcFee('withdrawal', numAmount);
  const net = numAmount - fee;
  const insufficient = numAmount > balance;

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">المبلغ (ل.س)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="أدخل المبلغ..."
          className={"w-full px-4 py-3 rounded-2xl border focus:ring-2 outline-none text-gray-800 font-semibold text-lg transition " +
            (insufficient ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-primary focus:ring-primary/20')}
        />
        {insufficient && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> الرصيد غير كافٍ
          </p>
        )}
      </div>

      <div className="flex gap-2">
        {[100000, 250000, 500000].map((v) => (
          <button
            key={v}
            onClick={() => setAmount(String(v))}
            className="flex-1 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:border-primary hover:text-primary transition"
          >
            {formatAmount(v)}
          </button>
        ))}
      </div>

      {numAmount > 0 && !insufficient && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">المبلغ</span>
            <span className="font-bold">{formatAmount(numAmount)} ل.س</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">الرسوم</span>
            <span className="font-bold text-red-500">{formatAmount(fee)} ل.س</span>
          </div>
          <div className="border-t border-orange-200 pt-2 flex justify-between">
            <span className="font-bold text-gray-700">ستستلم</span>
            <span className="font-bold text-orange-700 text-lg">{formatAmount(net)} ل.س</span>
          </div>
        </div>
      )}

      <button
        onClick={() => numAmount > 0 && !insufficient && onSubmit('withdrawal', numAmount, fee)}
        disabled={numAmount <= 0 || insufficient}
        className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition"
      >
        سحب الآن
      </button>
    </div>
  );
};

// =============================================
// نموذج التحويل
// =============================================
const TransferForm = ({ balance, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [note, setNote] = useState('');
  const numAmount = parseInt(amount.replace(/,/g, '')) || 0;
  const fee = calcFee('transfer', numAmount);
  const total = numAmount + fee;
  const insufficient = total > balance;

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">رقم هاتف المستلم أو البريد الإلكتروني</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="09xxxxxxxx أو example@email.com"
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-gray-800 transition"
          dir="ltr"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">المبلغ (ل.س)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="أدخل المبلغ..."
          className={"w-full px-4 py-3 rounded-2xl border focus:ring-2 outline-none text-gray-800 font-semibold text-lg transition " +
            (insufficient ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-primary focus:ring-primary/20')}
        />
        {insufficient && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> الرصيد غير كافٍ (المبلغ + الرسوم = {formatAmount(total)} ل.س)
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">ملاحظة (اختياري)</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="سبب التحويل..."
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-gray-800 transition"
        />
      </div>

      {numAmount > 0 && recipient && !insufficient && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">المبلغ</span>
            <span className="font-bold">{formatAmount(numAmount)} ل.س</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">الرسوم</span>
            <span className="font-bold text-red-500">{formatAmount(fee)} ل.س</span>
          </div>
          <div className="border-t border-blue-200 pt-2 flex justify-between">
            <span className="font-bold text-gray-700">إجمالي الخصم</span>
            <span className="font-bold text-blue-700 text-lg">{formatAmount(total)} ل.س</span>
          </div>
        </div>
      )}

      <button
        onClick={() => numAmount > 0 && recipient && !insufficient && onSubmit('transfer', numAmount, fee, recipient)}
        disabled={numAmount <= 0 || !recipient || insufficient}
        className="w-full py-4 bg-primary hover:bg-blue-800 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition"
      >
        تحويل الآن
      </button>
    </div>
  );
};

// =============================================
// الصفحة الرئيسية
// =============================================
const WalletPage = () => {
  const [activeTab, setActiveTab] = useState('deposit');
  const [balance, setBalance] = useState(dummyWallet.balance);
  const [modal, setModal] = useState(null);
  const [success, setSuccess] = useState(null);

  const tabs = [
    { key: 'deposit',    label: 'إيداع',   icon: <Download className="w-4 h-4" />,        color: 'text-green-600',  activeBg: 'bg-green-500' },
    { key: 'withdrawal', label: 'سحب',      icon: <Upload className="w-4 h-4" />,           color: 'text-orange-500', activeBg: 'bg-orange-500' },
    { key: 'transfer',   label: 'تحويل',    icon: <ArrowLeftRight className="w-4 h-4" />,   color: 'text-blue-600',   activeBg: 'bg-primary' },
  ];

  const handleSubmit = (type, amount, fee, recipient) => {
    setModal({ type, amount, fee, recipient });
  };

  const handleConfirm = () => {
    const { type, amount, fee } = modal;
    if (type === 'deposit') setBalance((b) => b + amount);
    else if (type === 'withdrawal') setBalance((b) => b - (amount - fee) - fee);
    else if (type === 'transfer') setBalance((b) => b - amount - fee);
    setSuccess({ type, amount });
    setModal(null);
  };

  const handleSuccessClose = () => setSuccess(null);

  const UploadIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4" />
    </svg>
  );

  return (
    <div className="space-y-6" dir="rtl">

      {/* Modals */}
      {modal && (
        <ConfirmModal
          open={true}
          onClose={() => setModal(null)}
          onConfirm={handleConfirm}
          type={modal.type}
          amount={modal.amount}
          fee={modal.fee}
          recipient={modal.recipient}
        />
      )}
      {success && (
        <SuccessMessage
          type={success.type}
          amount={success.amount}
          onClose={handleSuccessClose}
        />
      )}

      {/* العنوان */}
      <div>
        <h1 className="text-2xl font-bold text-primary">المحفظة الرقمية</h1>
        <p className="text-sm text-gray-500 mt-0.5">أدِر رصيدك وعملياتك المالية</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* بطاقة الرصيد */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-primary via-blue-800 to-blue-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-10 -translate-y-10 pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-blue-200" />
                <p className="text-blue-200 text-sm font-medium">رصيدك الحالي</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{formatAmount(balance)}</p>
                <p className="text-blue-200 text-sm mt-1">{dummyWallet.currency} — {dummyWallet.currency_code}</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-3">
                <p className="text-xs text-blue-200 mb-1">حالة المحفظة</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-sm font-semibold">نشطة</span>
                </div>
              </div>
            </div>
          </div>

          {/* جدول الرسوم */}
          <div className="mt-4 bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-gray-700 mb-3">جدول الرسوم</h3>
            <div className="space-y-2">
              {[
                { label: 'إيداع',  fee: 'مجاني',          color: 'text-green-600' },
                { label: 'سحب',    fee: '1% (5,000 حد أدنى)', color: 'text-orange-500' },
                { label: 'تحويل',  fee: '0.5% (2,000 حد أدنى)', color: 'text-blue-600' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center text-sm py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500">{item.label}</span>
                  <span className={"font-semibold " + item.color}>{item.fee}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* نماذج العمليات */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

          {/* التبويبات */}
          <div className="flex border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={"flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all " +
                  (activeTab === tab.key
                    ? tab.activeBg + ' text-white'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50')}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* محتوى النموذج */}
          <div className="p-6">
            {activeTab === 'deposit'    && <DepositForm onSubmit={handleSubmit} />}
            {activeTab === 'withdrawal' && <WithdrawForm balance={balance} onSubmit={handleSubmit} />}
            {activeTab === 'transfer'   && <TransferForm balance={balance} onSubmit={handleSubmit} />}
          </div>
        </div>
      </div>
    </div>
  );
};



export default WalletPage;
