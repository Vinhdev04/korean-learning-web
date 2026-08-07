'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CountUpNumberProps {
  
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
