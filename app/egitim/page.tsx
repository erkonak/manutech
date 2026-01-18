
"use client"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { getSoftwareSolutions } from '@/util/api'
import { useLanguage } from '@/context/LanguageContext'

export default function TrainingPage() {
    const { locale, t } = useLanguage()
    const [solutions, setSolutions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchSolutions() {
            const data = await getSoftwareSolutions()
            if (data && data.success) {
                // Filter items that have a udemy_link
                setSolutions(data.data.filter((item: any) => item.udemy_link))
            }
            setLoading(false)
        }
        fetchSolutions()
    }, [])

    const translations = {
        tr: {
            home: "Anasayfa",
            title: "Eğitimlerimiz",
            breadcrumb: "Eğitim",
            udemyTitle: "Udemy Eğitimlerimiz",
            udemySubtitle: "Yazılım çözümlerimiz için hazırladığımız kapsamlı eğitim setlerine Udemy üzerinden ulaşabilirsiniz.",
            loading: "Yükleniyor...",
            trainingSuffix: " Eğitimi",
            learnProfessional: "Bu yazılımı profesyonel düzeyde öğrenmek için hazırladığımız özel eğitim seti.",
            goToTraining: "Eğitime Git",
            noTraining: "Henüz eğitim linki eklenmiş bir program bulunmamaktadır."
        },
        en: {
            home: "Home",
            title: "Our Trainings",
            breadcrumb: "Training",
            udemyTitle: "Our Udemy Courses",
            udemySubtitle: "You can access our comprehensive training sets prepared for our software solutions via Udemy.",
            loading: "Loading...",
            trainingSuffix: " Training",
            learnProfessional: "Speaks for our special training set prepared to learn this software at a professional level.",
            goToTraining: "Go to Training",
            noTraining: "There are no programs with training links yet."
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

            <section className="section-padding">
                <div className="container">
                    <div className="text-center mb-8">
                        <h3 className="ds-4">{tr.udemyTitle}</h3>
                        <p className="fs-5 text-600">{tr.udemySubtitle}</p>
                    </div>

                    {loading ? (
                        <div className="text-center py-10">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">{tr.loading}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="row">
                            {solutions.length > 0 ? (
                                solutions.map((item, index) => (
                                    <div key={index} className="col-lg-4 col-md-6 mb-4">
                                        <div className="p-2 rounded-4 shadow-1 bg-white hover-up d-flex flex-column h-100">
                                            <div className="position-relative">
                                                <img className="rounded-4 img-fluid w-100" src={item.image || "/assets/imgs/blog/img-1.png"} alt={t(item, 'title')} style={{ height: '200px', objectFit: 'cover' }} />
                                                <div className="position-absolute top-0 end-0 m-3">
                                                    <span className="badge bg-primary px-3 py-2 rounded-pill">Udemy</span>
                                                </div>
                                            </div>
                                            <div className="p-4 flex-grow-1 d-flex flex-column">
                                                <h5 className="mb-3">{t(item, 'title')}{tr.trainingSuffix}</h5>
                                                <p className="text-600 fs-7 mb-4 flex-grow-1">{tr.learnProfessional}</p>
                                                <Link href={item.udemy_link} target="_blank" className="btn btn-gradient w-100 rounded-pill">
                                                    {tr.goToTraining}
                                                    <i className="bi bi-box-arrow-up-right ms-2"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center">
                                    <p>{tr.noTraining}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    )
}
