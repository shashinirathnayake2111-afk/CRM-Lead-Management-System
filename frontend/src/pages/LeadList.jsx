import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { 
  Plus, 
  Search, 
  Filter, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Building2,
  Mail,
  User,
  Globe,
  DollarSign,
  Calendar,
  MoreHorizontal,
  ArrowUpDown,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StatusBadge = ({ status }) => {
  const configs = {
    'New': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Contacted': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    'Qualified': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Proposal Sent': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    'Won': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Lost': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };
  
  return (
    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${configs[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
      {status}
    </span>
  );
};

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const navigate = useNavigate();
  
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await api.get('/leads/', {
        params: { 
          search, 
          status: statusFilter,
          source: sourceFilter
        }
      });
      setLeads(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchLeads();
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [search, statusFilter, sourceFilter]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Lifecycle Management</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Opportunities Pipeline</h1>
          <p className="text-slate-400 mt-2 font-medium">Capture, track, and optimize your high-intent prospects.</p>
        </div>
        
        <Link 
          to="/leads/new"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-3 group relative overflow-hidden"
        >
          <div className="absolute inset-0 w-1/2 h-full bg-white/10 -skew-x-[20deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700" />
          <Plus className="w-5 h-5 stroke-[3]" />
          <span className="uppercase tracking-widest text-xs">Initialize Lead</span>
        </Link>
      </div>

      {/* Control Bar */}
      <div className="glass-premium p-4 rounded-[2rem] border border-white/5 flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full max-w-xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text"
            placeholder="Filter by name, email, or company entity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900/40 border border-white/5 text-white pl-14 pr-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 transition-all font-bold text-sm placeholder:text-slate-600"
          />
        </div>
        
        <div className="flex gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-initial">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-900/40 border border-white/5 text-slate-300 pl-11 pr-10 py-4 rounded-2xl focus:outline-none focus:border-indigo-500/40 transition-all appearance-none cursor-pointer font-bold text-xs uppercase tracking-widest"
            >
              <option value="">All Lifecycle Stages</option>
              <option value="New">New Discovery</option>
              <option value="Contacted">First Outreach</option>
              <option value="Qualified">Qualified Prospect</option>
              <option value="Proposal Sent">Proposal Stage</option>
              <option value="Won">Contract Won</option>
              <option value="Lost">Contract Lost</option>
            </select>
          </div>

          <div className="relative flex-1 lg:flex-initial">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full bg-slate-900/40 border border-white/5 text-slate-300 pl-11 pr-10 py-4 rounded-2xl focus:outline-none focus:border-indigo-500/40 transition-all appearance-none cursor-pointer font-bold text-xs uppercase tracking-widest"
            >
              <option value="">All Acquisition Channels</option>
              <option value="Website">Organic Search</option>
              <option value="LinkedIn">Social Network</option>
              <option value="Referral">Partner Referral</option>
              <option value="Cold Email">Direct Outreach</option>
              <option value="Event">Industry Events</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="glass-premium rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
                <th className="px-10 py-6">
                   <div className="flex items-center gap-2">
                      Prospect Profile
                      <ArrowUpDown className="w-3 h-3" />
                   </div>
                </th>
                <th className="px-10 py-6">Intelligence</th>
                <th className="px-10 py-6">Lifecycle</th>
                <th className="px-10 py-6 text-right">Valuation</th>
                <th className="px-10 py-6 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-10 py-32 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                      <span className="text-sm font-bold text-slate-500 animate-pulse">Syncing pipeline data...</span>
                    </div>
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-10 py-32 text-center">
                    <div className="max-w-xs mx-auto space-y-4">
                       <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto text-slate-600">
                          <Search className="w-8 h-8" />
                       </div>
                       <p className="text-slate-500 font-bold">No matching prospects found in your current view.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                <AnimatePresence>
                  {leads.map((lead, idx) => (
                    <motion.tr 
                      key={lead.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-white/[0.03] transition-all group cursor-pointer"
                      onClick={() => navigate(`/leads/${lead.id}`)}
                    >
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-indigo-400 font-black text-lg group-hover:scale-110 transition-transform">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-white group-hover:text-indigo-400 transition-colors leading-tight">{lead.name}</p>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-tight">
                              <Building2 className="w-3 h-3" />
                              {lead.company}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="space-y-1.5">
                           <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                              <Mail className="w-3 h-3 text-slate-500" />
                              {lead.email}
                           </div>
                           <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                              <User className="w-3 h-3" />
                              {lead.salesperson || 'Unassigned'}
                           </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="px-10 py-6 text-right font-black text-white">
                        <div className="flex flex-col items-end">
                           <span className="text-emerald-400 tracking-tighter text-lg">${lead.deal_value?.toLocaleString()}</span>
                           <span className="text-[9px] text-slate-600 uppercase font-black tracking-widest">Est. Projection</span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex justify-end items-center gap-3">
                          <button 
                            className="p-3 bg-white/5 hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-400 rounded-xl transition-all border border-transparent hover:border-indigo-500/30"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-3 bg-white/5 hover:bg-white/10 text-slate-500 rounded-xl transition-all"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="p-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-black uppercase tracking-widest">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
             Pipeline Visibility: {leads.length} Records Active
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-xl disabled:opacity-20 transition-all border border-white/5" disabled>
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <div className="px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20 font-black">
               01
            </div>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-xl disabled:opacity-20 transition-all border border-white/5" disabled>
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LeadList;
