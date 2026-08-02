import axiosInstance from '@/hooks/useAxiosService';
import { useState } from 'react';

export interface Customer {
  id: number;
  name: string;
  image: string;
  link: string;
  title: string;
  description: string;
  href: string;
  customers: Customer[]
  data:Customer[]
}

export interface CustomerGroup {
  category: string;
  records: Customer[];
}

const useServiceApiPublicLibrary = () => {
  const [loading, setLoading] = useState(true);

  const getCustomer = async ({ language }: { language: string }) => {
    setLoading(true);
    try {
      if (!language) return null;
      const response = await axiosInstance.get('/customer-home', {
        params: { language: language},
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getCustomer, loading };
};

export default useServiceApiPublicLibrary;
