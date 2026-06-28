import React, { useState } from 'react';
import {
  Link2, Save, Send, CheckCircle, XCircle,
  AlertCircle, Clock, Info, RefreshCw, X,
  Shield, Zap, Globe
} from 'lucide-react';

// =============================================
// بيانات وهمية
// =============================================
const dummyMerchant = {
  webhook_url: 'https://mystore.com/webhooks/smartwallet',
  last_delivery_status: 'success',
  last_delivery_at: '2025-06-01T10:30:00',
  last_delivery_response: 200,
};

const dummyDeliveryLogs = [
  { id: '1', event: 'payment.completed', status: 'success', response_code: 200, created_at: '2025-06-01T10:30:00' },
  { id: '2', event: 'payment.pending',   status: 'success', response_code: 200, created_at: '2025-05-31T18:00:00' },
  { id: '3', event: 'payment.completed', status: 'failed',  response_code: 500, created_at: '2025-05-31T14:30:00' },
  { id: '4', event: 'payment.completed', status: 'success', response_code: 200, created_at: '2025-05-30T11:00:00' },
  { id: '5', event: 'payment.failed',    status: 'failed',  response_code: 404, created_at: '2025-05-30T08:45:00' },
];

const formatDate = (s) => new Date(s).toLocaleDateString('ar-SY', { month: 'short', day: 'numeric' });
const formatTime = (s) => new Date(s).toLocaleTimeString('ar-SY', { hour: '2-digit', minute: '2-digit' });

const isValidUrl = (url) => {
  try { return url.startsWith('https://'); }
  catch { return false; }
};

