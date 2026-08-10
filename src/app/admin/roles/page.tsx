'use client';

import React from 'react';

/**
 * CMS Quản lý Role và Phân quyền theo Màn hình & Dữ liệu
 * @returns React Component cho trang quản lý vai trò và phân quyền của admin
 */
// OLD:
// export default function AdminRolesPage() {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Phân quyền & Vai trò (RBAC)</h1>
//         <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
//           + Thêm Vai trò mới
//         </button>
//       </div>
//       ...
//     </div>
//   );
// }

import { useState } from 'react';
import { ShieldCheck, Users, Info, Database, UserCheck, AlertCircle, Save } from 'lucide-react';

/**
 * Định nghĩa cấu trúc quyền của một vai trò
 */
interface RolePermission {
  screen: string;
  actions: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    export: boolean;
    import: boolean;
  };
}

/**
 * Định nghĩa vai trò trong hệ thống kèm mô tả, danh sách quyền và thành viên
 */
interface RoleConfig {
  roleId: string;
  name: string;
  description: string;
  dataScope: 'Toàn bộ hệ thống' | 'Dữ liệu giới hạn' | 'Chỉ dữ liệu cá nhân';
  permissions: RolePermission[];
  members: { name: string; email: string; avatarColor: string; initial: string }[];
}

/**
 * Trang quản lý Phân quyền hệ thống (Roles & Permissions Matrix)
 * Hỗ trợ phân quyền linh hoạt theo dạng ma trận, cấu hình phạm vi dữ liệu và theo dõi thành viên thuộc vai trò.
 * @returns React Component
 */
