'use client';
import React, { FC } from "react";

interface FileInputProps {
  type?: "file" | string;
  name?: string;
  id?:string;
  defaultValue?:string;
  placeholder?:string;
  className?: string;
  value?: string;
  rows?:number;
  onChange?: (add: UploadItem[]) => void;
}

export interface UploadItem {
  src: string;
  name: string;
  type: string;
}

const FileInput: FC<FileInputProps> = ({ className = '', onChange }) => {
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const add = await Promise.all(
      Array.from(files).map((file) =>
        new Promise<UploadItem>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              src: reader.result as string,
              name: file.name,
              type: file.type.split('/')[1],
            });
          };
          reader.readAsDataURL(file);
        })
      )
    );

    onChange?.(add);
  };

  return (
    <input
      type="file"
      accept="image/*"
      multiple
      className={`focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 dark:placeholder:text-gray-400 ${className}`}
      onChange={handleUpload}
    />
  );
};

export default FileInput;
