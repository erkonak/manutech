// Merkezi API Client

const API_BASE_URL = "https://admin.manutechsolutions.com/api";
const API_TOKEN = "AF28Xc5wZ7KIDIrVIcVUFZEyPmiDWvP6TVAZ54ZXpUY";

interface FetchOptions extends RequestInit {
    /**
     * Retry sayısı (varsayılan: 1)
     */
    retries?: number;
    /**
     * Retry gecikme süresi (ms)
     */
    retryDelay?: number;
}

interface ApiError {
    status: number;
    message: string;
    errors?: Record<string, string[]>;
}

/**
 * Merkezi API fetch fonksiyonu
 * - Otomatik header ekleme
 * - Error handling
 * - Retry mekanizması
 */
export async function apiClient<T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T | null> {
    const { retries = 1, retryDelay = 1000, ...fetchOptions } = options;

    const url = `${API_BASE_URL}/${endpoint}`;
    const headers: HeadersInit = {
        'X-API-KEY': API_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...fetchOptions.headers
    };

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, {
                ...fetchOptions,
                headers
            });

            // Response'u parse et
            const data = await response.json();

            // API error kontrolü (non-2xx status)
            if (!response.ok) {
                const apiError: ApiError = {
                    status: response.status,
                    message: data.message || `HTTP ${response.status}`,
                    errors: data.errors
                };
                console.error(`API Hatası (${endpoint}):`, apiError);
                return data; // Hata yanıtını da döndür (validation errors için)
            }

            return data as T;
        } catch (error) {
            lastError = error as Error;
            console.error(`API İsteği Başarısız (${endpoint}, deneme ${attempt + 1}):`, error);

            // Son deneme değilse bekle ve tekrar dene
            if (attempt < retries) {
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            }
        }
    }

    console.error(`API İsteği Tamamen Başarısız (${endpoint}):`, lastError);
    return null;
}

/**
 * GET isteği helper'ı
 */
export function apiGet<T>(endpoint: string, options?: FetchOptions): Promise<T | null> {
    return apiClient<T>(endpoint, { ...options, method: 'GET' });
}

/**
 * POST isteği helper'ı
 */
export function apiPost<T>(
    endpoint: string,
    body: unknown,
    options?: FetchOptions
): Promise<T | null> {
    return apiClient<T>(endpoint, {
        ...options,
        method: 'POST',
        body: JSON.stringify(body)
    });
}

// API URL'ini export et (gerekirse)
export { API_BASE_URL };
