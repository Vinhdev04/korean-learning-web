"use client";
import axiosInstance from "@/hooks/useAxiosService";
import { useEffect, useState } from "react";

type Props = {
    currentLangId: number;
    handleSwitchToLang: (lang: language) => void;
};

export interface language {
    id: number;
    name: string;
    icon: string;
    defaults: number;
}

export default function ButtonLanguage({
    currentLangId,
    handleSwitchToLang,
}: Props) {

    const [languages, setLanguages] = useState<language[]>([]);
    const [lastId, setLastId] = useState<string>("999999999999999");

    useEffect(() => {
        const fetchLanguages = async (params = { lastId }) => {
            try {
                const res = await axiosInstance.post("language/get-list", {
                    data: { last_id: params.lastId },
                });
                setLanguages(res.data.data.rows);
                setLastId(
                    res.data.data.rows[res.data.data.rows.length - 1]?.last_id || "0"
                );
            } catch (err) {
                console.error("Lỗi load ngôn ngữ:", err);
            }
        };
        fetchLanguages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex gap-2">
            {languages.map((lang) => {
                const isCurrent = lang.id === currentLangId;
                return (
                    <button
                        key={lang.id}
                        type="button"
                        disabled={isCurrent}
                         className={`flex w-7 p-[0.3px] items-center justify-center text-2xl transition-opacity text-amber-50
                      ${isCurrent ? 'opacity-40 cursor-not-allowed border-1 border-orange-500' : 'hover:opacity-80'}`}
                        onClick={() => handleSwitchToLang(lang)}
                    >
                        <img
                            src={`${lang.id === 1 ? '/images/country/vn.svg' : '/images/country/en.svg'}`}
                            alt="Logo"
                            className="w-12 object-contain"
                        />
                    </button>
                );
            })}
        </div>

    );
}
