import axiosInstance from '@/hooks/useAxiosService';
import { useState } from 'react';

export interface dataAbout {
  link: string,
  href: string,
  description: string,
  background: string
}

export interface CompanyData {
  id: number;
  name: string;
  value: string;
}

const useServiceApiPublicAbout = () => {
  const [loading, setLoading] = useState(true);

  const getAboutHome = async ({ language }: { language: string }) => {
    setLoading(true);
    try {
      if (!language) return null;
      const response = await axiosInstance.get('/about', {
        params: { language: language },
      });
      return response.data.data || null;
    } catch (error) {
      console.error('Failed to fetch:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getAboutStats = async ({ language }: { language: string }) => {
    setLoading(true);
    try {
      if (!language) return [];
      const response = await axiosInstance.get('/company-data', {
        params: { language: language },
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };
  return { getAboutHome, getAboutStats, loading };
};

export default useServiceApiPublicAbout;
