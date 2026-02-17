// API yanıt tipleri

/**
 * Genel API yanıt wrapper'ı
 */
export interface ApiResponse<T> {
    status: boolean;
    message?: string;
    error?: string;
    data: T;
}

/**
 * Sayfalanmış API yanıt wrapper'ı
 */
export interface PaginatedResponse<T> {
    status: boolean;
    data: {
        current_page: number;
        data: T[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    };
}

// --- Site Info ---
export interface SiteInfo {
    id: number;
    title: string;
    telefon: string;
    telefon2: string | null;
    mail: string;
    firma_adi: string;
    instagram: string | null;
    facebook: string | null;
    linkedin: string | null;
    logo: string;
    logo_dark: string;
    logo_w: string;
    logo_h: string;
    web_site_url: string;
    footer_metni: string;
    footer_metni_en?: string;
    [key: string]: any;
}

// --- Banner ---
export interface Banner {
    id: number;
    baslik: string;
    baslik_en?: string;
    aciklama: string;
    aciklama_en?: string;
    resim: string;
    url: string;
    sira: string;
    durum: string;
    created_at: string;
    updated_at: string;
}

// --- Blog ---
export interface BlogCategory {
    id: number;
    kategori: string;
}

export interface BlogAuthor {
    id: number;
    ad_soyad: string;
}

export interface Blog {
    id: number;
    kategori_id: string;
    baslik: string;
    baslik_en: string | null;
    baslik_ar: string | null;
    yazar: string;
    slug: string;
    slug_en: string;
    slug_ar: string;
    aciklama: string;
    aciklama_en: string;
    aciklama_ar: string;
    tarih: string;
    gtarih: string;
    kapak: string | null;
    k: BlogCategory;
    ky: BlogAuthor;
}

export interface BlogComment {
    id: number;
    blog_id: number;
    parent_id: number | null;
    ad_soyad: string;
    email: string;
    yorum: string;
    durum: string;
    created_at: string;
    updated_at: string;
}

export interface BlogDetail {
    blog: Blog;
    resimler: Array<{ url: string; alt?: string }>;
    yorumlar: BlogComment[];
}

// --- Education ---
export interface Education {
    id: number;
    baslik: string;
    baslik_en?: string;
    aciklama: string;
    aciklama_en?: string;
    kapak_resmi: string | null;
    udemy_url: string | null;
    durum: string;
    created_at: string;
    updated_at: string;
}

// --- Interview ---
export interface Interview {
    id: number;
    ad_soyad: string;
    firma: string;
    gorev: string;
    konu: string;
    youtube_url: string;
    durum: string;
    created_at: string;
    updated_at: string;
}

// --- Solution ---
export interface Solution {
    id: number;
    baslik: string;
    baslik_en?: string;
    slug: string;
    slug_en?: string;
    durum: string;
    created_at: string;
    updated_at: string;
    resim?: string;
    alt_baslik?: string;
    alt_baslik_en?: string;
}

// --- Sub Solution ---
export interface SubSolution {
    id: number;
    yazilim_cozum_id: string;
    baslik: string;
    baslik_en: string;
    slug: string;
    slug_en: string;
    alt_baslik: string;
    alt_baslik_en: string;
    icerik: string;
    icerik_en: string;
    resim: string;
    durum: string;
    created_at: string;
    updated_at: string;
    ana_slug?: string;
    features?: (string | { title: string })[];
}

// --- Post Support ---
export interface PostSupport {
    id: number;
    baslik_tr: string;
    baslik_en: string | null;
    detay_tr: string;
    detay_en: string | null;
    foto: string;
    aciklama_tr: string;
    aciklama_en: string | null;
    fiyat: string;
    avantajlar_tr: string[];
    avantajlar_en: string[];
    slug_tr: string;
    slug_en: string | null;
    sira: string;
    durum: boolean;
    created_at: string;
    updated_at: string;
}

// --- Category ---
export interface Category {
    id: number;
    kategori: string;
    slug: string;
    durum: string;
}

// --- Contact Form ---
export interface ContactFormData {
    ad_soyad: string;
    email: string;
    telefon: string;
    konu: string;
    mesaj: string;
}

export interface ContactFormResponse {
    status: boolean;
    message?: string;
    error?: string;
    errors?: Record<string, string[]>;
}

// --- Blog Comment Form ---
export interface BlogCommentData {
    blog_id: number;
    parent_id?: number | null;
    ad_soyad: string;
    eposta: string;
    yorum: string;
}
