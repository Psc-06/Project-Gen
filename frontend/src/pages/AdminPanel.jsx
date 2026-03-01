import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Users, FileText, Crown, TrendingUp, Trash2, IndianRupee, BarChart3, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const TABS = ['Overview', 'Users', 'Projects'];

export default function AdminPanel() {
  const { api } = useAuth();
  const [tab, setTab] = useState('Overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, [tab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (tab === 'Overview') {
        const { data } = await api.get('/admin/stats');
        setStats(data);
      } else if (tab === 'Users') {
        const { data } = await api.get('/admin/users');
        setUsers(data.users);
      } else if (tab === 'Projects') {
        const { data } = await api.get('/admin/projects');
        setProjects(data.projects);
      }
    } catch {
      toast.error('Failed to load admin data.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePlan = async (userId, plan) => {
    try {
      await api.patch(`/admin/users/${userId}/plan`, { plan });
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, plan } : u));
      toast.success(`Plan updated to ${plan}`);
    } catch {
      toast.error('Failed to update plan.');
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!confirm(`Delete user "${userName}"? This will also delete all their projects.`)) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers(prev => prev.filter(u => u._id !== userId));
      toast.success('User deleted.');
    } catch {
      toast.error('Failed to delete user.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Admin Panel</h1>
            <p className="text-slate-500 text-sm mt-1">Manage users, projects, and platform stats.</p>
          </div>
          <button onClick={fetchData} className="btn-secondary flex items-center gap-2 text-sm">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit mb-8">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {tab === 'Overview' && stats && (
              <div>
                {/* Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                  {[
                    { icon: <Users className="w-5 h-5" />, label: 'Total Users', value: stats.stats.totalUsers, color: 'text-blue-600', bg: 'bg-blue-100' },
                    { icon: <Crown className="w-5 h-5" />, label: 'Premium Users', value: stats.stats.premiumUsers, color: 'text-yellow-600', bg: 'bg-yellow-100' },
                    { icon: <FileText className="w-5 h-5" />, label: 'Total Projects', value: stats.stats.totalProjects, color: 'text-purple-600', bg: 'bg-purple-100' },
                    { icon: <IndianRupee className="w-5 h-5" />, label: 'Revenue (est.)', value: `₹${stats.stats.revenue?.toLocaleString('en-IN')}`, color: 'text-green-600', bg: 'bg-green-100' }
                  ].map((s, i) => (
                    <div key={i} className="card">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-slate-500 text-xs">{s.label}</span>
                        <div className={`w-8 h-8 ${s.bg} ${s.color} rounded-lg flex items-center justify-center`}>{s.icon}</div>
                      </div>
                      <div className="text-2xl font-black text-slate-900">{s.value}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Users */}
                  <div className="card">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-blue-600" /> Recent Users</h3>
                    <div className="space-y-3">
                      {stats.recentUsers?.map(u => (
                        <div key={u._id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                          <div>
                            <p className="text-sm font-medium text-slate-800">{u.name}</p>
                            <p className="text-xs text-slate-400">{u.email}</p>
                          </div>
                          <span className={u.plan === 'premium' ? 'badge-premium' : 'badge-free'}>{u.plan}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Domain Stats */}
                  <div className="card">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-purple-600" /> Projects by Domain</h3>
                    <div className="space-y-3">
                      {stats.domainStats?.map((d, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">{d._id}</span>
                            <span className="font-semibold text-slate-800">{d.count}</span>
                          </div>
                          <div className="bg-slate-200 rounded-full h-1.5">
                            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${Math.min((d.count / (stats.stats.totalProjects || 1)) * 100, 100)}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {tab === 'Users' && (
              <div className="card overflow-hidden p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['Name', 'Email', 'Plan', 'Usage', 'Joined', 'Actions'].map(h => (
                          <th key={h} className="text-left px-5 py-3.5 text-slate-600 font-semibold text-xs uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {users.map(u => (
                        <tr key={u._id} className="hover:bg-slate-50">
                          <td className="px-5 py-3.5">
                            <p className="font-medium text-slate-800">{u.name}</p>
                            {u.role === 'admin' && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium">Admin</span>}
                          </td>
                          <td className="px-5 py-3.5 text-slate-500">{u.email}</td>
                          <td className="px-5 py-3.5">
                            <select value={u.plan} onChange={e => handleUpdatePlan(u._id, e.target.value)}
                              className="text-xs border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                              <option value="free">Free</option>
                              <option value="premium">Premium</option>
                            </select>
                          </td>
                          <td className="px-5 py-3.5 text-slate-600">{u.usageCount}</td>
                          <td className="px-5 py-3.5 text-slate-500">{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                          <td className="px-5 py-3.5">
                            <button onClick={() => handleDeleteUser(u._id, u.name)} className="text-red-400 hover:text-red-600 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {tab === 'Projects' && (
              <div className="card overflow-hidden p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['Title', 'User', 'Domain', 'Tech', 'Difficulty', 'Date'].map(h => (
                          <th key={h} className="text-left px-5 py-3.5 text-slate-600 font-semibold text-xs uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {projects.map(p => (
                        <tr key={p._id} className="hover:bg-slate-50">
                          <td className="px-5 py-3.5">
                            <p className="font-medium text-slate-800 max-w-xs truncate">{p.title}</p>
                            <p className="text-xs text-slate-400">{p.stream}</p>
                          </td>
                          <td className="px-5 py-3.5">
                            <p className="text-slate-700">{p.user?.name}</p>
                            <p className="text-xs text-slate-400">{p.user?.email}</p>
                          </td>
                          <td className="px-5 py-3.5"><span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">{p.domain}</span></td>
                          <td className="px-5 py-3.5 text-slate-600">{p.technology}</td>
                          <td className="px-5 py-3.5"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.difficulty === 'Advanced' ? 'bg-red-100 text-red-700' : p.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{p.difficulty}</span></td>
                          <td className="px-5 py-3.5 text-slate-500">{new Date(p.createdAt).toLocaleDateString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
