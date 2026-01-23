"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSolutions, getPostSupports, getFromCache, CACHE_KEYS } from '@/util/api';
import type { Solution, PostSupport } from '@/util/api';

interface DataContextType {
    // Solutions (Menüler için)
    solutions: Solution[];
    solutionsLoading: boolean;

    // Post Supports (Menüler için)
    postSupports: PostSupport[];
    postSupportsLoading: boolean;

    // Refetch fonksiyonları
    refetchSolutions: () => Promise<void>;
    refetchPostSupports: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

/**
 * Paylaşılan veriler için merkezi context
 * Menu ve MobileMenu gibi birden fazla component'ın kullandığı verileri
 * tek bir yerden yönetir, böylece çift fetch önlenir.
 */
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Solutions state
    const [solutions, setSolutions] = useState<Solution[]>([]);
    const [solutionsLoading, setSolutionsLoading] = useState(true);

    // Post Supports state
    const [postSupports, setPostSupports] = useState<PostSupport[]>([]);
    const [postSupportsLoading, setPostSupportsLoading] = useState(true);

    // Solutions fetch
    const fetchSolutions = async () => {
        // SWR: Önce cache'den veriyi al ve göster
        const cached = getFromCache<any>(CACHE_KEYS.SOLUTIONS);
        if (cached) {
            setSolutions(cached.data);
            setSolutionsLoading(false);
        }

        // Arka planda güncel veriyi çek
        try {
            const response = await getSolutions();
            if (response?.status && response.data) {
                setSolutions(response.data);
                // getSolutions zaten kendi içinde cache yazıyor
            }
        } catch (error) {
            console.error('Solutions güncellenirken hata:', error);
        } finally {
            setSolutionsLoading(false);
        }
    };

    // Post Supports fetch
    const fetchPostSupports = async () => {
        // SWR: Önce cache'den veriyi al ve göster
        const cached = getFromCache<any>(CACHE_KEYS.POST_SUPPORTS);
        if (cached) {
            setPostSupports(cached.data);
            setPostSupportsLoading(false);
        }

        // Arka planda güncel veriyi çek
        try {
            const response = await getPostSupports();
            if (response?.status && response.data) {
                setPostSupports(response.data);
            }
        } catch (error) {
            console.error('Post Supports güncellenirken hata:', error);
        } finally {
            setPostSupportsLoading(false);
        }
    };

    // İlk yüklemede verileri çek
    useEffect(() => {
        fetchSolutions();
        fetchPostSupports();
    }, []);

    const value: DataContextType = {
        solutions,
        solutionsLoading,
        postSupports,
        postSupportsLoading,
        refetchSolutions: fetchSolutions,
        refetchPostSupports: fetchPostSupports
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

/**
 * DataContext hook'u
 *
 * @example
 * ```tsx
 * const { solutions, postSupports, solutionsLoading } = useData();
 * ```
 */
export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
