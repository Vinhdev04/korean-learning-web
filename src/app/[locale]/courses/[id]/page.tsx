'use client';

// OLD:
/*
export default function CourseDetailPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
...
*/

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  BookOpen,
  Clock,
  Layers,
  Award,
  Play,
  CheckCircle,
  Video,
  FileText,
  ArrowLeft,
  Lock,
} from 'lucide-react';

// Mock dữ liệu chi tiết các khóa học phục vụ render tương ứng theo ID của BA
const COURSE_DETAILS: Record<
  string,
  {
    title: string;
    level: string;
    desc: string;
    lessonsCount: number;
    duration: number;
    chapters: {
      title: string;
      lessons: { id: string; title: string; duration: string }[];
    }[];
  }
> = {
  'so-cap-1': {
    title: 'Tiếng Hàn Sơ cấp 1',
    level: 'TOPIK I • Cấp 1',
    desc: 'Khóa học nền tảng bắt buộc cho mọi người học. Nắm chắc bảng chữ cái Hangeul và kỹ năng giao tiếp căn bản nhất.',
    lessonsCount: 12,
    duration: 180,
    chapters: [
      {
        title: 'Chương 1: Bảng chữ cái Hangeul & Phát âm cơ bản',
        lessons: [
          { id: 'l1', title: 'Bài 1: Nguyên âm & Phụ âm đơn giản', duration: '15 phút' },
          { id: 'l2', title: 'Bài 2: Cách ghép chữ & Phụ âm cuối (Patchim)', duration: '18 phút' },
          { id: 'l3', title: 'Bài 3: Các quy tắc nối âm, biến âm căn bản', duration: '20 phút' },
        ],
      },
      {
        title: 'Chương 2: Giao tiếp chào hỏi & Giới thiệu bản thân',
        lessons: [
          { id: 'l4', title: 'Bài 4: Chào hỏi bằng tiếng Hàn (안녕하세요)', duration: '15 phút' },
          {
            id: 'l5',
            title: 'Bài 5: Giới thiệu tên tuổi, quốc tịch (저는 ... 입니다)',
            duration: '16 phút',
          },
          {
            id: 'l6',
            title: 'Bài 6: Hỏi thăm nghề nghiệp, thông tin cá nhân',
            duration: '18 phút',
          },
        ],
      },
    ],
  },
  'so-cap-2': {
    title: 'Tiếng Hàn Sơ cấp 2',
    level: 'TOPIK I • Cấp 2',
    desc: 'Củng cố nền tảng sơ cấp, giúp bạn tự tin giao tiếp trong các tình huống thực tế thường nhật ở Hàn Quốc.',
    lessonsCount: 15,
    duration: 240,
    chapters: [
      {
        title: 'Chương 1: Đời sống thường nhật & Mua sắm',
        lessons: [
          {
            id: 'l7',
            title: 'Bài 1: Hỏi giá tiền và mua sắm (이것은 얼마입니까?)',
            duration: '20 phút',
          },
          { id: 'l8', title: 'Bài 2: Đặt món ăn tại nhà hàng tiếng Hàn', duration: '18 phút' },
        ],
      },
    ],
  },
};

export default function CourseDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || 'so-cap-1';

  // Lấy dữ liệu chi tiết của khóa học hoặc fallback về Sơ cấp 1
  const course = COURSE_DETAILS[id] || COURSE_DETAILS['so-cap-1'];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 font-outfit min-h-screen">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/vn/courses"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors"
        >
          <ArrowLeft size={16} />
          Quay lại danh sách khóa học
        </Link>
      </div>

      {/* Course Title Header */}
      <div className="border-b border-slate-200 pb-8">
        <span className="inline-flex items-center rounded-xl bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 border border-teal-200">
          {course.level}
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          {course.title}
        </h1>
        <p className="mt-3 text-slate-600 text-base max-w-3xl leading-relaxed">{course.desc}</p>
      </div>

      {/* Main Content Layout */}
      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        {/* Left Section: Course outline (Chapters & Lessons) */}
        <div className="lg:col-span-8 space-y-8">
          <h2 className="text-2xl font-bold text-slate-950 flex items-center gap-2">
            <BookOpen size={22} className="text-teal-600" />
            Nội dung chương trình học
          </h2>

          <div className="space-y-6">
            {course.chapters.map((chapter, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-50 text-xs font-extrabold text-teal-700">
                    {index + 1}
                  </span>
                  {chapter.title}
                </h3>

                <ul className="mt-4 divide-y divide-slate-100">
                  {chapter.lessons.map(lesson => (
                    <li
                      key={lesson.id}
                      className="flex items-center justify-between py-4 group hover:bg-slate-50/50 rounded-xl px-2 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                          <Video size={16} />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">
                            {lesson.title}
                          </span>
                          <span className="block sm:inline text-xs text-slate-500 sm:ml-3">
                            ({lesson.duration})
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/vn/lessons/${lesson.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-700"
                      >
                        Học ngay
                        <Play size={12} fill="currentColor" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Course info sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm h-fit">
            <h3 className="text-lg font-bold text-slate-950 mb-4 flex items-center gap-2">
              <Award size={18} className="text-teal-600" />
              Tổng quan khóa học
            </h3>

            <dl className="space-y-4 divide-y divide-slate-100 text-sm">
              <div className="flex justify-between py-3">
                <dt className="text-slate-500">Số bài giảng video</dt>
                <dd className="font-bold text-slate-900">{course.lessonsCount} bài học</dd>
              </div>
              <div className="flex justify-between py-3">
                <dt className="text-slate-500">Tổng thời lượng</dt>
                <dd className="font-bold text-slate-900">{course.duration} phút</dd>
              </div>
              <div className="flex justify-between py-3">
                <dt className="text-slate-500">Hình thức học</dt>
                <dd className="font-bold text-teal-600">Trực tuyến (Có Video & Quiz)</dd>
              </div>
              <div className="flex justify-between py-3">
                <dt className="text-slate-500">Bài tập đi kèm</dt>
                <dd className="font-bold text-slate-900">Quiz & Flashcard</dd>
              </div>
            </dl>

            <div className="mt-8">
              <Link
                href={`/vn/lessons/${course.chapters[0]?.lessons[0]?.id || 'l1'}`}
                className="block w-full text-center rounded-xl bg-slate-950 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 hover:bg-teal-600 hover:shadow-teal-600/10 transition-all duration-300 active:scale-98"
              >
                Bắt đầu học ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
