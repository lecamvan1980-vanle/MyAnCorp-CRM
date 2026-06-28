import { Link } from 'react-router-dom';

export default function Products() {
  return (
    <div className="p-container-padding pb-12">
      {/* Header Actions */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-display-md text-display-md text-on-surface mb-1">Danh mục sản phẩm</h2>
          <nav className="flex text-label-sm text-on-surface-variant gap-2">
            <span>Kho hàng</span>
            <span>/</span>
            <span className="text-myan-primary font-semibold">Sản phẩm</span>
          </nav>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-myan-primary text-myan-primary bg-white rounded-[6px] font-label-md text-label-md hover:bg-myan-primary/5 transition-all">
            <span className="material-symbols-outlined text-[18px]">upload_file</span>
            Nhập từ Excel
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-myan-primary text-white rounded-[6px] font-label-md text-label-md hover:brightness-110 transition-all">
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Thêm sản phẩm
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-xl border border-outline-variant shadow-sm mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex flex-col gap-1.5 min-w-[200px]">
          <label className="text-label-sm text-on-surface-variant px-1">Danh mục</label>
          <select className="bg-surface-container-low border-outline-variant rounded-[6px] text-body-md py-2 focus:ring-myan-primary focus:border-myan-primary">
            <option>Tất cả danh mục</option>
            <option>Thiết bị đo</option>
            <option>Hỗ trợ di chuyển</option>
            <option>Vật tư tiêu hao</option>
            <option>Thiết bị chẩn đoán</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5 min-w-[200px]">
          <label className="text-label-sm text-on-surface-variant px-1">Trạng thái kho</label>
          <select className="bg-surface-container-low border-outline-variant rounded-[6px] text-body-md py-2 focus:ring-myan-primary focus:border-myan-primary">
            <option>Tất cả trạng thái</option>
            <option>Còn hàng</option>
            <option>Sắp hết hàng</option>
            <option>Hết hàng</option>
          </select>
        </div>
        <div className="ml-auto self-end">
          <button className="px-4 py-2.5 text-on-surface-variant hover:text-myan-primary flex items-center gap-2 transition-all font-label-md">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            Bộ lọc nâng cao
          </button>
        </div>
      </div>

      {/* Product Table Card */}
      <div className="bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Hình ảnh</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Sản phẩm / SKU</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Danh mục</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-center">Đơn vị</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-right">Đơn giá (VND)</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-center">Tồn kho</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30">
            {/* Item 1 */}
            <tr className="hover:bg-slate-50 transition-all group cursor-pointer">
              <td className="px-6 py-4">
                <div className="w-12 h-12 bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEFadYYAhJdhYkRx5yYQ6qD0_P_Fb7Sn_WQ65bKuZ2F5DAGk18tVPoZku2UWTjUOV2kHOw0HNuGTaj4vRjlDcE-O8qqP9OZJwJlma2geTo_i4Lb73dLvyEQbMjr-vWrJyxx091bp8JhDSegGsomVtKhVzyJRp_tnLUQ5zL3-of9NIZEasnCRdC1F9n9an5B616zsOSIQbpzK2cKq712VgpBUelIcqDhSf6iT8kYU87RGajOUl1jxFFyceurIa3iS5kzwS26LF8AtU" alt="Product" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="font-bold text-body-lg text-on-surface">Máy đo huyết áp Omron HBP-1300</div>
                <div className="text-label-sm text-on-surface-variant">SKU: OMR-1300-PRO</div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-label-sm">Thiết bị đo</span>
              </td>
              <td className="px-6 py-4 text-center text-body-md text-on-surface">Bộ</td>
              <td className="px-6 py-4 text-right font-semibold text-body-md text-on-surface">3.450.000</td>
              <td className="px-6 py-4 text-center text-body-md text-on-surface">45</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1.5 text-green-600 font-medium text-label-md">
                  <span className="w-2 h-2 rounded-full bg-green-600"></span>
                  Còn hàng
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button className="p-1.5 text-on-surface-variant hover:text-myan-primary transition-all"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                  <button className="p-1.5 text-on-surface-variant hover:text-error transition-all"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                </div>
              </td>
            </tr>
            {/* Item 2 */}
            <tr className="hover:bg-slate-50 transition-all group cursor-pointer">
              <td className="px-6 py-4">
                <div className="w-12 h-12 bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPfK5DHZUVXib5elsaqIsmgE8QU2JfHE6ub57uKvK906lHtl0o51OwsMcA6iHX_1iMtO7e-JLpAt0f1UQcV1Y5f1fEShlfV8qMGJ1cqLqncdY81elO8LBM7Q5no8jxcC8b4tZipuiht8gP3CDRIo_Ir1mNpdmqz_f6etuFtQ96L6HTKyBUgHLjIQsWumfc0QIb8M-QHSInmANycOwxxwLCzasNt5rsCIJmrtrFNQaoc2J_nVyMc_lMK844joiB0QYm6RGeHsOi1iQ" alt="Product" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="font-bold text-body-lg text-on-surface">Xe lăn điện KM-150</div>
                <div className="text-label-sm text-on-surface-variant">SKU: KARMAN-150-EL</div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-label-sm">Hỗ trợ di chuyển</span>
              </td>
              <td className="px-6 py-4 text-center text-body-md text-on-surface">Cái</td>
              <td className="px-6 py-4 text-right font-semibold text-body-md text-on-surface">18.200.000</td>
              <td className="px-6 py-4 text-center text-body-md text-error font-bold">8</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1.5 text-orange-500 font-medium text-label-md">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  Sắp hết
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button className="p-1.5 text-on-surface-variant hover:text-myan-primary transition-all"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                  <button className="p-1.5 text-on-surface-variant hover:text-error transition-all"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-outline-variant flex items-center justify-between bg-surface-container-lowest">
          <p className="text-label-sm text-on-surface-variant">Hiển thị 1 - 4 của 128 sản phẩm</p>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container-low transition-all"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-myan-primary bg-myan-primary text-white font-label-md">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container-low transition-all font-label-md">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container-low transition-all"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}
