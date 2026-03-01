
"use client"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getPostSupports } from '@/util/api'
import { useLanguage } from '@/context/LanguageContext'
import { useApi } from '@/hooks/useApi'
import { useEffect } from "react"
import { useSiteInfo } from "@/context/SiteInfoContext"

export default function PostSupportPage() {
    const { locale, t } = useLanguage()
    const { siteInfo } = useSiteInfo()

    const { data: response, loading } = useApi(getPostSupports, { cacheKey: 'post_supports' });

    const supports = response?.status && response?.data
        ? response.data.filter((item) => item.durum === true)
        : [];

    const translations = {
        tr: {
            home: "Anasayfa",
            title: "Post Desteği",
            breadcrumb: "Post Desteği",
            subtitle: "CNC tezgahlarınız için hassas ve güvenilir post işlemci çözümleri.",
            loading: "Yükleniyor...",
            viewDetails: "Detayları İncele",
            noData: "Henüz bu kategoride içerik bulunmamaktadır."
        },
        en: {
            home: "Home",
            title: "Post Support",
            breadcrumb: "Post Support",
            subtitle: "Precise and reliable post processor solutions for your CNC machines.",
            loading: "Loading...",
            viewDetails: "View Details",
            noData: "No content available in this category yet."
        }
    }

    const tr = locale === 'en' ? translations.en : translations.tr

    useEffect(() => {
        document.title = `${tr.title} - ${siteInfo?.firma_adi || 'Manutech Solutions'}`
    }, [locale, siteInfo, tr.title])

    return (
        <Layout>
            <section className="section-page-header py-6 fix position-relative">
                <div className="container position-relative z-1">
                    <div className="text-start">
                        <h3>{tr.title}</h3>
                        <div className="d-flex">
                            <Link href="/">
                                <p className="mb-0 text-900">{tr.home}</p>
                            </Link>
                            <svg className="mx-3 mt-1" xmlns="http://www.w3.org/2000/svg" width={8} height={13} viewBox="0 0 8 13" fill="none">
                                <path className="stroke-dark" d="M1 1.5L6.5 6.75L1 12" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-primary mb-0">{tr.breadcrumb}</p>
                        </div>
                    </div>
                </div>
                <img className="position-absolute bottom-0 start-0 end-0 top-0 z-0" src="/assets/imgs/page-header/bg-line.png" alt="bg" />
            </section>

            <section className="section">
                <div className="container">
                    <div className="text-center mb-8">
                        <h3 className="ds-4">{tr.title}</h3>
                        <p className="fs-5 text-600">{tr.subtitle}</p>
                    </div>

                    {loading ? (
                        <div className="text-center py-10">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">{tr.loading}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="row">
                            {supports.length > 0 ? (
                                supports.map((item, index) => (
                                    <div key={index} className="col-lg-4 col-md-6 mb-4">
                                        <div className="p-2 rounded-4 shadow-1 bg-white hover-up d-flex flex-column h-100">
                                            <div className="position-relative">
                                                <img className="rounded-4 img-fluid w-100" src={item.foto || "/assets/imgs/services/img-3.png"} alt={locale === 'tr' ? item.baslik_tr : (item.baslik_en || item.baslik_tr)} style={{ height: '200px', objectFit: 'cover' }} />
                                            </div>
                                            <div className="p-4 flex-grow-1 d-flex flex-column text-center">
                                                <h5 className="mb-3">{locale === 'tr' ? item.baslik_tr : (item.baslik_en || item.baslik_tr)}</h5>
                                                <p className="text-600 fs-7 mb-4 flex-grow-1">{locale === 'tr' ? item.aciklama_tr : (item.aciklama_en || item.aciklama_tr)}</p>
                                                <Link href={`/post-destegi/${locale === 'tr' ? item.slug_tr : (item.slug_en || item.slug_tr)}`} className="btn btn-gradient w-100 py-2 rounded-pill">
                                                    {tr.viewDetails}
                                                    <i className="bi bi-arrow-right ms-2"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center">
                                    <p>{tr.noData}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    )
}
