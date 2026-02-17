// API Servisleri
// Tüm API fonksiyonları burada organize edilir

import { apiGet, apiPost } from './client';
import { getFromCache, setToCache, CACHE_KEYS, CACHE_TTL } from './cache';
import type {
    ApiResponse,
    PaginatedResponse,
    SiteInfo,
    Banner,
    Blog,
    BlogDetail,
    Education,
    Interview,
    Solution,
    SubSolution,
    PostSupport,
    Category,
    ContactFormData,
    ContactFormResponse,
    BlogCommentData
} from './types';

// ============================================
// Site Info
// ============================================

export async function getSiteInfo(): Promise<ApiResponse<SiteInfo> | null> {
    const response = await apiGet<ApiResponse<SiteInfo>>('site-info');

    if (response?.status) {
        setToCache(CACHE_KEYS.SITE_INFO, response, CACHE_TTL.LONG);
    }

    return response;
}

// ============================================
// Banners
// ============================================

export async function getBanners(): Promise<ApiResponse<Banner[]> | null> {
    const response = await apiGet<ApiResponse<Banner[]>>('banners');

    if (response?.status) {
        setToCache(CACHE_KEYS.BANNERS, response, CACHE_TTL.LONG);
    }

    return response;
}

// ============================================
// Blogs
// ============================================

export async function getBlogs(): Promise<PaginatedResponse<Blog> | null> {
    const response = await apiGet<PaginatedResponse<Blog>>('blogs');

    if (response?.status) {
        setToCache(CACHE_KEYS.BLOGS, response, CACHE_TTL.MEDIUM);
    }

    return response;
}

export async function getBlogBySlug(slug: string): Promise<ApiResponse<BlogDetail> | null> {
    const cacheKey = `blog-${slug}`;
    const response = await apiGet<ApiResponse<BlogDetail>>(`blogs/${slug}`);

    if (response?.status) {
        setToCache(cacheKey, response, CACHE_TTL.MEDIUM);
    }

    return response;
}

export async function postBlogComment(data: any): Promise<ApiResponse<unknown> | null> {
    return apiPost<ApiResponse<unknown>>('blog-comment', data);
}

// ============================================
// Categories
// ============================================

export async function getCategories(): Promise<ApiResponse<Category[]> | null> {
    const response = await apiGet<ApiResponse<Category[]>>('categories');

    if (response?.status) {
        setToCache(CACHE_KEYS.CATEGORIES, response, CACHE_TTL.LONG);
    }

    return response;
}

// ============================================
// Contact
// ============================================

export async function sendContactForm(formData: any): Promise<ContactFormResponse | null> {
    return apiPost<ContactFormResponse>('contact-create', formData);
}

// ============================================
// Educations
// ============================================

export async function getEducations(): Promise<ApiResponse<Education[]> | null> {
    const response = await apiGet<ApiResponse<Education[]>>('educations');

    if (response?.status) {
        setToCache(CACHE_KEYS.EDUCATIONS, response, CACHE_TTL.MEDIUM);
    }

    return response;
}

// ============================================
// Interviews
// ============================================

export async function getInterviews(): Promise<ApiResponse<Interview[]> | null> {
    const response = await apiGet<ApiResponse<Interview[]>>('interviews');

    if (response?.status) {
        setToCache(CACHE_KEYS.INTERVIEWS, response, CACHE_TTL.MEDIUM);
    }

    return response;
}

// ============================================
// Solutions
// ============================================

export async function getSolutions(): Promise<ApiResponse<Solution[]> | null> {
    const response = await apiGet<ApiResponse<Solution[]>>('solutions');

    if (response?.status) {
        setToCache(CACHE_KEYS.SOLUTIONS, response, CACHE_TTL.LONG);
    }

    return response;
}

export async function getSubSolutions(solutionId: number | string): Promise<ApiResponse<SubSolution[]> | null> {
    const cacheKey = `sub-solutions-${solutionId}`;
    const response = await apiGet<ApiResponse<SubSolution[]>>(`sub-solutions?solution_id=${solutionId}`);

    if (response?.status) {
        setToCache(cacheKey, response, CACHE_TTL.LONG);
    }

    return response;
}

/**
 * Kategoriye göre yazılım çözümlerini getir
 */
export async function getSoftwareSolutions(categorySlug?: string) {
    const solutionsResponse = await getSolutions();
    if (!solutionsResponse?.status) return { success: false, data: [] };

    const solutions = solutionsResponse.data;

    if (categorySlug) {
        const targetSolution = solutions.find(s => s.slug === categorySlug);
        if (!targetSolution) return { success: false, data: [] };

        const subSolutionsResponse = await getSubSolutions(targetSolution.id);
        return {
            success: subSolutionsResponse?.status ?? false,
            data: subSolutionsResponse?.data ?? [],
            category: targetSolution
        };
    }

    return {
        success: true,
        data: solutions
    };
}

/**
 * Slug'a göre yazılım çözümü detayı getir
 */
export async function getSoftwareSolutionBySlug(slug: string) {
    const solutionsResponse = await getSolutions();
    if (!solutionsResponse?.status) return { success: false, data: null };

    for (const solution of solutionsResponse.data) {
        const subsResponse = await getSubSolutions(solution.id);
        if (subsResponse?.status) {
            const found = subsResponse.data.find(
                (s) => s.slug === slug || s.slug_en === slug
            );
            if (found) {
                return { success: true, data: found, category: solution };
            }
        }
    }

    return { success: false, data: null };
}

// ============================================
// Post Supports
// ============================================

export async function getPostSupports(): Promise<ApiResponse<PostSupport[]> | null> {
    const response = await apiGet<ApiResponse<PostSupport[]>>('post-support');

    if (response?.status) {
        setToCache(CACHE_KEYS.POST_SUPPORTS, response, CACHE_TTL.LONG);
    }

    return response;
}

export async function getPostSupport(slug: string) {
    const response = await getPostSupports();
    if (!response?.status) return { success: false, data: null };

    const found = response.data.find(
        (item) => item.slug_tr === slug || item.slug_en === slug
    );

    return {
        success: !!found,
        data: found || null
    };
}
