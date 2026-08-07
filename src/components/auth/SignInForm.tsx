'use client';

}
        <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <HelpCircle size={14} className="text-teal-500" />
            Tài khoản giả lập kiểm thử nhanh UI
          </h3>
          <div className="grid gap-2 sm:grid-cols-2 text-xs">
            <button 
              onClick={() => setFormData({ username: 'admin', password: 'admin123' })}
              className="flex items-center gap-2 p-2 bg-white border border-slate-100 rounded-xl hover:border-teal-500 transition-colors text-left"
            >
              <ShieldCheck size={16} className="text-teal-600" />
              <div>
                <span className="font-bold text-slate-800 block">Tài khoản Admin</span>
                <span className="text-[10px] text-slate-500">Username: admin</span>
              </div>
            </button>

            <button 
              onClick={() => setFormData({ username: 'user', password: 'user123' })}
              className="flex items-center gap-2 p-2 bg-white border border-slate-100 rounded-xl hover:border-teal-500 transition-colors text-left"
            >
              <UserCheck size={16} className="text-teal-600" />
              <div>
                <span className="font-bold text-slate-800 block">Tài khoản Học viên</span>
                <span className="text-[10px] text-slate-500">Username: user</span>
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

