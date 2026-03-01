import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Zap, ChevronRight, ChevronLeft, Sparkles, GraduationCap, Code2, BarChart3, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const OPTIONS = {
  streams: ['BCA', 'MCA', 'BTech', 'MBA', 'BSc', 'MSc', 'BMS', 'Other'],
  domains: [
    'Web Development', 'AI & ML', 'Data Science', 'IoT',
    'Cybersecurity', 'Mobile App', 'Cloud Computing', 'Blockchain', 'Other'
  ],
  technologies: {
    'Web Development': ['MERN', 'Python', 'Java', 'PHP', 'ASP.NET', 'Vue.js', 'Angular'],
    'AI & ML': ['Python', 'ML', 'TensorFlow', 'PyTorch', 'Scikit-learn'],
    'Data Science': ['Python', 'R', 'Power BI', 'Tableau', 'Spark'],
    'IoT': ['Python', 'Arduino', 'Raspberry Pi', 'NodeMCU', 'MQTT'],
    'Cybersecurity': ['Python', 'Kali Linux', 'Metasploit', 'Wireshark'],
    'Mobile App': ['MERN', 'React Native', 'Flutter', 'Android (Java)', 'iOS (Swift)'],
    'Cloud Computing': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'],
    'Blockchain': ['MERN', 'Solidity', 'Ethereum', 'Hyperledger'],
    'Other': ['MERN', 'Python', 'Java', 'PHP', 'Other']
  },
  difficulties: ['Beginner', 'Intermediate', 'Advanced']
};

const STEP_ICONS = [<GraduationCap className="w-6 h-6" />, <Code2 className="w-6 h-6" />, <BarChart3 className="w-6 h-6" />];
const STEP_LABELS = ['Your Stream & Domain', 'Technology & Difficulty', 'Review & Generate'];

export default function Generator() {
  const { user, api, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [form, setForm] = useState({ stream: '', domain: '', technology: '', difficulty: '' });

  const isPremium = user?.plan === 'premium';
  const FREE_LIMIT = 2;
  const usageLeft = FREE_LIMIT - (user?.usageCount || 0);
  const limitReached = !isPremium && usageLeft <= 0;

  const techOptions = form.domain ? (OPTIONS.technologies[form.domain] || OPTIONS.technologies['Other']) : [];

  const canNext = (step === 1 && form.stream && form.domain) ||
                  (step === 2 && form.technology && form.difficulty);

  const handleGenerate = async () => {
    if (limitReached) {
      navigate('/pricing');
      return;
    }
    setGenerating(true);
    try {
      const { data } = await api.post('/projects/generate', {
        stream: form.stream,
        domain: form.domain,
        technology: form.technology,
        difficulty: form.difficulty
      });
      await refreshUser();
      toast.success('🎉 Project generated successfully!');
      navigate(`/projects/${data.project._id}`);
    } catch (err) {
      if (err.response?.data?.limitReached) {
        toast.error('Free plan limit reached. Upgrade to Premium!');
        navigate('/pricing');
      } else {
        toast.error(err.response?.data?.message || 'Generation failed.');
      }
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-10">

        {/* Usage Warning */}
        {!isPremium && usageLeft <= 1 && usageLeft > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
            ⚠️ You have <strong>{usageLeft}</strong> free generation{usageLeft === 1 ? '' : 's'} left this month.{' '}
            <a href="/pricing" className="font-semibold underline">Upgrade to Premium</a> for unlimited access.
          </div>
        )}
        {limitReached && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-800">
            <Lock className="w-4 h-4 inline mr-1" />
            <strong>Free plan limit reached.</strong> Upgrade to Premium (₹499) for unlimited generations + PDF & PPT downloads.{' '}
            <a href="/pricing" className="font-semibold underline">Upgrade Now →</a>
          </div>
        )}

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                step >= s ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-200 text-slate-500'
              }`}>{s}</div>
              {s < 3 && <div className={`w-10 h-0.5 ${step > s ? 'bg-blue-600' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>

        <div className="card animate-fade-in">
          {/* Step Header */}
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
            <div className="w-11 h-11 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              {STEP_ICONS[step - 1]}
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Step {step} of 3</p>
              <h2 className="font-bold text-slate-900 text-lg">{STEP_LABELS[step - 1]}</h2>
            </div>
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-5 animate-slide-up">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Select Your Stream</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {OPTIONS.streams.map(s => (
                    <button key={s} onClick={() => setForm({ ...form, stream: s })}
                      className={`py-2.5 px-3 rounded-lg text-sm font-medium border-2 transition-all ${
                        form.stream === s ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}>{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Select Domain</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {OPTIONS.domains.map(d => (
                    <button key={d} onClick={() => setForm({ ...form, domain: d, technology: '' })}
                      className={`py-2.5 px-4 rounded-lg text-sm font-medium border-2 transition-all text-left ${
                        form.domain === d ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}>{d}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-5 animate-slide-up">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Select Technology</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {techOptions.map(t => (
                    <button key={t} onClick={() => setForm({ ...form, technology: t })}
                      className={`py-2.5 px-3 rounded-lg text-sm font-medium border-2 transition-all ${
                        form.technology === t ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Select Difficulty Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {OPTIONS.difficulties.map((d, i) => (
                    <button key={d} onClick={() => setForm({ ...form, difficulty: d })}
                      className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all flex flex-col items-center gap-1 ${
                        form.difficulty === d ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}>
                      <span className="text-lg">{['🌱', '⚡', '🔥'][i]}</span>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Review */}
          {step === 3 && (
            <div className="animate-slide-up">
              <div className="bg-slate-50 rounded-xl p-5 mb-6 space-y-3">
                <h3 className="font-semibold text-slate-700 text-sm mb-3">Your Selection Summary</h3>
                {[
                  { label: 'Stream', value: form.stream },
                  { label: 'Domain', value: form.domain },
                  { label: 'Technology', value: form.technology },
                  { label: 'Difficulty', value: form.difficulty }
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-semibold text-slate-900 bg-white border border-slate-200 px-3 py-1 rounded-lg">{value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700 mb-6">
                <Sparkles className="w-4 h-4 inline mr-1" />
                <strong>What you'll get:</strong> Project title, abstract, problem statement, objectives, system modules, technology stack, methodology, architecture, future scope, and conclusion.
              </div>

              {limitReached ? (
                <a href="/pricing" className="btn-primary w-full text-center block py-3.5 text-base">
                  <Lock className="w-5 h-5 inline mr-2" /> Upgrade to Generate
                </a>
              ) : (
                <button onClick={handleGenerate} disabled={generating} className="btn-primary w-full py-3.5 text-base flex items-center justify-center gap-2">
                  {generating ? (
                    <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating your project...</>
                  ) : (
                    <><Zap className="w-5 h-5" /> Generate Project Kit</>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 3 && (
            <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-100">
              <button onClick={() => setStep(s => s - 1)} disabled={step === 1}
                className="btn-secondary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={() => setStep(s => s + 1)} disabled={!canNext}
                className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
          {step === 3 && (
            <button onClick={() => setStep(2)} className="btn-secondary flex items-center gap-2 mt-4">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
