
"use client"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { getBlogs } from '@/util/api'
import { useLanguage } from '@/context/LanguageContext'

// API'den gelen veri yapısı
interface Blog {
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
    k: {
        id: number;
        kategori: string;
    };
    ky: {
        id: number;
        ad_soyad: string;
    };
}

export default function BlogListingPage() {
    const { locale, t } = useLanguage()
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchBlogs() {
            setLoading(true);
            try {
                const response = await getBlogs()
                console.log("Blog API Response:", response); // Debugging

                if (response && response.status === true) {
                    if (response.data && Array.isArray(response.data.data)) {
                        setBlogs(response.data.data);
                    } else if (Array.isArray(response.data)) {
                         setBlogs(response.data);
                    }
                }
            } catch (error) {
                console.error("Blog yüklenirken hata:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [])

    // Blog için doğru slug'ı getir
    const getSlug = (blogItem: any) => {
       if (locale === 'en' && blogItem.slug_en) return blogItem.slug_en;
       if (locale === 'ar' && blogItem.slug_ar) return blogItem.slug_ar;
       return blogItem.slug;
    }

    const translations = {
        tr: {
            title: "Blog",
            breadcrumb: "Anasayfa",
            latest: "En Son Yazılarımız",
            subtitle: "Sektördeki yenilikleri ve teknik ipuçlarını keşfedin.",
            loading: "Yükleniyor...",
            readMore: "Devamını Oku",
            noBlogs: "Henüz bir blog yazısı bulunmamaktadır."
        },
        en: {
            title: "Blog",
            breadcrumb: "Home",
            latest: "Our Latest Articles",
            subtitle: "Explore the insights and trends shaping our industry.",
            loading: "Loading...",
            readMore: "Read More",
            noBlogs: "There are no blog posts yet."
        }
    }

    const tr = locale === 'en' ? translations.en : translations.tr

    return (
        <Layout>
            <section className="section-page-header py-10 fix position-relative">
                <div className="container position-relative z-1">
                    <div className="text-start">
                        <h3>{tr.title}</h3>
                        <div className="d-flex">
                            <Link href="/">
                                <p className="mb-0 text-900">{tr.breadcrumb}</p>
                            </Link>
                            <svg className="mx-3 mt-1" xmlns="http://www.w3.org/2000/svg" width={8} height={13} viewBox="0 0 8 13" fill="none">
                                <path className="stroke-dark" d="M1 1.5L6.5 6.75L1 12" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-primary mb-0">{tr.title}</p>
                        </div>
                    </div>
                </div>
                <img className="position-absolute bottom-0 start-0 end-0 top-0 z-0" src="/assets/imgs/page-header/bg-line.png" alt="bg" />
            </section>

            <section className="section-blog-6 section-padding border-bottom">
                <div className="container">
                    <div className="row align-items-end mb-8">
                        <div className="col">
                            <h5 className="ds-5 mt-3 mb-3">{tr.latest}</h5>
                            <span className="fs-5 fw-medium text-600">{tr.subtitle}</span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-10">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">{tr.loading}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="row">
                            {blogs.length > 0 ? (
                                blogs.map((blog, index) => {
                                    const localizedSlug = getSlug(blog);

                                    return (
                                        <div key={index} className="col-lg-4 col-md-6 text-start mb-6">
                                            <div className="card border-0 rounded-4 shadow-1 h-100 position-relative hover-up overflow-hidden">
                                                <div className="position-relative" style={{ height: '250px', overflow: 'hidden' }}>
                                                    <img
                                                        className="card-img-top w-100 h-100"
                                                        src={blog.kapak || `/assets/imgs/blog/img-${(index % 3) + 1}.png`}
                                                        alt={t(blog, 'baslik')}
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                </div>
                                                <div className="card-body bg-white p-5 d-flex flex-column">
                                                    <div className="d-flex align-items-center mb-3">
                                                        <span className="badge bg-primary-soft text-primary px-3 py-2 rounded-pill fs-8 fw-bold text-uppercase">
                                                            {blog.k?.kategori || 'News'}
                                                        </span>
                                                        <span className="ms-auto fs-8 text-600">{blog.tarih}</span>
                                                    </div>
                                                    <h5 className="my-3">{t(blog, 'baslik')}</h5>
                                                    <div
                                                        className="flex-grow-1 text-600 fs-7 mb-3"
                                                        dangerouslySetInnerHTML={{
                                                            __html: t(blog, 'aciklama')?.substring(0, 100).replace(/<[^>]*>?/gm, '') + '...'
                                                        }}
                                                    />
                                                    <Link href={`/blog/${localizedSlug}`} className="btn btn-sm btn-link text-primary p-0 mt-auto fw-bold text-decoration-none">
                                                        {tr.readMore}
                                                        <i className="bi bi-arrow-right ms-2"></i>
                                                    </Link>
                                                </div>
                                                <Link href={`/blog/${localizedSlug}`} className="position-absolute top-0 start-0 w-100 h-100 z-0" />
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="col-12 text-center">
                                    <p>{tr.noBlogs}</p>
                                    {/* Debug output to see what's happening if empty */}
                                    <p className="d-none">Data length: {blogs.length}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    )
}
