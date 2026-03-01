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
    ProductionSolution,
    SubProductionSolution,
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
    getSubSolutionImages,
    getSoftwareSolutions,
    getSoftwareSolutionBySlug,
    getProductionSolutions,
    getSubProductionSolutions,
    getSubProductionSolutionImages,
    getProdSolutions,
    getProdSolutionBySlug,
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
