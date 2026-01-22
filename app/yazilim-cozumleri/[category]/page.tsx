
"use client"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getSoftwareSolutions } from '@/util/api'
import { useLanguage } from '@/context/LanguageContext'

export default function SoftwareCategoryPage() {
    const params = useParams()
    const category = params.category as string
    const { locale, t } = useLanguage()
    const [solutions, setSolutions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchSolutions() {
            const data = await getSoftwareSolutions(category)
            if (data && data.success) {
                setSolutions(data.data)
            }
            setLoading(false)
        }
        if (category) {
            fetchSolutions()
        }
    }, [category])

    const translations = {
        tr: {
            home: "Anasayfa",
            solutions_title: "Yazılım Çözümleri",
            loading: "Yükleniyor...",
            seeDetails: "Detayları Gör",
            noProgram: "Bu kategoride henüz bir program bulunmamaktadır.",
            suffix: " Çözümleri"
        },
        en: {
            home: "Home",
            solutions_title: "Software Solutions",
            loading: "Loading...",
            seeDetails: "See Details",
            noProgram: "There are no programs in this category yet.",
            suffix: " Solutions"
        }
    }

    const tr = locale === 'en' ? translations.en : translations.tr

    return (
        <Layout>
            <section className="section-page-header py-10 fix position-relative">
                <div className="container position-relative z-1">
                    <div className="text-start">
                        <h3 className="text-capitalize">{category?.replace('-', ' ')}{tr.suffix}</h3>
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
                            <p className="text-primary mb-0 text-capitalize">{category?.replace('-', ' ')}</p>
                        </div>
                    </div>
                </div>
                <img className="position-absolute bottom-0 start-0 end-0 top-0 z-0" src="/assets/imgs/page-header/bg-line.png" alt="bg" />
            </section>

            <section className="section-padding">
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
                                    <div key={index} className="col-lg-4 mb-4">
                                        <div className="p-2 rounded-4 shadow-1 bg-white hover-up h-100">
                                            <div className="card-service bg-white p-6 border rounded-4 d-flex flex-column h-100">
                                                <div className="mb-3">
                                                    <img src={item.resim || "/assets/imgs/service-1/icon-1.svg"} alt={t(item, 'baslik')} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                                                </div>
                                                <h6 className="my-3">{t(item, 'baslik')}</h6>
                                                <p className="mb-6 flex-grow-1">{t(item, 'alt_baslik')}</p>
                                                <Link href={`/yazilim-cozumleri/${category}/${item.slug}`} className="rounded-pill border icon-shape d-inline-flex gap-3 icon-learn-more mt-auto">
                                                    <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width={18} height={10} viewBox="0 0 18 10" fill="none">
                                                        <path className="fill-dark" d="M13.0633 0.0634766L12.2615 0.86529L15.8294 4.43321H0V5.56716H15.8294L12.2615 9.13505L13.0633 9.93686L18 5.00015L13.0633 0.0634766Z" fill="#111827" />
                                                    </svg>
                                                    <span className="fw-bold fs-7 text-900">{tr.seeDetails}</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center">
                                    <p>{tr.noProgram}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    )
}
