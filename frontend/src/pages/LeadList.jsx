import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  User,
  Building2,
  Mail,
  Phone,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StatusBadge = ({ status }) => {
  const colors = {
    'New': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Contacted': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    'Qualified': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Proposal Sent': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    'Won': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Lost': 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, statusFilter, sourceFilter, salespersonFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Leads</h1>
          <p className="text-slate-400 mt-1">Manage and track your sales opportunities.</p>
        </div>
        <Link 
          to="/leads/new"
          className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-primary-500/20 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Lead
        </Link>
      </div>

      <div className="glass-dark rounded-3xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text"
              placeholder="Search leads, companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-primary-500 transition-all"
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-900/50 border border-slate-700 text-slate-300 pl-11 pr-8 py-2.5 rounded-xl focus:outline-none focus:border-primary-500 transition-all appearance-none cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="bg-slate-900/50 border border-slate-700 text-slate-300 pl-11 pr-8 py-2.5 rounded-xl focus:outline-none focus:border-primary-500 transition-all appearance-none cursor-pointer"
              >
                <option value="">All Sources</option>
                <option value="Website">Website</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Referral">Referral</option>
                <option value="Cold Email">Cold Email</option>
                <option value="Event">Event</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-500 text-sm border-b border-white/5">
                <th className="px-8 py-4 font-semibold">Lead Details</th>
                <th className="px-8 py-4 font-semibold">Company</th>
                <th className="px-8 py-4 font-semibold">Status</th>
                <th className="px-8 py-4 font-semibold">Value</th>
                <th className="px-8 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-300 divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-8 py-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-8 h-8 border-2 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
                      <span className="text-sm text-slate-500">Loading leads...</span>
                    </div>
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-12 text-center text-slate-500">
                    No leads found matching your filters.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-primary-400 font-bold border border-white/5">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{lead.name}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <Mail className="w-3 h-3" />
                            {lead.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="w-4 h-4 text-slate-500" />
                        {lead.company}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-8 py-5 font-medium text-white">
                      ${lead.deal_value.toLocaleString()}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Link 
                          to={`/leads/${lead.id}`}
                          className="p-2 hover:bg-primary-500/10 text-slate-400 hover:text-primary-400 rounded-lg transition-all"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-white/5 flex items-center justify-between text-sm text-slate-500">
          <p>Showing {leads.length} leads</p>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-800 rounded-lg disabled:opacity-30" disabled>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-slate-800 rounded-lg disabled:opacity-30" disabled>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadList;
