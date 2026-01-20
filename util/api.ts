
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

// --- MOCK DATA (Until Backend APIs are Ready) ---

export async function getInterviews() {
    // Mock data for interviews
    return {
        success: true,
        data: [
            {
                customer_name: "Mehmet Yılmaz",
                company_name: "Yılmaz Makina",
                customer_title: "Genel Müdür",
                testimonial: "Manutech Solutions ile üretim süreçlerimizi %40 hızlandırdık. Profesyonel destekleri için teşekkürler.",
                testimonial_en: "We accelerated our production processes by 40% with Manutech Solutions. Thanks for their professional support.",
                customer_image: null,
                video_url: "https://www.youtube.com"
            },
            {
                customer_name: "Ayşe Kaya",
                company_name: "Kaya Mühendislik",
                customer_title: "Üretim Müdürü",
                testimonial: "SolidCAM post desteği konusunda sağladıkları hızlı çözümler işimizi çok kolaylaştırdı.",
                testimonial_en: "The fast solutions they provided regarding SolidCAM post support made our work much easier.",
                customer_image: null,
                video_url: ""
            },
            {
                customer_name: "Ali Vural",
                company_name: "Vural Savunma",
                customer_title: "Proje Yöneticisi",
                testimonial: "Eğitim hizmetleri ekibimizin yetkinliğini artırmada kilit rol oynadı.",
                testimonial_en: "Training services played a key role in increasing the competence of our team.",
                customer_image: null,
                video_url: ""
            },
            {
                customer_name: "Zeynep Demir",
                company_name: "Demir Otomotiv",
                customer_title: "Ar-Ge Müdürü",
                testimonial: "Danışmanlık hizmetleri sayesinde hata oranlarımızı minimize ettik.",
                testimonial_en: "We minimized our error rates thanks to consultancy services.",
                customer_image: null,
                video_url: ""
            }
        ]
    };
}

export async function getSoftwareSolutions(category?: string) {
    // Mock data for software solutions
    const allSolutions = [
        {
            title: "SolidCAM",
            title_en: "SolidCAM",
            slug: "solidcam",
            category: "cam",
            image: "/assets/imgs/page/about/img-1.png",
            icon: "/assets/imgs/service-1/icon-1.svg",
            short_description: "SolidWorks ile tam entegre CAM çözümü.",
            short_description_en: "Fully integrated CAM solution with SolidWorks.",
            udemy_link: "https://www.udemy.com"
        },
        {
            title: "Siemens NX",
            title_en: "Siemens NX",
            slug: "siemens-nx",
            category: "cad",
            image: "/assets/imgs/page/about/img-2.png",
            icon: "/assets/imgs/service-1/icon-2.svg",
            short_description: "Kapsamlı CAD/CAM/CAE çözümü.",
            short_description_en: "Comprehensive CAD/CAM/CAE solution.",
            udemy_link: "https://www.udemy.com"
        },
        {
            title: "Ansys",
            title_en: "Ansys",
            slug: "ansys",
            category: "aea",
            image: "/assets/imgs/page/about/img-3.png",
            icon: "/assets/imgs/service-1/icon-3.svg",
            short_description: "Mühendislik simülasyon yazılımı.",
            short_description_en: "Engineering simulation software.",
            udemy_link: null
        }
    ];

    const data = category
        ? allSolutions.filter(s => s.category === category)
        : allSolutions;

    return {
        success: true,
        data: data
    };
}

export async function getSoftwareSolutionBySlug(slug: string) {
    const solutions = await getSoftwareSolutions();
    const solution = solutions.data.find((s: any) => s.slug === slug);
    return {
        success: !!solution,
        data: solution ? {
            ...solution,
            description: "<p>Bu yazılım ile üretim süreçlerinizi optimize edebilirsiniz. Detaylı teknik özellikler ve modüller hakkında bilgi almak için bizimle iletişime geçin.</p>",
            description_en: "<p>You can optimize your production processes with this software. Contact us for detailed technical specifications and modules.</p>",
            features: [
                { title: "Yüksek Performans", title_en: "High Performance" },
                { title: "Kolay Kullanım", title_en: "Easy to Use" },
                { title: "Teknik Destek", title_en: "Technical Support" }
            ]
        } : null
    };
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
