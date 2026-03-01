import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle, Crown, Zap, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const FREE_FEATURES = [
  '2 project generations per month',
  'All project sections included',
  'Online project viewer',
  'All streams & domains',
  'History of past projects',
  'System architecture included'
];

const PREMIUM_FEATURES = [
  'Unlimited project generations',
  'PDF Project Report download',
  'PPT Outline PDF download',
  'System Architecture & Flow Diagrams',
  'All streams, domains & technologies',
  'Priority support',
  'Early access to new features',
  'All Free plan features'
];

const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Pricing() {
  const { user, api, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const isPremium = user?.plan === 'premium';

  const handleUpgrade = async () => {
    if (!user) { navigate('/register'); return; }
    if (isPremium) { toast.success('You\'re already on Premium! 🎉'); return; }

    const loaded = await loadRazorpay();
    if (!loaded) { toast.error('Payment gateway failed to load. Please try again.'); return; }

    setLoading(true);
    try {
      const { data } = await api.post('/payment/create-order');

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: 'ProjectGen',
        description: 'Premium Plan – Unlimited FYP Generation',
        image: 'https://projectgen.in/logo.png',
        handler: async (response) => {
          try {
            await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            await refreshUser();
            toast.success('🎉 Payment successful! Welcome to Premium!');
            navigate('/dashboard');
          } catch {
            toast.error('Payment verification failed. Contact support if amount was deducted.');
          }
        },
        prefill: {
          name: user.name,
          email: user.email
        },
        theme: { color: '#2563EB' },
        modal: { ondismiss: () => setLoading(false) }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (res) => {
        toast.error(`Payment failed: ${res.error.description}`);
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      toast.error('Could not initiate payment. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <div className="hero-gradient text-white py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Simple, Student-Friendly Pricing</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">Start for free. Upgrade once for lifetime access to all premium features.</p>
        </div>

        {/* Cards */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Free */}
            <div className="card border-2 border-slate-200">
              <div className="badge-free mb-4 inline-block">Free Plan</div>
              <div className="text-5xl font-black text-slate-900 mb-2">₹0</div>
              <p className="text-slate-500 text-sm mb-6">Perfect for students exploring ProjectGen</p>
              <ul className="space-y-3 mb-8">
                {FREE_FEATURES.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              {!user ? (
                <a href="/register" className="btn-secondary w-full text-center block">Get Started Free</a>
              ) : !isPremium ? (
                <div className="btn-secondary w-full text-center cursor-default opacity-70">Current Plan</div>
              ) : null}
            </div>

            {/* Premium */}
            <div className="card border-2 border-blue-600 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl flex items-center gap-1">
                <Star className="w-3.5 h-3.5" /> BEST VALUE
              </div>
              <div className="badge-premium mb-4 inline-block"><Crown className="w-3 h-3 inline mr-1" />Premium Plan</div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-black text-slate-900">₹499</span>
                <span className="text-slate-500 text-sm mb-2">one-time payment</span>
              </div>
              <p className="text-slate-500 text-sm mb-6">Everything you need to ace your final year project</p>
              <ul className="space-y-3 mb-8">
                {PREMIUM_FEATURES.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>

              {isPremium ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="text-green-700 font-semibold text-sm">You're already on Premium! 🎉</p>
                </div>
              ) : (
                <button onClick={handleUpgrade} disabled={loading} className="btn-primary w-full py-3.5 text-base flex items-center justify-center gap-2">
                  {loading
                    ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                    : <><Crown className="w-5 h-5" /> {user ? 'Upgrade to Premium' : 'Get Premium Access'}</>}
                </button>
              )}

              <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
                <Zap className="w-3 h-3" /> Secured by Razorpay · One-time payment · Instant activation
              </p>
            </div>
          </div>

          {/* Compare Table */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Feature Comparison</h2>
            <div className="card overflow-hidden p-0">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-slate-600 font-semibold">Feature</th>
                    <th className="text-center px-6 py-4 text-slate-600 font-semibold">Free</th>
                    <th className="text-center px-6 py-4 text-blue-600 font-semibold">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['Monthly Generations', '2', 'Unlimited'],
                    ['Project Title & Abstract', '✓', '✓'],
                    ['Problem Statement & Objectives', '✓', '✓'],
                    ['System Modules', '✓', '✓'],
                    ['Technology Stack', '✓', '✓'],
                    ['Methodology & Architecture', '✓', '✓'],
                    ['PDF Report Download', '✗', '✓'],
                    ['PPT Outline Download', '✗', '✓'],
                    ['Priority Support', '✗', '✓']
                  ].map(([feature, free, premium], i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-6 py-3.5 text-slate-700">{feature}</td>
                      <td className="px-6 py-3.5 text-center">{free === '✓' ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : free === '✗' ? <span className="text-slate-300">✗</span> : <span className="font-medium text-slate-600">{free}</span>}</td>
                      <td className="px-6 py-3.5 text-center">{premium === '✓' ? <CheckCircle className="w-5 h-5 text-blue-600 mx-auto" /> : <span className="font-semibold text-blue-600">{premium}</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ mini */}
          <div className="mt-12 bg-blue-50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Have Questions?</h3>
            <p className="text-slate-500 text-sm mb-4">Check our FAQ section on the home page or email us.</p>
            <a href="mailto:support@projectgen.in" className="text-blue-600 font-semibold text-sm hover:underline">support@projectgen.in</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