export default function AdminRolesPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Danh sách các vai trò chính trong hệ thống
  const [roles, setRoles] = useState<RoleConfig[]>([
    {
      roleId: 'role-super-admin',
      name: 'Super Admin',
      description:
        'Quyền kiểm soát tối cao toàn bộ hệ thống, quản lý tài khoản admin khác và cấu hình cốt lõi.',
      dataScope: 'Toàn bộ hệ thống',
      members: [
        {
          name: 'Vinh Admin',
          email: 'vinhadmin@korean.com',
          avatarColor: 'bg-orange-500/10 text-orange-600',
          initial: 'V',
        },
        {
          name: 'Trần Minh Super',
          email: 'minh.super@korean.com',
          avatarColor: 'bg-rose-500/10 text-rose-600',
          initial: 'M',
        },
      ],
      permissions: [
        {
          screen: 'Tổng quan (Dashboard)',
          actions: {
            view: true,
            create: true,
            edit: true,
            delete: true,
            export: true,
            import: true,
          },
        },
        {
          screen: 'Quản lý khóa học',
          actions: {
            view: true,
            create: true,
            edit: true,
            delete: true,
            export: true,
            import: true,
          },
        },
        {
          screen: 'Quản lý bài học',
          actions: {
            view: true,
            create: true,
            edit: true,
            delete: true,
            export: true,
            import: true,
          },
        },
        {
          screen: 'Ngân hàng câu hỏi',
          actions: {
            view: true,
            create: true,
            edit: true,
            delete: true,
            export: true,
            import: true,
          },
        },
        {
          screen: 'Kho từ vựng',
          actions: {
            view: true,
            create: true,
            edit: true,
            delete: true,
            export: true,
            import: true,
          },
        },
        {
          screen: 'Quản lý người dùng',
          actions: {
            view: true,
            create: true,
            edit: true,
            delete: true,
            export: true,
            import: true,
          },
        },
        {
          screen: 'Phân quyền hệ thống',
          actions: {
            view: true,
            create: true,
            edit: true,
            delete: true,
            export: true,
            import: true,
          },
        },
        {
          screen: 'Báo cáo thống kê',
          actions: {
            view: true,
            create: true,
            edit: true,
            delete: true,
            export: true,
            import: true,
          },
        },
        {
          screen: 'Cấu hình hệ thống',
          actions: {
            view: true,
            create: true,
            edit: true,
            delete: true,
            export: true,
            import: true,
          },
        },
        {
          screen: 'Nhật ký thao tác',
          actions: {
            view: true,
            create: true,
            edit: true,
            delete: true,
            export: true,
            import: true,
          },
        },
      ],
    },
    {
      roleId: 'role-admin',
      name: 'Admin',
      description: 'Quản lý khóa học, bài học, chấm điểm và xem các báo cáo thống kê của học viên.',
      dataScope: 'Toàn bộ hệ thống',
      members: [
        {
          name: 'Nguyễn Văn Minh',
          email: 'minhnv@gmail.com',
          avatarColor: 'bg-amber-500/10 text-amber-600',
          initial: 'M',
        },
        {
          name: 'Trần Thị Phương',
          email: 'phuongtt@gmail.com',
          avatarColor: 'bg-teal-500/10 text-teal-600',
          initial: 'P',
        },
      ],
      permissions: [
        {
          screen: 'Tổng quan (Dashboard)',
          actions: {
            view: true,
            create: false,
            edit: false,
            delete: false,
            export: true,
            import: false,
          },
        },
        {
          screen: 'Quản lý khóa học',
          actions: {
            view: true,
            create: true,
            edit: true,
            delete: false,
            export: true,
            import: true,
          },
        },
        {
          screen: 'Quản lý bài học',
          actions: {
            view: true,
            create: true,
            edit: true,
            delete: false,
            export: true,
            import: true,
          },
        },
        {
          screen: 'Ngân hàng câu hỏi',
          actions: {
            view: true,
            create: true,
            edit: true,
            delete: false,
            export: true,
            import: true,
          },
        },
        {
          screen: 'Kho từ vựng',
          actions: {
            view: true,
            create: true,
            edit: true,
            delete: false,
            export: true,
            import: true,
          },
        },
        {
          screen: 'Quản lý người dùng',
          actions: {
            view: true,
            create: false,
            edit: true,
            delete: false,
            export: true,
            import: false,
          },
        },
        {
          screen: 'Phân quyền hệ thống',
          actions: {
            view: false,
            create: false,
            edit: false,
            delete: false,
            export: false,
            import: false,
          },
        },
        {
          screen: 'Báo cáo thống kê',
          actions: {
            view: true,
            create: false,
            edit: false,
            delete: false,
            export: true,
            import: false,
          },
        },
        {
          screen: 'Cấu hình hệ thống',
          actions: {
            view: false,
            create: false,
            edit: false,
            delete: false,
            export: false,
            import: false,
          },
        },
        {
          screen: 'Nhật ký thao tác',
          actions: {
            view: true,
            create: false,
            edit: false,
            delete: false,
            export: false,
            import: false,
          },
        },
      ],
    },
    {
      roleId: 'role-student',
      name: 'Học Viên',
      description: 'Học viên tham gia khóa học trực tuyến, thực hành bài tập và tra cứu từ vựng.',
      dataScope: 'Chỉ dữ liệu cá nhân',
      members: [
        {
          name: 'Lê Anh Tuấn',
          email: 'tuanla@gmail.com',
          avatarColor: 'bg-blue-500/10 text-blue-600',
          initial: 'T',
        },
        {
          name: 'Phạm Minh Khoa',
          email: 'khoapm@gmail.com',
          avatarColor: 'bg-purple-500/10 text-purple-600',
          initial: 'K',
        },
      ],
      permissions: [
        {
          screen: 'Tổng quan (Dashboard)',
          actions: {
            view: false,
            create: false,
            edit: false,
            delete: false,
            export: false,
            import: false,
          },
        },
        {
          screen: 'Quản lý khóa học',
          actions: {
            view: false,
            create: false,
            edit: false,
            delete: false,
            export: false,
            import: false,
          },
        },
        {
          screen: 'Quản lý bài học',
          actions: {
            view: false,
            create: false,
            edit: false,
            delete: false,
            export: false,
            import: false,
          },
        },
        {
          screen: 'Ngân hàng câu hỏi',
          actions: {
            view: false,
            create: false,
            edit: false,
            delete: false,
            export: false,
            import: false,
          },
        },
        {
          screen: 'Kho từ vựng',
          actions: {
            view: false,
            create: false,
            edit: false,
            delete: false,
            export: false,
            import: false,
          },
        },
        {
          screen: 'Quản lý người dùng',
          actions: {
            view: false,
            create: false,
            edit: false,
            delete: false,
            export: false,
            import: false,
          },
        },
        {
          screen: 'Phân quyền hệ thống',
          actions: {
            view: false,
            create: false,
            edit: false,
            delete: false,
            export: false,
            import: false,
          },
        },
        {
          screen: 'Báo cáo thống kê',
          actions: {
            view: false,
            create: false,
            edit: false,
            delete: false,
            export: false,
            import: false,
          },
        },
        {
          screen: 'Cấu hình hệ thống',
          actions: {
            view: false,
            create: false,
            edit: false,
            delete: false,
            export: false,
            import: false,
          },
        },
        {
          screen: 'Nhật ký thao tác',
          actions: {
            view: false,
            create: false,
            edit: false,
            delete: false,
            export: false,
            import: false,
          },
        },
      ],
    },
  ]);

  // Vai trò đang được chọn để cấu hình (tab hoạt động)
  const [activeRoleId, setActiveRoleId] = useState('role-super-admin');

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

  // Lấy cấu hình vai trò hiện tại
  const currentRole = roles.find(r => r.roleId === activeRoleId) || roles[0];

  /**
   * Thay đổi giá trị của một checkbox cụ thể trong ma trận quyền
   * @param screen Màn hình cần chỉnh sửa quyền
   * @param action Loại quyền (view, create, edit, delete, export, import)
   */
  const handleCheckboxChange = (screen: string, action: keyof RolePermission['actions']) => {
    // OLD: Update state roles
    setRoles(prevRoles =>
      prevRoles.map(role => {
        if (role.roleId === activeRoleId) {
          const updatedPermissions = role.permissions.map(p => {
            if (p.screen === screen) {
              return {
                ...p,
                actions: {
                  ...p.actions,
                  [action]: !p.actions[action],
                },
              };
            }
            return p;
          });
          return { ...role, permissions: updatedPermissions };
        }
        return role;
      })
    );
  };

  /**
   * Lưu thay đổi cấu hình phân quyền cho vai trò hiện tại
   */
  const handleSaveChanges = () => {
    showToast(`Đã lưu thay đổi cấu hình phân quyền cho vai trò "${currentRole.name}" thành công!`);
  };

  return (
    <div className="space-y-8 font-outfit text-slate-800 dark:text-slate-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white px-5 py-3.5 shadow-2xl border border-slate-700/50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <ShieldCheck size={16} className="text-orange-500" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Phân quyền hệ thống
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Thiết lập chi tiết ma trận quyền hạn theo vai trò (RBAC) và kiểm soát phạm vi truy cập
            dữ liệu.
          </p>
        </div>
        <button
          onClick={() => showToast('Tính năng Thêm vai trò mới sẽ được tích hợp ở Sprint sau!')}
          className="rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white px-5 py-3 text-sm font-bold shadow-md shadow-orange-500/20 active:scale-95 transition-all self-start sm:self-auto"
        >
          + Thêm vai trò mới
        </button>
      </div>

      {/* Bộ Chọn Vai Trò dạng Tab Lớn Nằm Ngang */}
      <div className="flex flex-col sm:flex-row gap-2 border-b border-slate-200 dark:border-slate-850 pb-px">
        {roles.map(role => (
          <button
            key={role.roleId}
            onClick={() => setActiveRoleId(role.roleId)}
            className={`px-6 py-3.5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeRoleId === role.roleId
                ? 'border-orange-500 text-orange-600 dark:text-orange-400 font-extrabold'
                : 'border-transparent text-slate-400 hover:text-slate-655 hover:border-slate-300 dark:hover:text-slate-300'
            }`}
          >
            <ShieldCheck size={16} />
            {role.name}
            <span className="ml-1 text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full font-semibold">
              {role.members.length}
            </span>
          </button>
        ))}
      </div>

      {/* Grid: 2 Cột (Cột Trái: Ma Trận Phân Quyền, Cột Phải: Phạm Vi & Thành Viên) */}
      <div className="grid gap-6 lg:grid-cols-3 items-start">
        {/* Cột Trái: Ma trận Quyền hạn (col-span-2) */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6 transition-colors">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Ma trận Quyền hạn: <span className="text-orange-500">{currentRole.name}</span>
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-550 font-medium">
              {currentRole.description}
            </p>
          </div>

          {/* Ma trận Checkbox */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[550px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-950/20">
                  <th className="py-3.5 pl-4 rounded-l-xl">Màn hình / Chức năng</th>
                  <th className="py-3.5 text-center">Xem</th>
                  <th className="py-3.5 text-center">Tạo</th>
                  <th className="py-3.5 text-center">Sửa</th>
                  <th className="py-3.5 text-center">Xóa</th>
                  <th className="py-3.5 text-center">Export</th>
                  <th className="py-3.5 text-center rounded-r-xl">Import</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {currentRole.permissions.map((p, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/30 dark:hover:bg-slate-850/10 transition-colors"
                  >
                    <td className="py-4 pl-4 font-bold text-slate-800 dark:text-slate-200">
                      {p.screen}
                    </td>
                    <td className="py-4 text-center">
                      <input
                        type="checkbox"
                        checked={p.actions.view}
                        onChange={() => handleCheckboxChange(p.screen, 'view')}
                        disabled={activeRoleId === 'role-super-admin'}
                        className="h-4 w-4 rounded-full border-slate-300 text-orange-500 focus:ring-orange-500 cursor-pointer disabled:opacity-50 dark:bg-slate-950 dark:border-slate-800"
                      />
                    </td>
                    <td className="py-4 text-center">
                      <input
                        type="checkbox"
                        checked={p.actions.create}
                        onChange={() => handleCheckboxChange(p.screen, 'create')}
                        disabled={activeRoleId === 'role-super-admin'}
                        className="h-4 w-4 rounded-full border-slate-300 text-orange-500 focus:ring-orange-500 cursor-pointer disabled:opacity-50 dark:bg-slate-950 dark:border-slate-800"
                      />
                    </td>
                    <td className="py-4 text-center">
                      <input
                        type="checkbox"
                        checked={p.actions.edit}
                        onChange={() => handleCheckboxChange(p.screen, 'edit')}
                        disabled={activeRoleId === 'role-super-admin'}
                        className="h-4 w-4 rounded-full border-slate-300 text-orange-500 focus:ring-orange-500 cursor-pointer disabled:opacity-50 dark:bg-slate-950 dark:border-slate-800"
                      />
                    </td>
                    <td className="py-4 text-center">
                      <input
                        type="checkbox"
                        checked={p.actions.delete}
                        onChange={() => handleCheckboxChange(p.screen, 'delete')}
                        disabled={activeRoleId === 'role-super-admin'}
                        className="h-4 w-4 rounded-full border-slate-300 text-orange-500 focus:ring-orange-500 cursor-pointer disabled:opacity-50 dark:bg-slate-950 dark:border-slate-800"
                      />
                    </td>
                    <td className="py-4 text-center">
                      <input
                        type="checkbox"
                        checked={p.actions.export}
                        onChange={() => handleCheckboxChange(p.screen, 'export')}
                        disabled={activeRoleId === 'role-super-admin'}
                        className="h-4 w-4 rounded-full border-slate-300 text-orange-500 focus:ring-orange-500 cursor-pointer disabled:opacity-50 dark:bg-slate-950 dark:border-slate-800"
                      />
                    </td>
                    <td className="py-4 text-center">
                      <input
                        type="checkbox"
                        checked={p.actions.import}
                        onChange={() => handleCheckboxChange(p.screen, 'import')}
                        disabled={activeRoleId === 'role-super-admin'}
                        className="h-4 w-4 rounded-full border-slate-300 text-orange-500 focus:ring-orange-500 cursor-pointer disabled:opacity-50 dark:bg-slate-950 dark:border-slate-800"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer nút bấm lưu */}
          {activeRoleId !== 'role-super-admin' && (
            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleSaveChanges}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white px-5 py-3 text-sm font-bold shadow-md shadow-orange-500/25 active:scale-95 transition-all"
              >
                <Save size={16} />
                <span>Lưu thay đổi phân quyền</span>
              </button>
            </div>
          )}
        </div>

        {/* Cột Phải: Phạm Vi Dữ Liệu & Danh Sách Thành Viên (col-span-1) */}
        <div className="space-y-6">
          {/* Hộp 1: Cấu hình Phạm vi dữ liệu */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4 transition-colors">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
              <Database size={15} />
              Phạm vi tác động dữ liệu
            </h4>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-850 border border-slate-100 dark:border-slate-800/80 cursor-pointer text-xs">
                <input
                  type="radio"
                  name="data-scope"
                  checked={currentRole.dataScope === 'Toàn bộ hệ thống'}
                  readOnly
                  disabled={activeRoleId === 'role-super-admin'}
                  className="h-4 w-4 border-slate-350 text-orange-500 focus:ring-orange-500 disabled:opacity-50 dark:bg-slate-950 dark:border-slate-800"
                />
                <div>
                  <span className="font-extrabold text-slate-850 dark:text-slate-200">
                    Toàn bộ hệ thống
                  </span>
                  <span className="block text-[9px] text-slate-400 mt-0.5">
                    Cho phép thao tác trên tất cả học viên và khóa học.
                  </span>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-850 border border-slate-100 dark:border-slate-800/80 cursor-pointer text-xs">
                <input
                  type="radio"
                  name="data-scope"
                  checked={currentRole.dataScope === 'Dữ liệu giới hạn'}
                  readOnly
                  disabled={activeRoleId === 'role-super-admin'}
                  className="h-4 w-4 border-slate-350 text-orange-500 focus:ring-orange-500 disabled:opacity-50 dark:bg-slate-950 dark:border-slate-800"
                />
                <div>
                  <span className="font-extrabold text-slate-850 dark:text-slate-200">
                    Dữ liệu giới hạn
                  </span>
                  <span className="block text-[9px] text-slate-400 mt-0.5">
                    Chỉ thao tác trên các lớp học được gán quyền chủ quản.
                  </span>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-850 border border-slate-100 dark:border-slate-800/80 cursor-pointer text-xs">
                <input
                  type="radio"
                  name="data-scope"
                  checked={currentRole.dataScope === 'Chỉ dữ liệu cá nhân'}
                  readOnly
                  disabled={activeRoleId === 'role-super-admin'}
                  className="h-4 w-4 border-slate-350 text-orange-500 focus:ring-orange-500 disabled:opacity-50 dark:bg-slate-950 dark:border-slate-800"
                />
                <div>
                  <span className="font-extrabold text-slate-850 dark:text-slate-200">
                    Chỉ dữ liệu cá nhân
                  </span>
                  <span className="block text-[9px] text-slate-400 mt-0.5">
                    Học viên chỉ có quyền truy cập thông tin cá nhân.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Hộp 2: Danh sách thành viên */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4 transition-colors">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <Users size={15} />
                Thành viên sở hữu
              </h4>
              <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full">
                {currentRole.members.length} người
              </span>
            </div>

            <div className="space-y-3">
              {currentRole.members.map((mem, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl transition-colors"
                >
                  <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-sm ${mem.avatarColor}`}
                  >
                    {mem.initial}
                  </div>
                  <div className="min-w-0">
                    <span className="block font-bold text-xs text-slate-800 dark:text-slate-200 truncate">
                      {mem.name}
                    </span>
                    <span className="block text-[9px] text-slate-400 truncate mt-0.5">
                      {mem.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
