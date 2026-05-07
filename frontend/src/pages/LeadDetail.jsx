import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  MessageSquare, 
  Send,
  Calendar,
  Building2,
  Mail,
  Phone,
  Tag,
  DollarSign,
  UserCircle,
  Clock,
  Globe,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [leadRes, notesRes] = await Promise.all([
        api.get(`/leads/${id}/`),
        api.get(`/leads/${id}/notes/`)
      ]);
      setLead(leadRes.data);
      setNotes(notesRes.data);
    } catch (err) {
      console.error(err);
      navigate('/leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    try {
      await api.post(`/leads/${id}/notes/`, { content: newNote });
      setNewNote('');
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
      try {
        await api.delete(`/leads/${id}/`);
        navigate('/leads');
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      <p className="text-slate-500 font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Accessing Data...</p>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1400px] mx-auto space-y-10 pb-20 px-4"
    >
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/leads')}
            className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 hover:text-white transition-all border border-white/5 group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-indigo-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Detailed Intelligence</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter flex items-center gap-3">
              {lead.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Building2 className="w-4 h-4 text-slate-500" />
              <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">{lead.company}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 w-full lg:w-auto">
          <Link 
            to={`/leads/${id}/edit`}
            className="flex-1 lg:flex-none px-8 py-4 bg-white/5 hover:bg-indigo-500/10 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-3 border border-white/5 hover:border-indigo-500/20 uppercase tracking-widest text-xs"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </Link>
          <button 
            onClick={handleDelete}
            className="flex-1 lg:flex-none px-8 py-4 bg-rose-500/5 hover:bg-rose-500/10 text-rose-400 rounded-2xl font-black transition-all flex items-center justify-center gap-3 border border-rose-500/10 hover:border-rose-500/20 uppercase tracking-widest text-xs"
          >
            <Trash2 className="w-4 h-4" />
            Terminate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Intelligence Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass-premium p-8 rounded-[2.5rem] border border-white/5 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
               <Tag className="w-32 h-32 text-indigo-500" />
            </div>

            <h3 className="text-xl font-black text-white flex items-center gap-3 relative z-10">
              <Info className="w-5 h-5 text-indigo-400" />
              Core Metrics
            </h3>
            
            <div className="grid grid-cols-1 gap-6 relative z-10">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Pipeline Status</span>
                <div className="mt-2 flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full animate-pulse ${
                     lead.status === 'Won' ? 'bg-emerald-500' : 
                     lead.status === 'Lost' ? 'bg-rose-500' : 'bg-indigo-500'
                   }`} />
                   <span className="text-indigo-400 font-black uppercase text-xs tracking-widest">{lead.status}</span>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Projected Revenue</span>
                <div className="mt-1 text-emerald-400 font-black text-3xl tracking-tighter">
                   ${lead.deal_value?.toLocaleString()}
                </div>
              </div>

              <div className="space-y-4 pt-4">
                 <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Assignee</span>
                    <div className="flex items-center gap-2 text-white font-bold">
                       <UserCircle className="w-4 h-4 text-indigo-400" />
                       {lead.salesperson}
                    </div>
                 </div>
                 <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Source</span>
                    <div className="flex items-center gap-2 text-white font-bold">
                       <Globe className="w-4 h-4 text-indigo-400" />
                       {lead.source}
                    </div>
                 </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 space-y-4 relative z-10">
              <div className="flex items-center gap-4 text-slate-300 group cursor-pointer hover:text-indigo-400 transition-colors">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-indigo-500/20">
                   <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[9px] text-slate-500 uppercase font-black">Email Endpoint</span>
                   <span className="text-sm font-bold">{lead.email}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-slate-300 group cursor-pointer hover:text-indigo-400 transition-colors">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-indigo-500/20">
                   <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[9px] text-slate-500 uppercase font-black">Voice Channel</span>
                   <span className="text-sm font-bold">{lead.phone}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                 <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    <Calendar className="w-3 h-3" />
                    Ingested: {new Date(lead.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                 </div>
                 <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    <Clock className="w-3 h-3" />
                    Last Sync: {new Date(lead.updated_at || lead.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Flow (Notes) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="glass-premium rounded-[3rem] border border-white/5 flex flex-col h-[700px] shadow-2xl relative overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 border border-indigo-500/20">
                     <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                     <h3 className="text-xl font-black text-white tracking-tight">Timeline Narrative</h3>
                     <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-0.5">{notes.length} Intelligence Briefs Recorded</p>
                  </div>
               </div>
            </div>

            <div className="flex-1 p-8 space-y-6 overflow-y-auto custom-scrollbar bg-slate-950/20">
              <AnimatePresence initial={false}>
                {notes.map((note, idx) => (
                  <motion.div 
                    key={note.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col space-y-2 max-w-[85%]"
                  >
                    <div className="flex items-center gap-3 ml-2">
                       <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{note.created_by || 'System Agent'}</span>
                       <span className="text-[9px] text-slate-600 font-bold uppercase tracking-tighter">
                          {new Date(note.created_at).toLocaleString(undefined, { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}
                       </span>
                    </div>
                    <div className="p-5 bg-white/5 border border-white/5 rounded-[1.5rem] rounded-tl-none text-slate-200 leading-relaxed text-sm font-medium shadow-xl">
                       {note.content}
                    </div>
                  </motion.div>
                ))}
                
                {notes.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full opacity-30 gap-4">
                     <div className="p-6 bg-white/5 rounded-full border border-white/5">
                        <MessageSquare className="w-12 h-12 text-slate-500" />
                     </div>
                     <p className="text-slate-500 font-black uppercase tracking-widest text-xs">No entries found in timeline.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-8 border-t border-white/5 bg-white/[0.01]">
              <form onSubmit={handleAddNote} className="relative flex items-center gap-4">
                <div className="relative flex-1">
                   <textarea
                     placeholder="Capture a new intelligence entry..."
                     value={newNote}
                     onChange={(e) => setNewNote(e.target.value)}
                     className="w-full bg-slate-900/50 border border-white/5 text-white pl-6 pr-16 py-5 rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 transition-all resize-none h-18 font-bold text-sm placeholder:text-slate-600 custom-scrollbar"
                   />
                   <button 
                     type="submit"
                     disabled={!newNote.trim()}
                     className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-800 disabled:opacity-50 text-white p-4 rounded-2xl shadow-xl shadow-indigo-500/20 transition-all group"
                   >
                     <ArrowRight className="w-5 h-5 stroke-[3] group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LeadDetail;
