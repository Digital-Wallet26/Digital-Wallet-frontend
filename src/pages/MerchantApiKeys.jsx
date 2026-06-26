import React, { useState } from 'react';
import {
  Eye, EyeOff, Copy, RefreshCw, CheckCircle,
  AlertCircle, Shield, Key, Info, X
} from 'lucide-react';

// =============================================
// بيانات وهمية - تُستبدل بـ API
// =============================================
const dummyMerchant = {
  business_name: 'متجر دلير للإلكترونيات',
  client_id: 'cli_delir_2025_prod_x7k9m',
  client_secret_hash: 'sk_live_aB3xK9mP2qR7vL4nW8sY1cE6fH0jT5uD',
  status: 'active',
  webhook_url: 'https://mystore.com/webhooks/smartwallet',
};

// =============================================
// مكوّن تأكيد التجديد (Modal)
// =============================================
const RegenerateModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="bg-red-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">تجديد المفتاح السري</h3>
            <button onClick={onClose} className="hover:bg-white/20 p-1.5 rounded-full transition">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-4">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-red-700">تحذير مهم!</p>
              <p className="text-xs text-red-600">
                بعد التجديد سيتوقف المفتاح القديم فوراً. يجب تحديث جميع تطبيقاتك بالمفتاح الجديد.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={onClose} className="py-3 rounded-2xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition">
              إلغاء
            </button>
            <button onClick={onConfirm} className="py-3 rounded-2xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition">
              تجديد الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================
// مكوّن حقل المفتاح
// =============================================
const KeyField = ({ label, value, isSecret, onCopy, copied }) => {
  const [visible, setVisible] = useState(false);
  const display = isSecret && !visible ? '•'.repeat(32) : value;

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <Key className="w-4 h-4 text-primary" />
        {label}
      </label>
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl font-mono text-sm text-gray-700 overflow-hidden">
          <span className="flex-1 truncate" dir="ltr">{display}</span>
        </div>
        {isSecret && (
          <button
            onClick={() => setVisible(!visible)}
            className="p-3 rounded-2xl border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition"
            title={visible ? 'إخفاء' : 'إظهار'}
          >
            {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
        <button
          onClick={() => onCopy(value)}
          className={"p-3 rounded-2xl border transition " +
            (copied === value ? 'border-green-300 bg-green-50 text-green-600' : 'border-gray-200 text-gray-500 hover:border-primary hover:text-primary')}
          title="نسخ"
        >
          {copied === value ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

// =============================================
// الصفحة الرئيسية
// =============================================
const MerchantApiKeys = () => {
  const [merchant, setMerchant] = useState(dummyMerchant);
  const [showRegenerate, setShowRegenerate] = useState(false);
  const [copied, setCopied] = useState(null);
  const [regenerated, setRegenerated] = useState(false);

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleRegenerate = () => {
    // محاكاة توليد مفتاح جديد
    const newSecret = 'sk_live_' + Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6);
    setMerchant(prev => ({ ...prev, client_secret_hash: newSecret }));
    setShowRegenerate(false);
    setRegenerated(true);
    setTimeout(() => setRegenerated(false), 4000);
  };

  return (
    <div className="space-y-6" dir="rtl">

      <RegenerateModal
        open={showRegenerate}
        onClose={() => setShowRegenerate(false)}
        onConfirm={handleRegenerate}
      />

      {/* العنوان */}
      <div>
        <h1 className="text-2xl font-bold text-primary">مفاتيح API</h1>
        <p className="text-sm text-gray-500 mt-0.5">{merchant.business_name}</p>
      </div>

      {/* تنبيه التجديد */}
      {regenerated && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-4">
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
          <p className="text-sm text-green-700 font-medium">تم تجديد المفتاح السري بنجاح! لا تنسَ تحديث تطبيقاتك.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* بطاقة المفاتيح */}
        <div className="lg:col-span-2 space-y-4">

          {/* Client ID */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-800">بيانات الاعتماد</h2>
              <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                نشط
              </span>
            </div>

            <KeyField
              label="Client ID (معرف العميل)"
              value={merchant.client_id}
              isSecret={false}
              onCopy={handleCopy}
              copied={copied}
            />

            <KeyField
              label="Client Secret (المفتاح السري)"
              value={merchant.client_secret_hash}
              isSecret={true}
              onCopy={handleCopy}
              copied={copied}
            />

            <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-2xl p-3">
              <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-600">
                استخدم <strong>Client ID</strong> للتعريف العلني، و<strong>Client Secret</strong> للتوقيع على الطلبات. لا تشارك المفتاح السري مع أحد.
              </p>
            </div>
          </div>

          {/* تجديد المفتاح */}
          <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center">
                <RefreshCw className="w-4 h-4 text-red-500" />
              </div>
              <h2 className="text-base font-bold text-gray-800">تجديد المفتاح السري</h2>
            </div>

            <p className="text-sm text-gray-500">
              إذا كنت تشك في أن مفتاحك السري قد تعرّض للاختراق، جدّده فوراً. المفتاح القديم سيتوقف عن العمل فور التجديد.
            </p>

            <button
              onClick={() => setShowRegenerate(true)}
              className="flex items-center gap-2 px-5 py-3 bg-red-50 border border-red-200 text-red-600 font-semibold text-sm rounded-2xl hover:bg-red-500 hover:text-white hover:border-red-500 transition"
            >
              <RefreshCw className="w-4 h-4" />
              تجديد المفتاح السري
            </button>
          </div>

          {/* مثال الاستخدام */}
          <div className="bg-gray-900 rounded-3xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-gray-300">مثال على الاستخدام</h3>
            <pre className="text-xs text-green-400 overflow-x-auto leading-relaxed" dir="ltr">
{`POST /api/v1/payments
Authorization: Basic {base64(client_id:client_secret)}
Content-Type: application/json

{
  "amount": 50000,
  "currency": "SYP",
  "reference": "ORDER-001",
  "webhook_url": "${merchant.webhook_url}"
}`}
            </pre>
          </div>
        </div>

        {/* الشريط الجانبي */}
        <div className="space-y-4">

          {/* معلومات الأمان */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-bold text-gray-700">نصائح الأمان</h3>
            </div>
            {[
              'لا تضع المفتاح السري في كود Frontend أبداً',
              'استخدمه فقط في الخادم (Backend)',
              'جدّد المفتاح دورياً كل 90 يوماً',
              'راقب سجل العمليات لاكتشاف أي نشاط غير معتاد',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">{i + 1}</span>
                </div>
                <p className="text-xs text-gray-500">{tip}</p>
              </div>
            ))}
          </div>

          {/* إحصائيات سريعة */}
          <div className="bg-gradient-to-br from-primary to-blue-800 rounded-3xl p-5 text-white space-y-3">
            <h3 className="text-sm font-bold text-blue-200">إحصائيات API</h3>
            {[
              { label: 'طلبات اليوم',   value: '47' },
              { label: 'معدل النجاح',   value: '98.9%' },
              { label: 'آخر استخدام',   value: 'منذ 5 دقائق' },
            ].map((stat, i) => (
              <div key={i} className="flex justify-between items-center text-sm border-b border-white/10 pb-2 last:border-0 last:pb-0">
                <span className="text-blue-200">{stat.label}</span>
                <span className="font-bold">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantApiKeys;
