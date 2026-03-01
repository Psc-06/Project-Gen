import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Zap, LogOut, LayoutDashboard, Crown } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const isOnLanding = location.pathname === '/';

  return (
    <nav className={`sticky top-0 z-50 border-b ${isOnLanding ? 'bg-slate-900/95 backdrop-blur border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-bold ${isOnLanding ? 'text-white' : 'text-slate-900'}`}>
              ProjectGen
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {!user ? (
              <>
                <a href={isOnLanding ? '#features' : '/#features'} className={`text-sm font-medium transition-colors ${isOnLanding ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Features</a>
                <a href={isOnLanding ? '#how-it-works' : '/#how-it-works'} className={`text-sm font-medium transition-colors ${isOnLanding ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>How it Works</a>
                <Link to="/pricing" className={`text-sm font-medium transition-colors ${isOnLanding ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Pricing</Link>
                <Link to="/login" className={`text-sm font-medium transition-colors ${isOnLanding ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Login</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">Get Started Free</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isOnLanding ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <Link to="/generate" className="btn-primary text-sm py-2 px-4">
                  <Zap className="w-4 h-4 inline mr-1" /> Generate
                </Link>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${isOnLanding ? 'text-white' : 'text-slate-700'}`}>{user.name}</span>
                  {user.plan === 'premium' ? (
                    <span className="badge-premium"><Crown className="w-3 h-3 inline mr-0.5" />Premium</span>
                  ) : (
                    <span className="badge-free">Free</span>
                  )}
                </div>
                <button onClick={handleLogout} className={`flex items-center gap-1 text-sm font-medium transition-colors ${isOnLanding ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-red-500'}`}>
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className={`md:hidden p-2 rounded-lg ${isOnLanding ? 'text-white' : 'text-slate-700'}`} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className={`md:hidden pb-4 border-t ${isOnLanding ? 'border-white/10' : 'border-slate-200'}`}>
            <div className="flex flex-col gap-3 pt-4">
              {!user ? (
                <>
                  <Link to="/pricing" className={`text-sm font-medium px-2 ${isOnLanding ? 'text-slate-300' : 'text-slate-700'}`} onClick={() => setMobileOpen(false)}>Pricing</Link>
                  <Link to="/login" className={`text-sm font-medium px-2 ${isOnLanding ? 'text-slate-300' : 'text-slate-700'}`} onClick={() => setMobileOpen(false)}>Login</Link>
                  <Link to="/register" className="btn-primary text-sm text-center" onClick={() => setMobileOpen(false)}>Get Started Free</Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className={`text-sm font-medium px-2 ${isOnLanding ? 'text-slate-300' : 'text-slate-700'}`} onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <Link to="/generate" className="btn-primary text-sm text-center" onClick={() => setMobileOpen(false)}>Generate Project</Link>
                  <button onClick={handleLogout} className="text-sm text-red-500 font-medium text-left px-2">Logout</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
