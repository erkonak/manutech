
"use client"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useParams } from 'next/navigation'
import { getSoftwareSolutions } from '@/util/api'
import { useLanguage } from '@/context/LanguageContext'
import { useApi } from '@/hooks/useApi'
import { useEffect } from "react"
import { useSiteInfo } from "@/context/SiteInfoContext"

export default function SoftwareCategoryPage() {
    const params = useParams()
    const category = params.category as string
    const { locale, t } = useLanguage()

    // useApi hook kullanımı
    const { data: response, loading } = useApi(() => getSoftwareSolutions(category), { deps: [category] });
    const solutions = response?.success && response?.data ? response.data : [];
    const categoryInfo = response?.success && response?.category ? response.category : null;
    const { siteInfo } = useSiteInfo()

    useEffect(() => {
        if (categoryInfo) {
            document.title = `${t(categoryInfo, 'baslik')} - ${siteInfo?.firma_adi || 'Manutech Solutions'}`
        }
    }, [categoryInfo, locale, siteInfo])

    const translations = {
        tr: {
            home: "Anasayfa",
            solutions_title: "Yazılım Çözümleri",
            loading: "Yükleniyor...",
            seeDetails: "Detayları Gör",
            noProgram: "Bu kategoride henüz bir program bulunmamaktadır."
        },
        en: {
            home: "Home",
            solutions_title: "Software Solutions",
            loading: "Loading...",
            seeDetails: "See Details",
            noProgram: "There are no programs in this category yet."
        }
    }

    const tr = locale === 'en' ? translations.en : translations.tr

    return (
        <Layout>
            <section className="section-page-header py-10 fix position-relative">
                <div className="container position-relative z-1">
                    <div className="text-start">
                        <h3 className="text-capitalize">{categoryInfo ? t(categoryInfo, 'baslik') : category?.replace('-', ' ')}</h3>
                        <div className="d-flex">
                            <Link href="/">
                                <p className="mb-0 text-900">{tr.home}</p>
                            </Link>
                            <svg className="mx-3 mt-1" xmlns="http://www.w3.org/2000/svg" width={8} height={13} viewBox="0 0 8 13" fill="none">
                                <path className="stroke-dark" d="M1 1.5L6.5 6.75L1 12" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <Link href="#">
                                <p className="mb-0 text-900 text-capitalize">{tr.solutions_title}</p>
                            </Link>
                            <svg className="mx-3 mt-1" xmlns="http://www.w3.org/2000/svg" width={8} height={13} viewBox="0 0 8 13" fill="none">
                                <path className="stroke-dark" d="M1 1.5L6.5 6.75L1 12" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-primary mb-0 text-capitalize">{categoryInfo ? t(categoryInfo, 'baslik') : category?.replace('-', ' ')}</p>
                        </div>
                    </div>
                </div>
                <img className="position-absolute bottom-0 start-0 end-0 top-0 z-0" src="/assets/imgs/page-header/bg-line.png" alt="bg" />
            </section>

            <section className="section-padding" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="container">
                    {loading ? (
                        <div className="text-center py-10">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">{tr.loading}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="row mt-6">
                            {solutions.length > 0 ? (
                                solutions.map((item, index) => (
                                    <div key={index} className="col-lg-4 col-md-6 mb-4">
                                        <div className="card border-0 rounded-4 shadow-1 hover-up h-100">
                                            <div className="card-body p-5 d-flex flex-column">
                                                <div className="mb-4">
                                                    <div className="d-inline-flex align-items-center justify-content-center bg-primary-soft rounded-4 p-3">
                                                        <img src={item.resim || "/assets/imgs/service-1/icon-1.svg"} alt={t(item, 'baslik')} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                                                    </div>
                                                </div>
                                                <h5 className="mb-3 text-900 fw-bold">{t(item, 'baslik')}</h5>
                                                <p className="text-600 mb-5 flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                    {t(item, 'alt_baslik')}
                                                </p>
                                                <Link href={`/yazilim-cozumleri/${category}/${t(item, 'slug')}`} className="btn btn-link text-primary p-0 d-inline-flex align-items-center fw-bold text-decoration-none mt-auto">
                                                    {tr.seeDetails}
                                                    <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width={18} height={10} viewBox="0 0 18 10" fill="none">
                                                        <path d="M13.0633 0.0634766L12.2615 0.86529L15.8294 4.43321H0V5.56716H15.8294L12.2615 9.13505L13.0633 9.93686L18 5.00015L13.0633 0.0634766Z" fill="currentColor" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center py-20">
                                    <div className="bg-neutral-100 p-10 rounded-4 border">
                                        <i className="bi bi-info-circle text-primary fs-1 mb-4 d-block"></i>
                                        <h4 className="text-900 mb-0">{tr.noProgram}</h4>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    )
}
