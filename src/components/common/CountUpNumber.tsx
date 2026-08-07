'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CountUpNumberProps {
  /** Giá trị số đích cần chạy đến */
  value: number;
  /** Thời gian chạy animation đếm số (ms), mặc định 1500ms */
  duration?: number;
  /** Ký tự đứng trước số */
  prefix?: string;
  /** Ký tự đứng sau số (ví dụ: +, %) */
  suffix?: string;
  /** Class CSS bổ sung cho component */
  className?: string;
}

/**
 * Component hiển thị con số tự động tăng dần từ 0 đến giá trị đích khi cuộn trang tới.
 * Sử dụng IntersectionObserver để kích hoạt hiệu ứng và requestAnimationFrame để tối ưu hiệu năng.
 *
 * @param props - Các thuộc tính của component
 * @returns React Element hiển thị số đếm với animation mượt mà
 */
export default function CountUpNumber({
  value,
  duration = 1500,
  prefix = '',
  suffix = '',
  className = '',
}: CountUpNumberProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startCountAnimation();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } // Kích hoạt khi ít nhất 10% phần tử xuất hiện trong viewport
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [value, duration]);

  /**
   * Thực hiện chạy hiệu ứng đếm số từ 0 lên giá trị đích
   */
  const startCountAnimation = () => {
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Sử dụng hàm Easing Out Quad để số chạy chậm dần khi về đích
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * value);

      setCount(currentVal);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    window.requestAnimationFrame(step);
  };

  /**
   * Định dạng số theo chuẩn phân tách hàng nghìn tiếng Việt (ví dụ: 8.900, 12.000)
   *
   * @param num - Số cần định dạng
   * @returns Chuỗi số đã định dạng
   */
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}
