import axiosInstance from "@/core/hooks/useAxiosService";
import { useState } from "react";

export interface Article {
  id: number;
  name: string;
  title: string;
  link: string;
  description: string;
  image: string;
  parent_link: string;
  create_time: string;
  write_date: string;
  view: number;
  href: string
}

export interface Page {
  id: number;
  name: string;
  title: string;
  link: string;
  description: string;
  image: string;
  list: Article[]
}

const useServiceApiPublicArticle = () => {
  const [loading, setLoading] = useState(true);
  const getArticleHome = async ({ language }: { language: string }) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/article-home', {
        params: { language: language },
      });      
      return response.data.data || []
    } catch (error) {
      console.error('Failed to fetch articles:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  return { getArticleHome, loading }
};

export default useServiceApiPublicArticle;
