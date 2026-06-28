import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      if (error) {
        throw error;
      }
      navigate('/dashboard');
    } catch (error) {
      let vnErrorMsg = error.message;
      if (error.message === 'Invalid login credentials') {
        vnErrorMsg = 'Email hoặc mật khẩu không chính xác. Hoặc tài khoản chưa được tạo trên Supabase.';
      }
      setErrorMsg(vnErrorMsg || 'Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container flex flex-col md:flex-row font-body-md text-on-surface">
      {/* Cột Trái: Đăng nhập */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-surface">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-display-lg font-display-lg text-primary mb-2">Myan Corp CRM</h1>
            <p className="text-body-lg text-on-surface-variant">Hệ thống quản lý khách hàng y tế chuyên nghiệp</p>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_4px_8px_rgba(0,0,0,0.05)] border border-outline-variant">
            <h2 className="text-headline-sm font-headline-sm mb-6 text-on-surface">Đăng nhập hệ thống</h2>
            
            {errorMsg && (
              <div className="mb-4 p-3 bg-error-container text-on-error-container rounded-lg text-label-sm border border-error/30">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-label-md font-label-md text-on-surface-variant mb-1" htmlFor="email">Email công ty</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">mail</span>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    placeholder="name@myancorp.vn"
                    required
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="password">Mật khẩu</label>
                  <a href="#" className="text-label-sm text-primary hover:underline">Quên mật khẩu?</a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">lock</span>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    placeholder="••••••••"
                    required
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center pt-2 pb-4">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-primary bg-surface-container border-outline-variant rounded focus:ring-primary"
                />
                <label htmlFor="remember" className="ml-2 text-label-md text-on-surface-variant cursor-pointer">Ghi nhớ đăng nhập</label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-myan-primary hover:bg-primary-container text-white font-label-md py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-outline-variant text-center">
              <p className="text-label-sm text-on-surface-variant">
                Gặp sự cố đăng nhập? <a href="#" className="text-primary hover:underline">Liên hệ IT Support</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cột Phải: Hình ảnh & Quote */}
      <div className="hidden md:flex w-1/2 bg-myan-primary p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#006480] to-[#004d64] opacity-90 z-0"></div>
        
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-white text-[32px]">health_and_safety</span>
          </div>
          <h2 className="text-display-md font-display-md text-white leading-tight max-w-md">
            Số hóa quy trình<br/>Tối ưu trải nghiệm<br/>Nâng tầm dịch vụ y tế.
          </h2>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-white">
          <p className="text-body-md italic mb-4">"Hệ thống CRM mới giúp đội ngũ Sales của Myan Corp theo dõi sát sao từng cơ hội, từ khách lẻ đến đối tác bệnh viện lớn, đảm bảo không bỏ sót bất kỳ nhu cầu nào của khách hàng."</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-label-md font-bold">BG</div>
            <div>
              <p className="font-label-md text-label-md">Ban Giám Đốc</p>
              <p className="text-label-sm text-white/70">Myan Corp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
