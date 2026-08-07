import axiosInstance from "@/core/hooks/useAxiosService";
import { useState } from "react";

export interface Menu {
  id: string;
  title: string;
  name: string;
  position: string;
  container: string;
  pages: Page[];
}

export interface Page {
  id: string;
  code:string;
  title: string;
  name: string;
  link: string;
  type: string;
  description: string;
  icon: string;
  children: Page[];
  articles: Articles[];
  href: string;
  detail: string;
  image: string;
  background: string
}
interface Articles {
  id: string;
  name: string;
  fullLink:string;
  title: string;
  link: string;
  description: string;
}

export interface PageFlat extends Page {
  level: number;
  fullLink?: string;
}

const useServiceApiPublicMenu = () => {
  const [loading, setLoading] = useState(true);

  const getMenuHeader = async ({ language }: { language: string }) => {
    setLoading(true);
    try {
      if (!language) return [];
      const response = await axiosInstance.get('/menu-header', {
        params: { language: language, position: 'menuHeader' },
      });
      return response.data.data || []
    } catch (error) {
      console.error('Failed to fetch Menus:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };
  const getMenu = async ({ language, position }: { language: string, position: string }) => {
    setLoading(true);
    try {
      if (!language) return [];
      const response = await axiosInstance.get('/menu', {
        params: { language: language, position: position },
      });
      return response.data.data || []
    } catch (error) {
      console.error('Failed to fetch Menus:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };
  return { getMenuHeader, getMenu, loading }
};

export default useServiceApiPublicMenu;
