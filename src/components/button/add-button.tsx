"use client";
import { useRouter } from "next/navigation";
import React from "react";

type AddButtonProps = {
  href?: string;
  onClick?: () => void;
};

export default function AddButton({ href, onClick }: AddButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) router.push(href);
    else if (onClick) onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-2xl text-white shadow-lg transition-all hover:bg-red-600"
    >
      +
    </button>
  );
}

