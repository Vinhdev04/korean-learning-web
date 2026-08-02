"use client";
import React from "react";
import { FaSave } from "react-icons/fa";

type SaveButtonProps = {
  onClick?: () => void;
};

export default function SaveButton({ onClick }: SaveButtonProps) {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-2xl text-white shadow-lg transition-all hover:bg-green-700"
    >
      <FaSave />
    </button>
  );
}
