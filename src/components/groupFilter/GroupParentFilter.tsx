"use client";
import React from "react";

type GroupParent = {
  id: number;
  name: string;
  children: number[];
};

type Props = {
  groups: GroupParent[];
  selected: number[] | null;
  onSelect: (id: number[] | null) => void;
};

export default function GroupParentFilter({ groups, selected, onSelect }: Props) {
  return (
    <div className="space-y-4 text-sm w-full">
      <button
        className={`w-full text-left px-4 py-2 rounded border font-medium transition
          ${
            selected === null
              ? "bg-orange-500 text-white border-orange-500"
              : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
          }`}
        onClick={() => onSelect(null)}
      >
        Hiện tất cả
      </button>
       <button
        className={`w-full text-left px-4 py-2 rounded border font-medium transition
          ${
            selected?.[0] === 0
              ? "bg-orange-500 text-white border-orange-500"
              : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
          }`}
        onClick={() => onSelect([0])}
      >
        Không thuộc nhóm nào
      </button>
        {groups.map((group) => (
            <button
                key={group.id}
                className={`w-full text-left px-4 py-2 rounded border font-medium transition
                ${
                    selected?.includes(group.id)
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                }`}
                onClick={() => onSelect([group.id])}
            >
                {group.name}
            </button>
        ))}
    </div>
  );
}