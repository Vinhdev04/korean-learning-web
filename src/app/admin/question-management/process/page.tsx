'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axiosInstance from '@/hooks/useAxiosService';
import { toast } from 'react-toastify';
import Spinner from '@/components/ui/Spinner';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import Form from '@/components/form/Form';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import ComponentCard from '@/components/common/ComponentCard';
import { useRouter } from 'next/navigation';
import { pick } from 'lodash';
import { crypto } from '@/lib/index';
import ButtonLanguage, { language } from '@/components/button/add-button-lang';
import ConfirmDialog from '@/components/tables/ConfirmDialog';
import dynamic from 'next/dynamic';

const CkEditor = dynamic(() => import('@/components/CKEditor/CKEditor'), { ssr: false });

export interface Page {
  id: number;
  language_id: number;
  faq_lang_id: number;
  code: string;
  name: string;
  link: string;
  title: string;
  title_seo: string;
  description_seo: string;
  detail: string;
  static: number;
  view: number;
  sort: number;
  pin: number;
  note: string;
  status: number;
}

export default function Process() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const encryptedId = searchParams.get('id');

  const [formData, setFormData] = useState<Page>({
    id: 0,
    language_id: 1,
    faq_lang_id: 1,
    name: '',
    code: '',
    link: '',
    title: '',
    title_seo: '',
    description_seo: '',
    view: 0,
    detail: '',
    static: 0,
    sort: 0,
    pin: 0,
    note: '',
    status: 0,
  });
  //hỏi trước khi tạo bản phụ
  const [showConfirm, setShowConfirm] = useState(false);
  // bản phụ
  const [isLangMode, setIsLangMode] = useState<boolean>(false);
  const [pendingLang, setPendingLang] = useState<language | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);
  const [loading, setLoading] = useState<boolean>(!!encryptedId);
  const [decryptedId, setDecryptedId] = useState<number>(0);
  const dataLang = (lang: language) => {
    setPendingLang(lang);
  };

  const [errors, setErrors] = useState<{
    [key in keyof Partial<Page>]: string;
  }>({});
  useEffect(() => {
    if (isLangMode) {
      setLoading(false);
      return;
    }
    if (encryptedId) {
      const decryptedId = crypto.decrypt(encryptedId);
      if (decryptedId) {
        setDecryptedId(+decryptedId);
        getById(+decryptedId);
      } else {
        toast.error('Invalid ID');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encryptedId]);

  const getById = async (id: number) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post('question-management/get-by-id', {
        data: { id: id },
      });
      if (res.data?.data) {
        setFormData(res.data.data);
      } else {
        // toast.error("No data found for the provided ID");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching page data');
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToLang = async (lang: language) => {
    if (!decryptedId || isSwitching || lang.id === formData.language_id) return;

    setIsSwitching(true);
    try {
      const langData = await axiosInstance.post('question-management/get-by-id-lang', {
        data: { faq_lang_id: decryptedId, language_id: lang.id },
      });
      if (langData.data?.data?.id) {
        const newId = langData.data.data.id;
        setFormData(langData.data.data);
        setIsLangMode(true);
        const newEncrypted = crypto.encrypt(newId.toString());
        router.push(`/admin/question-management/process?id=${newEncrypted}`);
        toast.success(`Đã chuyển sang bản dịch ${lang.name}`);
        setShowConfirm(false);
      } else {
        setPendingLang(lang);
        setShowConfirm(true);
      }
    } catch (err) {
      console.error(err);
      toast.error('Không thể chuyển sang bản dịch');
    } finally {
      setIsSwitching(false);
      setLoading(false);
    }
  };

  const confirmCreateTranslation = async () => {
    if (!pendingLang) return;
    try {
      const resClone = await axiosInstance.post('question-management/insert-lang', {
        data: { faqId: decryptedId, language_id: pendingLang.id },
      });
      const newLangPage = resClone.data?.data;
      if (newLangPage?.id) {
        toast.success(`Đã tạo bản dịch ${pendingLang.name} thành công`);
      } else {
        toast.error('Tạo bản dịch thất bại');
      }
    } catch (err) {
      console.error('Lỗi tạo bản dịch:', err);
      toast.error('Không thể tạo bản dịch');
    } finally {
      setShowConfirm(false);
      setPendingLang(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Cập nhật form
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Validate theo trường cụ thể
    switch (name) {
      case 'name':
        if (!value.trim()) {
          setErrors(prev => ({ ...prev, name: 'requireName' }));
        } else {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.name;
            delete newErrors.link;
            return newErrors;
          });
        }
        break;

      // case 'link':
      //   if (!value.trim()) {
      //     setErrors(prev => ({ ...prev, link: 'requireLink' }));
      //   } else {
      //     setErrors(prev => {
      //       const newErrors = { ...prev };
      //       delete newErrors.link;
      //       return newErrors;
      //     });
      //   }
      //   break;

      // case 'title':
      //   if (!value.trim()) {
      //     setErrors(prev => ({ ...prev, title: 'requireTitle' }));
      //   } else {
      //     setErrors(prev => {
      //       const newErrors = { ...prev };
      //       delete newErrors.title;
      //       return newErrors;
      //     });
      //   }
      //   break;

      case 'title_seo':
        if (value && value.length > 75) {
          setErrors(prev => ({
            ...prev,
            title_seo: 'lengthTitleSEO',
          }));
        } else {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.title_seo;
            return newErrors;
          });
        }
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    const newErrors: { [key in keyof Partial<Page>]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'requireName';
    // if (!formData.link.trim()) newErrors.link = 'requireLink';
    // if (!formData.title.trim()) newErrors.title = 'requireTitle';
    if (formData.title_seo && formData.title_seo.length > 75)
      newErrors.title_seo = 'lengthTitleSEO';
    if (formData.description_seo && formData.description_seo.length > 325)
      newErrors.description_seo = 'lengthDescriptionSEO';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Vui lòng kiểm tra lại các trường dữ liệu.');
      return;
    }

    try {
      //Kiểm tra nếu có id thì cập nhập, không có thì thêm mới
      if (encryptedId) {
        const dataToSubmit = pick(formData, [
          'id',
          'name',
          'link',
          'title',
          'title_seo',
          'description_seo',
          'detail',
          'sort',
        ]);
        const res = await axiosInstance.post(
          isLangMode ? 'question-management/update-lang' : 'question-management/update',
          { data: dataToSubmit }
        );
        toast.success(res.data.error_cont);
      } else {
        const dataToSubmit = pick(formData, [
          'name',
          'link',
          'title',
          'title_seo',
          'description_seo',
          'detail',
          'sort',
        ]);
        const res = await axiosInstance.post('question-management/insert', {
          data: dataToSubmit,
        });
        const encryptedId = crypto.encrypt(res.data.data.id);
        router.push(`/admin/question-management/process?id=${encryptedId}`);
        toast.success(res.data.error_cont);
      }
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
    }
  };

  const handleOnUpdateCKEditor = (editor: string): void => {
    setFormData(prev => ({
      ...prev,
      detail: editor,
    }));
  };

  return (
    <div>
      <PageBreadcrumb pageTitle={encryptedId ? 'update' : 'insert'} />

      {loading ? (
        <Spinner />
      ) : (
        <Form onSubmit={handleSubmit}>
          <ComponentCard isShowHeader={false}>
            <ButtonLanguage
              dataLang={dataLang}
              isLangMode={isLangMode}
              encryptedId={encryptedId}
              setIsLangMode={setIsLangMode}
              currentLangId={formData.language_id}
              handleSwitchToLang={handleSwitchToLang}
              rootId={formData.faq_lang_id}
              routerLang="question-management"
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Câu hỏi</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  placeholder="Nhập tên"
                  onChange={handleInputChange}
                  error={!!errors.name}
                  hint={errors.name}
                />
              </div>

              {/* <div>
                <Label htmlFor="link">Link</Label>
                <Input
                  type="text"
                  name="link"
                  id="link"
                  value={formData.link}
                  placeholder="Nhập link"
                  onChange={handleInputChange}
                  error={!!errors.link}
                  hint={errors.link}
                />
              </div> */}

              {/* <div>
                <Label htmlFor="title">Tiêu đề</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  placeholder="Nhập tiêu đề"
                  onChange={handleInputChange}
                  error={!!errors.title}
                  hint={errors.title}
                />
              </div> */}

              <div>
                <Label htmlFor="sort">Sắp xếp</Label>
                <Input
                  type="number"
                  name="sort"
                  id="sort"
                  value={formData.sort}
                  placeholder="Nhập thứ tự"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="detail">Câu trả lời</Label>
              <CkEditor
                editorData={formData.detail}
                handleOnUpdateCKEditor={handleOnUpdateCKEditor}
              />
            </div>

            <div className="col-span-full mt-4 flex justify-end">
              <Button variant="submit">Save</Button>
            </div>
            <ConfirmDialog
              isOpen={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={confirmCreateTranslation}
              message={`Bạn có muốn tạo bản dịch ${pendingLang?.name} không?`}
            />
          </ComponentCard>
        </Form>
      )}
    </div>
  );
}
