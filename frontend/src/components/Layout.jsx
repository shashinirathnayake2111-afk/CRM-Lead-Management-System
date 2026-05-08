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
          isSidebarOpen ? 'w-80' : 'w-24'
        } glass-premium border-r border-white/10 transition-all duration-700 flex flex-col fixed h-full z-50 overflow-hidden shadow-[20px_0_50px_rgba(0,0,0,0.3)]`}
      >
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

        {/* Sidebar Header */}
        <div className="p-8 flex items-center justify-between relative">
          <div className="flex items-center gap-4">
             <motion.div 
               whileHover={{ scale: 1.05, rotate: 5 }}
               className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px] shadow-2xl shadow-indigo-500/40 flex-shrink-0 cursor-pointer"
             >
                <div className="w-full h-full rounded-[14px] bg-[#020617] flex items-center justify-center overflow-hidden">
                   <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                </div>
             </motion.div>
             {isSidebarOpen && (
               <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="flex flex-col"
               >
                 <span className="text-2xl font-black tracking-tighter text-white leading-none bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">UPLIFT</span>
                 <span className="text-[10px] font-black tracking-[0.5em] text-indigo-400 mt-1">NARRATIVE</span>
               </motion.div>
             )}
          </div>
        </div>

        {/* Navigation Area */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar relative">
          {isSidebarOpen && (
             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="px-6 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-6 mt-4"
             >
               Command Center
             </motion.p>
          )}
          
          <div className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
                    isActive 
                      ? 'text-white' 
                      : 'text-slate-500 hover:text-slate-200'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active Background Glow */}
                    {isActive && (
                      <motion.div 
                        layoutId="navGlow"
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/5 border border-white/5 shadow-inner"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover Indicator */}
                    <div className="absolute left-0 w-1 h-0 bg-indigo-500 rounded-r-full group-hover:h-6 transition-all duration-300" />

                    <item.icon className={`w-5 h-5 flex-shrink-0 transition-all duration-500 relative z-10 ${
                      isActive ? 'text-indigo-400 scale-110' : 'group-hover:text-indigo-300 group-hover:scale-110'
                    }`} />
                    
                    {isSidebarOpen && (
                      <span className={`font-bold text-[11px] uppercase tracking-[0.2em] relative z-10 transition-all duration-500 whitespace-nowrap ${
                        isActive ? 'translate-x-1' : 'group-hover:translate-x-1'
                      }`}>
                        {item.name}
                      </span>
                    )}

                    {isActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute right-4 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Premium Sidebar Footer */}
        <div className="p-6 mt-auto">
          <div className={`glass-card p-5 rounded-[2rem] border border-white/10 relative overflow-hidden group/profile ${!isSidebarOpen && 'items-center flex flex-col p-3'}`}>
             {/* Profile Background Animation */}
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover/profile:opacity-100 transition-opacity duration-700" />
             
             <div className={`flex items-center gap-4 relative z-10 ${!isSidebarOpen && 'flex-col'}`}>
                <div className="relative flex-shrink-0">
                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center overflow-hidden shadow-xl group-hover/profile:border-indigo-500/30 transition-colors">
                      <UserCircle className="w-9 h-9 text-slate-500 group-hover/profile:text-indigo-400 transition-colors" />
                   </div>
                   {/* Online Status Pulsar */}
                   <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#020617] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                   </div>
                </div>

                {isSidebarOpen && (
                  <div className="flex-1 min-w-0">
                     <p className="text-xs font-black text-white truncate group-hover/profile:text-indigo-300 transition-colors tracking-tight">
                       {user?.email?.split('@')[0]}
                     </p>
                     <div className="flex items-center gap-1.5 mt-0.5">
                        <div className={`w-1 h-1 rounded-full ${user?.isAdmin ? 'bg-indigo-400' : 'bg-slate-500'}`} />
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">
                          {user?.isAdmin ? 'Executive Access' : 'Agent Access'}
                        </p>
                     </div>
                  </div>
                )}
             </div>
             
             {isSidebarOpen && (
               <motion.button
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 onClick={handleLogout}
                 className="flex items-center justify-center gap-3 px-4 py-3 mt-5 w-full bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/10 hover:border-rose-500/20 text-rose-400 rounded-xl transition-all duration-300 group/logout relative z-10"
               >
                 <LogOut className="w-4 h-4 group-hover/logout:-translate-x-1 transition-transform" />
                 <span className="font-black text-[9px] uppercase tracking-[0.25em]">Terminate Session</span>
               </motion.button>
             )}

             {!isSidebarOpen && (
               <button 
                 onClick={handleLogout}
                 className="mt-4 p-3 bg-rose-500/10 text-rose-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
               >
                 <LogOut className="w-4 h-4" />
               </button>
             )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-500 ${isSidebarOpen ? 'ml-80' : 'ml-24'} relative`}>
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
