'use client';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone'; // ✅ Dòng cần có
interface DropzoneComponentProps {
  helperText?: string;
  onFileUpload?: (file: File, textKey?: string) => void;
}

const DropzoneComponent: React.FC<DropzoneComponentProps> = ({ helperText, onFileUpload }) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert to base64
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

  const onDrop = async (acceptedFiles: File[]) => {
    const base64Images = await Promise.all(acceptedFiles.map(fileToBase64));
    setPreviewImages(base64Images);
    if (onFileUpload && acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]); // chỉ lấy 1 file (ảnh đại diện)
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': [],
      'image/jpeg': [],
      'image/webp': [],
      'image/svg+xml': [],
      'video/mp4': [],
    },
  });
  return (
    <div>
      {previewImages.map((src, index) => (
        <div
          key={index}
          className="w-full dark:hover:border-brand-500 hover:border-brand-500 size-24 cursor-pointer overflow-hidden rounded-xl border border-dashed border-gray-300 transition md:min-h-[150px] md:min-w-[150px] dark:border-gray-700"
        >
          <img
            width="0"
            height="0"
            src={src}
            alt={`image-${index}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
      <div className="w-full dark:hover:border-brand-500 hover:border-brand-500 size-24 cursor-pointer rounded-xl border border-dashed border-gray-300 transition md:min-h-[150px] md:min-w-[150px] dark:border-gray-700">
        <div
          {...getRootProps()}
          className={`dropzone h-full flex items-center rounded-xl border-dashed border-gray-300 p-2 lg:p-3 ${
            isDragActive
              ? 'border-brand-500 bg-gray-100 dark:bg-gray-800'
              : 'border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900'
          } `}
          id="demo-upload"
        >
          {/* Hidden Input */}
          <input {...getInputProps()} />
          <div className="dz-message w-full m-0! flex flex-col items-center">
            {/* Icon Container */}
            <div className="mb-[22px] flex justify-center">
              <div className="flex size-10 items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                <svg
                  className="fill-current"
                  width="29"
                  height="28"
                  viewBox="0 0 29 28"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                  />
                </svg>
              </div>
            </div>

            {/* Text Content */}
            <p className="text-theme-xl mb-1 text-center font-semibold text-gray-800 dark:text-white/90">
              Tải tệp lên
            </p>
            <small className="block w-full text-[12px] text-center text-gray-700 dark:text-gray-400">
              {helperText || 'Kích thước tùy chọn'}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropzoneComponent;
