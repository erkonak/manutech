
"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getBlogs } from '@/util/api'
import { useLanguage } from '@/context/LanguageContext'

export default function Blog1() {
    const { locale, t } = useLanguage()
    const [blogs, setBlogs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await getBlogs()
                // Check if response has status: true and data object with pagination
                if (response && response.status && response.data && Array.isArray(response.data.data)) {
                    // Take first 3 blogs from the data array inside pagination object
                    // API returns: { status: true, data: { current_page: 1, data: [ ... ], ... } }
                    setBlogs(response.data.data.slice(0, 3))
                } else if (response && response.data && Array.isArray(response.data)) {
                    // Fallback for direct array response
                    setBlogs(response.data.slice(0, 3))
                }
            } catch (error) {
                console.error("Blog yüklenirken hata:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [])

    // Blog için doğru slug'ı getir - Ana sayfada da lokalizasyon önemli
    const getSlug = (blogItem: any) => {
       if (locale === 'en' && blogItem.slug_en) return blogItem.slug_en;
       if (locale === 'ar' && blogItem.slug_ar) return blogItem.slug_ar;
       return blogItem.slug;
    }

    const translations = {
        tr: {
            title: "Son Yazılarımız",
            tag: "Blog",
            subtitle: "Sektördeki yenilikleri ve teknik ipuçlarını keşfedin.",
            seeAll: "Tüm Yazıları Gör",
            readMore: "Devamını Oku"
        },
        en: {
            title: "Our Latest Articles",
            tag: "Blog",
            subtitle: "Explore the insights and trends shaping our industry.",
            seeAll: "See All Articles",
            readMore: "Read More"
        }
    }

    const tr = locale === 'en' ? translations.en : translations.tr

    if (loading) return null // Don't show anything while loading on home page to avoid CLS or generic loaders

    return (
        <>
            <section className="section-blog-1 section-padding">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-12 col-md-6 me-auto">
                            <div className="d-flex align-items-center justify-content-center bg-primary-soft border border-2 border-white d-inline-flex rounded-pill px-4 py-2" data-aos="zoom-in" data-aos-delay={100}>
                                <img src="/assets/imgs/features-1/dots.png" alt="infinia" />
                                <span className="tag-spacing fs-7 fw-bold text-linear-2 ms-2 text-uppercase">{tr.tag}</span>
                            </div>
                            <h3 className="ds-3 mt-3 mb-3" data-aos="fade-zoom-in" data-aos-delay={100}>{tr.title}</h3>
                            <span className="fs-5 fw-medium" data-aos="fade-zoom-in" data-aos-delay={200}>{tr.subtitle}</span>
                        </div>
                        <div className="col-12 col-md-6 mt-3 mt-md-0">
                            <Link href="/blog" className="ms-md-5 fw-bold text-primary">{tr.seeAll}
                                <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width={24} height={14} viewBox="0 0 24 14" fill="none">
                                    <path className="fill-dark" d="M17.4177 0.417969L16.3487 1.48705L21.1059 6.24429H0V7.75621H21.1059L16.3487 12.5134L17.4177 13.5825L24 7.0002L17.4177 0.417969Z" fill="black" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        {blogs.length > 0 && blogs.map((blog, index) => {
                            const localizedSlug = getSlug(blog);
                            return (
                                <div key={index} className="col-lg-4 text-start">
                                    <div className="card border-0 rounded-3 mt-8 position-relative d-inline-flex h-100" data-aos="fade-zoom-in" data-aos-delay={100 * (index + 1)}>
                                         <div className="position-relative" style={{ height: '240px', overflow: 'hidden' }}>
                                            <img
                                                className="rounded-3 w-100 h-100"
                                                src={blog.kapak || `/assets/imgs/blog-1/card-img-${(index % 3) + 1}.png`}
                                                alt={t(blog, 'baslik')}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="card-body p-0 bg-white d-flex flex-column">
                                            <div className="bg-primary-soft position-relative z-1 d-inline-flex rounded-pill px-3 py-2 mt-3 align-self-start">
                                                <span className="tag-spacing fs-7 fw-bold text-linear-2 text-uppercase">{blog.k?.kategori || blog.kategori || 'Blog'}</span>
                                            </div>
                                            <h6 className="my-3">{t(blog, 'baslik')}</h6>
                                            <p className="flex-grow-1"dangerouslySetInnerHTML={{
                                                __html: t(blog, 'aciklama')?.substring(0, 100).replace(/<[^>]*>?/gm, '') + '...'
                                            }} />
                                        </div>
                                        <Link href={`/blog/${localizedSlug}`} className="position-absolute bottom-0 start-0 end-0 top-0 z-0" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}
