"use client";

import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Tìm kiếm...",
}: SearchInputProps) {
  return (
    <div className="flex justify-end mb-4">
      <input
        type="text"
        placeholder={placeholder}
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-3 py-2 rounded-md w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
