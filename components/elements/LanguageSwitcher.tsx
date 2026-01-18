
"use client"
import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLanguage();

    return (
        <div className="language-switcher d-flex gap-2">
            <button
                onClick={() => setLocale('tr')}
                className={`btn btn-sm ${locale === 'tr' ? 'btn-dark' : 'btn-outline-dark'} rounded-circle`}
                style={{ width: '32px', height: '32px', padding: '0', fontSize: '10px' }}
            >
                TR
            </button>
            <button
                onClick={() => setLocale('en')}
                className={`btn btn-sm ${locale === 'en' ? 'btn-dark' : 'btn-outline-dark'} rounded-circle`}
                style={{ width: '32px', height: '32px', padding: '0', fontSize: '10px' }}
            >
                EN
            </button>
        </div>
    );
}
