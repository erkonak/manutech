
const API_BASE_URL = "https://demo.eemre.tr/api";
const API_TOKEN = "AF28Xc5wZ7KIDIrVIcVUFZEyPmiDWvP6TVAZ54ZXpUY";

async function fetchApi(endpoint: string, options: RequestInit = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            ...options,
            headers: {
                'X-API-KEY': API_TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...options.headers,
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return null;
    }
}

// --- TYPES ---

export interface Solution {
    id: number;
    baslik: string;
    slug: string;
    durum: string;
    created_at: string;
    updated_at: string;
}

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
}

// --- ACTIVE HEADLESS APIs ---

export async function getSiteInfo() {
    return fetchApi("site-info");
}

export async function getBanners() {
    return fetchApi("banners");
}

export async function getBlogs() {
    return fetchApi("blogs");
}

export async function getBlogBySlug(slug: string) {
    return fetchApi(`blogs/${slug}`);
}

export async function getCategories() {
    return fetchApi("categories");
}

export async function sendContactForm(formData: any) {
    return fetchApi("contact-create", {
        method: "POST",
        body: JSON.stringify(formData)
    });
}

export async function postBlogComment(data: any) {
    return fetchApi("blog-comment", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export async function getEducations() {
    return fetchApi("educations");
}

export async function getInterviews() {
    return fetchApi("interviews");
}

export async function getSolutions() {
    return fetchApi("solutions");
}

export async function getSubSolutions(solutionId: number | string) {
    return fetchApi(`sub-solutions?solution_id=${solutionId}`);
}

export async function getSoftwareSolutions(categorySlug?: string) {
    // Tüm ana çözümleri getir
    const solutionsResponse = await getSolutions();
    if (!solutionsResponse || !solutionsResponse.status) return { success: false, data: [] };

    const solutions: Solution[] = solutionsResponse.data;

    if (categorySlug) {
        // Belirli bir kategoriye ait alt çözümleri getir
        const targetSolution = solutions.find(s => s.slug === categorySlug);
        if (!targetSolution) return { success: false, data: [] };

        const subSolutionsResponse = await getSubSolutions(targetSolution.id);
        return {
            success: subSolutionsResponse?.status ?? false,
            data: subSolutionsResponse?.data ?? []
        };
    }

    // Kategori belirtilmemişse, tüm ana çözümlerin alt çözümlerini topla (veya boş dön, ihtiyaca göre)
    // Şimdilik sadece ana çözümleri de dönebiliriz ya da hepsini fetch edebiliriz.
    // Ancak genellikle kategori bazlı istenir.
    return {
        success: true,
        data: solutions
    };
}

export async function getSoftwareSolutionBySlug(slug: string) {
    // Bu API'da slug ile direkt getirme yok gibi görünüyor.
    // Tüm alt çözümleri kontrol etmemiz gerekebilir ya da önce kategoriyi bulup sonra altındakilere bakmalıyız.
    // Pratik olması için tüm çözümleri ve altlarını fetch eden bir yapı kurabiliriz veya
    // sub-solutions API'sinin slug desteği olup olmadığını kontrol etmeliyiz.
    // Örnek datada 'ana_slug' var, bu yardımcı olabilir.

    const solutionsResponse = await getSolutions();
    if (!solutionsResponse || !solutionsResponse.status) return { success: false, data: null };

    for (const solution of solutionsResponse.data) {
        const subsResponse = await getSubSolutions(solution.id);
        if (subsResponse && subsResponse.status) {
            const found = subsResponse.data.find((s: SubSolution) => s.slug === slug || s.slug_en === slug);
            if (found) {
                return {
                    success: true,
                    data: found
                };
            }
        }
    }

    return { success: false, data: null };
}

export async function getPostSupport(slug?: string) {
    return {
        success: true,
        data: {
            title: slug ? slug.toUpperCase() : "Post Process",
            image: "/assets/imgs/page/about/img-1.png",
            description: "<p>CN tezgahlarınız için özel post processor çözümleri sunuyoruz. Fanuc, Siemens, Heidenhain ve daha fazlası için optimize edilmiş kodlar.</p>",
            description_en: "<p>We offer special post processor solutions for your CN benches. Optimized codes for Fanuc, Siemens, Heidenhain and more.</p>",
            price: "5000",
            purchase_link: "/iletisim"
        }
    };
}

export async function getConsultancy(slug?: string) {
    return {
        success: true,
        data: {
            title: "Üretim Danışmanlığı",
            title_en: "Manufacturing Consultancy",
            description: "<p>İşletmenizin verimliliğini artırmak için uçtan uca danışmanlık hizmetleri.</p>",
            description_en: "<p>End-to-end consultancy services to increase the efficiency of your business.</p>",
            udemy_links: [
                {
                    title: "İleri İmalat Teknikleri",
                    title_en: "Advanced Manufacturing Techniques",
                    description: "Udemy eğitimi",
                    description_en: "Udemy training",
                    url: "https://www.udemy.com"
                }
            ],
            packages: [
                {
                    name: "Başlangıç",
                    name_en: "Starter",
                    price: "10.000 TL",
                    period: "Aylık",
                    period_en: "Monthly",
                    features: ["Analiz", "Raporlama"]
                }
            ]
        }
    };
}
