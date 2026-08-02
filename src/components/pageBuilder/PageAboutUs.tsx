'use client';
import { Upload, X, FileText } from 'lucide-react';
import { useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import DropzoneComponent from '@/components/form/form-elements/DropZone';
import TextArea from '@/components/form/input/TextArea';
import Button from '../ui/button/Button';
type AboutUsLink = string | { src: string; name: string } | null;

export interface AboutUsImage {
  src: string;
  name: string;
  type: string;
  old: string;
  del: string;
  size?: object;
}

export interface AboutUsChild {
  id: number;
  name: string;
  link: string;
  detail: string;
  image: AboutUsImage | null;
}

export interface AboutUsData {
  id: number;
  name: string;
  link: AboutUsLink;
  detail: string;
  image: AboutUsImage | null;
  children: AboutUsChild[];
  list_customer: number[];
}

interface PageBuilderProps {
  aboutUsData: AboutUsData;
  setAboutUsData: React.Dispatch<React.SetStateAction<AboutUsData>>;
  onSubmit: (e: React.FormEvent) => void;
}

export default function PageBuilder({ aboutUsData, setAboutUsData }: PageBuilderProps) {
  const [childImageStates, setChildImageStates] = useState<Record<number, boolean>>({});
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const handleAddChild = () => {
    setAboutUsData(prev => ({
      ...prev,
      children: [
        ...prev.children,
        {
          id: 0,
          name: '',
          link: '',
          detail: '',
          image: null,
        },
      ],
    }));
  };

  const handleChildImageUpload = (file: File, index: number) => {
    const reader = new FileReader();
    reader.onload = e => {
      const newChildren = [...aboutUsData.children];
      newChildren[index].image = {
        src: e.target?.result as string,
        name: file.name,
        type: file.type,
        old: newChildren[index].image?.old || '',
        del: '',
        size: {},
      };
      setAboutUsData({ ...aboutUsData, children: newChildren });
      setChildImageStates(prev => ({ ...prev, [index]: true }));
    };
    reader.readAsDataURL(file);
  };

  const handleChildImageRemove = (index: number) => {
    const newChildren = [...aboutUsData.children];
    newChildren[index].image = {
      src: '',
      name: '',
      type: '',
      old: '',
      del: newChildren[index].image?.old || '',
    };
    setAboutUsData({ ...aboutUsData, children: newChildren });
    setChildImageStates(prev => ({ ...prev, [index]: false }));
  };
const handleDeleteFile = () => {
  setAboutUsData(prev => ({
    ...prev,
    link: null,
  }));
  setPdfName('');
};
  return (
    <ComponentCard title="Hồ sơ năng lực">
      {/* Form tiêu đề + link */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          {/* Tiêu đề */}
          <Label htmlFor="name" className="block mb-2 font-semibold text-gray-800">
            Tên Nút
          </Label>
          <Input
            id="name"
            value={aboutUsData.name}
            onChange={e => setAboutUsData({ ...aboutUsData, name: e.target.value })}
            placeholder="Nhập tiêu đề"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          />
          {/* Upload PDF */}
          {!aboutUsData.link && !pdfName ? (
            <div className="mt-6">
              <Label htmlFor="link" className="block mb-2 font-semibold text-gray-800">
                File PDF
              </Label>
              <label
                htmlFor="link"
                className="relative flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
              >
                <Upload className="w-6 h-6 text-gray-500 mr-2" />
                <span className="text-gray-600">Chọn file PDF</span>
                <input
                  id="link"
                  type="file"
                  accept="application/pdf"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setPdfName(file.name);
                    const reader = new FileReader();
                    reader.onload = () => {
                      setAboutUsData({
                        ...aboutUsData,
                        link: {
                          src: reader.result as string,
                          name: file.name,
                        },
                      });
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </label>
            </div>
          ) : (
            <div
              className="mt-4 flex items-center justify-between 
                  bg-gray-100 dark:bg-gray-800 
                  px-4 py-3 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-indigo-500 mr-2" />
                <a
                  href={
                    typeof aboutUsData.link === 'string'
                      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}public/uploads/pdf/${aboutUsData.link}`
                      : `${process.env.NEXT_PUBLIC_API_BASE_URL}public/uploads/pdf/${aboutUsData.link?.src}`
                  }
                  target="_blank"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {typeof aboutUsData.link === 'string' ? aboutUsData.link : aboutUsData.link?.name}
                </a>
              </div>

              <button
                type="button"
                onClick={handleDeleteFile}
                className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
              >
                <X className="w-5 h-5 text-red-500 dark:text-red-400" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Nút thêm & nút thu gọn */}
      <div className="mt-6 flex gap-4">
        <button
          type="button"
          onClick={handleAddChild}
          className="text-blue-600 flex items-center gap-1"
        >
          <span className="text-xl font-bold">+</span> Thêm
        </button>
        {aboutUsData.children && (
          <button
            type="button"
            onClick={() => setIsCollapsed(prev => !prev)}
            className="text-gray-600 underline"
          >
            {isCollapsed ? 'Mở ' : 'Đóng'}
          </button>
        )}
      </div>

      {/* Danh sách children */}
      {!isCollapsed && (
        <div className={'mt-4 grid gap-2 md:grid-cols-3  grid-cols-1'}>
          {aboutUsData.children.map((child, index) => {
            const hasImageSrc = !!child.image?.src;
            const hasOldImage =
              !!child.image?.old && !child.image?.src && childImageStates[index] !== false;

            return (
              <div key={index} className="border p-4 rounded-lg flex flex-col">
                <Label>Tiêu đề</Label>
                <Input
                  value={child.name}
                  onChange={e => {
                    const newChildren = [...aboutUsData.children];
                    newChildren[index].name = e.target.value;
                    setAboutUsData({ ...aboutUsData, children: newChildren });
                  }}
                />

                {/* Chi tiết */}
                <div className="mt-4">
                  <Label>Chi tiết</Label>
                  <TextArea
                    value={child.detail}
                    onChange={value => {
                      const newChildren = [...aboutUsData.children];
                      newChildren[index].detail = value;
                      setAboutUsData({ ...aboutUsData, children: newChildren });
                    }}
                    rows={3}
                    placeholder="Nhập nội dung chi tiết"
                  />
                </div>

                {/* Hình ảnh */}
                <div className="mt-4">
                  <Label>Hình ảnh</Label>
                  {hasImageSrc || hasOldImage ? (
                    <div className="relative w-40 h-40">
                      <img
                        src={
                          hasImageSrc
                            ? child.image!.src
                            : `${process.env.NEXT_PUBLIC_API_BASE_URL}public/uploads/page/${child.image!.old}`
                        }
                        alt="uploaded"
                        className="object-contain rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleChildImageRemove(index)}
                        className="absolute top-0 right-0 text-red-500 bg-white rounded-full w-6 h-6 flex items-center justify-center text-base"
                        style={{ transform: 'translate(40%, -40%)' }}
                        aria-label="Xóa ảnh"
                      >
                        &#10005;
                      </button>
                    </div>
                  ) : (
                    <DropzoneComponent onFileUpload={file => handleChildImageUpload(file, index)} />
                  )}
                </div>

                <div className="mt-4 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      const newChildren = [...aboutUsData.children];
                      newChildren.splice(index, 1);
                      setAboutUsData({ ...aboutUsData, children: newChildren });
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="col-span-full mt-4 flex justify-end">
        <Button variant="submit">Save</Button>
      </div>
    </ComponentCard>
  );
}
