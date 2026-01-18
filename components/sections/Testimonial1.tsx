
"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getInterviews } from '@/util/api'
import { useLanguage } from '@/context/LanguageContext'

export default function Testimonial1() {
    const { locale, t } = useLanguage()
    const [interviews, setInterviews] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchInterviews() {
            const data = await getInterviews()
            if (data && data.success) {
                setInterviews(data.data.slice(0, 4)) // Take first 4 interviews
            }
            setLoading(false)
        }
        fetchInterviews()
    }, [])

    const translations = {
        tr: {
            title: "Müşteri Yorumları",
            tag: "Röportajlar",
            subtitle: "Değerli müşterilerimizin deneyimlerini ve başarı hikayelerini dinleyin.",
            contact: "İletişime Geç",
            seeAll: "Tümünü Gör"
        },
        en: {
            title: "Client Testimonials",
            tag: "Interviews",
            subtitle: "Listen to the experiences and success stories of our valued customers.",
            contact: "Contact Us",
            seeAll: "See All"
        }
    }

    const tr = locale === 'en' ? translations.en : translations.tr

    // Helper to distribute interviews into columns
    // We have 2 columns for reviews (col-lg-4 x 2) and 1 column for text (col-lg-4)
    // Actually the layout is: Col 1 (Text), Col 2 (Reviews), Col 3 (Reviews)

    const col2Reviews = interviews.slice(0, 2)
    const col3Reviews = interviews.slice(2, 4)

    return (
        <>
            <section className="section-testimonial-1 pb-120 position-relative">
                <div className="container position-relative z-1">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="pe-8 mt-10">
                                <div className="d-flex align-items-center justify-content-center bg-primary-soft border border-2 border-white d-inline-flex rounded-pill px-4 py-2" data-aos="zoom-in" data-aos-delay={100}>
                                    <img src="/assets/imgs/features-1/dots.png" alt="infinia" />
                                    <span className="tag-spacing fs-7 fw-bold text-linear-2 ms-2 text-uppercase">{tr.tag}</span>
                                </div>
                                <h3 className="ds-3 mt-3 mb-3" data-aos="fade-zoom-in" data-aos-delay={100}>{tr.title}</h3>
                                <span className="fs-5 fw-medium" data-aos="fade-zoom-in" data-aos-delay={300}>{tr.subtitle}</span>
                                <div className="d-flex flex-wrap align-items-center mt-8">
                                    <Link href="/iletisim" className="btn btn-outline-secondary hover-up" data-aos="fade-zoom-in" data-aos-delay={100}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                            <path className="stroke-dark" d="M8.89286 4.75H6.06818C5.34017 4.75 4.75 5.34017 4.75 6.06818C4.75 13.3483 10.6517 19.25 17.9318 19.25C18.6598 19.25 19.25 18.6598 19.25 17.9318V15.1071L16.1429 13.0357L14.5317 14.6468C14.2519 14.9267 13.8337 15.0137 13.4821 14.8321C12.8858 14.524 11.9181 13.9452 10.9643 13.0357C9.98768 12.1045 9.41548 11.1011 9.12829 10.494C8.96734 10.1537 9.06052 9.76091 9.32669 9.49474L10.9643 7.85714L8.89286 4.75Z" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {tr.contact}
                                    </Link>
                                    <Link href="/roportajlar" className="ms-5 ms-md-5 mt-5 mt-md-0 fw-bold" data-aos="fade-zoom-in" data-aos-delay={300}>{tr.seeAll}
                                        <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width={24} height={14} viewBox="0 0 24 14" fill="none">
                                            <path d="M17.4177 0.417969L16.3487 1.48705L21.1059 6.24429H0V7.75621H21.1059L16.3487 12.5134L17.4177 13.5825L24 7.0002L17.4177 0.417969Z" fill="black" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            {col2Reviews.map((item, index) => (
                                <div key={index} className={`bg-neutral-100 p-5 ${index > 0 ? 'mt-5' : 'mt-8'} rounded-3 position-relative card-hover`} data-aos="fade-zoom-in" data-aos-delay={100 * (index + 1)}>
                                    <p className="text-900">"{t(item, 'testimonial')}"</p>
                                    <div className="d-flex align-items-center mt-5">
                                        <img className="avatar-lg rounded-circle" src={item.customer_image || "/assets/imgs/testimonial-1/avatar-1.png"} alt={item.customer_name} style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
                                        <div className="d-flex flex-column">
                                            <h6 className="ms-3 fs-6 mb-0">{item.customer_name}</h6>
                                            <div className="flag ms-3">
                                                <span className="fs-8">{t(item, 'company_name')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="/roportajlar" className="position-absolute top-0 start-0 end-0 bottom-0" />
                                </div>
                            ))}
                        </div>
                        <div className="col-lg-4">
                            {col3Reviews.map((item, index) => (
                                <div key={index} className={`bg-neutral-100 p-5 ${index > 0 ? 'mt-5' : 'mt-5 mt-lg-0'} rounded-3 position-relative card-hover`} data-aos="fade-zoom-in" data-aos-delay={300 + (100 * index)}>
                                    <p className="text-900">"{t(item, 'testimonial')}"</p>
                                    <div className="d-flex align-items-center mt-5">
                                        <img className="avatar-lg rounded-circle" src={item.customer_image || "/assets/imgs/testimonial-1/avatar-3.png"} alt={item.customer_name} style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
                                        <div className="d-flex flex-column">
                                            <h6 className="ms-3 fs-6 mb-0">{item.customer_name}</h6>
                                            <div className="flag ms-3">
                                                <span className="fs-8">{t(item, 'company_name')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="/roportajlar" className="position-absolute top-0 start-0 end-0 bottom-0" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="position-absolute top-0 start-0 z-0">
                    <img src="/assets/imgs/testimonial-1/bg-line.png" alt="infinia" />
                </div>
            </section>
        </>
    )
}
