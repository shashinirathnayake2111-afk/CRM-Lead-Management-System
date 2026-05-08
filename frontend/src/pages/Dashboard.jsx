import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Trophy, 
  Activity,
  Plus,
  Loader2,
  ChevronRight,
  UserPlus,
  DollarSign,
  TrendingUp,
  BarChart3,
  ArrowUpRight,
  Calendar,
  Sparkles,
  ArrowRight,
  Brain,
  Zap,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  const colors = {
    blue: "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/20",
    amber: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/20",
    purple: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/20",
    emerald: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/20",
    red: "from-red-500/20 to-rose-500/20 text-red-400 border-red-500/20",
    sky: "from-sky-500/20 to-cyan-500/20 text-sky-400 border-sky-500/20",
  };

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-card p-6 rounded-[2rem] relative overflow-hidden group"
    >
      <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${colors[color]} blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-2xl bg-gradient-to-br ${colors[color]} border shadow-inner`}>
            <Icon className="w-5 h-5" />
          </div>
          {trend && (
            <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20 backdrop-blur-sm">
              <ArrowUpRight className="w-3 h-3" />
              {trend}
            </div>
          )}
        </div>
        
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mb-1">{title}</p>
        <h3 className="text-3xl font-black text-white tracking-tighter">
          {value}
        </h3>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', email: '', status: 'New' });
  const [greeting, setGreeting] = useState('');
  const [timeRange, setTimeRange] = useState('Last 6 Months');
  const [error, setError] = useState(null);

  // Extract name from email for a more personal touch
  const displayName = useMemo(() => {
    if (!user?.email) return 'Agent';
    const namePart = user.email.split('@')[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1).replace(/[._]/g, ' ');
  }, [user]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const fetchData = async () => {
    setError(null);
    try {
      const [statsRes, leadsRes] = await Promise.all([
        api.get('dashboard/'),
        api.get('leads/')
      ]);
      
      if (statsRes.data) setStats(statsRes.data);
      if (Array.isArray(leadsRes.data)) setLeads(leadsRes.data.slice(0, 5));
      
    } catch (err) {
      console.error('Dashboard Fetch Error:', err);
      setError(err.response?.data?.detail || err.response?.data?.error || 'Failed to sync intelligence data. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await api.post('leads/', newLead);
      setNewLead({ name: '', email: '', status: 'New' });
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const chartData = useMemo(() => {
    const isYTD = timeRange === 'Year to Date';
    return {
      labels: isYTD 
        ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Lead Acquisition',
          data: isYTD 
            ? [12, 19, 3, 5, 2, 0, 0, 0, 0, 0, 0, 0]
            : [12, 19, 3, 5, 2, 0],
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, 'rgba(99, 102, 241, 0.8)');
            gradient.addColorStop(1, 'rgba(99, 102, 241, 0.1)');
            return gradient;
          },
          borderRadius: 8,
          hoverBackgroundColor: 'rgba(99, 102, 241, 1)',
        },
        {
          label: 'Conversions',
          data: isYTD 
            ? [7, 11, 5, 8, 3, 0, 0, 0, 0, 0, 0, 0]
            : [7, 11, 5, 8, 3, 0],
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, 'rgba(16, 185, 129, 0.8)');
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0.1)');
            return gradient;
          },
          borderRadius: 8,
          hoverBackgroundColor: 'rgba(16, 185, 129, 1)',
        }
      ]
    };
  }, [timeRange]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: '#94a3b8',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { size: 10, weight: '600' }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#fff',
        bodyColor: '#94a3b8',
        padding: 12,
        cornerRadius: 12,
        displayColors: false,
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
        ticks: { color: '#64748b', font: { size: 10 } }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#64748b', font: { size: 10, weight: '600' } }
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-indigo-500/10 rounded-full blur-xl animate-pulse" />
        </div>
      </div>
      <p className="text-slate-500 font-black uppercase tracking-[0.3em] animate-pulse text-[10px]">Initializing Dashboard...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-6 text-center px-4">
      <div className="w-20 h-20 bg-rose-500/10 rounded-[2.5rem] flex items-center justify-center border border-rose-500/20 shadow-2xl shadow-rose-500/10">
        <Activity className="w-10 h-10 text-rose-500" />
      </div>
      <div className="max-w-md">
        <h2 className="text-2xl font-black text-white tracking-tight mb-2 uppercase">Sync Interrupted</h2>
        <p className="text-slate-500 font-medium text-sm leading-relaxed">{error}</p>
      </div>
      <button 
        onClick={() => { setLoading(true); fetchData(); }}
        className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95"
      >
        Re-establish Connection
      </button>
    </div>
  );

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-10 pb-20 max-w-[1600px] mx-auto px-4"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Workspace Overview</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter flex items-center gap-3">
            {greeting}, <span className="text-gradient">{displayName}</span>
          </h1>
          <p className="text-slate-400 mt-2 font-medium">You have <span className="text-indigo-400 font-bold">{stats?.newLeads} new leads</span> to review today.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-3xl border border-white/5 backdrop-blur-md">
          <div className="flex flex-col px-4">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Current Date</span>
            <span className="text-sm font-bold text-white text-right">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 border border-indigo-500/20">
            <Calendar className="w-5 h-5" />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Pipeline Depth" value={stats?.totalLeads} icon={Users} color="blue" trend="+12.4%" />
        <StatCard title="Active Inbound" value={stats?.newLeads} icon={Activity} color="amber" trend="High" />
        <StatCard title="Qualified Leads" value={stats?.qualifiedLeads} icon={TrendingUp} color="purple" trend="Top Tier" />
        <StatCard title="Revenue Won" value={stats?.wonLeads} icon={Trophy} color="emerald" trend="+5.2%" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Analytics Column */}
        <div className="xl:col-span-2 space-y-8">
          <motion.div variants={itemVariants} className="glass-premium p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700">
              <BarChart3 className="w-64 h-64 text-indigo-500" />
            </div>
            
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                  Engagement Dynamics
                </h3>
                <p className="text-slate-500 text-sm font-medium mt-1">Bi-annual lead lifecycle analysis</p>
              </div>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white/5 border border-white/10 text-slate-300 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="Last 6 Months">Last 6 Months</option>
                <option value="Year to Date">Year to Date</option>
              </select>
            </div>
            
            <div className="h-[350px] w-full relative z-10">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Churn rate" value={stats?.lostLeads} icon={Activity} color="red" />
            <StatCard title="Projected" value={`Rs. ${(stats?.totalEstimatedValue || 0).toLocaleString()}`} icon={DollarSign} color="sky" />
            <StatCard title="Actualized" value={`Rs. ${(stats?.totalWonValue || 0).toLocaleString()}`} icon={Trophy} color="emerald" />
          </div>

          {/* Table Section */}
          <motion.div variants={itemVariants} className="glass-premium rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">Priority Prospects</h3>
                <p className="text-slate-500 text-sm font-medium mt-1">High-intent leads requiring immediate action</p>
              </div>
              <button 
                onClick={() => window.location.href='/leads'} 
                className="group flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all duration-300 font-bold text-xs"
              >
                Full Database
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/[0.02] text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
                    <th className="px-10 py-5">Prospect Profile</th>
                    <th className="px-10 py-5">Lifecycle Stage</th>
                    <th className="px-10 py-5">Onboarding</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence>
                    {leads.map((lead, idx) => (
                      <motion.tr 
                        key={lead.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                        onClick={() => window.location.href=`/leads/${lead.id}`}
                      >
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-indigo-400 font-black text-sm">
                              {(lead.name || 'A').charAt(0)}
                            </div>
                            <div>
                              <div className="text-sm font-black text-white group-hover:text-indigo-400 transition-colors">{lead.name || 'Anonymous Prospect'}</div>
                              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mt-0.5">{lead.company || 'Direct Client'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border ${
                            lead.status === 'Won' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                            lead.status === 'Lost' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                            lead.status === 'New' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                            'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-10 py-6 text-xs font-bold text-slate-400">
                          {lead.created_at ? new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recently'}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          {/* Quick Add Form */}
          <motion.div variants={itemVariants} className="glass-premium p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
              <UserPlus className="w-40 h-40 text-indigo-500" />
            </div>
            
            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Rapid Ingestion</h3>
            <p className="text-slate-500 text-sm font-medium mb-8">Initialize a new opportunity stream.</p>
            
            <form onSubmit={handleQuickAdd} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Identity</label>
                <input
                  type="text"
                  value={newLead.name}
                  onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                  className="w-full bg-slate-900/50 border border-white/5 text-white px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 transition-all text-sm font-bold placeholder:text-slate-600"
                  placeholder="e.g. Malsha Rathnayake"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Communication Endpoint</label>
                <input
                  type="email"
                  value={newLead.email}
                  onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                  className="w-full bg-slate-900/50 border border-white/5 text-white px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 transition-all text-sm font-bold placeholder:text-slate-600"
                  placeholder="malsha@uplift.lk"
                  required
                />
              </div>
              <div className="space-y-2 relative">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Entry Phase</label>
                <select
                  value={newLead.status}
                  onChange={(e) => setNewLead({...newLead, status: e.target.value})}
                  className="w-full bg-slate-900/50 border border-white/5 text-white px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 transition-all text-sm font-bold appearance-none cursor-pointer"
                >
                  <option value="New">New Discovery</option>
                  <option value="Contacted">First Outreach</option>
                  <option value="Qualified">Sales Qualified</option>
                </select>
              </div>
              
              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 mt-4 relative overflow-hidden group"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/10 -skew-x-[20deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700" />
                {formLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <Plus className="w-5 h-5 stroke-[3]" />
                    <span className="uppercase tracking-widest text-xs">Execute Ingestion</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Distribution Section */}
          <motion.div variants={itemVariants} className="glass-premium p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <h3 className="text-xl font-black text-white mb-8 tracking-tight">Portfolio Distribution</h3>
            <div className="h-[250px] relative flex items-center justify-center">
              <Pie 
                data={{
                  labels: ['New', 'Won', 'Lost'],
                  datasets: [{
                    data: [stats?.newLeads || 0, stats?.wonLeads || 0, stats?.lostLeads || 0],
                    backgroundColor: [
                      'rgba(99, 102, 241, 0.6)',
                      'rgba(16, 185, 129, 0.6)',
                      'rgba(244, 63, 94, 0.6)',
                    ],
                    borderColor: [
                      '#6366f1',
                      '#10b981',
                      '#f43f5e',
                    ],
                    borderWidth: 2,
                    hoverOffset: 20
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: { 
                        color: '#94a3b8', 
                        font: { weight: '800', size: 10 },
                        padding: 20,
                        usePointStyle: true
                      }
                    }
                  }
                }}
              />
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-2">
               <div className="p-3 bg-white/5 rounded-2xl text-center border border-white/5">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">New</div>
                  <div className="text-lg font-black text-indigo-400">{stats?.newLeads || 0}</div>
               </div>
               <div className="p-3 bg-white/5 rounded-2xl text-center border border-white/5">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Won</div>
                  <div className="text-lg font-black text-emerald-400">{stats?.wonLeads || 0}</div>
               </div>
               <div className="p-3 bg-white/5 rounded-2xl text-center border border-white/5">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Lost</div>
                  <div className="text-lg font-black text-rose-400">{stats?.lostLeads || 0}</div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
