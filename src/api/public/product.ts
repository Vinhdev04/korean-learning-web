import axiosInstance from "@/core/hooks/useAxiosService";
import { useState } from "react";

export interface Product {
  id: number;
  title: string;
  link: string;
  description: string;
  icon: string;
  type: string;
  href: string;
  list: []
}

export interface Page {
  id: number;
  name: string;
  title: string;
  link: string;
  description: string;
  image: string;
  list: Product[]
}

const useServiceApiPublicProduct = () => {
  const [loading, setLoading] = useState(true);

  const getProductHome = async ({ language }: { language: string }) => {
    setLoading(true);
    try {
      if (!language) return null;
      const response = await axiosInstance.get('/product-home', {
        params: { language: language },
      });

      return response.data.data || []
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  return { getProductHome, loading }
};

export default useServiceApiPublicProduct;
