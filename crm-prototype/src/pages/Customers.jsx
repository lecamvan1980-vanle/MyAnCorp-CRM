import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

function CustomerModal({ isOpen, onClose, onSave, lead, profiles, currentUser }) {
  const [formData, setFormData] = useState({
    customer_name: '',
    company_name: '',
    contact_phone: '',
    segment: 'retail',
    estimated_value: 0,
    owner_id: currentUser?.id || '',
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        customer_name: lead.customer_name || '',
        company_name: lead.company_name || '',
        contact_phone: lead.contact_phone || '',
        segment: lead.segment || 'retail',
        estimated_value: lead.estimated_value || 0,
        owner_id: lead.owner_id || currentUser?.id || '',
      });
    } else {
      setFormData({
        customer_name: '',
        company_name: '',
        contact_phone: '',
        segment: 'retail',
        estimated_value: 0,
        owner_id: currentUser?.id || '',
      });
    }
  }, [lead, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-surface rounded-xl shadow-lg w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
          <h3 className="text-headline-sm font-headline-sm text-on-surface">
            {lead ? 'Sửa Khách hàng' : 'Thêm Khách hàng mới'}
          </h3>
          <button type="button" onClick={onClose} className="text-on-surface-variant hover:text-on-surface transition-colors p-1 rounded-md hover:bg-surface-container-high">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-label-md font-label-md text-on-surface-variant mb-1">Tên khách hàng / người liên hệ *</label>
            <input required type="text" className="w-full px-4 py-2.5 border border-outline-variant rounded-lg focus:border-myan-primary focus:ring-1 focus:ring-myan-primary outline-none text-body-md transition-all" value={formData.customer_name} onChange={e => setFormData({...formData, customer_name: e.target.value})} placeholder="Vd: Nguyễn Văn A" />
          </div>
          <div>
            <label className="block text-label-md font-label-md text-on-surface-variant mb-1">Tên công ty / Cơ sở y tế</label>
            <input type="text" className="w-full px-4 py-2.5 border border-outline-variant rounded-lg focus:border-myan-primary focus:ring-1 focus:ring-myan-primary outline-none text-body-md transition-all" value={formData.company_name} onChange={e => setFormData({...formData, company_name: e.target.value})} placeholder="Vd: Bệnh viện Chợ Rẫy" />
          </div>
          <div>
            <label className="block text-label-md font-label-md text-on-surface-variant mb-1">Số điện thoại</label>
            <input type="text" className="w-full px-4 py-2.5 border border-outline-variant rounded-lg focus:border-myan-primary focus:ring-1 focus:ring-myan-primary outline-none text-body-md transition-all" value={formData.contact_phone} onChange={e => setFormData({...formData, contact_phone: e.target.value})} placeholder="090..." />
          </div>
          <div>
            <label className="block text-label-md font-label-md text-on-surface-variant mb-1">Giá trị dự kiến (VNĐ)</label>
            <input type="number" className="w-full px-4 py-2.5 border border-outline-variant rounded-lg focus:border-myan-primary focus:ring-1 focus:ring-myan-primary outline-none text-body-md transition-all" value={formData.estimated_value} onChange={e => setFormData({...formData, estimated_value: e.target.value})} placeholder="Vd: 10000000" />
          </div>
          <div>
            <label className="block text-label-md font-label-md text-on-surface-variant mb-1">Phân khúc *</label>
            <select className="w-full px-4 py-2.5 border border-outline-variant rounded-lg focus:border-myan-primary focus:ring-1 focus:ring-myan-primary outline-none text-body-md transition-all bg-white" value={formData.segment} onChange={e => setFormData({...formData, segment: e.target.value})}>
              <option value="retail">Khách lẻ</option>
              <option value="dealer">Đại lý</option>
              <option value="vip">VIP</option>
            </select>
          </div>
          <div>
            <label className="block text-label-md font-label-md text-on-surface-variant mb-1">Người phụ trách</label>
            <select className="w-full px-4 py-2.5 border border-outline-variant rounded-lg focus:border-myan-primary focus:ring-1 focus:ring-myan-primary outline-none text-body-md transition-all bg-white" value={formData.owner_id} onChange={e => setFormData({...formData, owner_id: e.target.value})}>
              {profiles.map(p => (
                <option key={p.id} value={p.id}>{p.full_name || p.email}</option>
              ))}
            </select>
          </div>
          
          <div className="pt-6 flex justify-end gap-3 border-t border-outline-variant mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2.5 border border-outline-variant text-on-surface hover:bg-surface-container-high rounded-lg text-label-md font-label-md transition-colors">Hủy</button>
            <button type="submit" className="px-5 py-2.5 bg-myan-primary hover:bg-primary-container text-white rounded-lg text-label-md font-label-md shadow-sm transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">save</span>
              Lưu thông tin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Customers() {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('');
  const [profiles, setProfiles] = useState([]);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);

  useEffect(() => {
    if (user) {
      fetchLeads();
      fetchProfiles();
    }
  }, [user, searchQuery, segmentFilter]);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('id, full_name, email');
      if (error) throw error;
      setProfiles(data);
    } catch (error) {
      console.error('Error fetching profiles:', error.message);
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      let query = supabase.from('leads').select('*, profiles:owner_id(full_name)').order('created_at', { ascending: false });
      
      if (segmentFilter) {
        query = query.eq('segment', segmentFilter);
      }
      if (searchQuery) {
        query = query.or(`customer_name.ilike.%${searchQuery}%,company_name.ilike.%${searchQuery}%`);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLead = async (formData) => {
    try {
      if (editingLead) {
        // Update
        const { error } = await supabase.from('leads').update({
          ...formData,
          owner_id: formData.owner_id || user.id
        }).eq('id', editingLead.id);
        if (error) throw error;
      } else {
        // Create
        const { error } = await supabase.from('leads').insert([{
          ...formData,
          owner_id: formData.owner_id || user.id
        }]);
        if (error) throw error;
      }
      setIsModalOpen(false);
      fetchLeads(); // Refresh list
    } catch (error) {
      alert("Lỗi khi lưu khách hàng: " + error.message);
    }
  };

  const openAddModal = () => {
    setEditingLead(null);
    setIsModalOpen(true);
  };

  const openEditModal = (lead) => {
    setEditingLead(lead);
    setIsModalOpen(true);
  };

  const getSegmentBadge = (segment) => {
    if (segment === 'vip') return <span className="px-3 py-1 bg-[#F0FDF4] text-[#166534] text-[11px] font-bold rounded-full uppercase tracking-wider border border-[#DCFCE7] whitespace-nowrap">VIP</span>;
    if (segment === 'dealer') return <span className="px-3 py-1 bg-[#FEFCE8] text-[#854d0e] text-[11px] font-bold rounded-full uppercase tracking-wider border border-[#FEF9C3] whitespace-nowrap">Đại lý</span>;
    return <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant text-[11px] font-bold rounded-full uppercase tracking-wider border border-outline-variant whitespace-nowrap">Khách lẻ</span>;
  };

  return (
    <div className="p-container-padding space-y-6 relative">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-display-md font-display-md text-on-surface">Khách hàng</h2>
          <p className="text-body-md text-on-surface-variant">Quản lý và theo dõi thông tin đối tác y tế</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 border border-outline text-on-surface-variant px-4 py-2 rounded-lg hover:bg-surface-container-high transition-colors font-label-md text-label-md bg-white">
            <span className="material-symbols-outlined text-[18px]">upload</span>
            Upload CSV
          </button>
          <button className="flex items-center gap-2 border border-outline text-on-surface-variant px-4 py-2 rounded-lg hover:bg-surface-container-high transition-colors font-label-md text-label-md bg-white">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Xuất CSV
          </button>
          <button onClick={openAddModal} className="flex items-center gap-2 bg-myan-primary text-white px-5 py-2.5 rounded-lg hover:opacity-90 transition-all shadow-sm font-label-md text-label-md">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Thêm khách hàng
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[240px] relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-body-md focus:border-myan-primary focus:ring-1 focus:ring-myan-primary outline-none transition-all" 
            placeholder="Tìm tên khách hàng hoặc công ty..." 
          />
        </div>
        <select 
          value={segmentFilter}
          onChange={(e) => setSegmentFilter(e.target.value)}
          className="min-w-[140px] px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface-variant focus:border-myan-primary focus:ring-1 focus:ring-myan-primary outline-none"
        >
          <option value="">Tất cả phân khúc</option>
          <option value="retail">Khách lẻ</option>
          <option value="dealer">Đại lý</option>
          <option value="vip">VIP</option>
        </select>
        <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors">
          <span className="material-symbols-outlined">filter_list</span>
        </button>
      </div>

      {/* SUMMARY STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-card-gap">
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-myan-primary/10 text-myan-primary rounded-lg">
              <span className="material-symbols-outlined">person_add</span>
            </div>
            <div>
              <p className="text-label-sm text-on-surface-variant">Tổng khách hàng</p>
              <h4 className="text-headline-sm font-display-md text-on-surface">{leads.length}</h4>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-tertiary-container/10 text-tertiary rounded-lg">
              <span className="material-symbols-outlined">star</span>
            </div>
            <div>
              <p className="text-label-sm text-on-surface-variant">Khách hàng VIP</p>
              <h4 className="text-headline-sm font-display-md text-on-surface">{leads.filter(l => l.segment === 'vip').length}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* DATA TABLE CARD */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">Tên khách hàng / Công ty</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">Phân khúc</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">SĐT liên hệ</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">Người phụ trách</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant text-right">Giá trị (VNĐ)</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant text-center">Trạng thái</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant relative">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-on-surface-variant">
                    <div className="flex flex-col items-center justify-center">
                      <span className="material-symbols-outlined animate-spin text-[32px] text-myan-primary mb-2">progress_activity</span>
                      <p>Đang tải dữ liệu khách hàng...</p>
                    </div>
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-on-surface-variant">
                    <p>Không tìm thấy khách hàng nào.</p>
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => openEditModal(lead)}>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-label-md text-body-lg text-on-surface font-semibold">{lead.customer_name}</span>
                        {lead.company_name && <span className="text-label-sm text-on-surface-variant">{lead.company_name}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getSegmentBadge(lead.segment)}
                    </td>
                    <td className="px-6 py-4 text-body-md text-on-surface">
                      {lead.contact_phone || '-'}
                    </td>
                    <td className="px-6 py-4 text-body-md text-on-surface">
                      {lead.profiles?.full_name || '-'}
                    </td>
                    <td className="px-6 py-4 text-body-md text-on-surface text-right font-semibold whitespace-nowrap">
                      {lead.estimated_value ? new Intl.NumberFormat('vi-VN').format(lead.estimated_value) : 0} đ
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 text-label-sm text-on-surface-variant">
                        <span className="w-2 h-2 rounded-full bg-[#10b981]"></span> {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-on-surface-variant hover:text-myan-primary transition-colors opacity-0 group-hover:opacity-100" onClick={(e) => { e.stopPropagation(); openEditModal(lead); }}>
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <CustomerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveLead}
        lead={editingLead}
        profiles={profiles}
        currentUser={user}
      />
    </div>
  );
}
