'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LanguageParticles3DProps {
  /** Các CSS class bổ sung cho container (ví dụ absolute inset-0) */
  className?: string;
}

/**
 * Component hiển thị các hạt bụi 3D lơ lửng nghệ thuật (Seoul Sunset Particles) sử dụng Three.js.
 * Các hạt di chuyển tự do nhẹ nhàng và hơi nghiêng theo chuyển động con trỏ chuột của người dùng.
 * Đảm bảo dọn dẹp bộ nhớ và tài nguyên WebGL đầy đủ khi unmount.
 *
 * @param props - Thuộc tính component
 * @returns React Element chứa canvas 3D
 */
export default function LanguageParticles3D({ className = '' }: LanguageParticles3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Lấy kích thước thực tế của vùng chứa container
    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || 680;

    // 1. KHỞI TẠO SCENE & CAMERA 3D
    const scene = new THREE.Scene();

    // Camera góc rộng, tiêu cự 75, nhìn sâu từ 0.1 đến 1000
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // 2. KHỞI TẠO WEBGL RENDERER
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 3. TẠO HỆ THỐNG HẠT (PARTICLES GEOMETRY)
    const particlesCount = 350; // Số lượng hạt lơ lửng vừa phải để tối ưu hiệu năng
    const positions = new Float32Array(particlesCount * 3);

    // Sinh tọa độ ngẫu nhiên cho các hạt trong không gian 3D
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // X từ -8 đến 8
      positions[i] = (Math.random() - 0.5) * 16;
      // Y từ -5 đến 5
      positions[i + 1] = (Math.random() - 0.5) * 10;
      // Z từ -5 đến 2
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // 4. CHẤT LIỆU CHO HẠT (MATERIAL)
    // Tạo texture chấm tròn mịn bằng canvas để các hạt tròn trịa, không bị vuông
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    // Sử dụng màu cam vàng hoàng hôn nhạt lãng mạn
    const material = new THREE.PointsMaterial({
      size: 0.12,
      color: new THREE.Color('#FBCFE8'), // Màu hồng nhạt lãng mạn pha lẫn hoàng hôn
      transparent: true,
      opacity: 0.7,
      map: texture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 5. TƯƠNG TÁC CHUỘT (MOUSE MOVE PARALLAX)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Chuẩn hóa tọa độ chuột về khoảng [-0.5, 0.5]
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. XỬ LÝ RESIZE CANVAS
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 7. VÒNG LẶP ANIMATION (ANIMATION LOOP)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Hạt tự động xoay nhẹ nhàng
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.02;

      // Hiệu ứng dịch chuyển camera mượt mà (smooth easing) theo con trỏ chuột
      targetX = mouseX * 2.5;
      targetY = -mouseY * 2.5;

      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // 8. DỌN DẸP TÀI NGUYÊN KHI UNMOUNT (CLEANUP)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Giải phóng tài nguyên WebGL để tránh memory leaks
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={`pointer-events-none ${className}`} />;
}
