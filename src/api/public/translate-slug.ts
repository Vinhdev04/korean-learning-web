import axiosInstance from '@/core/hooks/useAxiosService';

export interface TranslateSlug {
  parentLink?: string;
  childrenLink?: string;
}

const useServiceTranslateSlug = () => {
  const getTranslateSlug = async (params: {
    locale: string;
    parentLink?: string;
    childrenLink?: string;
    newLocale: string;
  }): Promise<TranslateSlug | null> => {
    try {
      const response = await axiosInstance.get('/translate-slug', { params });
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch translate-slug:', error);
      return null;
    }
  };

  return { getTranslateSlug };
};

export default useServiceTranslateSlug;
