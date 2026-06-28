import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

function ReasonModal({ isOpen, onClose, onSubmit, stageName }) {
  const [reason, setReason] = useState('');
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-surface rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
          <h3 className="text-headline-sm font-headline-sm text-on-surface">Cơ hội {stageName}</h3>
          <button type="button" onClick={onClose} className="text-on-surface-variant hover:text-on-surface p-1 rounded-md hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(reason); }} className="p-6 space-y-4">
          <div>
            <label className="block text-label-md font-label-md text-on-surface-variant mb-1">Lý do thắng/thua hoặc Ghi chú</label>
            <textarea 
              required 
              className="w-full px-4 py-2.5 border border-outline-variant rounded-lg focus:border-myan-primary focus:ring-1 focus:ring-myan-primary outline-none text-body-md transition-all" 
              rows="3" 
              value={reason} 
              onChange={e => setReason(e.target.value)} 
              placeholder="Nhập lý do chốt thành công hoặc thất bại..." 
            />
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-outline-variant mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-outline-variant hover:bg-surface-container-high rounded-lg text-label-md font-label-md transition-colors">Hủy</button>
            <button type="submit" className="px-4 py-2 bg-myan-primary hover:bg-primary-container text-white rounded-lg text-label-md font-label-md shadow-sm transition-colors">Lưu lại</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Opportunities() {
  const { user } = useAuth();
  const [stages, setStages] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [pendingDrop, setPendingDrop] = useState(null); // { leadId, newStageId, stageName }

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [stagesRes, leadsRes] = await Promise.all([
        supabase.from('pipeline_stages').select('*').order('order_index', { ascending: true }),
        // Lấy tất cả leads, thực tế có thể lọc những cái có stage_id hoặc tiềm năng
        supabase.from('leads').select('*')
      ]);
      
      if (stagesRes.error) throw stagesRes.error;
      if (leadsRes.error) throw leadsRes.error;
      
      setStages(stagesRes.data);
      setLeads(leadsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (e, leadId) => {
    e.dataTransfer.setData('leadId', leadId);
    e.target.classList.add('opacity-50');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('opacity-50');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-surface-container-high');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('bg-surface-container-high');
  };

  const handleDrop = async (e, stage) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-surface-container-high');
    
    const leadId = e.dataTransfer.getData('leadId');
    if (!leadId) return;

    // Kiểm tra xem có thả vào cột hiện tại không
    const lead = leads.find(l => l.id === leadId);
    if (lead && lead.stage_id === stage.id) return;

    // Nếu thả vào cột "Thành công" (stage 5) hoặc "Thất bại" (stage 6) (dựa theo order_index hoặc tên)
    const isWonOrLost = stage.order_index >= 5 || stage.name.toLowerCase().includes('thất bại') || stage.name.toLowerCase().includes('thành công');
    
    if (isWonOrLost) {
      setPendingDrop({ leadId, newStageId: stage.id, stageName: stage.name });
    } else {
      await updateLeadStage(leadId, stage.id, null);
    }
  };

  const updateLeadStage = async (leadId, stageId, reason) => {
    try {
      // Cập nhật UI ngay lập tức (Optimistic UI)
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage_id: stageId } : l));
      
      const payload = { stage_id: stageId };
      if (reason) {
        // Lưu lý do vào status (tạm thời tận dụng trường status)
        payload.status = reason;
      }

      const { error } = await supabase.from('leads').update(payload).eq('id', leadId);
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Cập nhật thất bại. Vui lòng thử lại.");
      fetchData(); // Lấy lại dữ liệu từ server nếu lỗi
    }
  };

  const handleReasonSubmit = (reason) => {
    if (pendingDrop) {
      updateLeadStage(pendingDrop.leadId, pendingDrop.newStageId, reason);
      setPendingDrop(null);
    }
  };

  // Tính tổng giá trị của tất cả cơ hội đang mở (chưa thất bại)
  const totalValue = leads
    .filter(l => {
      const stage = stages.find(s => s.id === l.stage_id);
      return stage && stage.order_index < 6; // Bỏ qua thất bại
    })
    .reduce((sum, l) => sum + Number(l.estimated_value || 0), 0);

  // Chọn màu sắc cho cột tùy theo index
  const getStageColorClass = (index) => {
    const colors = [
      'bg-blue-500', 'bg-amber-500', 'bg-cyan-500', 
      'bg-indigo-500', 'bg-emerald-500', 'bg-red-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="p-container-padding min-h-[calc(100vh-64px)] flex flex-col">
      {/* Header & Statistics */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-surface mb-2">Cơ hội bán hàng</h2>
          <nav className="flex gap-2 text-label-sm text-on-surface-variant">
            <span>CRM</span>
            <span>/</span>
            <span className="text-myan-primary font-bold">Quản lý cơ hội</span>
          </nav>
        </div>
        <div className="flex gap-4">
          <div className="bg-surface-container-lowest px-6 py-3 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-primary-fixed rounded-full flex items-center justify-center text-myan-primary">
              <span className="material-symbols-outlined">monetization_on</span>
            </div>
            <div>
              <p className="text-label-sm text-on-surface-variant">Tổng giá trị dự kiến</p>
              <p className="font-display-md text-display-md">{totalValue.toLocaleString('vi-VN')} <span className="text-label-sm">VND</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board Container */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined animate-spin text-[40px] text-myan-primary mb-4">progress_activity</span>
            <p className="text-on-surface-variant">Đang tải bảng Kanban...</p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto flex-1 pb-4">
          <div className="flex gap-6 min-w-max h-full">
            
            {stages.map((stage, index) => {
              // Tìm các lead thuộc về cột này. Nếu lead chưa có stage_id, mặc định cho vào cột đầu tiên (index = 0)
              const stageLeads = leads.filter(l => {
                if (index === 0 && !l.stage_id) return true;
                return l.stage_id === stage.id;
              });
              const colorClass = getStageColorClass(index);
              
              return (
                <div 
                  key={stage.id} 
                  className="min-w-[320px] max-w-[320px] flex flex-col gap-4 rounded-xl transition-colors duration-200"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, stage)}
                >
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${colorClass}`}></span>
                      <h3 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">{stage.name}</h3>
                      <span className="px-2 py-0.5 bg-surface-container-highest rounded text-label-sm font-bold">{stageLeads.length}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 pb-4">
                    {stageLeads.length === 0 && (
                      <div className="border-2 border-dashed border-outline-variant/50 rounded-xl h-24 flex items-center justify-center text-outline-variant text-label-sm">
                        Kéo thả vào đây
                      </div>
                    )}
                    
                    {stageLeads.map(lead => (
                      <div 
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onDragEnd={handleDragEnd}
                        className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm hover:shadow-md hover:border-myan-primary transition-all cursor-grab active:cursor-grabbing group relative bg-white"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <span className="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded text-[10px] font-bold uppercase tracking-tighter">
                            {lead.segment === 'vip' ? 'VIP' : lead.segment === 'dealer' ? 'Đại lý' : 'Khách lẻ'}
                          </span>
                        </div>
                        <h4 className="font-label-md text-on-surface mb-1 truncate">{lead.customer_name}</h4>
                        <p className="text-label-sm text-on-surface-variant mb-4 truncate">{lead.company_name || 'Khách hàng cá nhân'}</p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/50">
                          <div className="text-right w-full">
                            <p className="text-label-sm font-bold text-myan-primary">{Number(lead.estimated_value || 0).toLocaleString('vi-VN')} đ</p>
                          </div>
                        </div>
                        {/* Drag Handle Indicator */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="material-symbols-outlined text-outline-variant text-[18px]">drag_indicator</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal hỏi lý do khi chốt/thất bại */}
      <ReasonModal 
        isOpen={!!pendingDrop} 
        onClose={() => setPendingDrop(null)}
        onSubmit={handleReasonSubmit}
        stageName={pendingDrop?.stageName}
      />
    </div>
  );
}
