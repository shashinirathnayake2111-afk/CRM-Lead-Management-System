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
  MoreHorizontal, 
  ArrowUpDown, 
  Sparkles,
  Zap,
  Edit2,
  Trash2,
  Eye,
  MessageSquare,
  XCircle,
  Send
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
    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border ${configs[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
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
  const [salespersonFilter, setSalespersonFilter] = useState('');
  const navigate = useNavigate();

  const exampleLeads = [
    { id: 'e-1', name: 'Chaminda Perera', company: 'Lanka Tech Solutions', email: 'chaminda@lankatech.lk', salesperson: 'Admin', status: 'Qualified', deal_value: 75000, created_at: new Date().toISOString() },
    { id: 'e-2', name: 'Dilini Jayawardena', company: 'Oceanic Exports', email: 'dilini@oceanic.com', salesperson: 'Admin', status: 'Proposal Sent', deal_value: 120000, created_at: new Date().toISOString() },
    { id: 'e-3', name: 'Kusal Mendis', company: 'Elite Real Estate', email: 'kusal@elitere.lk', salesperson: 'Unassigned', status: 'New', deal_value: 45000, created_at: new Date().toISOString() },
    { id: 'e-4', name: 'Nirosha Silva', company: 'Colombo Retailers', email: 'nirosha@colomboretail.lk', salesperson: 'Admin', status: 'Contacted', deal_value: 28000, created_at: new Date().toISOString() },
    { id: 'e-5', name: 'Ranil Wickrama', company: 'Kandy Hospitality', email: 'ranil@kandyhosp.lk', salesperson: 'Admin', status: 'Won', deal_value: 210000, created_at: new Date().toISOString() }
  ];
  
  const [noteModal, setNoteModal] = useState({ open: false, leadId: null, leadName: '' });
  const [noteContent, setNoteContent] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await api.get('/leads/', {
        params: { 
          search, 
          status: statusFilter,
          source: sourceFilter,
          salesperson: salespersonFilter
        }
      });
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

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteContent.trim()) return;
    setSubmittingNote(true);
    try {
      await api.post(`/leads/${noteModal.leadId}/notes/`, { content: noteContent });
      setNoteContent('');
      setNoteModal({ open: false, leadId: null, leadName: '' });
      alert('Intelligence entry recorded successfully.');
    } catch (err) {
      console.error(err);
      alert('Failed to record intelligence entry.');
    } finally {
      setSubmittingNote(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm('Terminate this lead record? This action is irreversible.')) {
      try {
        await api.delete(`/leads/${id}/`);
        fetchLeads();
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchLeads();
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [search, statusFilter, sourceFilter, salespersonFilter]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12 pb-32 max-w-[1700px] mx-auto px-6"
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-white/5 pb-12">
        <div>
          <div className="flex items-center gap-3 text-indigo-400 mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-[0.5em]">Pipeline Intelligence</span>
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter leading-tight">
            Opportunities <span className="text-indigo-500">Stream</span>
          </h1>
          <p className="text-slate-400 mt-4 text-lg font-medium max-w-2xl leading-relaxed">
            Autonomous tracking of your high-intent prospects. Optimize your conversion yields with precision monitoring.
          </p>
        </div>
        
        <Link 
          to="/leads/new"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-10 py-5 rounded-[2rem] font-black transition-all shadow-2xl shadow-indigo-500/30 flex items-center gap-4 group relative overflow-hidden uppercase tracking-widest text-sm"
        >
          <Plus className="w-6 h-6 stroke-[3] group-hover:rotate-90 transition-transform duration-500" />
          Initialize Lead
        </Link>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col xl:flex-row gap-8 items-stretch">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 group-focus-within:text-indigo-400 transition-all duration-300" />
          <input 
            type="text"
            placeholder="Filter by name, email, or company entity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-3xl pl-16 pr-8 py-6 text-base font-bold text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all placeholder:text-slate-600 shadow-inner"
          />
        </div>
        
        <div className="flex items-center gap-6 bg-white/[0.03] p-3 rounded-[2rem] border border-white/10">
          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/5">
            <Filter className="w-5 h-5 text-indigo-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-900/50 text-xs font-black text-white uppercase tracking-[0.2em] outline-none pr-8 cursor-pointer border-none"
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

          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/5">
            <Globe className="w-5 h-5 text-indigo-400" />
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="bg-slate-900/50 text-xs font-black text-white uppercase tracking-[0.2em] outline-none pr-8 cursor-pointer border-none"
            >
              <option value="">All Acquisition Channels</option>
              <option value="Website">Organic Search</option>
              <option value="LinkedIn">Social Network</option>
              <option value="Referral">Partner Referral</option>
              <option value="Cold Email">Direct Outreach</option>
              <option value="Event">Industry Events</option>
            </select>
          </div>

          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/5">
            <User className="w-5 h-5 text-indigo-400" />
            <select
              value={salespersonFilter}
              onChange={(e) => setSalespersonFilter(e.target.value)}
              className="bg-slate-900/50 text-xs font-black text-white uppercase tracking-[0.2em] outline-none pr-8 cursor-pointer border-none"
            >
              <option value="">All Account Managers</option>
              <option value="Admin">Executive Admin</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Unassigned">Unassigned Pool</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="glass-premium rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.04] text-slate-400 text-[10px] uppercase font-black tracking-[0.3em] border-b border-white/5">
                <th className="px-8 py-6">
                   <div className="flex items-center gap-2">
                      Prospect Profile
                      <ArrowUpDown className="w-3 h-3 text-indigo-500/50" />
                   </div>
                </th>
                <th className="px-8 py-6">Intelligence</th>
                <th className="px-8 py-6 text-center">Lifecycle</th>
                <th className="px-8 py-6 text-right">Valuation</th>
                <th className="px-8 py-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-10 py-40 text-center">
                    <div className="flex flex-col items-center gap-6">
                      <div className="w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin shadow-lg shadow-indigo-500/20" />
                      <span className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] animate-pulse">Syncing pipeline data...</span>
                    </div>
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-10 py-40 text-center">
                    <div className="max-w-sm mx-auto space-y-6">
                       <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto text-slate-700 border border-white/5">
                          <Search className="w-10 h-10" />
                       </div>
                       <div>
                          <p className="text-white font-black uppercase tracking-widest text-sm">No results found</p>
                          <p className="text-slate-500 font-bold mt-2 text-xs">Adjust your filters to locate the required prospect data.</p>
                       </div>
                    </div>
                  </td>
                </tr>
              ) : (
                <AnimatePresence>
                  {leads.map((lead, idx) => (
                    <motion.tr 
                      key={lead.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="hover:bg-white/[0.04] transition-all duration-300 group cursor-pointer"
                      onClick={() => navigate(`/leads/${lead.id}`)}
                    >
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-indigo-400 font-black text-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-white group-hover:text-indigo-400 transition-colors leading-tight text-base mb-1">{lead.name}</p>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                              <Building2 className="w-3.5 h-3.5 text-indigo-400/50" />
                              {lead.company}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="space-y-2">
                           <div className="flex items-center gap-2.5 text-sm text-slate-300 font-bold tracking-tight">
                              <Mail className="w-4 h-4 text-slate-500" />
                              {lead.email}
                           </div>
                           <div className="flex items-center gap-2.5 text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                              <User className="w-4 h-4 text-indigo-400/50" />
                              {lead.salesperson || 'Unassigned'}
                           </div>
                        </div>
                      </td>
                      <td className="px-8 py-8 text-center">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="px-8 py-8 text-right">
                        <div className="flex flex-col items-end">
                           <span className="text-emerald-400 font-black text-2xl tracking-tighter">Rs. {(lead.deal_value || 0).toLocaleString()}</span>
                           <span className="text-[10px] text-slate-600 uppercase font-black tracking-[0.3em] mt-1">Est. Projection</span>
                        </div>
                      </td>
                      <td className="px-8 py-8 text-right">
                        <div className="flex justify-end items-center gap-4">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setNoteModal({ open: true, leadId: lead.id, leadName: lead.name });
                            }}
                            title="Lead Note"
                            className="p-4 bg-white/5 hover:bg-emerald-500/20 text-slate-500 hover:text-emerald-400 rounded-2xl transition-all border border-white/10 hover:border-emerald-500/20"
                          >
                             <MessageSquare className="w-5 h-5" />
                          </button>
                          
                          <div className="flex items-center gap-2">
                             <button 
                               onClick={(e) => {
                                 e.stopPropagation();
                                 navigate(`/leads/${lead.id}/edit`);
                               }}
                               className="p-4 bg-white/5 hover:bg-indigo-500/20 text-slate-500 hover:text-indigo-400 rounded-2xl transition-all border border-white/10"
                             >
                                <Edit2 className="w-5 h-5" />
                             </button>
                             <button 
                               onClick={(e) => handleDelete(e, lead.id)}
                               className="p-4 bg-white/5 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 rounded-2xl transition-all border border-white/10"
                             >
                                <Trash2 className="w-5 h-5" />
                             </button>
                          </div>
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
        <div className="p-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-8 text-[11px] text-slate-500 font-black uppercase tracking-[0.3em] bg-white/[0.01]">
          <div className="flex items-center gap-4">
             <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
             Pipeline Visibility: {leads.length} Records Active
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-3 px-6 py-3 hover:bg-white/5 rounded-2xl disabled:opacity-20 transition-all border border-white/10 font-black uppercase tracking-[0.2em]" disabled>
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            <div className="px-6 py-3 bg-indigo-500 text-white rounded-2xl font-black shadow-lg shadow-indigo-500/20">
               01
            </div>
            <button className="flex items-center gap-3 px-6 py-3 hover:bg-white/5 rounded-2xl disabled:opacity-20 transition-all border border-white/10 font-black uppercase tracking-[0.2em]" disabled>
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Note Modal */}
      <AnimatePresence>
        {noteModal.open && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNoteModal({ open: false, leadId: null, leadName: '' })}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-10 shadow-3xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
                <MessageSquare className="w-40 h-40 text-indigo-500" />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="flex items-center gap-2 text-indigo-400 mb-2">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em]">Narrative Entry</span>
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight">Lead Note</h3>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Prospect: {noteModal.leadName}</p>
                  </div>
                  <button 
                    onClick={() => setNoteModal({ open: false, leadId: null, leadName: '' })}
                    className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-500 hover:text-white"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleAddNote} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Narrative Content</label>
                    <textarea 
                      autoFocus
                      required
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      placeholder="Capture meeting minutes or interaction details..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all min-h-[150px] resize-none placeholder:text-slate-700"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={submittingNote || !noteContent.trim()}
                    className="w-full py-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 disabled:opacity-50 transition-all active:scale-95"
                  >
                    {submittingNote ? (
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Authorize Entry
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LeadList;
