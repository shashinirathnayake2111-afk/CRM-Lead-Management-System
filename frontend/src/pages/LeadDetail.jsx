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
  UserCircle
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
    <div className="flex items-center justify-center h-96">
      <div className="w-10 h-10 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/leads')}
            className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">{lead.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Building2 className="w-4 h-4 text-slate-500" />
              <span className="text-slate-400">{lead.company}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Link 
            to={`/leads/${id}/edit`}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-all flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Link>
          <button 
            onClick={handleDelete}
            className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl font-medium transition-all flex items-center gap-2 border border-red-500/20"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-dark p-6 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary-400" />
              Lead Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase font-semibold">Status</span>
                <span className="mt-1 text-primary-400 font-bold">{lead.status}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase font-semibold">Deal Value</span>
                <span className="mt-1 text-emerald-400 font-bold text-xl">${lead.deal_value.toLocaleString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase font-semibold">Salesperson</span>
                <div className="flex items-center gap-2 mt-1 text-slate-200">
                  <UserCircle className="w-4 h-4 text-slate-400" />
                  {lead.salesperson}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase font-semibold">Source</span>
                <span className="mt-1 text-slate-200">{lead.source}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-slate-500" />
                {lead.email}
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-slate-500" />
                {lead.phone}
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Calendar className="w-4 h-4 text-slate-500" />
                Created {new Date(lead.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Notes */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-dark p-6 rounded-3xl border border-white/5 flex flex-col h-full min-h-[500px]">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary-400" />
              Lead Notes
            </h3>

            <div className="flex-1 space-y-4 mb-8 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {notes.map((note) => (
                  <motion.div 
                    key={note._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-bold text-primary-400">{note.created_by}</span>
                      <span className="text-xs text-slate-500">
                        {new Date(note.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{note.content}</p>
                  </motion.div>
                ))}
                {notes.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-slate-500">No notes yet. Start the conversation!</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            <form onSubmit={handleAddNote} className="relative">
              <textarea
                placeholder="Add a follow-up note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 text-white p-4 rounded-2xl focus:outline-none focus:border-primary-500 transition-all resize-none h-32"
              />
              <button 
                type="submit"
                className="absolute bottom-4 right-4 bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-xl shadow-lg transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
