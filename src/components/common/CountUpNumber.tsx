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
  // OLD: const [count, setCount] = useState(0);
  // OLD: const elementRef = useRef<HTMLSpanElement>(null);
  // OLD: const hasAnimated = useRef(false);
  // OLD:
  // OLD: useEffect(() => {
  // OLD:   const observer = new IntersectionObserver(
  // OLD:     entries => {
  // OLD:       const [entry] = entries;
  // OLD:       if (entry.isIntersecting && !hasAnimated.current) {
  // OLD:         hasAnimated.current = true;
  // OLD:         startCountAnimation();
  // OLD:         observer.unobserve(entry.target);
  // OLD:       }
  // OLD:     },
  // OLD:     { threshold: 0.1 } // Kích hoạt khi ít nhất 10% phần tử xuất hiện trong viewport
  // OLD:   );
  // OLD:
  // OLD:   const currentElement = elementRef.current;
  // OLD:   if (currentElement) {
  // OLD:     observer.observe(currentElement);
  // OLD:   }
  // OLD:
  // OLD:   return () => {
  // OLD:     if (currentElement) {
  // OLD:       observer.unobserve(currentElement);
  // OLD:     }
  // OLD:   };
  // OLD: }, [value, duration]);
  // OLD:
  // OLD: const startCountAnimation = () => {
  // OLD:   let startTimestamp: number | null = null;
  // OLD:
  // OLD:   const step = (timestamp: number) => {
  // OLD:     if (!startTimestamp) startTimestamp = timestamp;
  // OLD:     const progress = Math.min((timestamp - startTimestamp) / duration, 1);
  // OLD:     const easeProgress = progress * (2 - progress);
  // OLD:     const currentVal = Math.floor(easeProgress * value);
  // OLD:     setCount(currentVal);
  // OLD:     if (progress < 1) {
  // OLD:       window.requestAnimationFrame(step);
  // OLD:     } else {
  // OLD:       setCount(value);
  // OLD:     }
  // OLD:   };
  // OLD:   window.requestAnimationFrame(step);
  // OLD: };

  const [count, setCount] = useState(0);
  // Cờ trạng thái kiểm soát bắt đầu chạy hiệu ứng số khi cuộn tới
  const [start, setStart] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Đăng ký IntersectionObserver để phát hiện khi khối thông số hiển thị trên viewport
  useEffect(() => {
    if (start) return;

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setStart(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 } // Ngưỡng 5% giúp phát hiện nhạy hơn trên mọi màn hình
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
  }, [start]);

  // Thực hiện chạy hiệu ứng tăng số từ 0 lên giá trị đích
  useEffect(() => {
    if (!start) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Easing Out Quad giúp chuyển động số chạy chậm lại khi tiến gần về đích
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * value);

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [start, value, duration]);

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
