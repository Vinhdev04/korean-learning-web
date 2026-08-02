'use client';

// OLD:
/*
export default function LessonDetailPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
...
*/

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Play, 
  ArrowLeft, 
  BookOpen, 
  MessageSquare, 
  Plus, 
  CheckCircle,
  Video,
  FileText,
  Volume2,
  Trash2
} from 'lucide-react';



export default function LessonDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || 'l1';

  // State quản lý ghi chú của học viên
  const [noteInput, setNoteInput] = useState('');
  const [notes, setNotes] = useState<{ id: number; text: string; time: string }[]>([
    { id: 1, text: 'Cấu trúc N + 입니다 dùng trong văn phong trang trọng, phát biểu trước đám đông.', time: '01:24' },
    { id: 2, text: 'Phân biệt 은/는 với 이/가: 은/는 dùng khi muốn nhấn mạnh chủ thể hoặc đối chiếu.', time: '03:45' }
  ]);

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    const newNote = {
      id: Date.now(),
      text: noteInput.trim(),
      time: '04:12' // Mock mốc thời gian đang xem video
    };
    setNotes([newNote, ...notes]);
    setNoteInput('');
  };

  const handleDeleteNote = (noteId: number) => {
    setNotes(notes.filter(n => n.id !== noteId));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 font-outfit min-h-screen">
      
      {/* Back button */}
      <div className="mb-6">
        <Link 
          href="/vn/courses/so-cap-1"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors"
        >
          <ArrowLeft size={16} />
          Quay lại chương trình khóa học
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-12">
        
        {/* Left Section: Video Player & Tabs */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Mock Video Player */}
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-950 flex flex-col justify-between p-6 shadow-xl border border-slate-800">
            {/* Top Bar */}
            <div className="flex justify-between items-center text-xs text-slate-400 font-semibold z-10">
              <span className="bg-slate-900/60 px-3 py-1 rounded-full backdrop-blur-md">Đang phát bài giảng video</span>
              <span className="bg-slate-900/60 px-3 py-1 rounded-full backdrop-blur-md">Độ phân giải: 1080p</span>
            </div>

            {/* Video center Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg shadow-teal-600/30 hover:bg-teal-500 hover:scale-105 active:scale-95 transition-all duration-300">
                <Play size={24} fill="currentColor" className="ml-1" />
              </button>
            </div>

            {/* Subtitles Area (BA Song ngữ Hàn-Việt) */}
            <div className="w-full text-center space-y-1 bg-slate-900/75 p-3 rounded-2xl backdrop-blur-md border border-slate-800 z-10 self-center max-w-[85%]">
              <p className="text-sm sm:text-base font-bold text-teal-400 tracking-wide">
                저는 베트 Nam 사람입니다.
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-200">
                Tôi là người Việt Nam.
              </p>
            </div>
          </div>

          {/* Lesson Header */}
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              Bài 1: Giới thiệu bản thân & Chào hỏi
            </h1>
            <p className="mt-2 text-slate-600 text-sm">
              Mục tiêu bài học: Nắm rõ cách tự giới thiệu tên, tuổi, quốc tịch và nghề nghiệp cơ bản bằng ngữ pháp tôn kính trang trọng nhất.
            </p>
          </div>

          {/* Lesson Content - Theory & Vocabulary tabs */}
          <div className="border-t border-slate-200 pt-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
              <FileText size={20} className="text-teal-600" />
              Lý thuyết & Từ vựng bài học
            </h2>

            {/* Vocabulary Grid */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-teal-600 flex items-center gap-1.5">
                <Volume2 size={16} /> Từ vựng cốt lõi
              </h3>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { word: '저 (chơ)', mean: 'Tôi, tớ, em (xưng hô lịch sự, khiêm nhường)' },
                  { word: '이름 (i-rưm)', mean: 'Tên, danh xưng' },
                  { word: '사람 (sa-ram)', mean: 'Con người' },
                  { word: '베트남 (be-thư-nam)', mean: 'Nước Việt Nam' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-sm font-bold text-slate-900 bg-teal-50 px-2 py-0.5 rounded-lg text-teal-700">
                      {item.word}
                    </div>
                    <div className="text-xs text-slate-600 leading-normal">{item.mean}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grammar Explanation Box */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-teal-600">
                📚 Ngữ pháp căn bản
              </h3>
              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-900">1. Cấu trúc Danh từ + 은/는 (Tiểu từ chủ ngữ)</h4>
                  <p className="mt-1 text-xs">Gắn sau danh từ để biểu thị danh từ đó là chủ thể chính của câu.</p>
                  <ul className="list-disc pl-5 mt-1 text-xs space-y-1">
                    <li>Danh từ kết thúc bằng phụ âm (có patchim) + <strong>은</strong> (VD: 사람 + 은 → 사람은)</li>
                    <li>Danh từ kết thúc bằng nguyên âm (không patchim) + <strong>는</strong> (VD: 저 + 는 → 저는)</li>
                  </ul>
                </div>
                
                <div className="border-t border-slate-100 pt-3">
                  <h4 className="font-bold text-slate-900">2. Cấu trúc Danh từ + 입니다 (Là Danh từ)</h4>
                  <p className="mt-1 text-xs">Đuôi câu khẳng định trang trọng lịch sự nhất (cách nói tu từ trong văn viết hoặc giao tiếp công sở).</p>
                  <p className="mt-1 text-xs font-semibold text-slate-800">Ví dụ: 저는 베트남 사람입니다. (Tôi là người Việt Nam.)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Sidebar notes & practice navigation */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Practice Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-950 mb-2">Kiểm tra kiến thức</h3>
            <p className="text-slate-600 text-xs leading-relaxed mb-4">
              Hãy củng cố ngay các từ vựng và cấu trúc ngữ pháp vừa học qua bài tập trắc nghiệm và flashcards tương tác.
            </p>
            <Link
              href={`/vn/practice/${id}`}
              className="block w-full text-center rounded-xl bg-teal-600 py-3 text-sm font-bold text-white shadow-md shadow-teal-600/10 hover:bg-teal-700 transition-all duration-300 active:scale-98"
            >
              Làm bài luyện tập
            </Link>
          </div>

          {/* Quick Notes Box */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-950 flex items-center gap-1.5">
              <MessageSquare size={18} className="text-teal-600" />
              Ghi chú cá nhân
            </h3>
            
            <div className="space-y-3">
              <textarea
                className="w-full rounded-2xl border border-slate-200 p-3 text-xs focus:border-teal-500 focus:ring-1 focus:ring-teal-500 bg-slate-50 transition-all outline-none"
                rows={3}
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Ghi lại nhanh từ vựng hoặc cấu trúc hay nhầm lẫn..."
              />
              <button 
                onClick={handleAddNote}
                className="w-full flex items-center justify-center gap-1 rounded-xl bg-slate-950 py-2.5 text-xs font-bold text-white hover:bg-teal-600 transition-all duration-300 active:scale-98"
              >
                <Plus size={14} />
                Lưu ghi chú
              </button>
            </div>

            {/* List notes */}
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