const WebhookSettings = () => {
  const [webhookUrl, setWebhookUrl] = useState(dummyMerchant.webhook_url);
  const [savedUrl, setSavedUrl] = useState(dummyMerchant.webhook_url);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [lastStatus, setLastStatus] = useState(dummyMerchant.last_delivery_status);

  const isDirty = webhookUrl !== savedUrl;
  const urlValid = isValidUrl(webhookUrl);

  const handleSave = () => {
    if (!urlValid) return;
    setSaving(true);
    setTimeout(() => {
      setSavedUrl(webhookUrl);
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  const handleTest = () => {
    if (!savedUrl) return;
    setTesting(true);
    setTestResult(null);
    setTimeout(() => {
      const success = Math.random() > 0.3;
      setTestResult(success ? 'success' : 'failed');
      setLastStatus(success ? 'success' : 'failed');
      setTesting(false);
    }, 1500);
  };

  return (
    <div className="space-y-6" dir="rtl">

      {/* العنوان */}
      <div>
        <h1 className="text-2xl font-bold text-primary">إعدادات Webhook</h1>
        <p className="text-sm text-gray-500 mt-0.5">استقبل إشعارات المدفوعات فور حدوثها</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* المحتوى الرئيسي */}
        <div className="lg:col-span-2 space-y-4">

          {/* حقل الـ URL */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <Link2 className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-base font-bold text-gray-800">رابط الـ Webhook</h2>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">عنوان URL</label>
              <div className="relative">
                <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => { setWebhookUrl(e.target.value); setTestResult(null); }}
                  placeholder="https://yoursite.com/webhooks/smartwallet"
                  className={"w-full pr-10 pl-4 py-3 rounded-2xl border focus:ring-2 outline-none text-sm transition " +
                    (webhookUrl && !urlValid
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-gray-200 focus:border-primary focus:ring-primary/20')}
                  dir="ltr"
                />
              </div>
              {webhookUrl && !urlValid && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> يجب أن يبدأ الرابط بـ https://
                </p>
              )}
            </div>

            {/* آخر حالة تسليم */}
            <div className={"flex items-center gap-3 p-3 rounded-2xl border " +
              (lastStatus === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200')}>
              {lastStatus === 'success'
                ? <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                : <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
              <div>
                <p className={"text-sm font-semibold " + (lastStatus === 'success' ? 'text-green-700' : 'text-red-600')}>
                  {lastStatus === 'success' ? 'آخر تسليم ناجح' : 'آخر تسليم فشل'}
                </p>
                <p className="text-xs text-gray-400">
                  {formatDate(dummyMerchant.last_delivery_at)} — {formatTime(dummyMerchant.last_delivery_at)} — كود: {dummyMerchant.last_delivery_response}
                </p>
              </div>
            </div>

            {/* نتيجة الاختبار */}
            {testResult && (
              <div className={"flex items-center gap-3 p-3 rounded-2xl border " +
                (testResult === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200')}>
                {testResult === 'success'
                  ? <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                  : <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                <p className={"text-sm font-semibold " + (testResult === 'success' ? 'text-green-700' : 'text-red-600')}>
                  {testResult === 'success' ? '✅ الاختبار نجح! الخادم يستجيب بشكل صحيح.' : '❌ الاختبار فشل! تحقق من الرابط وإعدادات خادمك.'}
                </p>
              </div>
            )}

            {/* الأزرار */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={!urlValid || !isDirty || saving}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold rounded-2xl hover:bg-blue-800 transition"
              >
                {saving ? (
                  <><RefreshCw className="w-4 h-4 animate-spin" /> جارٍ الحفظ...</>
                ) : saved ? (
                  <><CheckCircle className="w-4 h-4" /> تم الحفظ!</>
                ) : (
                  <><Save className="w-4 h-4" /> حفظ الرابط</>
                )}
              </button>
              <button
                onClick={handleTest}
                disabled={!savedUrl || testing || isDirty}
                className="flex items-center justify-center gap-2 px-5 py-3 border-2 border-primary text-primary disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed font-bold rounded-2xl hover:bg-primary hover:text-white transition"
              >
                {testing ? (
                  <><RefreshCw className="w-4 h-4 animate-spin" /> اختبار...</>
                ) : (
                  <><Send className="w-4 h-4" /> اختبار</>
                )}
              </button>
            </div>

            {isDirty && (
              <p className="text-xs text-yellow-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> احفظ الرابط أولاً لتتمكن من الاختبار
              </p>
            )}
          </div>

          {/* سجل التسليمات */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-50">
              <h2 className="text-base font-bold text-gray-800">سجل آخر التسليمات</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {dummyDeliveryLogs.map((log) => (
                <div key={log.id} className="flex items-center gap-4 px-6 py-4">
                  {log.status === 'success'
                    ? <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    : <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-700" dir="ltr">{log.event}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(log.created_at)} — {formatTime(log.created_at)}</p>
                  </div>
                  <span className={"text-xs font-bold px-2.5 py-1 rounded-xl " +
                    (log.response_code === 200 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600')}>
                    {log.response_code}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* الشريط الجانبي */}
        <div className="space-y-4">

          {/* كيف يعمل */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-secondary" />
              <h3 className="text-sm font-bold text-gray-700">كيف يعمل؟</h3>
            </div>
            {[
              { step: '1', text: 'عميل يدفع عبر SmartWallet API' },
              { step: '2', text: 'نرسل POST request لرابطك فوراً' },
              { step: '3', text: 'خادمك يستقبل بيانات الدفع' },
              { step: '4', text: 'تُحدّث طلبك تلقائياً' },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {item.step}
                </div>
                <p className="text-xs text-gray-500">{item.text}</p>
              </div>
            ))}
          </div>

          {/* مثال Payload */}
          <div className="bg-gray-900 rounded-3xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-gray-400">مثال على الـ Payload</h3>
            <pre className="text-xs text-green-400 leading-relaxed overflow-x-auto" dir="ltr">
{`{
  "event": "payment.completed",
  "reference": "TXN-001",
  "amount": 75000,
  "currency": "SYP",
  "status": "completed",
  "timestamp": "2025-06-01T10:30:00Z"
}`}
            </pre>
          </div>

          {/* نصائح */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-gray-700">نصائح</h3>
            </div>
            {[
              'استخدم HTTPS فقط لحماية البيانات',
              'يجب أن يرد خادمك بكود 200 خلال 5 ثواني',
              'نُعيد المحاولة 3 مرات عند الفشل',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebhookSettings;
