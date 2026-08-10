'use client';

import React, { useState } from 'react';
import {
  Settings,
  Mail,
  Shield,
  Palette,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

/**
 * Trang Cấu Hình Hệ Thống (System Settings CMS)
 * Hỗ trợ giao diện Tab dọc gồm cấu hình chung, SMTP email, Bảo mật và Giao diện hệ thống.
 * @returns React Component
 */
export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trạng thái cấu hình chung
  const [generalConfig, setGeneralConfig] = useState({
    siteName: 'Korean Learning Center',
    siteUrl: 'https://korean-learning.edu.vn',
    supportEmail: 'support@korean.edu.vn',
    allowRegistration: true,
  });

  // Trạng thái cấu hình SMTP
  const [smtpConfig, setSmtpConfig] = useState({
    host: 'smtp.gmail.com',
    port: '587',
    username: 'mailer@korean.edu.vn',
    security: 'STARTTLS',
  });

  // Trạng thái cấu hình Bảo mật
  const [securityConfig, setSecurityConfig] = useState({
    sessionTimeout: '60', // phút
    enable2FA: false,
    maxLoginAttempts: '5',
  });

  // Trạng thái cấu hình Giao diện
  const [themeConfig, setThemeConfig] = useState({
    defaultTheme: 'light',
    accentColor: 'Seoul Sunset (Orange/Rose)',
    showLogo: true,
  });

  /**
   * Hiển thị thông báo nhanh trong 3 giây
   * @param message Nội dung thông báo
   */
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  /**
   * Xử lý lưu cấu hình cho từng tab
   */
  const handleSaveConfig = () => {
    let tabName = '';
    if (activeTab === 'general') tabName = 'Cấu hình chung';
    else if (activeTab === 'smtp') tabName = 'Cấu hình SMTP';
    else if (activeTab === 'security') tabName = 'Cấu hình Bảo mật';
    else if (activeTab === 'interface') tabName = 'Cấu hình Giao diện';

    showToast(`Đã lưu ${tabName} thành công!`);
  };

  return (
    <div className="space-y-8 font-outfit text-slate-800 dark:text-slate-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white px-5 py-3.5 shadow-2xl border border-slate-700/50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 size={16} className="text-orange-500" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Cấu hình hệ thống
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Thiết lập các thông số vận hành cốt lõi, máy chủ gửi thư SMTP, chính sách bảo mật và chủ
          đề giao diện.
        </p>
      </div>

      {/* Grid Layout: 2 Cột (Cột Trái: Danh Sách Tab Dọc, Cột Phải: Form Chi Tiết) */}
      <div className="grid gap-6 md:grid-cols-4 items-start">
        {/* Cột Trái: Sidebar Tab Dọc (md:col-span-1) */}
        <div className="md:col-span-1 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-1.5 transition-colors">
          {[
            { id: 'general', label: 'Cấu hình chung', icon: Settings },
            { id: 'smtp', label: 'Cấu hình SMTP', icon: Mail },
            { id: 'security', label: 'Cấu hình Bảo mật', icon: Shield },
            { id: 'interface', label: 'Cấu hình Giao diện', icon: Palette },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-xs font-bold rounded-2xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 font-extrabold'
                    : 'text-slate-450 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850 dark:text-slate-400'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Cột Phải: Form Cấu Hình (md:col-span-3) */}
        <div className="md:col-span-3 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6 transition-colors">
          {/* Tab 1: Cấu hình chung */}
          {activeTab === 'general' && (
            <div className="space-y-5">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Thông số hệ thống chung
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-455">Tên website học tập</label>
                  <input
                    type="text"
                    value={generalConfig.siteName}
                    onChange={e => setGeneralConfig({ ...generalConfig, siteName: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs focus:outline-none focus:border-orange-500 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-455">Đường dẫn URL</label>
                  <input
                    type="text"
                    value={generalConfig.siteUrl}
                    onChange={e => setGeneralConfig({ ...generalConfig, siteUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs focus:outline-none focus:border-orange-500 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-455">Email hỗ trợ kỹ thuật</label>
                  <input
                    type="email"
                    value={generalConfig.supportEmail}
                    onChange={e =>
                      setGeneralConfig({ ...generalConfig, supportEmail: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs focus:outline-none focus:border-orange-500 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div className="flex items-center gap-3 sm:col-span-2 py-2">
                  <input
                    type="checkbox"
                    id="allowReg"
                    checked={generalConfig.allowRegistration}
                    onChange={e =>
                      setGeneralConfig({ ...generalConfig, allowRegistration: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500 dark:bg-slate-950"
                  />
                  <label
                    htmlFor="allowReg"
                    className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    Cho phép học viên tự do đăng ký tài khoản trực tuyến
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Cấu hình SMTP */}
          {activeTab === 'smtp' && (
            <div className="space-y-5">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Máy chủ gửi thư điện tử SMTP
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-455">SMTP Host Server</label>
                  <input
                    type="text"
                    value={smtpConfig.host}
                    onChange={e => setSmtpConfig({ ...smtpConfig, host: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs focus:outline-none focus:border-orange-500 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-455">SMTP Port</label>
                  <input
                    type="text"
                    value={smtpConfig.port}
                    onChange={e => setSmtpConfig({ ...smtpConfig, port: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs focus:outline-none focus:border-orange-500 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-455">Tài khoản Mail gửi</label>
                  <input
                    type="text"
                    value={smtpConfig.username}
                    onChange={e => setSmtpConfig({ ...smtpConfig, username: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs focus:outline-none focus:border-orange-500 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-455">
                    Giao thức bảo mật (TLS/SSL)
                  </label>
                  <select
                    value={smtpConfig.security}
                    onChange={e => setSmtpConfig({ ...smtpConfig, security: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs focus:outline-none focus:border-orange-500 dark:bg-slate-950 dark:text-white font-bold"
                  >
                    <option value="STARTTLS">STARTTLS (Khuyên dùng)</option>
                    <option value="SSL">SSL / TLS</option>
                    <option value="NONE">Không bảo mật</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Cấu hình Bảo mật */}
          {activeTab === 'security' && (
            <div className="space-y-5">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Chính sách bảo mật hệ thống
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-455">
                    Thời hạn phiên đăng nhập (phút)
                  </label>
                  <input
                    type="number"
                    value={securityConfig.sessionTimeout}
                    onChange={e =>
                      setSecurityConfig({ ...securityConfig, sessionTimeout: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs focus:outline-none focus:border-orange-500 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-455">
                    Số lần thử đăng nhập tối đa
                  </label>
                  <input
                    type="number"
                    value={securityConfig.maxLoginAttempts}
                    onChange={e =>
                      setSecurityConfig({ ...securityConfig, maxLoginAttempts: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs focus:outline-none focus:border-orange-500 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div className="flex items-center gap-3 sm:col-span-2 py-2">
                  <input
                    type="checkbox"
                    id="enable2fa"
                    checked={securityConfig.enable2FA}
                    onChange={e =>
                      setSecurityConfig({ ...securityConfig, enable2FA: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500 dark:bg-slate-950"
                  />
                  <label
                    htmlFor="enable2fa"
                    className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    Bắt buộc xác thực hai yếu tố (2FA) đối với tài khoản Admin
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Cấu hình Giao diện */}
          {activeTab === 'interface' && (
            <div className="space-y-5">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Giao diện & Nhận diện thương hiệu
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-455">Chủ đề mặc định</label>
                  <select
                    value={themeConfig.defaultTheme}
                    onChange={e => setThemeConfig({ ...themeConfig, defaultTheme: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs focus:outline-none focus:border-orange-500 dark:bg-slate-950 dark:text-white font-bold"
                  >
                    <option value="light">Sáng (Light Mode)</option>
                    <option value="dark">Tối (Dark Mode)</option>
                    <option value="system">Theo hệ điều hành</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-455">Màu sắc chủ đạo</label>
                  <input
                    type="text"
                    value={themeConfig.accentColor}
                    readOnly
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs focus:outline-none dark:bg-slate-950 dark:text-slate-400 font-bold"
                  />
                </div>
                <div className="flex items-center gap-3 sm:col-span-2 py-2">
                  <input
                    type="checkbox"
                    id="showLogo"
                    checked={themeConfig.showLogo}
                    onChange={e => setThemeConfig({ ...themeConfig, showLogo: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500 dark:bg-slate-950"
                  />
                  <label
                    htmlFor="showLogo"
                    className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    Hiển thị Logo thương hiệu trên thanh điều hướng sidebar
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Footer Save Button */}
          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleSaveConfig}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white px-5 py-3 text-sm font-bold shadow-md shadow-orange-500/25 active:scale-95 transition-all"
            >
              <Save size={16} />
              <span>Lưu cấu hình hệ thống</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
