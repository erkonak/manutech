"use client"

import { useState, useEffect, useCallback } from 'react';
import { getFromCache } from '@/util/api';

interface UseApiState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

interface UseApiOptions {
    /**
     * Component mount olduğunda otomatik fetch yap (varsayılan: true)
     */
    autoFetch?: boolean;
    /**
     * Cache key (SWR desteği için)
     */
    cacheKey?: string;
    /**
     * Bağımlılık dizisi değiştiğinde refetch yap
     */
    deps?: unknown[];
}

/**
 * Genel amaçlı API fetch hook'u
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useApi(() => getBlogs());
 * ```
 */
export function useApi<T>(
    fetcher: () => Promise<T | null>,
    options: UseApiOptions = {}
) {
    const { autoFetch = true, deps = [], cacheKey } = options;

    const [state, setState] = useState<UseApiState<T>>({
        data: null,
        loading: autoFetch,
        error: null
    });

    const fetch = useCallback(async () => {
        // SWR: Önce cache'e bak
        if (cacheKey) {
            const cached = getFromCache<T>(cacheKey);
            if (cached) {
                setState(prev => ({ ...prev, data: cached, loading: false }));
            }
        }

        if (!cacheKey || !getFromCache(cacheKey)) {
             setState(prev => ({ ...prev, loading: true, error: null }));
        }

        try {
            const result = await fetcher();
            setState({ data: result, loading: false, error: null });
            return result;
        } catch (err) {
            const error = err instanceof Error ? err : new Error('API hatası');
            setState({ data: null, loading: false, error });
            return null;
        }
    }, [fetcher, cacheKey]);

    useEffect(() => {
        if (autoFetch) {
            fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps]);

    return {
        ...state,
        refetch: fetch
    };
}

/**
 * API yanıtından data çıkaran hook
 * API { status, data } formatında yanıt döndüğünde kullanılır
 *
 * @example
 * ```tsx
 * const { data: blogs, loading } = useApiData(() => getBlogs(), []);
 * // blogs artık doğrudan Blog[] tipinde
 * ```
 */
export function useApiData<T, R>(
    fetcher: () => Promise<{ status?: boolean; data?: T } | null>,
    options: UseApiOptions = {}
): UseApiState<T> & { refetch: () => Promise<T | null> } {
    const { autoFetch = true, deps = [], cacheKey } = options;

    const [state, setState] = useState<UseApiState<T>>({
        data: null,
        loading: autoFetch,
        error: null
    });

    const fetch = useCallback(async () => {
        // SWR: Önce cache'e bak
        if (cacheKey) {
            const cached = getFromCache<T>(cacheKey);
            if (cached) {
                setState(prev => ({ ...prev, data: cached, loading: false }));
            }
        }

        if (!cacheKey || !getFromCache(cacheKey)) {
             setState(prev => ({ ...prev, loading: true, error: null }));
        }

        try {
            const result = await fetcher();

            if (result?.status && result.data !== undefined) {
                setState({ data: result.data, loading: false, error: null });
                return result.data;
            } else {
                setState({ data: null, loading: false, error: null });
                return null;
            }
        } catch (err) {
            const error = err instanceof Error ? err : new Error('API hatası');
            setState({ data: null, loading: false, error });
            return null;
        }
    }, [fetcher, cacheKey]);

    useEffect(() => {
        if (autoFetch) {
            fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps]);

    return {
        ...state,
        refetch: fetch
    };
}
