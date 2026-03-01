import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Zap, FileText, Crown, ArrowRight, Trash2, Eye, TrendingUp,
  Clock, Lock, Download, BarChart3, Plus
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user, api, refreshUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const FREE_LIMIT = 2;

  useEffect(() => {
    fetchProjects();
    refreshUser();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects/my');
      setProjects(data.projects);
    } catch {
      toast.error('Failed to load projects.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await api.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p._id !== id));
      toast.success('Project deleted.');
    } catch {
      toast.error('Failed to delete project.');
    } finally {
      setDeleting(null);
    }
  };

  const usagePercent = user ? Math.min((user.usageCount / FREE_LIMIT) * 100, 100) : 0;
  const isPremium = user?.plan === 'premium';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">

        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your generated projects and create new ones.</p>
          </div>
          <Link to="/generate" className="btn-primary inline-flex items-center gap-2 w-fit">
            <Plus className="w-5 h-5" /> Generate New Project
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Plan */}
          <div className={`card ${isPremium ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' : ''}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-500 text-sm">Current Plan</span>
              <Crown className={`w-5 h-5 ${isPremium ? 'text-yellow-500' : 'text-slate-400'}`} />
            </div>
            <div className="text-2xl font-bold text-slate-900 capitalize">{user?.plan}</div>
            {!isPremium && (
              <Link to="/pricing" className="text-blue-600 text-xs font-medium hover:underline mt-1 inline-block">
                Upgrade to Premium →
              </Link>
            )}
          </div>

          {/* Total Projects */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-500 text-sm">Total Projects</span>
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{projects.length}</div>
            <p className="text-slate-500 text-xs mt-1">All time generations</p>
          </div>

          {/* Usage */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-500 text-sm">Monthly Usage</span>
              <BarChart3 className="w-5 h-5 text-green-600" />
            </div>
            {isPremium ? (
              <>
                <div className="text-2xl font-bold text-slate-900">Unlimited</div>
                <p className="text-green-600 text-xs mt-1 font-medium">Premium plan active</p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-slate-900">{user?.usageCount || 0} / {FREE_LIMIT}</div>
                <div className="mt-2 bg-slate-200 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full transition-all ${usagePercent >= 100 ? 'bg-red-500' : 'bg-blue-600'}`} style={{ width: `${usagePercent}%` }} />
                </div>
                <p className="text-slate-500 text-xs mt-1">{FREE_LIMIT - (user?.usageCount || 0)} remaining this month</p>
              </>
            )}
          </div>

          {/* Reset Date */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-500 text-sm">Usage Resets</span>
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-lg font-bold text-slate-900">
              {user?.usageResetDate ? new Date(user.usageResetDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}
            </div>
            <p className="text-slate-500 text-xs mt-1">Monthly counter reset</p>
          </div>
        </div>

        {/* Premium Upgrade Banner */}
        {!isPremium && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-5 h-5 text-yellow-300" />
                <span className="font-bold text-lg">Upgrade to Premium</span>
              </div>
              <p className="text-blue-100 text-sm">Get unlimited generations + PDF & PPT downloads for just ₹499 one-time.</p>
            </div>
            <Link to="/pricing" className="bg-white text-blue-600 font-bold px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap flex items-center gap-2">
              <Crown className="w-4 h-4" /> Upgrade Now
            </Link>
          </div>
        )}

        {/* Projects List */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900">My Projects ({projects.length})</h2>
            <Link to="/generate" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
              New Project <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="card animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-3" />
                  <div className="h-3 bg-slate-200 rounded w-1/2 mb-4" />
                  <div className="h-3 bg-slate-200 rounded w-full mb-2" />
                  <div className="h-3 bg-slate-200 rounded w-5/6" />
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="card text-center py-16">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">No projects yet</h3>
              <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
                Generate your first final year project kit in under a minute!
              </p>
              <Link to="/generate" className="btn-primary inline-flex items-center gap-2">
                <Zap className="w-5 h-5" /> Generate Your First Project
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map(p => (
                <div key={p._id} className="card hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 text-sm leading-tight group-hover:text-blue-600 transition-colors">{p.title}</h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{p.stream}</span>
                        <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">{p.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-3">{p.abstract?.substring(0, 120)}...</p>
                  <div className="text-xs text-slate-400 mb-4">
                    {p.domain} · {p.technology} · {new Date(p.createdAt).toLocaleDateString('en-IN')}
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                    <Link to={`/projects/${p._id}`} className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700">
                      <Eye className="w-4 h-4" /> View
                    </Link>
                    {isPremium ? (
                      <a href={`/api/projects/${p._id}/download-pdf`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-green-600 hover:text-green-700">
                        <Download className="w-4 h-4" /> PDF
                      </a>
                    ) : (
                      <Link to="/pricing" className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                        <Lock className="w-4 h-4" /> PDF
                      </Link>
                    )}
                    <button
                      onClick={() => handleDelete(p._id)}
                      disabled={deleting === p._id}
                      className="ml-auto flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
