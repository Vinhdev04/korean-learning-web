import React from 'react';

interface ComponentCardProps {
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  isShowHeader?: boolean;
  // title?: string;
  title?: React.ReactNode;
  desc?: string; // Description text
  language?: React.ReactNode;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  isShowHeader = true,
  children,
  className = '',
  desc = '',
  language = '',
}) => {
  return (
    <div
      className={`mb-6 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      {isShowHeader && (
        <div className="flex justify-between p-3 items-center">
          <div className="">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">{title}</h3>
            {desc && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{desc}</p>}
          </div>
          <div className="">{language}</div>
        </div>
      )}
      {/* Card Body */}
      <div className="border-t border-gray-100 dark:border-gray-800 p-3 sm:p-3">
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
