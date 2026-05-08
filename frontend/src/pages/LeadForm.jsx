import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { 
  ArrowLeft, 
  Save, 
  User, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  UserCircle,
  Tag,
  DollarSign,
  Sparkles,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';

const LeadForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    source: 'Website',
    salesperson: 'Admin',
    status: 'New',
    deal_value: 0
  });

  useEffect(() => {
    if (isEdit) {
      const fetchLead = async () => {
        try {
          const response = await api.get(`leads/${id}/`);
          setFormData(response.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchLead();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`leads/${id}/`, formData);
      } else {
        await api.post('leads/', formData);
      }
      navigate('/leads');
    } catch (err) {
      console.error(err);
    }
  };

  const inputClass = "w-full bg-slate-900/40 border border-white/5 text-white pl-12 pr-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 transition-all font-bold text-sm placeholder:text-slate-600 appearance-none";
  const labelClass = "block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-10 pb-20"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 hover:text-white transition-all border border-white/5 group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-indigo-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Data Entry Point</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter">
              {isEdit ? 'Refine Opportunity' : 'Initialize Prospect'}
            </h1>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-premium p-10 rounded-[3rem] border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-[0.02]">
           <Info className="w-64 h-64 text-indigo-500" />
        </div>

        <div className="relative z-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {/* Lead Name */}
            <div className="space-y-2">
              <label className={labelClass}>Full Identity</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="text"
                  required
                  className={inputClass}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Malsha Rathnayake"
                />
              </div>
            </div>

            {/* Company */}
            <div className="space-y-2">
              <label className={labelClass}>Organization Entity</label>
              <div className="relative group">
                <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="text"
                  required
                  className={inputClass}
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="e.g. Uplift Solutions"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className={labelClass}>Communication Endpoint (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="email"
                  required
                  className={inputClass}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="client@uplift.lk"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className={labelClass}>Direct Dial (Phone)</label>
              <div className="relative group">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="tel"
                  required
                  className={inputClass}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+94 77 123 4567"
                />
              </div>
            </div>

            {/* Source */}
            <div className="space-y-2">
              <label className={labelClass}>Acquisition Channel</label>
              <div className="relative group">
                <Globe className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <select 
                  className={inputClass}
                  value={formData.source}
                  onChange={(e) => setFormData({...formData, source: e.target.value})}
                >
                  <option value="Website">Organic Website</option>
                  <option value="LinkedIn">Social Network (LinkedIn)</option>
                  <option value="Referral">Partner Referral</option>
                  <option value="Cold Email">Direct Outreach</option>
                  <option value="Event">Industry Event</option>
                </select>
              </div>
            </div>

            {/* Assigned Salesperson */}
            <div className="space-y-2">
              <label className={labelClass}>Account Manager</label>
              <div className="relative group">
                <UserCircle className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="text"
                  className={inputClass}
                  value={formData.salesperson}
                  onChange={(e) => setFormData({...formData, salesperson: e.target.value})}
                  placeholder="Specify agent..."
                />
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className={labelClass}>Pipeline Lifecycle Stage</label>
              <div className="relative group">
                <Tag className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <select 
                  className={inputClass}
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="New">New Discovery</option>
                  <option value="Contacted">First Outreach</option>
                  <option value="Qualified">Qualified Prospect</option>
                  <option value="Proposal Sent">Proposal Stage</option>
                  <option value="Won">Contract Won</option>
                  <option value="Lost">Contract Lost</option>
                </select>
              </div>
            </div>

            {/* Deal Value */}
            <div className="space-y-2">
              <label className={labelClass}>Estimated Valuation (Rs.)</label>
              <div className="relative group">
                <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="number"
                  required
                  className={inputClass}
                  value={formData.deal_value}
                  onChange={(e) => setFormData({...formData, deal_value: e.target.value})}
                  placeholder="5000"
                />
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-end gap-6">
            <button 
              type="button"
              onClick={() => navigate('/leads')}
              className="px-10 py-5 rounded-2xl font-black text-slate-400 hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest text-xs"
            >
              Abort Operation
            </button>
            <button 
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-12 py-5 rounded-2xl font-black transition-all shadow-2xl shadow-indigo-500/30 flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-white/10 -skew-x-[20deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700" />
              <Save className="w-5 h-5 stroke-[3]" />
              <span className="uppercase tracking-widest text-xs">
                {isEdit ? 'Commit Updates' : 'Authorize Ingestion'}
              </span>
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default LeadForm;
