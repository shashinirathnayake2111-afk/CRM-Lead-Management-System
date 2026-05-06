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
  DollarSign
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
          const response = await api.get(`/leads/${id}/`);
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
        await api.put(`/leads/${id}/`, formData);
      } else {
        await api.post('/leads/', formData);
      }
      navigate('/leads');
    } catch (err) {
      console.error(err);
    }
  };

  const inputClass = "w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-primary-500 transition-all";
  const labelClass = "block text-sm font-medium text-slate-400 mb-2 ml-1";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {isEdit ? 'Edit Lead' : 'Create New Lead'}
          </h1>
          <p className="text-slate-400 mt-1">
            {isEdit ? 'Update details for ' + formData.name : 'Enter lead information to add to the pipeline.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-dark p-8 rounded-3xl border border-white/5 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Lead Name */}
          <div className="space-y-2">
            <label className={labelClass}>Lead Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text"
                required
                className={inputClass}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Company */}
          <div className="space-y-2">
            <label className={labelClass}>Company Name</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text"
                required
                className={inputClass}
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder="Acme Corp"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className={labelClass}>Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="email"
                required
                className={inputClass}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className={labelClass}>Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="tel"
                required
                className={inputClass}
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          {/* Source */}
          <div className="space-y-2">
            <label className={labelClass}>Lead Source</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <select 
                className={inputClass + " appearance-none"}
                value={formData.source}
                onChange={(e) => setFormData({...formData, source: e.target.value})}
              >
                <option value="Website">Website</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Referral">Referral</option>
                <option value="Cold Email">Cold Email</option>
                <option value="Event">Event</option>
              </select>
            </div>
          </div>

          {/* Assigned Salesperson */}
          <div className="space-y-2">
            <label className={labelClass}>Assigned Salesperson</label>
            <div className="relative">
              <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text"
                className={inputClass}
                value={formData.salesperson}
                onChange={(e) => setFormData({...formData, salesperson: e.target.value})}
                placeholder="Assigned to..."
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className={labelClass}>Status</label>
            <div className="relative">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <select 
                className={inputClass + " appearance-none"}
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
          </div>

          {/* Deal Value */}
          <div className="space-y-2">
            <label className={labelClass}>Estimated Deal Value ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
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

        <div className="pt-6 border-t border-white/5 flex justify-end gap-4">
          <button 
            type="button"
            onClick={() => navigate('/leads')}
            className="px-6 py-3 rounded-xl font-medium text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary-500/20 flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {isEdit ? 'Update Lead' : 'Create Lead'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
