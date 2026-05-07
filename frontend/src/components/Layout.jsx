import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  LogOut, 
  Menu, 
  X, 
  TrendingUp,
  UserCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Compass,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Leads', icon: Users, path: '/leads' },
    ...(user?.isAdmin ? [{ name: 'Management', icon: ShieldCheck, path: '/management' }] : []),
  ];

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-72' : 'w-24'
        } glass-premium border-r border-white/5 transition-all duration-500 flex flex-col fixed h-full z-50 overflow-hidden`}
      >
        {/* Sidebar Header */}
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full rounded-[14px] bg-[#0f172a] flex items-center justify-center overflow-hidden">
                   <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                </div>
             </div>
             {isSidebarOpen && (
               <motion.div
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="flex flex-col"
               >
                 <span className="text-xl font-black tracking-tighter text-white leading-none">UPLIFT</span>
                 <span className="text-[9px] font-black tracking-[0.4em] text-indigo-400 mt-1">SYSTEMS</span>
               </motion.div>
             )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 py-10 space-y-3">
          {isSidebarOpen && (
             <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Core Architecture</p>
          )}
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative ${
                  isActive 
                    ? 'bg-indigo-500/10 text-white shadow-inner' 
                    : 'text-slate-500 hover:text-slate-200 hover:bg-white/[0.03]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-indigo-400' : 'group-hover:text-slate-200'}`} />
                  {isSidebarOpen && <span className="font-black text-xs uppercase tracking-widest">{item.name}</span>}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-white/5 bg-white/[0.01]">
          <div className={`flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 ${!isSidebarOpen && 'justify-center'}`}>
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center overflow-hidden">
                <UserCircle className="w-8 h-8 text-slate-500" />
             </div>
             {isSidebarOpen && (
               <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-white truncate">{user?.email?.split('@')[0]}</p>
                  <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">
                    {user?.isAdmin ? 'Executive Admin' : 'Lead Agent'}
                  </p>
               </div>
             )}
          </div>
          
          <button
            onClick={handleLogout}
            className={`flex items-center gap-4 px-5 py-4 mt-4 w-full text-slate-500 hover:text-rose-400 hover:bg-rose-400/5 rounded-2xl transition-all duration-300 group ${!isSidebarOpen && 'justify-center'}`}
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {isSidebarOpen && <span className="font-black text-xs uppercase tracking-widest">Deactivate</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-500 ${isSidebarOpen ? 'ml-72' : 'ml-24'} relative`}>
        {/* Background Decorative Elements */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none ml-72" />

        <header className="h-24 glass-premium border-b border-white/5 flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 transition-all border border-white/5"
            >
              {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center gap-2 text-slate-500">
               <Compass className="w-4 h-4" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Operational Zone</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active System</span>
                <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Mainframe v2.0.4</span>
             </div>
             <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
             </div>
          </div>
        </header>

        <div className="p-4 sm:p-8 relative z-10 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Layout;
