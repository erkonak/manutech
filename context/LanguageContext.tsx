
"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

type Locale = 'tr' | 'en' | 'ar';

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (obj: any, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [locale, setLocale] = useState<Locale>('tr');

    useEffect(() => {
        const savedLocale = localStorage.getItem('locale') as Locale;
        if (savedLocale && ['tr', 'en', 'ar'].includes(savedLocale)) {
            setLocale(savedLocale);
        }
    }, []);

    const handleSetLocale = (newLocale: Locale) => {
        setLocale(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    const t = (obj: any, key: string) => {
        if (!obj) return '';
        if (locale === 'en' && obj[`${key}_en`]) {
            return obj[`${key}_en`];
        }
        if (locale === 'ar' && obj[`${key}_ar`]) {
            return obj[`${key}_ar`];
        }
        return obj[key] || '';
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
