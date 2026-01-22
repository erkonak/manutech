
"use client"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getSoftwareSolutionBySlug } from '@/util/api'
import { useLanguage } from '@/context/LanguageContext'

export default function SoftwareDetailsPage() {
    const params = useParams()
    const slug = params.slug as string
    const category = params.category as string
    const { locale, t } = useLanguage()
    const [solution, setSolution] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchDetail() {
            const data = await getSoftwareSolutionBySlug(slug)
            if (data && data.success) {
                setSolution(data.data)
            }
            setLoading(false)
        }
        if (slug) {
            fetchDetail()
        }
    }, [slug])

    const translations = {
        tr: {
            home: "Anasayfa",
            loading: "Yükleniyor...",
            notFound: "Program bulunamadı.",
            backToList: "Tüm Çözümlere Dön",
            techDetails: "Teknik Detaylar",
            features: "Özellikler",
            getInformation: "Bu Çözüm İçin Bilgi Alın",
            getInformationSub: "Program hakkında detaylı bilgi ve teklif almak için bizimle iletişime geçin.",
            request: "Talep Et",
            supplierSub: "Manutech Solutions olarak sizi en doğru tedarikçilerle buluşturuyoruz.",
            supplierTitle: "Tedarikçi ile Bağlantı Kurun"
        },
        en: {
            home: "Home",
            loading: "Loading...",
            notFound: "Program not found.",
            backToList: "Back to All Solutions",
            techDetails: "Technical Details",
            features: "Features",
            getInformation: "Get Information For This Solution",
            getInformationSub: "Contact us to get detailed information and quotes about the program.",
            request: "Request Information",
            supplierSub: "As Manutech Solutions, we connect you with the right suppliers.",
            supplierTitle: "Connect with the Supplier"
        }
    }

    const tr = locale === 'en' ? translations.en : translations.tr

    if (loading) {
        return (
            <Layout>
                <div className="text-center py-20">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">{tr.loading}</span>
                    </div>
                </div>
            </Layout>
        )
    }

    if (!solution) {
        return (
            <Layout>
                <div className="text-center py-20">
                    <h3>{tr.notFound}</h3>
                    <Link href="/yazilim-cozumleri" className="btn btn-primary mt-4">{tr.backToList}</Link>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <section className="section-page-header py-10 fix position-relative">
                <div className="container position-relative z-1">
                    <div className="text-start">
                        <h3>{t(solution, 'baslik')}</h3>
                        <div className="d-flex">
                            <Link href="/">
                                <p className="mb-0 text-900">{tr.home}</p>
                            </Link>
                            <svg className="mx-3 mt-1" xmlns="http://www.w3.org/2000/svg" width={8} height={13} viewBox="0 0 8 13" fill="none">
                                <path className="stroke-dark" d="M1 1.5L6.5 6.75L1 12" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <Link href={`/yazilim-cozumleri/${category}`}>
                                <p className="mb-0 text-900 text-capitalize">{category?.replace('-', ' ')}</p>
                            </Link>
                            <svg className="mx-3 mt-1" xmlns="http://www.w3.org/2000/svg" width={8} height={13} viewBox="0 0 8 13" fill="none">
                                <path className="stroke-dark" d="M1 1.5L6.5 6.75L1 12" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-primary mb-0">{t(solution, 'baslik')}</p>
                        </div>
                    </div>
                </div>
                <img className="position-absolute bottom-0 start-0 end-0 top-0 z-0" src="/assets/imgs/page-header/bg-line.png" alt="bg" />
            </section>

            <section className="section-services-details pt-80 pb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <img className="rounded-3 img-fluid mb-5 w-100" src={solution.resim || "/assets/imgs/services-details/img-1.png"} alt={t(solution, 'baslik')} style={{ maxHeight: '450px', objectFit: 'contain' }} />
                            <div className="content">
                                <h4>{t(solution, 'alt_baslik')}</h4>
                                <div className="mt-4" dangerouslySetInnerHTML={{ __html: t(solution, 'icerik') }} />

                                {solution.features && Array.isArray(solution.features) && solution.features.length > 0 && (
                                    <div className="mt-5">
                                        <h5>{tr.features}</h5>
                                        <ul className="list-unstyled phase-items">
                                            {solution.features.map((feature: any, idx: number) => (
                                                <li key={idx} className="d-flex align-items-center mt-3">
                                                    <img src="/assets/imgs/services-details/check.svg" alt="check" />
                                                    <span className="ms-2 text-900 fw-medium fs-6">{typeof feature === 'string' ? feature : t(feature, 'title')}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="sidebar ms-lg-4 mt-lg-0 mt-8">
                                <div className="bg-primary rounded-4 position-relative overflow-hidden shadow-sm">
                                    <div className="p-7 position-relative z-1 text-white">
                                        <h4 className="text-white">
                                            {tr.getInformation}
                                        </h4>
                                        <p className="text-white opacity-75 mt-3">
                                            {tr.getInformationSub}
                                        </p>
                                        <Link href="/iletisim" className="fw-bold btn text-start bg-white fs-6 d-flex align-items-center justify-content-between text-primary hover-up w-100 mt-5">
                                            <span>{tr.request}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                <path d="M17.4177 5.41772L16.3487 6.48681L21.1059 11.244H0V12.756H21.1059L16.3487 17.5132L17.4177 18.5822L24 12L17.4177 5.41772Z" fill="#6D4DF2" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <img className="position-absolute top-0 end-0 opacity-25" src="/assets/imgs/services-details/bg-line-3.png" alt="bg" />
                                </div>

                                <div className="bg-neutral-100 p-5 mt-5 rounded-4 border">
                                    <h6 className="mb-4 text-center">{tr.supplierTitle}</h6>
                                    <p className="fs-7 text-center">{tr.supplierSub}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
