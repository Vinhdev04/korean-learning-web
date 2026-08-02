import axiosInstance from '@/hooks/useAxiosService';
import { useState } from 'react';

export interface BannerData {
  name: string;
  id: number;
  title: string;
  title_seo: string;
  link: string;
  description: string;
  image: string;
  image_mobile: string;
  type: string;
}

const useServiceApiPublicSlider = () => {
  const [loading, setLoading] = useState(true);

  const getSliderHome = async ({ language }: { language: string }) => {
    setLoading(true);
    try {
      if (!language) return null;
      const response = await axiosInstance.get('/slider', {
        params: { language: language},
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };
  return { getSliderHome, loading };
};

export default useServiceApiPublicSlider;
