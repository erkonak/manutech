// Merkezi Cache Yönetimi

const CACHE_PREFIX = 'api-cache-';
const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 saat

interface CacheEntry<T> {
    data: T;
    timestamp: number;
    ttl: number;
}

/**
 * Cache'den veri oku
 */
export function getFromCache<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
        const cacheKey = CACHE_PREFIX + key;
        const cached = localStorage.getItem(cacheKey);

        if (!cached) return null;

        const entry: CacheEntry<T> = JSON.parse(cached);
        const now = Date.now();

        // TTL kontrolü
        if (now - entry.timestamp > entry.ttl) {
            localStorage.removeItem(cacheKey);
            return null;
        }

        return entry.data;
    } catch (error) {
        console.error(`Cache okuma hatası (${key}):`, error);
        return null;
    }
}

/**
 * Cache'e veri yaz
 */
export function setToCache<T>(key: string, data: T, ttl: number = DEFAULT_TTL): void {
    if (typeof window === 'undefined') return;

    try {
        const cacheKey = CACHE_PREFIX + key;
        const entry: CacheEntry<T> = {
            data,
            timestamp: Date.now(),
            ttl
        };
        localStorage.setItem(cacheKey, JSON.stringify(entry));
    } catch (error) {
        console.error(`Cache yazma hatası (${key}):`, error);
    }
}

/**
 * Belirli bir cache key'ini sil
 */
export function invalidateCache(key: string): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.removeItem(CACHE_PREFIX + key);
    } catch (error) {
        console.error(`Cache silme hatası (${key}):`, error);
    }
}

/**
 * Tüm API cache'ini temizle
 */
export function clearAllCache(): void {
    if (typeof window === 'undefined') return;

    try {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(CACHE_PREFIX)) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
        console.error('Cache temizleme hatası:', error);
    }
}

// Cache key sabitleri
export const CACHE_KEYS = {
    SITE_INFO: 'site-info',
    BANNERS: 'banners',
    BLOGS: 'blogs',
    CATEGORIES: 'categories',
    SOLUTIONS: 'solutions',
    POST_SUPPORTS: 'post-supports',
    EDUCATIONS: 'educations',
    INTERVIEWS: 'interviews'
} as const;

// TTL sabitleri (milisaniye)
export const CACHE_TTL = {
    SHORT: 30 * 1000,          // 30 saniye
    MEDIUM: 2 * 60 * 1000,     // 2 dakika
    LONG: 5 * 60 * 1000,       // 5 dakika (Önceden 24 saatti)
    WEEK: 24 * 60 * 60 * 1000  // 1 gün (Önceden 7 gündü)
} as const;
