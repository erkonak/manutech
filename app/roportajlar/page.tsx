
"use client"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { getInterviews } from '@/util/api'
import { useLanguage } from '@/context/LanguageContext'

export default function InterviewsPage() {
    const { locale, t } = useLanguage()
    const [interviews, setInterviews] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchInterviews() {
            const data = await getInterviews()
            if (data && data.success) {
                setInterviews(data.data)
            }
            setLoading(false)
        }
        fetchInterviews()
    }, [])

    const translations = {
        tr: {
            home: "Anasayfa",
            title: "Müşteri Röportajları",
            breadcrumb: "Röportajlar",
            loading: "Yükleniyor...",
            watchVideo: "Videoyu İzle",
            noInterview: "Henüz röportaj bulunmamaktadır.",
            satisfiedCustomer: "Mutlu Müşteriler",
            satisfiedCustomerSub: "Birlikte çalıştığımız değerli partnerlerimizin deneyimlerini dinleyin."
        },
        en: {
            home: "Home",
            title: "Customer Interviews",
            breadcrumb: "Interviews",
            loading: "Loading...",
            watchVideo: "Watch Video",
            noInterview: "There are no interviews yet.",
            satisfiedCustomer: "Happy Customers",
            satisfiedCustomerSub: "Listen to the experiences of our valuable partners we work with."
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
                        <h3 className="ds-4">{tr.satisfiedCustomer}</h3>
                        <p className="fs-5 text-600">{tr.satisfiedCustomerSub}</p>
                    </div>

                    {loading ? (
                        <div className="text-center py-10">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">{tr.loading}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="row">
                            {interviews.length > 0 ? (
                                interviews.map((item, index) => (
                                    <div key={index} className="col-lg-6 mb-6">
                                        <div className="card-testimonial p-6 bg-neutral-100 rounded-4 border border-white shadow-1 h-100 d-flex flex-column position-relative">
                                            <div className="d-flex align-items-center mb-5">
                                                <img className="rounded-circle border border-2 border-white shadow-sm" src={item.customer_image || "/assets/imgs/testimonial-1/avatar-1.png"} alt={item.customer_name} width="70" height="70" style={{ objectFit: 'cover' }} />
                                                <div className="ms-4">
                                                    <h5 className="mb-1">{item.customer_name}</h5>
                                                    <p className="mb-0 fs-7 text-600">{t(item, 'customer_title')}</p>
                                                    <p className="mb-0 fs-8 text-primary fw-bold text-uppercase">{t(item, 'company_name')}</p>
                                                </div>
                                            </div>
                                            <p className="flex-grow-1 fs-5 text-900 italic mb-6">"{t(item, 'testimonial')}"</p>

                                            {item.video_url && (
                                                <div className="mt-auto">
                                                    <a href={item.video_url} target="_blank" className="btn btn-sm btn-outline-dark rounded-pill">
                                                        <i className="bi bi-play-circle-fill me-2"></i>
                                                        {tr.watchVideo}
                                                    </a>
                                                </div>
                                            )}

                                            <div className="position-absolute top-0 end-0 p-5 opacity-10">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H12.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V12C6.017 12.5523 5.56928 13 5.017 13H3.017V21H5.017Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center text-600">
                                    <p>{tr.noInterview}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    )
}
