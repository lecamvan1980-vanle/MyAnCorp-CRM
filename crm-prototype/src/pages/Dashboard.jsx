import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

export default function Dashboard() {
  const { user } = useAuth();
  
  // States
  const [metrics, setMetrics] = useState({
    totalCustomers: 0,
    openOpportunities: 0,
    totalValue: 0,
    upcomingTasks: 0,
  });
  const [segmentData, setSegmentData] = useState([]);
  const [stageData, setStageData] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Constants
  const SEGMENT_COLORS = {
    'retail': '#1C7C54',  // Xanh lá (Khách lẻ)
    'dealer': '#0084A8',  // Xanh Myan (Đại lý)
    'vip': '#FBBF24'      // Vàng (VIP)
  };
  
  const SEGMENT_LABELS = {
    'retail': 'Khách lẻ',
    'dealer': 'Đại lý',
    'vip': 'VIP'
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Leads
      const { data: leads, error: leadsError } = await supabase
        .from('leads')
        .select(`
          id, customer_name, company_name, segment, estimated_value, status, created_at,
          pipeline_stages(name)
        `)
        .order('created_at', { ascending: false });
        
      if (leadsError) throw leadsError;

      // 2. Fetch Tasks (Incomplete)
      const { data: tasks, error: tasksError } = await supabase
        .from('tasks')
        .select('id, status, due_date')
        .in('status', ['todo', 'in_progress', 'overdue']);
        
      if (tasksError) throw tasksError;
      
      // --- Calculate Metrics ---
      const totalCustomers = leads.length;
      
      const openLeads = leads.filter(l => l.status === 'potential' || l.status === 'trading');
      const openOpportunities = openLeads.length;
      
      const totalValue = openLeads.reduce((sum, lead) => sum + (Number(lead.estimated_value) || 0), 0);
      
      const upcomingTasks = tasks.length;
      
      setMetrics({
        totalCustomers,
        openOpportunities,
        totalValue,
        upcomingTasks
      });

      // --- Calculate Segment Data for Pie Chart ---
      const segmentCounts = { 'retail': 0, 'dealer': 0, 'vip': 0 };
      leads.forEach(l => {
        if (l.segment) segmentCounts[l.segment]++;
      });
      
      const pieData = Object.keys(segmentCounts).map(key => ({
        name: SEGMENT_LABELS[key],
        value: segmentCounts[key],
        color: SEGMENT_COLORS[key]
      })).filter(item => item.value > 0);
      
      setSegmentData(pieData);

      // --- Calculate Stage Data for Bar Chart ---
      const stageMap = {};
      openLeads.forEach(l => {
        const stageName = l.pipeline_stages?.name || 'Mới';
        if (!stageMap[stageName]) {
          stageMap[stageName] = 0;
        }
        stageMap[stageName] += (Number(l.estimated_value) || 0);
      });
      
      const barData = Object.keys(stageMap).map(key => ({
        name: key,
        'Doanh thu dự kiến (Tr VNĐ)': Math.round(stageMap[key] / 1000000)
      }));
      setStageData(barData);

      // --- Recent Leads ---
      setRecentLeads(leads.slice(0, 5));

    } catch (error) {
      console.error('Lỗi khi tải dữ liệu Dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };
  
  const formatCompactCurrency = (value) => {
    if (value >= 1000000000) return (value / 1000000000).toFixed(1) + ' Tỷ';
    if (value >= 1000000) return (value / 1000000).toFixed(1) + ' Tr';
    return formatCurrency(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-center">
          <span className="material-symbols-outlined animate-spin text-[40px] text-myan-primary mb-4 block">progress_activity</span>
          <p className="text-on-surface-variant">Đang tải dữ liệu tổng quan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-container-padding">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-surface font-bold">Dashboard</h2>
          <p className="text-body-md text-on-surface-variant mt-1">Cái nhìn tổng quan về tình hình kinh doanh của bạn hôm nay.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card-gap mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-outline-variant hover:border-myan-primary transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-myan-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">group</span>
            </div>
          </div>
          <h3 className="text-on-surface-variant text-label-sm uppercase tracking-wider mb-1">Tổng Khách Hàng</h3>
          <p className="text-display-md font-display-md text-on-surface">{metrics.totalCustomers}</p>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-outline-variant hover:border-myan-primary transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">rocket_launch</span>
            </div>
          </div>
          <h3 className="text-on-surface-variant text-label-sm uppercase tracking-wider mb-1">Cơ Hội Đang Mở</h3>
          <p className="text-display-md font-display-md text-on-surface">{metrics.openOpportunities}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-outline-variant hover:border-myan-primary transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">monetization_on</span>
            </div>
          </div>
          <h3 className="text-on-surface-variant text-label-sm uppercase tracking-wider mb-1">Tổng Giá Trị Dự Kiến</h3>
          <p className="text-headline-md font-bold text-on-surface">{formatCompactCurrency(metrics.totalValue)} <span className="text-body-sm font-normal text-on-surface-variant">VND</span></p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-outline-variant hover:border-error transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg group-hover:bg-error group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">assignment</span>
            </div>
          </div>
          <h3 className="text-on-surface-variant text-label-sm uppercase tracking-wider mb-1">Công Việc Cần Làm</h3>
          <p className={`text-display-md font-display-md ${metrics.upcomingTasks > 0 ? 'text-error' : 'text-green-600'}`}>
            {metrics.upcomingTasks}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-card-gap mb-8">
        {/* Pie Chart: Customer Segmentation */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant">
          <div className="mb-6">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Cơ cấu khách hàng</h3>
            <p className="text-sm text-on-surface-variant">Phân bổ theo phân khúc khách hàng</p>
          </div>
          <div className="h-[300px] w-full">
            {segmentData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={segmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {segmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} Khách hàng`, 'Số lượng']} />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-on-surface-variant">Chưa có dữ liệu phân khúc</div>
            )}
          </div>
        </div>

        {/* Bar Chart: Revenue by Stage */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant">
          <div className="mb-6">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Doanh thu dự kiến theo Giai đoạn</h3>
            <p className="text-sm text-on-surface-variant">Tổng giá trị cơ hội đang mở (Đơn vị: Triệu VNĐ)</p>
          </div>
          <div className="h-[300px] w-full">
            {stageData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stageData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E6ED" />
                  <XAxis dataKey="name" tick={{fill: '#6B7280', fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fill: '#6B7280', fontSize: 12}} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#F5F7FA'}} />
                  <Bar dataKey="Doanh thu dự kiến (Tr VNĐ)" fill="#0084A8" radius={[4, 4, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-on-surface-variant">Chưa có cơ hội đang mở</div>
            )}
          </div>
        </div>
      </div>

      {/* Top Opportunities Table */}
      <div className="bg-white rounded-xl shadow-sm border border-outline-variant overflow-hidden mb-8">
        <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Top 5 Cơ hội mới nhất</h3>
          <Link to="/opportunities" className="text-myan-primary text-label-md font-medium hover:underline flex items-center gap-1">
            Xem tất cả Kanban <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase text-[11px] font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Tên khách hàng / Công ty</th>
                <th className="px-6 py-4">Phân khúc</th>
                <th className="px-6 py-4">Giá trị dự kiến</th>
                <th className="px-6 py-4 text-right">Giai đoạn</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-on-surface-variant">Chưa có cơ hội nào.</td>
                </tr>
              ) : (
                recentLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-on-surface">{lead.customer_name}</p>
                        {lead.company_name && <p className="text-sm text-on-surface-variant">{lead.company_name}</p>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {lead.segment === 'retail' && <span className="px-2 py-1 rounded bg-green-50 text-green-700 text-[11px] font-bold uppercase">Khách lẻ</span>}
                      {lead.segment === 'dealer' && <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-[11px] font-bold uppercase">Đại lý</span>}
                      {lead.segment === 'vip' && <span className="px-2 py-1 rounded bg-amber-50 text-amber-700 text-[11px] font-bold uppercase">VIP</span>}
                    </td>
                    <td className="px-6 py-4 font-bold text-on-surface">{formatCurrency(lead.estimated_value || 0)} đ</td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-[12px] font-medium border border-outline-variant">
                        {lead.pipeline_stages?.name || 'Mới'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
