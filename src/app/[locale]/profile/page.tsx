'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { passkeyService } from '@/service/passkeyService';
import {
  Award,
  Flame,
  BookOpen,
  Calendar,
  Trophy,
  CheckCircle,
  Star,
  Zap,
  TrendingUp,
  Fingerprint,
} from 'lucide-react';

export default function ProfilePage() {
  const [isPasskeySupported, setIsPasskeySupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const userEmail = 'hocvien@koreanlearning.com';
  const userFullName = 'Học viên Tiếng Hàn';

  useEffect(() => {
    passkeyService.isSupported().then(supported => {
      setIsPasskeySupported(supported);
      if (supported) {
        setIsRegistered(!!localStorage.getItem(`passkey_${userEmail}`));
      }
    });
  }, []);

  const handleRegisterPasskey = async () => {
    try {
      const success = await passkeyService.register(userEmail, userFullName);
      if (success) {
        setIsRegistered(true);
        toast.success('Liên kết đăng nhập vân tay/FaceID trên thiết bị này thành công!');
      }
    } catch (err: any) {
      toast.error(err.message || 'Liên kết FaceID/Passkey thất bại.');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 font-outfit min-h-screen">
      {/* 1. Header Profile with Squircle Avatar */}
      <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-slate-200 pb-10">
        {/* Squircle Avatar (redesign-existing-projects requirement) */}
        <div className="h-24 w-24 rounded-3xl bg-teal-600 text-white flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-teal-600/20 transform rotate-3">
          <span className="transform -rotate-3">HV</span>
        </div>

        <div className="text-center sm:text-left space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
            Học viên Tiếng Hàn
          </h1>
          <p className="text-slate-600 text-sm font-semibold">Email: hocvien@koreanlearning.com</p>

          <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1">
            <span className="inline-flex items-center gap-1 rounded-xl bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 border border-teal-200">
              <CheckCircle size={12} />
              Trình độ: TOPIK I
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700 border border-orange-200">
              <Flame size={12} className="animate-bounce" />
              Streak: 5 ngày liên tiếp
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Stats & Progress */}
      <div className="mt-10 grid gap-8 md:grid-cols-12">
        {/* Left Column: Progress tracking */}
        <div className="md:col-span-8 space-y-8">
          {/* Progress Cards */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <TrendingUp size={20} className="text-teal-600" />
              Tiến độ học tập khóa học
            </h3>

            <div className="space-y-6">
              {/* Course 1 */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold text-slate-800">
                  <span>Khóa học Tiếng Hàn Sơ cấp 1</span>
                  <span className="text-teal-600">45% hoàn thành</span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200/40">
                  <div
                    className="h-full rounded-full bg-teal-600 transition-all duration-500"
                    style={{ width: '45%' }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Đã học xong 6/12 bài giảng • Ghi chú: 8 bản ghi
                </p>
              </div>

              {/* Course 2 */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <div className="flex justify-between text-sm font-bold text-slate-800">
                  <span>Khóa học Tiếng Hàn Sơ cấp 2</span>
                  <span className="text-slate-400">Chưa bắt đầu</span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200/40">
                  <div className="h-full rounded-full bg-slate-300" style={{ width: '0%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Gamification Badge collection */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <Trophy size={20} className="text-teal-600" />
              Tủ huy hiệu thành tích
            </h3>

            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
              {[
                {
                  name: 'Người khởi đầu',
                  desc: 'Học bài học đầu tiên',
                  icon: Zap,
                  color: 'bg-teal-50 text-teal-600 border border-teal-200',
                },
                {
                  name: 'Chiến binh Streak',
                  desc: 'Học liên tiếp 5 ngày',
                  icon: Flame,
                  color: 'bg-orange-50 text-orange-600 border border-orange-200',
                },
                {
                  name: 'Cao thủ Từ vựng',
                  desc: 'Thuộc hơn 100 từ vựng',
                  icon: Star,
                  color: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
                },
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2"
                >
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center ${badge.color}`}
                  >
                    <badge.icon size={18} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{badge.name}</h4>
                  <p className="text-[10px] text-slate-500">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Statistics */}
        <div className="md:col-span-4 space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6 h-fit">
            <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <Award size={18} className="text-teal-600" />
              Thống kê tổng quan
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                <div className="text-3xl font-extrabold text-teal-600">120</div>
                <div className="text-[10px] text-slate-500 font-semibold mt-1 uppercase tracking-wider">
                  Từ vựng đã thuộc
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                <div className="text-3xl font-extrabold text-teal-600">85%</div>
                <div className="text-[10px] text-slate-500 font-semibold mt-1 uppercase tracking-wider">
                  Tỉ lệ đúng Quiz
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-3 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Số bài luyện tập đã làm:</span>
                <span className="font-bold text-slate-900">8 bài</span>
              </div>
              <div className="flex justify-between">
                <span>Thời gian học tuần này:</span>
                <span className="font-bold text-slate-900">120 phút</span>
              </div>
            </div>
          </div>

          {/* Thiết lập bảo mật & Đăng nhập sinh trắc học (FaceID / Passkeys) */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <Fingerprint size={18} className="text-teal-650" />
              Đăng nhập sinh trắc học
            </h3>

            <p className="text-xs text-slate-500 leading-relaxed">
              Kích hoạt đăng nhập bằng vân tay hoặc nhận diện khuôn mặt (FaceID / Passkey) để truy
              cập nhanh tài khoản mà không cần nhập mật khẩu.
            </p>

            <div className="pt-2">
              {isPasskeySupported ? (
                isRegistered ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
                      <CheckCircle size={16} className="text-teal-600 flex-shrink-0" />
                      <span>Thiết bị đã được liên kết sinh trắc học thành công!</span>
                    </div>
                    <button
                      onClick={handleRegisterPasskey}
                      className="w-full py-2.5 rounded-xl border border-teal-600 text-teal-600 hover:bg-teal-50 text-xs font-bold transition-all active:scale-95 text-center"
                    >
                      Liên kết lại thiết bị
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleRegisterPasskey}
                    className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/10 transition-all active:scale-95 text-center flex items-center justify-center gap-2"
                  >
                    <Fingerprint size={14} />
                    <span>Liên kết thiết bị này</span>
                  </button>
                )
              ) : (
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                  <span className="text-amber-500 font-black flex-shrink-0">⚠️</span>
                  <span>
                    Thiết bị hoặc trình duyệt của bạn không hỗ trợ hoặc chưa bật Passkey/FaceID.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
