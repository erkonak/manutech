"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSiteInfo, getFromCache, CACHE_KEYS } from '@/util/api';
import type { SiteInfo } from '@/util/api';

interface SiteInfoContextType {
	siteInfo: SiteInfo | null;
	loading: boolean;
}

const SiteInfoContext = createContext<SiteInfoContextType | undefined>(undefined);

export const SiteInfoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		async function fetchSiteInfo() {
			// SWR: Önce cache'e bak
			const cached = getFromCache<any>(CACHE_KEYS.SITE_INFO);
			if (cached && isMounted) {
				setSiteInfo(cached.data);
				setLoading(false);
			}

			try {
				const response = await getSiteInfo();
				if (response?.status && response.data && isMounted) {
					setSiteInfo(response.data);
				}
			} catch (error) {
				console.error("Site bilgileri güncellenirken hata:", error);
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
