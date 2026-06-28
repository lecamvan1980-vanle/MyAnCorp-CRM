import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { name: "Khách hàng", path: "/customers", icon: "groups" },
    { name: "Sản phẩm", path: "/products", icon: "category" },
    { name: "Nhập kho", path: "/inventory", icon: "inventory_2" },
    { name: "Cơ hội", path: "/opportunities", icon: "handshake" },
    { name: "Công việc", path: "/tasks", icon: "task_alt" },
    { name: "Cài đặt", path: "/settings", icon: "settings" },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="text-on-surface selection:bg-primary-fixed min-h-screen bg-surface-container-lowest">
      {/* SIDEBAR */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-[#0F172A] shadow-md flex flex-col z-50">
        <div className="px-6 py-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white" style={{fontVariationSettings: "'FILL' 1"}}>medical_services</span>
          </div>
          <div>
            <h1 className="font-display-md text-label-md text-primary-fixed leading-tight">Myan Corp</h1>
            <p className="text-[10px] text-outline-variant uppercase tracking-wider">Medical CRM</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 transition-all duration-200 ease-in-out group ${
                  isActive 
                  ? "bg-[#1e293b] border-l-4 border-myan-primary text-primary-fixed-dim" 
                  : "text-on-secondary-container hover:bg-[#1e293b] hover:text-primary-fixed-dim"
                }`}
              >
                <span className="material-symbols-outlined mr-3">{item.icon}</span>
                <span className="font-label-md text-label-md">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleLogout}>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-fixed flex items-center justify-center text-primary font-bold">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div className="flex flex-col">
              <span className="text-label-md font-label-md text-white truncate w-32">{profile?.full_name || user?.email || 'Người dùng'}</span>
              <span className="text-[10px] text-outline-variant">Đăng xuất</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN WRAPPER */}
      <main className="ml-64 min-h-screen flex flex-col bg-[#F5F7FA]">
        {/* TOP NAV BAR */}
        <header className="flex justify-between items-center h-16 px-container-padding sticky top-0 bg-surface-container-lowest border-b border-outline-variant z-40">
          <div className="flex items-center flex-1 max-w-xl">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input type="text" className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 text-body-md focus:ring-2 focus:ring-myan-primary/20 outline-none" placeholder="Tìm kiếm hệ thống..." />
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-6">
            <button className="p-2 text-on-surface-variant hover:text-myan-primary transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <button className="p-2 text-on-surface-variant hover:text-myan-primary transition-colors">
              <span className="material-symbols-outlined">help</span>
            </button>
            
            <div className="h-8 w-[1px] bg-outline-variant mx-2"></div>
            
            <div className="flex items-center gap-2 group">
              <div className="text-right hidden md:block">
                <p className="font-label-md text-label-md text-on-surface">{profile?.full_name || user?.email}</p>
                <p className="text-[11px] text-on-surface-variant uppercase">{profile?.role || 'Vui lòng cập nhật'}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs uppercase">
                {(profile?.full_name || user?.email || '?').charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
