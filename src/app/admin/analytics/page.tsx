'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  BarChart3,
  TrendingUp,
  Users,
  Award,
  ShieldAlert,
  Download,
  Calendar,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';

// Import động react-apexcharts để tránh lỗi SSR (Next.js Server Side Rendering)
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * Trang Báo cáo Thống kê & Phân tích Nâng cao (Advanced Analytics CMS)
 * Tích hợp 5 biểu đồ ApexCharts (Line, Donut, Bar, Radar, Funnel) để phân tích học tập.
 * @returns React Component
 */
export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30days');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  // 1. Biểu đồ Đường: Xu hướng học tập (Lượt xem video vs Lượt làm bài tập)
  const lineChartData = {
    series: [
      { name: 'Lượt học bài (Video)', data: [120, 180, 240, 220, 310, 380, 420] },
      { name: 'Lượt làm bài tập', data: [80, 120, 190, 160, 250, 300, 390] },
    ],
    options: {
      chart: {
        type: 'line' as const,
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      colors: ['#f97316', '#e11d48'], // Cam & Rose
      stroke: { width: 3, curve: 'smooth' as const },
      xaxis: {
        categories: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
        labels: { style: { colors: '#94a3b8', fontFamily: 'Outfit, sans-serif' } },
      },
      yaxis: {
        labels: { style: { colors: '#94a3b8', fontFamily: 'Outfit, sans-serif' } },
      },
      tooltip: { theme: 'dark' as const },
      grid: { borderColor: '#e2e8f0', strokeDashArray: 4 },
      legend: { position: 'top' as const, labels: { colors: '#64748b' } },
    },
  };

  // 2. Biểu đồ Donut: Phân bố cấp độ TOPIK của học viên
  const donutChartData = {
    series: [35, 25, 18, 12, 7, 3], // Tỉ lệ % từng cấp
    options: {
      chart: { type: 'donut' as const },
      labels: [
        'TOPIK I - Cấp 1',
        'TOPIK I - Cấp 2',
        'TOPIK II - Cấp 3',
        'TOPIK II - Cấp 4',
        'TOPIK II - Cấp 5',
        'TOPIK II - Cấp 6',
      ],
      colors: ['#f97316', '#fb7185', '#f59e0b', '#10b981', '#6366f1', '#a855f7'],
      stroke: { width: 2, colors: ['#ffffff'] },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Học viên',
                formatter: () => '100%',
                style: { fontSize: '14px', fontWeight: 800, color: '#64748b' },
              },
            },
          },
        },
      },
      legend: { position: 'bottom' as const, labels: { colors: '#64748b' } },
      dataLabels: { enabled: false },
    },
  };

  // 3. Biểu đồ Cột: Số lượng học viên đăng ký mới
  const barChartData = {
    series: [{ name: 'Đăng ký mới', data: [320, 450, 580, 490, 620, 780] }],
    options: {
      chart: { type: 'bar' as const, toolbar: { show: false } },
      colors: ['#f59e0b'], // Amber/Vàng hổ phách
      plotOptions: {
        bar: { borderRadius: 8, columnWidth: '50%', endingShape: 'rounded' },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
        labels: { style: { colors: '#94a3b8', fontFamily: 'Outfit, sans-serif' } },
      },
      yaxis: {
        labels: { style: { colors: '#94a3b8', fontFamily: 'Outfit, sans-serif' } },
      },
      grid: { borderColor: '#e2e8f0', strokeDashArray: 4 },
    },
  };

  // 4. Biểu đồ Mạng Nhện: Đánh giá kỹ năng trung bình (TOPIK Skill Matrix)
  const radarChartData = {
    series: [
      { name: 'Học viên Sơ cấp', data: [75, 70, 60, 65, 50] },
      { name: 'Học viên Trung cấp', data: [85, 80, 82, 78, 70] },
    ],
    options: {
      chart: { type: 'radar' as const, toolbar: { show: false } },
      colors: ['#f97316', '#6366f1'],
      labels: ['Từ vựng', 'Ngữ pháp', 'Luyện nghe', 'Đọc hiểu', 'Phát âm'],
      xaxis: {
        labels: {
          style: {
            colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8'],
            fontFamily: 'Outfit, sans-serif',
          },
        },
      },
      yaxis: { show: false },
      markers: { size: 4 },
      legend: { position: 'bottom' as const, labels: { colors: '#64748b' } },
    },
  };

  // 5. Biểu đồ Phễu (Funnel Bar): Tỉ lệ chuyển đổi phễu học tập
  const funnelChartData = {
    series: [{ name: 'Số lượng học viên', data: [1200, 850, 520, 210] }],
    options: {
      chart: { type: 'bar' as const, toolbar: { show: false } },
      colors: ['#e11d48'], // Rose
      plotOptions: {
        bar: {
          borderRadius: 6,
          horizontal: true,
          barHeight: '60%',
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number, opt: any) => {
          const stages = ['Truy cập', 'Học thử', 'Mua khóa', 'Tốt nghiệp'];
          return `${stages[opt.dataPointIndex]}: ${val}`;
        },
        style: { fontSize: '10px', fontWeight: 'bold' },
      },
      xaxis: {
        categories: ['Giai đoạn 1', 'Giai đoạn 2', 'Giai đoạn 3', 'Giai đoạn 4'],
        labels: { style: { colors: '#94a3b8', fontFamily: 'Outfit, sans-serif' } },
      },
      yaxis: {
        labels: { show: false },
      },
      grid: { borderColor: '#e2e8f0', strokeDashArray: 4 },
    },
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Báo cáo thống kê
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Theo dõi xu hướng hoạt động học tập, tỉ lệ chuyển đổi phễu học viên và cơ cấu trình độ
            TOPIK.
          </p>
        </div>

        {/* Nút tác vụ nhanh */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            className="pl-4 pr-10 py-2.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl text-xs focus:outline-none focus:border-orange-500 dark:text-white appearance-none cursor-pointer font-bold text-slate-600"
          >
            <option value="7days">7 ngày qua</option>
            <option value="30days">30 ngày qua</option>
            <option value="12months">12 tháng qua</option>
          </select>

          <button
            onClick={() => showToast('Đang tạo báo cáo thống kê PDF...')}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white px-4 py-3 text-xs font-bold shadow-md shadow-orange-500/25 active:scale-95 transition-all"
          >
            <Download size={14} />
            <span>Xuất báo cáo</span>
          </button>
        </div>
      </div>

      {/* Grid biểu đồ kiểu Bento Box */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Hộp 1: Xu hướng học tập (col-span-2) */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between transition-colors min-h-[380px]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <TrendingUp size={15} />
                Xu hướng học tập của học viên
              </h3>
              <p className="text-[10px] text-slate-400 dark:text-slate-550 font-semibold mt-0.5">
                Số lượt xem bài giảng video & số lượt làm bài tập trắc nghiệm theo thời gian.
              </p>
            </div>
            <button
              onClick={() => showToast('Đang làm mới dữ liệu xu hướng...')}
              className="p-2 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 text-slate-400"
              title="Làm mới"
            >
              <RefreshCw size={12} />
            </button>
          </div>
          <div className="flex-1 w-full overflow-hidden">
            <Chart
              options={lineChartData.options}
              series={lineChartData.series}
              type="line"
              height={260}
            />
          </div>
        </div>

        {/* Hộp 2: Phân bố cấp độ TOPIK (col-span-1) */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between transition-colors min-h-[380px]">
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
              <Award size={15} />
              Cơ cấu cấp độ TOPIK
            </h3>
            <p className="text-[10px] text-slate-400 dark:text-slate-550 font-semibold mt-0.5">
              Phân bố tỉ lệ học viên đạt trình độ từ TOPIK Cấp 1 đến Cấp 6.
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center w-full overflow-hidden py-4">
            <Chart
              options={donutChartData.options}
              series={donutChartData.series}
              type="donut"
              height={220}
              width="100%"
            />
          </div>
        </div>

        {/* Hộp 3: Đăng ký học viên mới (col-span-1) */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between transition-colors min-h-[340px]">
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
              <Users size={15} />
              Học viên mới đăng ký
            </h3>
            <p className="text-[10px] text-slate-400 dark:text-slate-550 font-semibold mt-0.5">
              Số lượng tài khoản học viên mới được kích hoạt trong 6 tháng gần nhất.
            </p>
          </div>
          <div className="flex-1 w-full overflow-hidden mt-4">
            <Chart
              options={barChartData.options}
              series={barChartData.series}
              type="bar"
              height={200}
            />
          </div>
        </div>

        {/* Hộp 4: Radar Đánh giá kỹ năng (col-span-1) */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between transition-colors min-h-[340px]">
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
              <Award size={15} />
              So sánh năng lực kỹ năng
            </h3>
            <p className="text-[10px] text-slate-400 dark:text-slate-550 font-semibold mt-0.5">
              Đánh giá điểm số kỹ năng trung bình giữa nhóm Sơ cấp và Trung cấp.
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center w-full overflow-hidden py-2">
            <Chart
              options={radarChartData.options}
              series={radarChartData.series}
              type="radar"
              height={220}
              width="100%"
            />
          </div>
        </div>

        {/* Hộp 5: Phễu chuyển đổi (col-span-1) */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between transition-colors min-h-[340px]">
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
              <BarChart3 size={15} />
              Phễu chuyển đổi học viên
            </h3>
            <p className="text-[10px] text-slate-400 dark:text-slate-550 font-semibold mt-0.5">
              Hành trình học viên: Truy cập hệ thống - Học thử - Mua khóa học - Tốt nghiệp.
            </p>
          </div>
          <div className="flex-1 w-full overflow-hidden mt-4">
            <Chart
              options={funnelChartData.options}
              series={funnelChartData.series}
              type="bar"
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
