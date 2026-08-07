import React, { createContext, useContext, useState, useEffect } from 'react';

export const LanguageContext = createContext<{
  language: string;
  setLanguage?: (lang: string) => void;
}>({
  language: 'vn',
});

export const useLanguage = () => useContext(LanguageContext).language;
export const useSetLanguage = () => {
  const context = useContext(LanguageContext);
  return context.setLanguage || (() => {});
};

export const LanguageProvider = ({ children, initialLanguage }: { children: React.ReactNode, initialLanguage?: string }) => {
  const [language, setLanguageState] = useState(initialLanguage || 'vn');

  useEffect(() => {
    if (!initialLanguage) {
      const savedLang = localStorage.getItem('language');
      if (savedLang) {
        setLanguageState(savedLang);
      }
    }
  }, [initialLanguage]);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
