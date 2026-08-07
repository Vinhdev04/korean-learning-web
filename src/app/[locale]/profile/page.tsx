'use client';

}
        <div className="md:col-span-4 space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6 h-fit">
            <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <Award size={18} className="text-teal-600" />
              Thống kê tổng quan
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                <div className="text-3xl font-extrabold text-teal-600">120</div>
                <div className="text-[10px] text-slate-500 font-semibold mt-1 uppercase tracking-wider">Từ vựng đã thuộc</div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                <div className="text-3xl font-extrabold text-teal-600">85%</div>
                <div className="text-[10px] text-slate-500 font-semibold mt-1 uppercase tracking-wider">Tỉ lệ đúng Quiz</div>
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
        </div>

      </div>
    </div>
  );
}

