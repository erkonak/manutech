"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSiteInfo } from '@/util/api';

interface SiteInfoData {
	id?: number;
	title?: string;
	telefon?: string;
	telefon2?: string | null;
	mail?: string;
	firma_adi?: string;
	instagram?: string | null;
	facebook?: string | null;
	linkedin?: string | null;
	logo?: string;
	logo_dark?: string;
	logo_w?: string;
	logo_h?: string;
	web_site_url?: string;
	footer_metni?: string;
	[key: string]: any;
}

interface SiteInfoContextType {
	siteInfo: SiteInfoData | null;
	loading: boolean;
}

const SiteInfoContext = createContext<SiteInfoContextType | undefined>(undefined);

const CACHE_KEY = 'site-info-cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 saat

// Cache'den veri okuma helper fonksiyonu
function getCachedSiteInfo(): SiteInfoData | null {
	if (typeof window === 'undefined') return null;
	
	try {
		const cachedData = localStorage.getItem(CACHE_KEY);
		if (cachedData) {
			const { data, timestamp } = JSON.parse(cachedData);
			const now = Date.now();
			
			// Cache geçerli mi kontrol et
			if (now - timestamp < CACHE_EXPIRY) {
				return data;
			}
		}
	} catch (error) {
		console.error("Cache okunurken hata:", error);
	}
	
	return null;
}

export const SiteInfoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	// Hydration hatası önlemek için initial state her zaman null (server ve client aynı başlasın)
	const [siteInfo, setSiteInfo] = useState<SiteInfoData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		async function fetchSiteInfo() {
			// Önce cache'den senkron kontrol et (client-side'da hızlı yükleme için)
			const cachedData = getCachedSiteInfo();
			if (cachedData && isMounted) {
				// Cache geçerli, hemen state'i güncelle (senkron, anında görünsün)
				setSiteInfo(cachedData);
				setLoading(false);
				return; // Cache geçerli, API çağrısı yapma
			}

			// Cache yoksa veya süresi dolmuşsa API'den çek
			try {
				const response = await getSiteInfo();
				if (response && response.status === true && response.data && isMounted) {
					setSiteInfo(response.data);
					// Yeni veriyi cache'e kaydet
					if (typeof window !== 'undefined') {
						localStorage.setItem(CACHE_KEY, JSON.stringify({
							data: response.data,
							timestamp: Date.now()
						}));
					}
				}
			} catch (error) {
				console.error("Site bilgileri yüklenirken hata:", error);
				// Hata durumunda cache'den yükle (varsa)
				const fallbackCache = getCachedSiteInfo();
				if (fallbackCache && isMounted) {
					setSiteInfo(fallbackCache);
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		}

		fetchSiteInfo();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<SiteInfoContext.Provider value={{ siteInfo, loading }}>
			{children}
		</SiteInfoContext.Provider>
	);
};

export const useSiteInfo = () => {
	const context = useContext(SiteInfoContext);
	if (!context) {
		throw new Error('useSiteInfo must be used within a SiteInfoProvider');
	}
	return context;
};
