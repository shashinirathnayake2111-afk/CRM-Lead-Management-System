import React, { useState, useEffect } from 'react';
import api from '../services/api';
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
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement
);

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass-dark p-6 rounded-[2rem] border border-white/10 relative overflow-hidden group shadow-2xl"
  >
    <div className={`absolute -right-4 -top-4 w-32 h-32 bg-${color}-500/10 rounded-full blur-3xl group-hover:bg-${color}-500/20 transition-all duration-700`} />
    
    <div className="flex flex-col h-full relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-400 border border-${color}-500/20`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
            <ArrowUpRight className="w-3 h-3" />
            {trend}
          </div>
        )}
      </div>
      
      <div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-3xl font-black text-white tracking-tighter">
          {value}
        </h3>
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', email: '', status: 'New' });

  const fetchData = async () => {
    try {
      const [statsRes, leadsRes] = await Promise.all([
        api.get('/dashboard/'),
        api.get('/leads/')
      ]);
      setStats(statsRes.data);
      setLeads(leadsRes.data.slice(0, 5)); // Show recent 5
    } catch (err) {
      console.error(err);
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
      await api.post('/leads/', newLead);
      setNewLead({ name: '', email: '', status: 'New' });
      fetchData(); // Refresh data
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="w-10 h-10 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight">Sales Overview</h1>
        <p className="text-slate-400 mt-2">Welcome back! Here's what's happening with your leads today.</p>
      </div>

      {/* 1. Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Leads" value={stats?.totalLeads} icon={Users} color="blue" trend="+12%" />
        <StatCard title="New Leads" value={stats?.newLeads} icon={Activity} color="amber" trend="Hot" />
        <StatCard title="Qualified" value={stats?.qualifiedLeads} icon={TrendingUp} color="purple" trend="Top" />
        <StatCard title="Won Leads" value={stats?.wonLeads} icon={Trophy} color="emerald" trend="+5%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analytics Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Chart */}
          <div className="glass-dark p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary-400" />
                  Lead Performance
                </h3>
                <p className="text-slate-500 text-sm">Monthly lead acquisition and conversion status</p>
              </div>
              <div className="flex gap-2">
                 <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-bold">This Month</div>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <Bar 
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                  datasets: [
                    {
                      label: 'Leads Acquisition',
                      data: [12, 19, 3, 5, 2, 3],
                      backgroundColor: 'rgba(56, 189, 248, 0.5)',
                      borderRadius: 12,
                    },
                    {
                      label: 'Conversions',
                      data: [7, 11, 5, 8, 3, 6],
                      backgroundColor: 'rgba(16, 185, 129, 0.5)',
                      borderRadius: 12,
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    y: { display: false },
                    x: {
                      grid: { display: false },
                      ticks: { color: '#64748b', font: { weight: 'bold' } }
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Lost Leads" value={stats?.lostLeads} icon={Activity} color="red" />
            <StatCard title="Est. Pipeline" value={`$${(stats?.totalEstimatedValue || 0).toLocaleString()}`} icon={DollarSign} color="sky" />
            <StatCard title="Total Won" value={`$${(stats?.totalWonValue || 0).toLocaleString()}`} icon={Trophy} color="emerald" />
          </div>

          {/* Recent Leads Table */}
          <div className="glass-dark rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">Recent Prospects</h3>
                <p className="text-slate-500 text-sm">Last 5 active leads in your pipeline</p>
              </div>
              <button onClick={() => window.location.href='/leads'} className="p-3 rounded-2xl bg-primary-500/10 text-primary-400 hover:bg-primary-500 hover:text-white transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
                    <th className="px-8 py-4">Prospect</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => window.location.href=`/leads/${lead.id}`}>
                      <td className="px-8 py-5">
                        <div className="text-sm font-bold text-white group-hover:text-primary-400 transition-colors">{lead.name}</div>
                        <div className="text-xs text-slate-500">{lead.company}</div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          lead.status === 'Won' ? 'bg-emerald-500/10 text-emerald-400' :
                          lead.status === 'Lost' ? 'bg-red-500/10 text-red-400' :
                          lead.status === 'New' ? 'bg-blue-500/10 text-blue-400' :
                          'bg-amber-500/10 text-amber-400'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-slate-500">
                        {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Quick Add Form */}
          <div className="glass-dark p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
              <UserPlus className="w-32 h-32 text-primary-500" />
            </div>
            
            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Rapid Entry</h3>
            <p className="text-slate-500 text-sm mb-8">Add a new opportunity to your workspace.</p>
            
            <form onSubmit={handleQuickAdd} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  value={newLead.name}
                  onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                  className="w-full bg-slate-800/40 border border-white/5 text-white px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/40 transition-all text-sm font-medium"
                  placeholder="e.g. Kasun Perera"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  type="email"
                  value={newLead.email}
                  onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                  className="w-full bg-slate-800/40 border border-white/5 text-white px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/40 transition-all text-sm font-medium"
                  placeholder="kasun@dialog.lk"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Initial Phase</label>
                <select
                  value={newLead.status}
                  onChange={(e) => setNewLead({...newLead, status: e.target.value})}
                  className="w-full bg-slate-800/40 border border-white/5 text-white px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/40 transition-all text-sm font-medium appearance-none"
                >
                  <option value="New">New Discovery</option>
                  <option value="Contacted">First Contact</option>
                  <option value="Qualified">Market Qualified</option>
                </select>
              </div>
              
              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-black py-5 rounded-2xl transition-all shadow-2xl shadow-primary-500/20 flex items-center justify-center gap-3 mt-4"
              >
                {formLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <Plus className="w-5 h-5 stroke-[3]" />
                    <span className="uppercase tracking-widest text-xs">Initialize Lead</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Distribution Chart */}
          <div className="glass-dark p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Status Breakdown</h3>
            <div className="h-[200px] flex items-center justify-center">
              <Pie 
                data={{
                  labels: ['New', 'Won', 'Lost'],
                  datasets: [{
                    data: [stats?.newLeads, stats?.wonLeads, stats?.lostLeads],
                    backgroundColor: [
                      'rgba(56, 189, 248, 0.4)',
                      'rgba(16, 185, 129, 0.4)',
                      'rgba(239, 68, 68, 0.4)',
                    ],
                    borderColor: [
                      '#0ea5e9',
                      '#10b981',
                      '#ef4444',
                    ],
                    borderWidth: 2,
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: { color: '#94a3b8', font: { weight: 'bold', size: 10 } }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
