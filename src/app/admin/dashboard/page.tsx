/*
export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
...
*/

'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  BookOpen, 
  Video, 
  HelpCircle, 
  TrendingUp, 
  ArrowUpRight, 
  UserCheck, 
  Award,
  Sparkles
} from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 font-outfit">

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { name: 'Tổng học viên', value: '1,248', desc: '+12% so với tháng trước', icon: Users, color: 'bg-teal-50 text-teal-600 border-teal-100' },
          { name: 'Khóa học đang mở', value: '6', desc: 'Sơ cấp đến Cao cấp', icon: BookOpen, color: 'bg-blue-50 text-blue-600 border-blue-100' },
          { name: 'Bài học video', value: '72', desc: 'Thời lượng ~48 giờ', icon: Video, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
          { name: 'Câu hỏi luyện tập', value: '450', desc: 'Trắc nghiệm & Flashcard', icon: HelpCircle, color: 'bg-orange-50 text-orange-600 border-orange-100' },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-teal-500/20 transition-all duration-300 group"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {stat.name}
                </span>
                <h3 className="text-3xl font-extrabold text-slate-950 group-hover:text-teal-600 transition-colors">
                  {stat.value}
                </h3>
              </div>
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <p className="mt-4 text-slate-500 text-[11px] font-semibold border-t border-slate-50 pt-3">
              {stat.desc}
            </p>
          </div>
        ))}
      </div>

          <div className="flex items-end justify-between h-56 pt-6 px-2 border-b border-slate-100">
            {[
              { day: 'Thứ 2', height: '40%', val: '120 lượt' },
              { day: 'Thứ 3', height: '65%', val: '210 lượt' },
              { day: 'Thứ 4', height: '50%', val: '160 lượt' },
              { day: 'Thứ 5', height: '85%', val: '320 lượt' },
              { day: 'Thứ 6', height: '70%', val: '240 lượt' },
              { day: 'Thứ 7', height: '95%', val: '380 lượt' },
              { day: 'Chủ Nhật', height: '60%', val: '190 lượt' }
            ].map((col, idx) => (
              <div key={idx} className="flex flex-col items-center group w-1/8 space-y-2">
                
                <div 
                  style={{ height: col.height }} 
                  className="w-full bg-slate-200 group-hover:bg-teal-600 rounded-t-xl transition-all duration-500 cursor-pointer shadow-inner relative"
                >
                  <div className="absolute inset-0 bg-teal-500/10 group-hover:bg-transparent rounded-t-xl transition-all" />
                </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-950 flex items-center gap-1.5">
              <UserCheck size={18} className="text-teal-600" />
              Học viên mới
            </h3>
            <Link href="/admin/users" className="text-xs font-bold text-teal-600 hover:text-teal-700">Xem tất cả</Link>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Nguyễn Văn Minh', email: 'minhnv@gmail.com', time: '2 giờ trước', initial: 'M', color: 'bg-teal-50 text-teal-700' },
              { name: 'Trần Thị Phương', email: 'phuongtt@gmail.com', time: '4 giờ trước', initial: 'P', color: 'bg-blue-50 text-blue-700' },
              { name: 'Lê Anh Tuấn', email: 'tuanla@gmail.com', time: '1 ngày trước', initial: 'T', color: 'bg-purple-50 text-purple-700' }
            ].map((user, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold text-sm ${user.color}`}>
                    {user.initial}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-none">{user.name}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1">{user.email}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-500">{user.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

