import axiosInstance from '@/core/hooks/useAxiosService';
import { useState } from 'react';

export interface dataAbout {
  id: number;
  value: string;
  text_key: string;
  title: string;
}

const useServiceApiPublicSetting = () => {
  const [loading, setLoading] = useState(true);

  const getSetting = async ({ language }: { language: string }) => {
    setLoading(true);
    try {
      if (!language) return null;
      const response = await axiosInstance.get('/setting', {
        params: { language: language},
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  };
  return { getSetting, loading };
};

export default useServiceApiPublicSetting;
