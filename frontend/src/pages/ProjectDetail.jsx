import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Download, Crown, CheckCircle, ChevronDown, ChevronUp, Lock, Printer } from 'lucide-react';
import toast from 'react-hot-toast';

const Section = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors">
        <h3 className="font-semibold text-slate-800">{title}</h3>
        {open ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>
      {open && <div className="px-5 pb-5 pt-2 border-t border-slate-100">{children}</div>}
    </div>
  );
};

export default function ProjectDetail() {
  const { id } = useParams();
  const { api, user } = useAuth();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pptLoading, setPptLoading] = useState(false);

  const isPremium = user?.plan === 'premium';

  useEffect(() => { fetchProject(); }, [id]);

  const fetchProject = async () => {
    try {
      const { data } = await api.get(`/projects/${id}`);
      setProject(data.project);
    } catch {
      toast.error('Project not found.');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (type) => {
    if (!isPremium) { navigate('/pricing'); return; }
    const setter = type === 'pdf' ? setPdfLoading : setPptLoading;
    setter(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/projects/${id}/download-${type}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project.title.replace(/[^a-z0-9]/gi, '_')}_${type === 'pdf' ? 'Report' : 'PPT_Outline'}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`${type.toUpperCase()} downloaded!`);
    } catch (err) {
      if (err.message?.includes('Premium')) { navigate('/pricing'); }
      else toast.error(err.message || 'Download failed.');
    } finally {
      setter(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );

  if (!project) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">

        {/* Back */}
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        {/* Project Header */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">{project.stream}</span>
                <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-full">{project.domain}</span>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">{project.technology}</span>
                <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-full">{project.difficulty}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">{project.title}</h1>
              <p className="text-slate-500 text-sm mt-2">Generated on {new Date(project.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            <div className="flex flex-col gap-2 min-w-max">
              {isPremium ? (
                <>
                  <button onClick={() => handleDownload('pdf')} disabled={pdfLoading} className="btn-primary flex items-center gap-2 text-sm py-2 px-4">
                    {pdfLoading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Download className="w-4 h-4" />}
                    Download PDF
                  </button>
                  <button onClick={() => handleDownload('ppt')} disabled={pptLoading} className="btn-outline flex items-center gap-2 text-sm py-2 px-4">
                    {pptLoading ? <span className="w-4 h-4 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" /> : <Printer className="w-4 h-4" />}
                    Download PPT
                  </button>
                </>
              ) : (
                <Link to="/pricing" className="btn-primary flex items-center gap-2 text-sm py-2 px-4 justify-center">
                  <Crown className="w-4 h-4" /> Upgrade for Downloads
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Premium Lock Banner */}
        {!isPremium && (
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-slate-700"><strong>Premium Feature:</strong> Download PDF report and PPT outline for this project.</p>
            </div>
            <Link to="/pricing" className="btn-primary text-sm py-2 px-4 whitespace-nowrap flex items-center gap-1.5">
              <Crown className="w-4 h-4" /> Upgrade ₹499
            </Link>
          </div>
        )}

        {/* Content Sections */}
        <div className="space-y-3">
          <Section title="📄 Abstract" defaultOpen>
            <p className="text-slate-600 text-sm leading-relaxed">{project.abstract}</p>
          </Section>

          <Section title="⚠️ Problem Statement" defaultOpen>
            <p className="text-slate-600 text-sm leading-relaxed">{project.problemStatement}</p>
          </Section>

          <Section title="🎯 Objectives" defaultOpen>
            <ul className="space-y-2">
              {project.objectives?.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> {obj}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="🧩 System Modules">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.modules?.map((mod, i) => (
                <div key={i} className="bg-slate-50 rounded-lg p-3">
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">{mod.name}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{mod.description}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="💻 Technology Stack">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Frontend', items: project.technologyStack?.frontend },
                { label: 'Backend', items: project.technologyStack?.backend },
                { label: 'Database', items: project.technologyStack?.database },
                { label: 'Tools & DevOps', items: project.technologyStack?.tools }
              ].map(({ label, items }) => items?.length ? (
                <div key={label}>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map(t => (
                      <span key={t} className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              ) : null)}
            </div>
          </Section>

          <Section title="⚙️ Methodology">
            <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{project.methodology}</div>
          </Section>

          <Section title="🏗️ System Architecture">
            <pre className="bg-slate-900 text-green-400 rounded-lg p-4 text-xs leading-relaxed overflow-x-auto font-mono whitespace-pre-wrap">{project.systemArchitecture}</pre>
          </Section>

          <Section title="🔄 Flow Diagram Description">
            <pre className="bg-slate-50 text-slate-700 rounded-lg p-4 text-xs leading-relaxed overflow-x-auto font-mono whitespace-pre-wrap border border-slate-200">{project.flowDiagramDescription}</pre>
          </Section>

          <Section title="🚀 Future Scope">
            <ul className="space-y-2">
              {project.futureScope?.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-blue-600 mt-0.5">→</span> {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="✅ Conclusion">
            <p className="text-slate-600 text-sm leading-relaxed">{project.conclusion}</p>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
