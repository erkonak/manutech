// API modülü - tüm exportlar
// Mevcut import'lar çalışmaya devam etsin diye re-export

// Types
export type {
    ApiResponse,
    PaginatedResponse,
    SiteInfo,
    Banner,
    Blog,
    BlogDetail,
    BlogCategory,
    BlogAuthor,
    BlogComment,
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

// Services (API fonksiyonları)
export {
    getSiteInfo,
    getBanners,
    getBlogs,
    getBlogBySlug,
    postBlogComment,
    getCategories,
    sendContactForm,
    getEducations,
    getInterviews,
    getSolutions,
    getSubSolutions,
    getSoftwareSolutions,
    getSoftwareSolutionBySlug,
    getPostSupports,
    getPostSupport
} from './services';

// Cache utilities (gerekirse doğrudan kullanım için)
export {
    getFromCache,
    setToCache,
    invalidateCache,
    clearAllCache,
    CACHE_KEYS,
    CACHE_TTL
} from './cache';

// Client (ileri düzey kullanım için)
export { apiClient, apiGet, apiPost, API_BASE_URL } from './client';
