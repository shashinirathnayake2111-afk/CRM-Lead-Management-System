import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye, 
  Building2,
  Mail,
  Phone,
  DollarSign,
  Calendar,
  Zap,
  UserCircle,
  Clock,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StatusBadge = ({ status }) => {
  const configs = {
    'New': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    'Contacted': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    'Qualified': 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    'Proposal Sent': 'bg-pink-500/15 text-pink-400 border-pink-500/30',
    'Won': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    'Lost': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  };
  return (
    <span className={`px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-widest border shadow-sm ${configs[status] || 'bg-slate-500/15 text-slate-400 border-slate-500/30'}`}>
      {status}
    </span>
  );
};

const Management = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();

  const exampleLeads = [
    {
      id: 'mock-1',
      name: 'Chaminda Perera',
      company: 'Lanka Tech Solutions',
      email: 'chaminda@lankatech.lk',
      phone: '+94 77 123 4567',
      source: 'LinkedIn',
      assigned_to_name: 'Alex Thompson',
      status: 'Qualified',
      estimated_value: 1500000,
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'mock-2',
      name: 'Dilini Jayawardena',
      company: 'Oceanic Exports',
      email: 'dilini@oceanic.lk',
      phone: '+94 71 987 6543',
      source: 'Referral',
      assigned_to_name: 'Sarah Chen',
      status: 'Proposal Sent',
      estimated_value: 2800000,
      created_at: new Date(Date.now() - 86400000 * 12).toISOString(),
      updated_at: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 'mock-3',
      name: 'Kusal Mendis',
      company: 'Elite Real Estate',
      email: 'kusal@elitereal.com',
      phone: '+94 11 234 5678',
      source: 'Web Inquiry',
      assigned_to_name: 'Marcus Miller',
      status: 'New',
      estimated_value: 500000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const fetchLeads = async () => {
    try {
      const response = await api.get('/leads/');
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
    fetchLeads();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Confirm permanent deletion of this lead?')) {
      try {
        await api.delete(`/leads/${id}/`);
        fetchLeads();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await api.patch(`/leads/${id}/`, { status: newStatus });
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <div className="w-20 h-20 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin shadow-lg shadow-indigo-500/20" />
      <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-xs">Calibrating Workspace...</p>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12 pb-32 max-w-[1700px] mx-auto px-6"
    >
      {/* Premium Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-white/5 pb-12">
        <div>
          <div className="flex items-center gap-3 text-indigo-400 mb-4">
            <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.5em]">Executive Dashboard</span>
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter leading-tight">
            Lead <span className="text-indigo-500">Orchestration</span>
          </h1>
          <p className="text-slate-400 mt-4 text-lg font-medium max-w-2xl leading-relaxed">
            Manage the entire lead lifecycle with precision. Use the master console to create, update, and audit your high-value opportunities.
          </p>
        </div>
        
        <button 
          onClick={() => navigate('/leads/new')}
          className="group flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-[2rem] shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all duration-300 font-black text-sm uppercase tracking-widest"
        >
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
          Initialize Lead
        </button>
      </div>

      {/* Control Panel */}
      <div className="flex flex-col xl:flex-row gap-8 items-stretch">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 group-focus-within:text-indigo-400 transition-all duration-300" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads by name, company, or email..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-3xl pl-16 pr-8 py-6 text-base font-bold text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all placeholder:text-slate-600 shadow-inner"
          />
        </div>
        
        <div className="flex items-center gap-6 bg-white/[0.03] p-3 rounded-[2rem] border border-white/10">
           <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/5">
             <Filter className="w-5 h-5 text-indigo-400" />
             <select 
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
               className="bg-transparent text-xs font-black text-white uppercase tracking-[0.2em] outline-none pr-8 cursor-pointer"
             >
                <option value="All">All Pipelines</option>
                <option value="New">New Stream</option>
                <option value="Contacted">Outreach</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Negotiation</option>
                <option value="Won">Closed Won</option>
                <option value="Lost">Closed Lost</option>
             </select>
          </div>
          
          <div className="h-8 w-px bg-white/10 hidden xl:block" />
          
          <div className="flex items-center gap-2 px-4">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Leads:</span>
             <span className="text-sm font-black text-indigo-400">{filteredLeads.length}</span>
          </div>
        </div>
      </div>

      {/* Orchestration Table */}
      <div className="glass-premium rounded-[3rem] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] relative overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-500/20 scrollbar-track-transparent">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-white/[0.04] text-slate-400 text-[10px] uppercase font-black tracking-[0.2em] border-b border-white/5">
                <th className="px-6 py-6 sticky left-0 bg-[#020617] z-20">Prospect</th>
                <th className="px-6 py-6">Contact</th>
                <th className="px-6 py-6">Intelligence</th>
                <th className="px-6 py-6">Value</th>
                <th className="px-6 py-6">Status</th>
                <th className="px-6 py-6 text-right sticky right-0 bg-[#020617] z-20 border-l border-white/5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              <AnimatePresence mode="popLayout">
                {filteredLeads.map((lead, idx) => (
                  <motion.tr 
                    key={lead.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="hover:bg-white/[0.04] transition-all duration-300 group relative"
                  >
                    <td className="px-6 py-8 sticky left-0 bg-[#020617] z-10">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-indigo-400 font-black text-lg shadow-lg group-hover:scale-110 transition-transform">
                           {lead.name.charAt(0)}
                        </div>
                        <div>
                           <p className="text-sm font-black text-white group-hover:text-indigo-400 transition-colors leading-tight mb-1">{lead.name}</p>
                           <div className="flex items-center gap-1.5">
                              <Building2 className="w-3 h-3 text-slate-600" />
                              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{lead.company}</p>
                           </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-8">
                       <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                             <Mail className="w-3 h-3 text-slate-500" />
                             <span className="text-[11px] font-bold text-slate-400">{lead.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <Phone className="w-3 h-3 text-slate-500" />
                             <span className="text-[11px] font-bold text-slate-400">{lead.phone}</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-8">
                       <div className="space-y-2">
                          <div className="flex items-center gap-2">
                             <Zap className="w-3 h-3 text-amber-500" />
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lead.source || 'Direct'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <UserCircle className="w-3 h-3 text-indigo-400" />
                             <span className="text-[10px] font-black text-indigo-400/70 uppercase tracking-widest">{lead.assigned_to_name || 'System'}</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-8">
                       <div className="flex items-baseline gap-1 text-emerald-400 font-black text-lg tracking-tighter">
                          <DollarSign className="w-4 h-4 text-emerald-500/50" />
                          <span>{(lead.estimated_value || 0).toLocaleString()}</span>
                       </div>
                    </td>
                    <td className="px-6 py-8">
                       <div className="relative group/status mb-2">
                          <StatusBadge status={lead.status} />
                          <div className="absolute top-full left-0 mt-3 bg-[#0f172a] border border-white/10 rounded-2xl shadow-3xl p-3 opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible transition-all z-50 min-w-[180px] backdrop-blur-xl">
                             <p className="px-3 pb-2 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 mb-2">Change Lifecycle</p>
                             {['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'].map(s => (
                                <button 
                                  key={s}
                                  onClick={() => handleStatusUpdate(lead.id, s)}
                                  className="w-full text-left px-3 py-2.5 hover:bg-white/5 rounded-xl text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest flex items-center justify-between group/item"
                                >
                                   {s}
                                   <ChevronRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                </button>
                             ))}
                          </div>
                       </div>
                       <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-3.5 h-3.5 text-slate-600" />
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Sync: {new Date(lead.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                       </div>
                    </td>
                    <td className="px-6 py-8 text-right sticky right-0 bg-[#020617] z-10 border-l border-white/5">
                       <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => navigate(`/leads/${lead.id}`)}
                            className="p-3 bg-white/5 hover:bg-indigo-500/20 text-slate-500 hover:text-indigo-400 rounded-xl transition-all border border-white/5 hover:border-indigo-500/20"
                          >
                             <Eye className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => navigate(`/leads/${lead.id}/edit`)}
                            className="p-3 bg-white/5 hover:bg-amber-500/20 text-slate-500 hover:text-amber-400 rounded-xl transition-all border border-white/5 hover:border-amber-500/20"
                          >
                             <Edit2 className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(lead.id)}
                            className="p-3 bg-white/5 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 rounded-xl transition-all border border-white/5 hover:border-rose-500/20"
                          >
                             <Trash2 className="w-4.5 h-4.5" />
                          </button>
                       </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {filteredLeads.length === 0 && (
          <div className="p-20 text-center">
             <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                <Search className="w-10 h-10 text-slate-600" />
             </div>
             <h3 className="text-2xl font-black text-white mb-2">No Leads Identified</h3>
             <p className="text-slate-500 font-medium max-w-sm mx-auto">Adjust your filters or search parameters to locate the desired opportunities.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Management;
