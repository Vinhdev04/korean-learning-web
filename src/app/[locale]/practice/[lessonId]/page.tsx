'use client';

// OLD:
/*
export default function PracticePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
...
*/

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Volume2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function PracticePage() {
  // Quản lý tab hoạt động: quiz hoặc flashcard
  const [activeTab, setActiveTab] = useState<'quiz' | 'flashcard'>('quiz');

  // --- Logic Phần Quiz ---
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const QUIZ_QUESTIONS = [
    {
      q: 'Từ nào sau đây có nghĩa là "Xin chào" (dạng tôn kính trang trọng)?',
      options: ['안녕하세요', '감사합니다', '미안합니다', '사랑합니다'],
      correctIdx: 0,
      explain:
        '안녕하세요 (An-nyeong-ha-se-yo) là câu chào hỏi thông dụng và lịch sự nhất trong tiếng Hàn.',
    },
    {
      q: 'Trong câu "저는 베트남 사람입니다.", tiểu từ chủ ngữ là gì?',
      options: ['저', '는', '사람', '입니다'],
      correctIdx: 1,
      explain: '는 là tiểu từ chủ ngữ đứng sau danh từ "저" kết thúc bằng một nguyên âm.',
    },
  ];

  const currentQuiz = QUIZ_QUESTIONS[currentQuizIdx] || QUIZ_QUESTIONS[0];

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitQuiz = () => {
    if (selectedOption === null || isSubmitted) return;
    setIsSubmitted(true);
    if (selectedOption === currentQuiz.correctIdx) {
      setScore(score + 10);
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    if (currentQuizIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIdx(currentQuizIdx + 1);
    } else {
      // Reset về câu 1
      setCurrentQuizIdx(0);
      setScore(0);
    }
  };

  // --- Logic Phần Flashcard ---
  const [showBack, setShowBack] = useState(false);
  const [flashcardIdx, setFlashcardIdx] = useState(0);

  const FLASHCARDS = [
    {
      word: '저',
      pronunciation: 'chơ',
      meaning: 'Tôi, tớ, em (khiêm nhường)',
      example: '저는 학생입니다. (Tôi là học sinh.)',
    },
    {
      word: '사람',
      pronunciation: 'sa-ram',
      meaning: 'Người, con người',
      example: '베트남 사람 (Người Việt Nam)',
    },
    {
      word: '이름',
      pronunciation: 'i-rưm',
      meaning: 'Tên, danh xưng',
      example: '이름이 무엇입니까? (Tên bạn là gì?)',
    },
  ];

  const currentCard = FLASHCARDS[flashcardIdx] || FLASHCARDS[0];

  const handleSpeech = (text: string) => {
    // Giả lập phát âm TTS bằng Web Speech API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 font-outfit min-h-screen">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/vn/lessons/l1"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors"
        >
          <ArrowLeft size={16} />
          Quay lại phòng học bài giảng
        </Link>
      </div>

      {/* Header Title */}
      <div className="border-b border-slate-200 pb-6 text-center space-y-2">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
          Trung tâm luyện tập tiếng Hàn
        </h1>
        <p className="text-slate-600 text-sm">Bài học 1: Giới thiệu bản thân & Chào hỏi</p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="mt-8 flex justify-center gap-3 border-b border-slate-100 pb-6">
        <button
          onClick={() => {
            setActiveTab('quiz');
            setShowBack(false);
          }}
          className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-300 active:scale-98 ${
            activeTab === 'quiz'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Trắc nghiệm (Quiz)
        </button>
        <button
          onClick={() => {
            setActiveTab('flashcard');
            setShowBack(false);
          }}
          className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-300 active:scale-98 ${
            activeTab === 'flashcard'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Flashcard từ vựng
        </button>
      </div>

      {/* ── MODE 1: QUIZ ── */}
      {activeTab === 'quiz' && (
        <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          {/* Quiz State info */}
          <div className="flex justify-between items-center text-xs text-slate-500 font-bold border-b border-slate-100 pb-4">
            <span className="bg-slate-100 px-3 py-1 rounded-full">
              Câu hỏi {currentQuizIdx + 1} / {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-teal-600 flex items-center gap-1">
              <Sparkles size={12} />
              Điểm số: {score}
            </span>
          </div>

          <p className="mt-6 text-lg font-bold text-slate-950">{currentQuiz.q}</p>

          {/* Options Grid */}
          <div className="mt-6 space-y-3">
            {currentQuiz.options.map((option, idx) => {
              // Định nghĩa màu cho các option tùy thuộc vào việc nộp bài và lựa chọn
              let optionStyle = 'border-slate-200 hover:bg-slate-50 hover:border-slate-300';
              if (selectedOption === idx) {
                optionStyle = 'border-teal-500 bg-teal-50/40 text-teal-900';
              }
              if (isSubmitted) {
                if (idx === currentQuiz.correctIdx) {
                  optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                } else if (selectedOption === idx) {
                  optionStyle = 'border-red-400 bg-red-50 text-red-900';
                } else {
                  optionStyle = 'border-slate-200 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isSubmitted}
                  className={`w-full rounded-2xl border p-4 text-left text-sm font-semibold transition-all duration-200 flex items-center justify-between ${optionStyle}`}
                >
                  <span>
                    {idx + 1}. {option}
                  </span>
                  {isSubmitted && idx === currentQuiz.correctIdx && (
                    <CheckCircle2 size={16} className="text-emerald-600" />
                  )}
                  {isSubmitted && selectedOption === idx && idx !== currentQuiz.correctIdx && (
                    <XCircle size={16} className="text-red-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isSubmitted && (
            <div className="mt-6 p-4 bg-teal-50/50 border border-teal-100 rounded-2xl text-xs text-slate-600 leading-relaxed">
              <span className="font-bold text-teal-800 block mb-1">💡 Giải thích đáp án:</span>
              {currentQuiz.explain}
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-6">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={selectedOption === null}
                className={`rounded-xl px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 ${
                  selectedOption === null
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-teal-600 hover:bg-teal-700 active:scale-98'
                }`}
              >
                Nộp câu trả lời
              </button>
            ) : (
              <button
                onClick={handleNextQuiz}
                className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-teal-600 shadow-sm transition-all duration-300 active:scale-98 flex items-center gap-1.5"
              >
                {currentQuizIdx < QUIZ_QUESTIONS.length - 1
                  ? 'Câu tiếp theo'
                  : 'Luyện tập lại từ đầu'}
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── MODE 2: FLASHCARD ── */}
      {activeTab === 'flashcard' && (
        <div className="mt-8 space-y-6">
          {/* Card Flip Container */}
          <div
            onClick={() => setShowBack(!showBack)}
            className="w-full aspect-[16/10] bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between items-center text-center cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 relative select-none"
          >
            {/* Top Bar inside card */}
            <div className="w-full flex justify-between items-center text-slate-400 text-xs font-bold">
              <span>
                Thẻ {flashcardIdx + 1} / {FLASHCARDS.length}
              </span>
              <span className="text-teal-600 text-[10px] uppercase tracking-wider">
                Bấm để lật mặt
              </span>
            </div>

            {/* Front Card Content */}
            {!showBack ? (
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-950 font-bold">
                  {currentCard.word}
                </h2>
                <p className="text-xs text-slate-500 font-bold">
                  Phiên âm: /{currentCard.pronunciation}/
                </p>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleSpeech(currentCard.word);
                  }}
                  className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-600 hover:bg-teal-100 transition-colors"
                >
                  <Volume2 size={16} />
                </button>
              </div>
            ) : (
              // Back Card Content
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-teal-600">{currentCard.meaning}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mt-2 max-w-[40ch]">
                  <span className="font-bold text-slate-700 block text-xs uppercase tracking-wider mb-1">
                    Ví dụ:
                  </span>
                  {currentCard.example}
                </p>
              </div>
            )}

            {/* Bottom Bar inside card */}
            <div className="text-slate-400 text-[10px] font-bold">
              {!showBack ? 'Mặt trước (Tiếng Hàn)' : 'Mặt sau (Nghĩa Tiếng Việt)'}
            </div>
          </div>

          {/* Leitner rating buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                setShowBack(false);
                setFlashcardIdx((flashcardIdx + 1) % FLASHCARDS.length);
              }}
              className="flex-1 rounded-xl bg-slate-900 border border-slate-200 py-3.5 text-sm font-bold text-white hover:bg-teal-600 transition-all duration-300 active:scale-98 text-center"
            >
              Tôi chưa thuộc
            </button>
            <button
              onClick={() => {
                setShowBack(false);
                setFlashcardIdx((flashcardIdx + 1) % FLASHCARDS.length);
              }}
              className="flex-1 rounded-xl bg-teal-600 py-3.5 text-sm font-bold text-white hover:bg-teal-700 transition-all duration-300 active:scale-98 text-center"
            >
              Đã thuộc từ này!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
