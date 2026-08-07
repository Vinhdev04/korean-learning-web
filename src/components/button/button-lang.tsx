'use client';
import axiosInstance from '@/core/hooks/useAxiosService';
import { useEffect, useState } from 'react';

type Props = {
  isLangMode: boolean;
  encryptedId?: string | null;
  currentLangId: number;
  setIsLangMode: (val: boolean) => void; 
  handleSwitchToLang: (lang: language) => void;
  handleLoadDefaultLang: (id: number) => void; 
  rootId: number;
};

export interface language {
  id: number;
  name: string;
  icon: string;
  defaults: number;
}

export default function ButtonLanguage({
  encryptedId,
  currentLangId,
  handleSwitchToLang,
  rootId,
  setIsLangMode,
  handleLoadDefaultLang,
}: Props) {
  const [languages, setLanguages] = useState<language[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastId, setLastId] = useState<string>('999999999999999');
  useEffect(() => {
    const fetchLanguages = async (params = { lastId }) => {
      try {
        const res = await axiosInstance.post('language/get-list', {
          data: { last_id: params.lastId },
        });
        setLanguages(res.data.data.rows);
        setLastId(res.data.data.rows[res.data.data.rows.length - 1]?.last_id || '0');
      } catch (err) {
        console.error('Lỗi load ngôn ngữ:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!encryptedId || loading) return null;

  return (
    <div className="flex gap-2">
      {languages.map(lang => {
        const isCurrent = lang.id === currentLangId;
        return (
          <button
            type="button"
            key={lang.id}
            disabled={isCurrent}
            className={`flex w-7 p-[0.3px] items-center justify-center text-2xl transition-opacity text-amber-50
                      ${isCurrent ? 'opacity-40 cursor-not-allowed border-1 border-orange-500' : 'hover:opacity-80'}`}
            onClick={() => {
              if (isCurrent) return;
              if (lang.defaults === 1) {
                setIsLangMode(false);
                handleLoadDefaultLang(rootId); 
              } else {
                handleSwitchToLang(lang);
              }
            }}
          >
            <img
              src={`${lang.id === 1 ? '/images/country/vn.svg' : '/images/country/en.svg'}`}
              alt="Logo"
              width={111}
              height={44}
            />
          </button>
        );
      })}
    </div>
  );
}
