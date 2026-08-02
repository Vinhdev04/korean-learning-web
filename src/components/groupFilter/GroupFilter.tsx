"use client";
import React, { useMemo, useState } from "react";

type Props = {
  groups: { id: number; name: string; parent_name: string }[];
  selected: number[] | null;
  onSelect: (id: number[] | null) => void;
};

export default function GroupFilter({ groups, selected, onSelect }: Props) {
  const groupedByParent = useMemo(() => {
    const map = new Map<string, { id: number; name: string }[]>();
    groups.forEach((group) => {
      const parent = group.parent_name;
      if (!map.has(parent)) {
        map.set(parent, []);
      }
      map.get(parent)?.push(group);
    });
    return map;
  }, [groups]);

  const [openMap, setOpenMap] = useState<Map<string, boolean>>(() => {
    const init = new Map();
    groupedByParent.forEach((_, key) => init.set(key, true));
    return init;
  });

  const toggleGroup = (key: string) => {
    setOpenMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(key, !prev.get(key));
      return newMap;
    });
  };

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

      {[...groupedByParent.entries()].map(([parentName, children]) => {
        const isOpen = openMap.get(parentName) ?? true;

        return (
          <div key={parentName}>
            <div
              className="flex items-center justify-between cursor-pointer mb-1"
              onClick={() => toggleGroup(parentName)}
            >
              <button
                className="font-semibold text-gray-700 dark:text-gray-100 hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(children.map((c) => c.id));
                }}
              >
                {parentName}
              </button>
              <svg
                className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {isOpen && (
              <div className="pl-4 space-y-1 border-l border-gray-300 dark:border-gray-600">
                {children.map((child) => (
                  <button
                    key={child.id}
                    className={`w-full text-left px-3 py-1 rounded border transition
                      ${
                        selected?.includes(child.id)
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                      }`}
                    onClick={() => onSelect([child.id])}
                  >
                    {child.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
