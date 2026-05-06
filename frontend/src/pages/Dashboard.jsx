import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  Users, 
  Target, 
  Trophy, 
  XCircle, 
  DollarSign, 
  TrendingUp,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, subValue }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-dark p-6 rounded-3xl border border-white/5 relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/10 rounded-full -mr-8 -mt-8 blur-2xl group-hover:scale-125 transition-transform duration-500`} />
    <div className="flex items-start justify-between">
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
        {subValue && <p className="text-xs text-slate-500 mt-2">{subValue}</p>}
      </div>
      <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-400`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/');
        setStats(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="w-10 h-10 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
    </div>
  );

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const cards = [
    { title: 'Total Leads', value: stats?.totalLeads, icon: Users, color: 'blue' },
    { title: 'New Leads', value: stats?.newLeads, icon: Activity, color: 'indigo' },
    { title: 'Qualified', value: stats?.qualifiedLeads, icon: Target, color: 'purple' },
    { title: 'Won Leads', value: stats?.wonLeads, icon: Trophy, color: 'emerald' },
    { title: 'Lost Leads', value: stats?.lostLeads, icon: XCircle, color: 'red' },
    { title: 'Est. Deal Value', value: formatCurrency(stats?.totalEstimatedValue), icon: DollarSign, color: 'sky' },
    { title: 'Total Won', value: formatCurrency(stats?.totalWonValue), icon: TrendingUp, color: 'emerald' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Sales Dashboard</h1>
        <p className="text-slate-400 mt-1">Overview of your sales pipeline and performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      {/* Chart Placeholder / Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-dark p-8 rounded-3xl border border-white/5 min-h-[300px]">
          <h3 className="text-xl font-bold text-white mb-6">Pipeline Distribution</h3>
          <div className="flex flex-col justify-center h-full">
            <div className="space-y-4">
              {['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'].map(status => {
                const count = stats ? (status === 'New' ? stats.newLeads : status === 'Qualified' ? stats.qualifiedLeads : status === 'Won' ? stats.wonLeads : status === 'Lost' ? stats.lostLeads : 0) : 0;
                const percentage = stats?.totalLeads ? (count / stats.totalLeads) * 100 : 0;
                return (
                  <div key={status} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{status}</span>
                      <span className="text-slate-500">{count} Leads</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        className={`h-full bg-primary-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="glass-dark p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
          <div className="bg-primary-500/10 p-6 rounded-full mb-4">
            <TrendingUp className="w-12 h-12 text-primary-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Ready to grow?</h3>
          <p className="text-slate-400 max-w-sm">
            Keep track of your prospects and close more deals with Uplift CRM's advanced tracking features.
          </p>
          <button className="mt-6 bg-slate-800 hover:bg-slate-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
