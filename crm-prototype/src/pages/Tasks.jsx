import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

// Sử dụng Native JavaScript thay cho date-fns để tránh lỗi bộ nhớ đệm của Vite
const parseISO = (dateStr) => new Date(dateStr);
const isPast = (date) => date < new Date();
const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() && 
         date.getMonth() === today.getMonth() && 
         date.getFullYear() === today.getFullYear();
};
const format = (date) => {
  const pad = (n) => n.toString().padStart(2, '0');
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

function TaskModal({ isOpen, onClose, onSave, task, leads }) {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'medium',
    lead_id: '',
    due_date: '',
    description: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        priority: task.priority || 'medium',
        lead_id: task.lead_id || '',
        // datetime-local input expects YYYY-MM-DDThh:mm
        due_date: task.due_date ? new Date(task.due_date).toISOString().slice(0, 16) : '',
        description: task.description || '',
      });
    } else {
      setFormData({
        title: '',
        priority: 'medium',
        lead_id: '',
        due_date: '',
        description: '',
      });
    }
  }, [task, isOpen]);

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
            {task ? 'Sửa Công việc' : 'Thêm Công việc mới'}
          </h3>
          <button type="button" onClick={onClose} className="text-on-surface-variant hover:text-on-surface p-1 rounded-md hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-label-md font-label-md text-on-surface-variant mb-1">Tên công việc *</label>
            <input required type="text" className="w-full px-4 py-2.5 border border-outline-variant rounded-lg focus:border-myan-primary focus:ring-1 focus:ring-myan-primary outline-none text-body-md transition-all" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Vd: Gọi điện tư vấn đai nẹp lưng" />
          </div>
          <div>
            <label className="block text-label-md font-label-md text-on-surface-variant mb-1">Khách hàng liên quan *</label>
            <select required className="w-full px-4 py-2.5 border border-outline-variant rounded-lg focus:border-myan-primary focus:ring-1 focus:ring-myan-primary outline-none text-body-md transition-all bg-white" value={formData.lead_id} onChange={e => setFormData({...formData, lead_id: e.target.value})}>
              <option value="" disabled>-- Chọn khách hàng --</option>
              {leads.map(lead => (
                <option key={lead.id} value={lead.id}>{lead.customer_name} {lead.company_name ? `- ${lead.company_name}` : ''}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-1">Hạn chót (Deadline)</label>
              <input type="datetime-local" className="w-full px-4 py-2.5 border border-outline-variant rounded-lg focus:border-myan-primary focus:ring-1 focus:ring-myan-primary outline-none text-body-md transition-all" value={formData.due_date} onChange={e => setFormData({...formData, due_date: e.target.value})} />
            </div>
            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-1">Mức độ ưu tiên</label>
              <select className="w-full px-4 py-2.5 border border-outline-variant rounded-lg focus:border-myan-primary focus:ring-1 focus:ring-myan-primary outline-none text-body-md transition-all bg-white" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                <option value="low">Thấp</option>
                <option value="medium">Trung bình</option>
                <option value="high">Cao</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-label-md font-label-md text-on-surface-variant mb-1">Ghi chú thêm</label>
            <textarea className="w-full px-4 py-2.5 border border-outline-variant rounded-lg focus:border-myan-primary focus:ring-1 focus:ring-myan-primary outline-none text-body-md transition-all" rows="2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Vd: Chuẩn bị catalogue..." />
          </div>
          
          <div className="pt-6 flex justify-end gap-3 border-t border-outline-variant mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2.5 border border-outline-variant text-on-surface hover:bg-surface-container-high rounded-lg text-label-md font-label-md transition-colors">Hủy</button>
            <button type="submit" className="px-5 py-2.5 bg-myan-primary hover:bg-primary-container text-white rounded-lg text-label-md font-label-md shadow-sm transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">save</span>
              Lưu công việc
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Tasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [statusFilter, setStatusFilter] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, statusFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Load Leads for dropdown
      const { data: leadsData } = await supabase.from('leads').select('id, customer_name, company_name').order('created_at', { ascending: false });
      if (leadsData) setLeads(leadsData);

      // Load Tasks
      let query = supabase
        .from('tasks')
        .select(`
          *,
          leads ( customer_name, company_name ),
          profiles:owner_id ( full_name )
        `)
        .order('due_date', { ascending: true, nullsFirst: false });
      
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }
      
      const { data: tasksData, error: tasksError } = await query;
      if (tasksError) throw tasksError;
      
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTask = async (formData) => {
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        lead_id: formData.lead_id,
        due_date: formData.due_date ? new Date(formData.due_date).toISOString() : null,
      };

      if (editingTask) {
        // Update
        const { error } = await supabase.from('tasks').update(payload).eq('id', editingTask.id);
        if (error) throw error;
      } else {
        // Create
        payload.owner_id = user.id;
        payload.status = 'todo';
        const { error } = await supabase.from('tasks').insert([payload]);
        if (error) throw error;
      }
      setIsModalOpen(false);
      fetchData(); // Refresh list
    } catch (error) {
      alert("Lỗi khi lưu công việc: " + error.message);
    }
  };

  const toggleTaskCompletion = async (taskId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'completed' ? 'todo' : 'completed';
      const completedAt = newStatus === 'completed' ? new Date().toISOString() : null;
      
      // Optimistic UI
      setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus, completed_at: completedAt } : t));

      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus, completed_at: completedAt })
        .eq('id', taskId);
        
      if (error) throw error;
    } catch (error) {
      console.error('Lỗi cập nhật trạng thái:', error);
      fetchData(); // Revert
    }
  };

  const openAddModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task, e) => {
    e.stopPropagation();
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // UI Helpers
  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'high': return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase bg-error-container text-on-error-container border border-error/20">Cao</span>;
      case 'low': return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase bg-surface-container-highest text-on-surface-variant border border-outline-variant">Thấp</span>;
      default: return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase bg-yellow-100 text-yellow-800 border border-yellow-200">TB</span>;
    }
  };

  const getStatusBadge = (task) => {
    if (task.status === 'completed') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-green-100 text-green-800 text-[12px] font-medium border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> Hoàn thành
        </span>
      );
    }
    
    // Check if overdue
    if (task.due_date && isPast(parseISO(task.due_date)) && !isToday(parseISO(task.due_date))) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-100 text-red-700 text-[12px] font-bold border border-red-200">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Quá hạn
        </span>
      );
    }

    if (task.status === 'in_progress') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-100 text-blue-800 text-[12px] font-medium border border-blue-200">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Đang làm
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container-highest text-on-surface-variant text-[12px] font-medium border border-outline-variant">
        <span className="w-1.5 h-1.5 rounded-full bg-outline"></span> Chưa bắt đầu
      </span>
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = parseISO(dateStr);
    if (isToday(date)) return <span className="text-myan-primary font-bold">Hôm nay</span>;
    return format(date);
  };

  return (
    <div className="max-w-7xl mx-auto p-container-padding">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
            <span>CRM</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-myan-primary font-medium">Danh sách công việc</span>
          </nav>
          <h1 className="font-display-lg text-display-lg font-bold text-on-surface">Công việc</h1>
        </div>
        <button onClick={openAddModal} className="inline-flex items-center gap-2 bg-[#0084A8] hover:bg-[#006e8c] text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md active:scale-[0.98]">
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Thêm công việc</span>
        </button>
      </div>

      {/* Dashboard Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[180px]">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none w-full bg-white border border-outline-variant rounded-xl px-4 py-2.5 pr-10 text-sm focus:border-myan-primary focus:ring-1 focus:ring-myan-primary outline-none cursor-pointer shadow-sm"
            >
              <option value="">Trạng thái: Tất cả</option>
              <option value="todo">Chưa bắt đầu</option>
              <option value="in_progress">Đang làm</option>
              <option value="completed">Hoàn thành</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
          </div>
        </div>
        
        <div className="bg-surface-container-high p-1 rounded-xl flex items-center shadow-sm">
          <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white shadow-sm text-myan-primary text-sm font-semibold transition-all">
            <span className="material-symbols-outlined text-[18px]">table_chart</span>
            <span className="hidden sm:inline">Dạng bảng</span>
          </button>
        </div>
      </div>

      {/* Table Container Card */}
      <div className="bg-white rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant overflow-hidden">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="p-4 w-12 text-center">
                  <span className="material-symbols-outlined text-outline-variant text-[20px]">check_circle</span>
                </th>
                <th className="p-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">Tên công việc</th>
                <th className="p-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">Ưu tiên</th>
                <th className="p-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">Deadline</th>
                <th className="p-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">Liên quan đến (Khách hàng)</th>
                <th className="p-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">Trạng thái</th>
                <th className="p-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">Người phụ trách</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {loading ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined animate-spin text-[32px] text-myan-primary mb-2">progress_activity</span>
                    <p>Đang tải danh sách công việc...</p>
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-on-surface-variant">
                    <p>Không có công việc nào.</p>
                  </td>
                </tr>
              ) : (
                tasks.map(task => (
                  <tr key={task.id} className={`hover:bg-surface-container-lowest transition-colors group cursor-pointer ${task.status === 'completed' ? 'opacity-60' : ''}`} onClick={(e) => openEditModal(task, e)}>
                    <td className="p-4 text-center" onClick={(e) => { e.stopPropagation(); toggleTaskCompletion(task.id, task.status); }}>
                      <input 
                        className="rounded border-outline-variant text-myan-primary focus:ring-myan-primary w-5 h-5 cursor-pointer" 
                        type="checkbox"
                        checked={task.status === 'completed'}
                        readOnly
                      />
                    </td>
                    <td className="p-4">
                      <span className={`font-bold text-on-surface group-hover:text-myan-primary transition-colors ${task.status === 'completed' ? 'line-through' : ''}`}>
                        {task.title}
                      </span>
                    </td>
                    <td className="p-4">
                      {getPriorityBadge(task.priority)}
                    </td>
                    <td className="p-4 text-body-md text-on-surface">
                      {formatDate(task.due_date)}
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-body-md text-on-surface-variant">
                        {task.leads?.customer_name} {task.leads?.company_name ? `(${task.leads.company_name})` : ''}
                      </span>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(task)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-body-md text-on-surface">{task.profiles?.full_name || '-'}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-on-surface-variant hover:text-myan-primary opacity-0 group-hover:opacity-100 transition-opacity">
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
      
      {/* Modal */}
      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
        leads={leads}
      />
    </div>
  );
}
