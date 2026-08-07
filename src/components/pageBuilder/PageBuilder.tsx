'use client';

import { useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import DropzoneComponent from '@/components/form/form-elements/DropZone';
import TextArea from '@/components/form/input/TextArea';
import { BenefitData } from '@/core/types/benefit';
import Button from '../ui/button/Button';

interface PageBuilderProps {
  benefitData: BenefitData;
  setBenefitData: React.Dispatch<React.SetStateAction<BenefitData>>;
  onSubmit: (e: React.FormEvent) => void;
}

export default function PageBuilder({ benefitData, setBenefitData }: PageBuilderProps) {
  // const [parentImageUploaded, setParentImageUploaded] = useState(false);
  // const [parentImageRemoved, setParentImageRemoved] = useState(false);
  const [childImageStates, setChildImageStates] = useState<Record<number, boolean>>({});

  // const handleParentImageUpload = (file: File) => {
  //   const reader = new FileReader();
  //   reader.onload = e => {
  //     setBenefitData(prev => ({
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
  //   setBenefitData(prev => ({
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
    setBenefitData(prev => ({
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
      const newChildren = [...benefitData.children];
      newChildren[index].image = {
        src: e.target?.result as string,
        name: file.name,
        type: file.type,
        old: newChildren[index].image?.old || '',
        del: '',
        size: {},
      };
      setBenefitData({ ...benefitData, children: newChildren });
      setChildImageStates(prev => ({ ...prev, [index]: true }));
    };
    reader.readAsDataURL(file);
  };

  const handleChildImageRemove = (index: number) => {
    const newChildren = [...benefitData.children];
    newChildren[index].image = {
      src: '',
      name: '',
      type: '',
      old: '',
      del: newChildren[index].image?.old || '',
    };
    setBenefitData({ ...benefitData, children: newChildren });
    setChildImageStates(prev => ({ ...prev, [index]: false }));
  };

  return (
    <ComponentCard title="Lợi ích">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="name">Tiêu đề</Label>
          <Input
            id="name"
            name="name"
            value={benefitData.name}
            onChange={e => setBenefitData({ ...benefitData, name: e.target.value })}
            placeholder="Nhập tiêu đề"
          />

        </div>

      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleAddChild}
          className="text-blue-600 flex items-center gap-1"
        >
          <span className="text-xl font-bold">+</span> Thêm lợi ích
        </button>
      </div>
      <div className={`mt-4 grid gap-4 ${
          benefitData.children.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
        } ${benefitData.children.length > 2 ? 'grid-cols-3' : 'grid-cols-1'}`}
      >
        {benefitData.children.map((child, index) => {
          const hasImageSrc = !!child.image?.src;
          const hasOldImage =
            !!child.image?.old && !child.image?.src && childImageStates[index] !== false;

          return (
            <div key={index} className="border p-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label>Tên lợi ích</Label>
                  <Input
                    value={child.name}
                    onChange={e => {
                      const newChildren = [...benefitData.children];
                      newChildren[index].name = e.target.value;
                      setBenefitData({ ...benefitData, children: newChildren });
                    }}
                  />

                  <div className="mt-4">
                    <Label>Chi tiết</Label>
                    <TextArea
                      value={child.detail}
                      onChange={value => {
                        const newChildren = [...benefitData.children];
                        newChildren[index].detail = value;
                        setBenefitData({ ...benefitData, children: newChildren });
                      }}
                      rows={4}
                      placeholder="Nhập nội dung chi tiết"
                    />
                  </div>
                  <div className="m-auto">
                    <Label>Hình ảnh</Label>
                    {hasImageSrc || hasOldImage ? (
                      <div className="relative w-20 h-20">
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
                      <DropzoneComponent
                        onFileUpload={file => handleChildImageUpload(file, index)}
                      />
                    )}
                    <div className="mt-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          const newChildren = [...benefitData.children];
                          newChildren.splice(index, 1);
                          setBenefitData({ ...benefitData, children: newChildren });
                        }}
                        className="text-red-600 hover:underline"
                      >
                        Xóa lợi ích
                      </button>
                    </div>
                  </div>
                </div>
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
