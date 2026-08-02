'use client';

import { useState, useEffect } from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientToast() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar
      closeOnClick
      transition={Slide}
      limit={2}
    />
  );
}
