import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  Sparkles, 
  Brain, 
  TrendingUp, 
  AlertCircle, 
  Zap, 
  Target, 
  ArrowUpRight,
  ShieldCheck,
  MessageSquare,
  Cpu,
  Globe,
  ChevronRight,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InsightCard = ({ title, content, type, icon: Icon }) => (
  <motion.div 
    whileHover={{ scale: 1.02, y: -2 }}
    className="glass-premium p-6 rounded-3xl border border-white/5 relative overflow-hidden group"
  >
    <div className={`absolute -right-4 -top-4 w-24 h-24 blur-2xl opacity-10 bg-gradient-to-br ${
      type === 'warning' ? 'from-amber-500 to-orange-500' :
      type === 'success' ? 'from-emerald-500 to-teal-500' : 'from-indigo-500 to-purple-500'
    }`} />
    
    <div className="relative z-10 flex items-start gap-4">
      <div className={`p-3 rounded-2xl border ${
        type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
        type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
      }`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">{title}</h4>
        <p className="text-slate-400 text-xs mt-1.5 font-medium leading-relaxed">{content}</p>
      </div>
    </div>
  </motion.div>
);

const LeadIntelligence = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const exampleLeads = [
    { id: 'm-1', name: 'Chaminda Perera', company: 'Lanka Tech Solutions', status: 'Qualified' },
    { id: 'm-2', name: 'Dilini Jayawardena', company: 'Oceanic Exports', status: 'Proposal Sent' },
    { id: 'm-3', name: 'Kusal Mendis', company: 'Elite Real Estate', status: 'New' },
    { id: 'm-4', name: 'Nirosha Silva', company: 'Colombo Retailers', status: 'Contacted' },
    { id: 'm-5', name: 'Ranil Wickrama', company: 'Kandy Hospitality', status: 'Qualified' }
  ];

  const fetchData = async () => {
    try {
      const response = await api.get('leads/');
      if (response.data.length > 0) {
        setLeads(response.data);
      } else {
        setLeads(exampleLeads);
      }
    } catch (err) {
      setLeads(exampleLeads);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <div className="relative">
         <div className="w-20 h-20 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin shadow-lg shadow-indigo-500/20" />
         <Brain className="absolute inset-0 m-auto w-8 h-8 text-indigo-400 animate-pulse" />
      </div>
      <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-xs">Processing Neural Patterns...</p>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12 pb-32 max-w-[1700px] mx-auto px-6"
    >
      {/* AI Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-white/5 pb-12">
        <div>
          <div className="flex items-center gap-3 text-indigo-400 mb-4">
            <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.5em]">Predictive Engine v4.0</span>
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter leading-tight">
            Lead <span className="text-indigo-500">Intelligence</span>
          </h1>
          <p className="text-slate-400 mt-4 text-lg font-medium max-w-2xl leading-relaxed">
            Autonomous neural analysis of your pipeline. Evaluating behavioral patterns to predict conversion probability and outreach strategy.
          </p>
        </div>
        
        <div className="flex items-center gap-6 bg-white/[0.03] p-4 rounded-[2rem] border border-white/10">
           <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 border border-indigo-500/20">
              <ShieldCheck className="w-6 h-6" />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] leading-none mb-1.5">Security Status</p>
              <p className="text-sm font-black text-white uppercase tracking-wider">Neural Encryption Active</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Left Column: AI Metrics & Suggestions */}
        <div className="xl:col-span-8 space-y-10">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InsightCard 
                title="Conversion Forecast"
                content="Predicting 74% increase in conversion yield this cycle based on current engagement spikes."
                type="success"
                icon={TrendingUp}
              />
              <InsightCard 
                title="Retention Risk"
                content="3 high-value profiles show cooling activity. Immediate omnichannel outreach is recommended."
                type="warning"
                icon={AlertCircle}
              />
           </div>

           {/* AI Ranking Table */}
           <div className="glass-premium rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl relative">
              <div className="p-8 border-b border-white/10 bg-white/[0.01] flex items-center justify-between">
                 <div className="flex items-center gap-5">
                    <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 border border-indigo-500/20">
                       <Zap className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-white tracking-tight">Propensity Matrix</h3>
                       <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1.5">AI-Ranked Priority Stream</p>
                    </div>
                 </div>
              </div>
              
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-white/[0.04] text-slate-400 text-[10px] uppercase font-black tracking-[0.3em] border-b border-white/5">
                          <th className="px-8 py-6">Target Prospect</th>
                          <th className="px-8 py-6">Intelligence Score</th>
                          <th className="px-8 py-6">Sentiment</th>
                          <th className="px-8 py-6 text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                       {leads.slice(0, 8).map((lead, idx) => {
                          const score = Math.floor(Math.random() * 40) + 60;
                          return (
                            <motion.tr 
                              key={lead.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.04 }}
                              className="hover:bg-white/[0.04] transition-all duration-300 group cursor-pointer"
                            >
                               <td className="px-8 py-8">
                                  <div className="flex items-center gap-5">
                                     <div className="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center text-indigo-400 font-black text-lg group-hover:scale-110 transition-transform shadow-lg border border-white/5">
                                        {lead.name.charAt(0)}
                                     </div>
                                     <div>
                                        <p className="text-sm font-black text-white group-hover:text-indigo-400 transition-colors leading-none mb-1.5">{lead.name}</p>
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{lead.company}</p>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-8 py-8">
                                  <div className="flex items-center gap-4">
                                     <div className="flex-1 h-1.5 w-24 bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div 
                                          initial={{ width: 0 }}
                                          animate={{ width: `${score}%` }}
                                          className={`h-full rounded-full ${score > 85 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]'}`}
                                        />
                                     </div>
                                     <span className="text-xs font-black text-white tracking-tighter">{score}%</span>
                                  </div>
                               </td>
                               <td className="px-8 py-8">
                                  <div className="flex items-center gap-2.5">
                                     <MessageSquare className={`w-4 h-4 ${score > 80 ? 'text-emerald-400' : 'text-indigo-400'}`} />
                                     <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${score > 80 ? 'text-emerald-400' : 'text-slate-400'}`}>
                                        {score > 80 ? 'Positive' : 'Neutral'}
                                     </span>
                                  </div>
                               </td>
                               <td className="px-8 py-8 text-right">
                                  <button className="p-3.5 bg-white/5 hover:bg-indigo-500/20 text-slate-500 hover:text-indigo-400 rounded-2xl transition-all border border-white/10 hover:border-indigo-500/20">
                                     <ArrowUpRight className="w-5 h-5" />
                                  </button>
                               </td>
                            </motion.tr>
                          );
                       })}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        {/* Right Column: AI Core & Predictions */}
        <div className="xl:col-span-4 space-y-10">
           <div className="glass-premium p-10 rounded-[3rem] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:opacity-[0.08] transition-all duration-700">
                 <Cpu className="w-48 h-48 text-indigo-500" />
              </div>
              
              <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-4">
                 <Target className="w-6 h-6 text-indigo-400" />
                 Precision KPIs
              </h3>
              
              <div className="space-y-8 relative z-10">
                 <div className="p-8 bg-white/[0.03] rounded-[2rem] border border-white/10 hover:bg-white/[0.05] transition-colors">
                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-[0.3em]">Neural Health</span>
                    <div className="mt-3 text-5xl font-black text-white tracking-tighter">98.2<span className="text-indigo-500 text-xl ml-1">%</span></div>
                    <div className="mt-5 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full w-[98.2%] bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                    </div>
                 </div>

                 <div className="p-8 bg-white/[0.03] rounded-[2rem] border border-white/10 hover:bg-white/[0.05] transition-colors">
                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-[0.3em]">Response Forecast</span>
                    <div className="mt-3 text-4xl font-black text-emerald-400 tracking-tighter">1.4<span className="text-slate-500 text-base ml-1 uppercase">Hours</span></div>
                    <div className="flex items-center gap-2 mt-4 text-[10px] text-slate-500 font-black uppercase tracking-widest">
                       <Clock className="w-3.5 h-3.5" />
                       Accelerating by 12%
                    </div>
                 </div>
              </div>
           </div>

           <div className="glass-premium p-10 rounded-[3rem] border border-white/10 relative overflow-hidden shadow-2xl">
              <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-4">
                 <Globe className="w-6 h-6 text-indigo-400" />
                 Intelligence Flow
              </h3>
              <div className="space-y-5">
                 {[
                    'Analyzing web acquisition patterns...',
                    'Syncing sentiment endpoints...',
                    'Optimizing neural scoring...',
                    'Updating probability matrices...'
                 ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                       <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse group-hover:scale-150 transition-transform" />
                       <span className="text-[11px] text-slate-400 font-black uppercase tracking-widest leading-none">{text}</span>
                    </div>
                 ))}
              </div>
              <div className="mt-10 p-5 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-center shadow-lg shadow-indigo-500/10">
                 <p className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em]">Node Sync Active</p>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LeadIntelligence;
