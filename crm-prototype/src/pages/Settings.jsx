import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  
  // States cho Người dùng
  const [profiles, setProfiles] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [editingProfile, setEditingProfile] = useState(null);
  
  // States cho Giai đoạn
  const [stages, setStages] = useState([]);
  const [loadingStages, setLoadingStages] = useState(true);
  const [editingStage, setEditingStage] = useState(null);
  const [isStageModalOpen, setIsStageModalOpen] = useState(false);

  // States giả lập cho Sản phẩm và Phân khúc
  const segments = [
    { id: 'retail', name: 'Khách lẻ', color: 'bg-surface-container-high text-on-surface-variant' },
    { id: 'dealer', name: 'Đại lý', color: 'bg-[#FEFCE8] text-[#854d0e]' },
    { id: 'vip', name: 'VIP', color: 'bg-[#F0FDF4] text-[#166534]' },
  ];
  const products = [
    { id: 1, name: 'Xe lăn và dụng cụ hỗ trợ' },
    { id: 2, name: 'Đai nẹp y tế' },
    { id: 3, name: 'Vớ y khoa' },
    { id: 4, name: 'Thiết bị phòng bệnh' },
  ];

  useEffect(() => {
    if (activeTab === 'users') fetchProfiles();
    if (activeTab === 'stages') fetchStages();
  }, [activeTab]);

  const fetchProfiles = async () => {
    setLoadingProfiles(true);
    try {
      const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setProfiles(data);
    } catch (error) {
      console.error('Error fetching profiles', error);
    } finally {
      setLoadingProfiles(false);
    }
  };

  const fetchStages = async () => {
    setLoadingStages(true);
    try {
      const { data, error } = await supabase.from('pipeline_stages').select('*').order('order_index', { ascending: true });
      if (error) throw error;
      setStages(data);
    } catch (error) {
      console.error('Error fetching stages', error);
    } finally {
      setLoadingStages(false);
    }
  };

  // --- Handlers ---
  
  const handleUpdateRole = async (profileId, newRole) => {
    try {
      const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', profileId);
      if (error) throw error;
      alert('Cập nhật quyền thành công!');
      fetchProfiles();
      setEditingProfile(null);
    } catch (error) {
      alert('Lỗi khi cập nhật quyền: ' + error.message);
    }
  };

  const handleSaveStage = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const order_index = parseInt(formData.get('order_index'));

    try {
      if (editingStage) {
        const { error } = await supabase.from('pipeline_stages').update({ name, order_index }).eq('id', editingStage.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('pipeline_stages').insert([{ name, order_index }]);
        if (error) throw error;
      }
      setIsStageModalOpen(false);
      fetchStages();
    } catch (error) {
      alert('Lỗi lưu giai đoạn: ' + error.message);
    }
  };

  return (
    <div className="p-container-padding min-h-[calc(100vh-4rem)]">
      {/* Breadcrumb & Title */}
      <div className="mb-6">
        <h2 className="font-display-md text-display-md text-on-surface">Cài đặt hệ thống</h2>
        <p className="text-body-md text-on-surface-variant">Quản lý tài khoản và luồng công việc CRM</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        
        {/* Sidebar */}
        <nav className="w-full md:w-[260px] shrink-0 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/50 overflow-hidden">
          <ul className="py-2">
            <li>
              <button 
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center px-4 py-3 font-label-md transition-colors ${activeTab === 'users' ? 'bg-surface-container-low text-myan-primary border-l-4 border-myan-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
              >
                <span className="material-symbols-outlined mr-3 text-[20px]" style={activeTab === 'users' ? {fontVariationSettings: "'FILL' 1"} : {}}>manage_accounts</span>
                Người dùng & Vai trò
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('segments')}
                className={`w-full flex items-center px-4 py-3 font-label-md transition-colors ${activeTab === 'segments' ? 'bg-surface-container-low text-myan-primary border-l-4 border-myan-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
              >
                <span className="material-symbols-outlined mr-3 text-[20px]" style={activeTab === 'segments' ? {fontVariationSettings: "'FILL' 1"} : {}}>hub</span>
                Phân khúc khách hàng
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center px-4 py-3 font-label-md transition-colors ${activeTab === 'products' ? 'bg-surface-container-low text-myan-primary border-l-4 border-myan-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
              >
                <span className="material-symbols-outlined mr-3 text-[20px]" style={activeTab === 'products' ? {fontVariationSettings: "'FILL' 1"} : {}}>inventory_2</span>
                Danh mục sản phẩm
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('stages')}
                className={`w-full flex items-center px-4 py-3 font-label-md transition-colors ${activeTab === 'stages' ? 'bg-surface-container-low text-myan-primary border-l-4 border-myan-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
              >
                <span className="material-symbols-outlined mr-3 text-[20px]" style={activeTab === 'stages' ? {fontVariationSettings: "'FILL' 1"} : {}}>leaderboard</span>
                Giai đoạn bán hàng
              </button>
            </li>
          </ul>
        </nav>

        {/* Content Area */}
        <section className="flex-1 w-full bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/50 min-h-[600px] overflow-hidden">
          
          {/* TAB 1: USERS */}
          {activeTab === 'users' && (
            <>
              <div className="px-6 py-5 border-b border-outline-variant/50 flex justify-between items-center bg-surface-container-lowest">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Người dùng & Vai trò</h3>
                  <p className="text-body-md text-on-surface-variant">Quản lý và phân quyền nhân viên.</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant font-label-md border-b border-outline-variant">
                      <th className="px-6 py-4">Họ tên</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Vai trò</th>
                      <th className="px-6 py-4 text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30 text-body-md">
                    {loadingProfiles ? (
                      <tr><td colSpan="4" className="text-center py-8">Đang tải...</td></tr>
                    ) : (
                      profiles.map(profile => (
                        <tr key={profile.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-on-surface">{profile.full_name || 'Chưa cập nhật'}</td>
                          <td className="px-6 py-4 text-on-surface-variant">{profile.email}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                              profile.role === 'admin' ? 'bg-primary-fixed text-on-primary-fixed' : 
                              profile.role === 'team_leader' ? 'bg-[#E9D5FF] text-[#6B21A8]' : 
                              'bg-[#DCFCE7] text-[#166534]'
                            }`}>
                              {profile.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => setEditingProfile(profile)} className="p-2 text-myan-primary hover:bg-surface-container rounded-lg font-label-sm">
                              Đổi quyền
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* TAB 2: SEGMENTS */}
          {activeTab === 'segments' && (
            <>
              <div className="px-6 py-5 border-b border-outline-variant/50">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Phân khúc khách hàng</h3>
                <p className="text-body-md text-on-surface-variant text-error mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  Dữ liệu lõi (ENUM). Vui lòng liên hệ kỹ thuật để thay đổi cấu trúc bảng.
                </p>
              </div>
              <div className="p-6 grid gap-4">
                {segments.map(seg => (
                  <div key={seg.id} className="flex justify-between items-center p-4 border border-outline-variant rounded-xl bg-white">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${seg.color}`}>
                        {seg.name}
                      </span>
                      <span className="text-body-sm text-on-surface-variant">Mã hệ thống: {seg.id}</span>
                    </div>
                    <button disabled className="text-outline cursor-not-allowed"><span className="material-symbols-outlined">edit</span></button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* TAB 3: PRODUCTS */}
          {activeTab === 'products' && (
            <>
              <div className="px-6 py-5 border-b border-outline-variant/50 flex justify-between items-center">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Danh mục sản phẩm</h3>
                  <p className="text-body-md text-on-surface-variant">Quản lý các thẻ sản phẩm quan tâm.</p>
                </div>
                <button className="bg-myan-primary hover:bg-primary-container text-white px-4 py-2 rounded-lg font-label-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  Thêm thẻ
                </button>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-3">
                  {products.map(prod => (
                    <div key={prod.id} className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant rounded-lg shadow-sm">
                      <span className="text-body-md font-medium text-on-surface">{prod.name}</span>
                      <button className="text-on-surface-variant hover:text-error transition-colors">
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* TAB 4: STAGES */}
          {activeTab === 'stages' && (
            <>
              <div className="px-6 py-5 border-b border-outline-variant/50 flex justify-between items-center">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Giai đoạn bán hàng</h3>
                  <p className="text-body-md text-on-surface-variant">Các cột trong bảng Kanban cơ hội.</p>
                </div>
                <button onClick={() => {setEditingStage(null); setIsStageModalOpen(true);}} className="bg-myan-primary hover:bg-primary-container text-white px-4 py-2 rounded-lg font-label-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  Thêm giai đoạn
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant font-label-md border-b border-outline-variant">
                      <th className="px-6 py-4 w-24">Thứ tự</th>
                      <th className="px-6 py-4">Tên giai đoạn</th>
                      <th className="px-6 py-4 text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30 text-body-md">
                    {loadingStages ? (
                      <tr><td colSpan="3" className="text-center py-8">Đang tải...</td></tr>
                    ) : (
                      stages.map(stage => (
                        <tr key={stage.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 text-on-surface-variant font-mono">{stage.order_index}</td>
                          <td className="px-6 py-4 font-medium text-on-surface">{stage.name}</td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => {setEditingStage(stage); setIsStageModalOpen(true);}} className="p-2 text-on-surface-variant hover:text-myan-primary hover:bg-surface-container rounded-lg">
                              <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

        </section>
      </div>

      {/* --- MODALS --- */}

      {/* Profile Role Edit Modal */}
      {editingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-surface rounded-xl shadow-lg w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
              <h3 className="text-headline-sm font-headline-sm text-on-surface">Đổi vai trò</h3>
              <button onClick={() => setEditingProfile(null)} className="text-on-surface-variant hover:text-on-surface p-1 rounded-md">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-6">
              <p className="mb-4 text-body-md text-on-surface-variant">
                Chọn vai trò mới cho tài khoản <strong className="text-on-surface">{editingProfile.email}</strong>:
              </p>
              <div className="space-y-3">
                <button onClick={() => handleUpdateRole(editingProfile.id, 'admin')} className="w-full flex items-center justify-between p-3 border rounded-lg hover:border-myan-primary hover:bg-surface-container-low transition-colors">
                  <span className="font-medium text-on-surface">Admin</span>
                  {editingProfile.role === 'admin' && <span className="material-symbols-outlined text-myan-primary">check</span>}
                </button>
                <button onClick={() => handleUpdateRole(editingProfile.id, 'team_leader')} className="w-full flex items-center justify-between p-3 border rounded-lg hover:border-myan-primary hover:bg-surface-container-low transition-colors">
                  <span className="font-medium text-on-surface">Trưởng nhóm</span>
                  {editingProfile.role === 'team_leader' && <span className="material-symbols-outlined text-myan-primary">check</span>}
                </button>
                <button onClick={() => handleUpdateRole(editingProfile.id, 'sales')} className="w-full flex items-center justify-between p-3 border rounded-lg hover:border-myan-primary hover:bg-surface-container-low transition-colors">
                  <span className="font-medium text-on-surface">Sales</span>
                  {editingProfile.role === 'sales' && <span className="material-symbols-outlined text-myan-primary">check</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stage Edit Modal */}
      {isStageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-surface rounded-xl shadow-lg w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
              <h3 className="text-headline-sm font-headline-sm text-on-surface">{editingStage ? 'Sửa giai đoạn' : 'Thêm giai đoạn'}</h3>
              <button onClick={() => setIsStageModalOpen(false)} className="text-on-surface-variant hover:text-on-surface p-1 rounded-md">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleSaveStage} className="p-6 space-y-4">
              <div>
                <label className="block text-label-md text-on-surface-variant mb-1">Tên giai đoạn</label>
                <input required type="text" name="name" defaultValue={editingStage?.name} className="w-full px-4 py-2 border rounded-lg focus:border-myan-primary outline-none" placeholder="Vd: Đàm phán..." />
              </div>
              <div>
                <label className="block text-label-md text-on-surface-variant mb-1">Thứ tự hiển thị (Từ trái sang phải)</label>
                <input required type="number" name="order_index" defaultValue={editingStage?.order_index || (stages.length + 1)} className="w-full px-4 py-2 border rounded-lg focus:border-myan-primary outline-none" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsStageModalOpen(false)} className="px-4 py-2 border rounded-lg">Hủy</button>
                <button type="submit" className="px-4 py-2 bg-myan-primary text-white rounded-lg">Lưu lại</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
