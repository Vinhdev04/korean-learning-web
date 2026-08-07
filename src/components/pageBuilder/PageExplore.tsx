'use client';

import { useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import DropzoneComponent from '@/components/form/form-elements/DropZone';
import TextArea from '@/components/form/input/TextArea';
import { BenefitData } from '@/core/types/benefit';
import Button from '../ui/button/Button';

interface PageExploreProps {
  exploreData: BenefitData;
  setExploreData: React.Dispatch<React.SetStateAction<BenefitData>>;
  onSubmit: (e: React.FormEvent) => void;
}

export default function PageExplore({ exploreData, setExploreData }: PageExploreProps) {
  // const [parentImageUploaded, setParentImageUploaded] = useState(false);
  // const [parentImageRemoved, setParentImageRemoved] = useState(false);
  const [childImageStates, setChildImageStates] = useState<Record<number, boolean>>({});

  // const handleParentImageUpload = (file: File) => {
  //   const reader = new FileReader();
  //   reader.onload = e => {
  //     setExploreData(prev => ({
  //       ...prev,
  //       image: {
  //         src: e.target?.result as string,
  //         name: file.name,
  //         type: file.type,
  //         old: prev.image?.old || '',
  //         del: '',
  //         size: {},
  //       },
  //     }));
  //   };
  //   setParentImageUploaded(true);
  //   setParentImageRemoved(false);
  //   reader.readAsDataURL(file);
  // };

  // const handleParentImageRemove = () => {
  //   setExploreData(prev => ({
  //     ...prev,
  //     image: {
  //       src: '',
  //       name: '',
  //       type: '',
  //       old: '',
  //       del: prev.image?.old || '',
  //     },
  //   }));
  //   setParentImageUploaded(false);
  //   setParentImageRemoved(true);
  // };

  const handleAddChild = () => {
    setExploreData(prev => ({
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
      const newChildren = [...exploreData.children];
      newChildren[index].image = {
        src: e.target?.result as string,
        name: file.name,
        type: file.type,
        old: newChildren[index].image?.old || '',
        del: '',
        size: {},
      };
      setExploreData({ ...exploreData, children: newChildren });
      setChildImageStates(prev => ({ ...prev, [index]: true }));
    };
    reader.readAsDataURL(file);
  };

  const handleChildImageRemove = (index: number) => {
    const newChildren = [...exploreData.children];
    newChildren[index].image = {
      src: '',
      name: '',
      type: '',
      old: '',
      del: newChildren[index].image?.old || '',
    };
    setExploreData({ ...exploreData, children: newChildren });
    setChildImageStates(prev => ({ ...prev, [index]: false }));
  };

  return (
    <ComponentCard title="Khám phá">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="name">Tiêu đề</Label>
          <TextArea
            id="name"
            placeholder="Nhập tiêu đề"
            rows={2}
            value={exploreData.name}
            onChange={value => setExploreData({ ...exploreData, name: value })}
          />

          <div className="mt-4">
            <Label htmlFor="detail">Chi tiết</Label>
            <TextArea
              id="detail"
              placeholder="Nhập nội dung chi tiết"
              rows={5}
              value={exploreData.detail}
              onChange={value => setExploreData({ ...exploreData, detail: value })}
            />
          </div>
        </div>

      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleAddChild}
          className="text-blue-600 flex items-center gap-1"
        >
          <span className="text-xl font-bold">+</span> Thêm khám phá
        </button>
      </div>
      <div
        className={`mt-4 grid gap-4 ${exploreData.children.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}
          ${exploreData.children.length > 2 ? 'grid-cols-3' : 'grid-cols-1'}
          ${exploreData.children.length > 3 ? 'grid-cols-4' : 'grid-cols-1'}`}
      >
        {exploreData.children.map((child, index) => {
          const hasImageSrc = !!child.image?.src;
          const hasOldImage =
            !!child.image?.old && !child.image?.src && childImageStates[index] !== false;
          return (
            <div key={index} className=" border p-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label>Tên khám phá</Label>
  
                  <TextArea
                    value={child.name}
                    onChange={value => {
                      const newChildren = [...exploreData.children];
                      newChildren[index].name = value;
                      setExploreData({ ...exploreData, children: newChildren });
                    }}
                    rows={2}
                    placeholder="Nhập nội dung chi tiết"
                  />

                  <div className="mt-4">
                    <Label>Link</Label>
                    <Input
                      value={child.link}
                      placeholder="Nhập link"
                      onChange={e => {
                        const newChildren = [...exploreData.children];
                        newChildren[index].link = e.target.value;
                        setExploreData({ ...exploreData, children: newChildren });
                      }}
                    />
                  </div>
                </div>

                <div className="m-auto">
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
                        className="object-contain w-full h-full rounded"
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
              </div>

              <div className="mt-4 text-right">
                <button
                  type="button"
                  onClick={() => {
                    const newChildren = [...exploreData.children];
                    newChildren.splice(index, 1);
                    setExploreData({ ...exploreData, children: newChildren });
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

      <div className="col-span-full mt-4 flex justify-end">
        <Button variant="submit">Save</Button>
      </div>
    </ComponentCard>
  );
}
