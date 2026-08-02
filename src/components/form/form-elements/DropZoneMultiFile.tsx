'use client';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropzoneComponentProps {
  helperText?: string;
  onFilesUpload?: (files: File[]) => void; // ⭐ đổi từ 1 file → nhiều file
}

const DropzoneMultiComponent: React.FC<DropzoneComponentProps> = ({
  helperText,
  onFilesUpload,
}) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

  const onDrop = async (acceptedFiles: File[]) => {
    const base64Images = await Promise.all(acceptedFiles.map(fileToBase64));
    setPreviewImages(prev => [...prev, ...base64Images]);

    // ⭐ gửi toàn bộ files ra ngoài
    if (onFilesUpload) {
      onFilesUpload(acceptedFiles);
    }
  };

  const removeImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
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
    <div className="space-y-4">
      {/* PREVIEW LIST */}
      {/* <div className="flex flex-wrap gap-4">
        {previewImages.map((src, index) => (
          <div
            key={index}
            className="relative size-24 md:size-[150px] overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700"
          >
            <img src={src} className="h-full w-full object-cover" />

            <button
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-black/50 text-white text-xs px-2 py-1 rounded"
            >
              ✕
            </button>
          </div>
        ))}
      </div> */}

      {/* DROPZONE */}
      <div
        {...getRootProps()}
        className={`w-full cursor-pointer rounded-xl border border-dashed transition p-4 md:min-h-[150px] flex items-center justify-center
          ${
            isDragActive
              ? 'border-brand-500 bg-gray-100 dark:bg-gray-800'
              : 'border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900'
          }`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="size-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
              ⬆️
            </div>
          </div>

          <p className="text-lg font-semibold">Tải tệp lên</p>
          <small className="text-gray-600 dark:text-gray-400">
            {helperText || 'Kích thước tùy chọn'}
          </small>
        </div>
      </div>
    </div>
  );
};

export default DropzoneMultiComponent;
