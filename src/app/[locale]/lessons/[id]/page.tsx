'use client';

}
            <div className="mt-4 space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {notes.map((note) => (
                <div key={note.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl relative group">
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mb-1">
                    <span>Mốc video: {note.time}</span>
                    <button 
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 leading-normal">{note.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

