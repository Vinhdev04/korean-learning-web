import axiosInstance from '@/core/hooks/useAxiosService';
import { useState } from 'react';

export interface Language {
    id: number;
    code: string;
    name: string;
    icon: string;
    defaults: number;
    value: string;
}

const useServiceApiPublicLanguage = () => {
  const [loading, setLoading] = useState(true);

  const getLanguage = async () => {
    setLoading(true);
    try {
      
      const response = await axiosInstance.get('/languages');
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { getLanguage, loading };
};

export default useServiceApiPublicLanguage;
