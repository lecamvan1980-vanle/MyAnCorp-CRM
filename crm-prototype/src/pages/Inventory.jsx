import { Link } from 'react-router-dom';

export default function Inventory() {
  return (
    <div className="p-container-padding max-w-[1600px] mx-auto space-y-6">
      {/* Page Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display-md text-display-md font-bold text-myan-primary">Quản lý Nhập kho</h1>
          <p className="text-body-md text-on-surface-variant">Theo dõi và quản lý lịch sử nhập thiết bị y tế</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-outline text-myan-primary bg-white hover:bg-surface-container transition-colors rounded-lg font-label-md text-label-md">
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span>Xuất Excel</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-myan-primary text-white hover:brightness-110 transition-all rounded-lg font-label-md text-label-md shadow-sm active:scale-95">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Tạo phiếu nhập</span>
          </button>
        </div>
      </div>

      {/* Statistics Grid (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-card-gap">
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex items-center justify-between">
          <div>
            <p className="text-label-md text-on-surface-variant mb-1">Tổng phiếu nhập (Tháng)</p>
            <h3 className="text-[32px] font-bold text-myan-primary">120</h3>
            <p className="text-[12px] text-green-600 flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>+12% so với tháng trước</span>
            </p>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-myan-primary">
            <span className="material-symbols-outlined text-[28px]">inventory</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex items-center justify-between">
          <div>
            <p className="text-label-md text-on-surface-variant mb-1">Lô hàng đang về</p>
            <h3 className="text-[32px] font-bold text-on-surface">05</h3>
            <p className="text-[12px] text-on-surface-variant flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              <span>Dự kiến nhập trong tuần</span>
            </p>
          </div>
          <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container">
            <span className="material-symbols-outlined text-[28px]">local_shipping</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex items-center justify-between">
          <div>
            <p className="text-label-md text-on-surface-variant mb-1">Tổng giá trị nhập (Tháng)</p>
            <h3 className="text-[32px] font-bold text-myan-primary">5.2 tỷ <span className="text-headline-sm">VND</span></h3>
            <p className="text-[12px] text-on-surface-variant flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[14px]">account_balance_wallet</span>
              <span>Bao gồm cả thuế VAT</span>
            </p>
          </div>
          <div className="w-12 h-12 bg-tertiary-fixed rounded-full flex items-center justify-center text-on-tertiary-fixed">
            <span className="material-symbols-outlined text-[28px]">payments</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
            <input className="w-full bg-white border border-outline-variant rounded-lg py-2 pl-10 pr-4 text-body-md focus:ring-2 focus:ring-myan-primary/20 focus:border-myan-primary outline-none transition-all" placeholder="Tìm ID phiếu hoặc Nhà cung cấp..." type="text"/>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-wrap lg:flex-nowrap">
          <div className="flex items-center gap-2">
            <span className="text-label-sm text-on-surface-variant">Khoảng ngày:</span>
            <input className="bg-white border border-outline-variant rounded-lg px-3 py-2 text-body-md focus:ring-myan-primary focus:border-myan-primary" type="date"/>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-label-sm text-on-surface-variant">Trạng thái:</span>
            <select className="bg-white border border-outline-variant rounded-lg px-3 py-2 text-body-md focus:ring-myan-primary focus:border-myan-primary min-w-[140px]">
              <option>Tất cả</option>
              <option>Đã nhập</option>
              <option>Đang về</option>
              <option>Đã hủy</option>
            </select>
          </div>
          <button className="bg-myan-primary text-white px-4 py-2 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:bg-primary-container transition-colors">
            <span className="material-symbols-outlined text-[18px]">filter_alt</span>
            Lọc
          </button>
        </div>
      </div>

      {/* Data Table Card */}
      <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">ID Phiếu</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Ngày nhập</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Nhà cung cấp</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Người nhập</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Tổng tiền</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {/* Row 1 */}
              <tr className="hover:bg-slate-50 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <span className="font-label-md text-myan-primary font-bold">PN-2024-001</span>
                  <div className="text-[11px] text-on-surface-variant mt-0.5">Máy đo huyết áp Omron</div>
                </td>
                <td className="px-6 py-4 text-body-md">15/05/2024</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">factory</span>
                    </div>
                    <span className="text-body-md font-medium">Omron Healthcare</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-body-md">Nguyễn Văn An</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1.5"></span>
                    Đã nhập
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-on-surface">1,250,000,000 ₫</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-surface-container rounded-lg transition-colors text-outline">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-slate-50 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <span className="font-label-md text-myan-primary font-bold">PN-2024-002</span>
                  <div className="text-[11px] text-on-surface-variant mt-0.5">Xe lăn cao cấp X2</div>
                </td>
                <td className="px-6 py-4 text-body-md">16/05/2024</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">factory</span>
                    </div>
                    <span className="text-body-md font-medium">Terumo Vietnam</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-body-md">Trần Thị Bích</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1.5"></span>
                    Đang về
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-on-surface">840,000,000 ₫</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-surface-container rounded-lg transition-colors text-outline">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
