'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
}

/**
 * Component Skeleton hỗ trợ hiệu ứng sóng sáng lấp lánh (shimmer wave).
 * Thích hợp dùng làm khung placeholder trong khi chờ tải dữ liệu của khóa học, bài học, avatar.
 *
 * @param className - Các class tuỳ chỉnh bổ sung (kích thước, padding, border radius)
 * @param variant - Biến thể của skeleton: text (đường chữ), rect (hình chữ nhật card), circle (hình tròn đại diện)
 */
export default function Skeleton({ className = '', variant = 'rect' }: SkeletonProps) {
  const variantClasses = {
    text: 'h-4 w-full rounded-md',
    rect: 'h-24 w-full rounded-2xl',
    circle: 'h-12 w-12 rounded-full',
  };

  return (
    <div
      className={`animate-shimmer bg-gradient-to-r from-stone-200 via-stone-100/60 to-stone-200 dark:from-stone-850 dark:via-stone-750 dark:to-stone-850 bg-[length:200%_100%] ${variantClasses[variant]} ${className}`}
    />
  );
}
