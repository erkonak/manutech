
"use client"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getConsultancy } from '@/util/api'
import { useLanguage } from '@/context/LanguageContext'

export default function ConsultancyDetailsPage() {
    const params = useParams()
    const slug = params.slug as string
    const { locale, t } = useLanguage()
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const response = await getConsultancy(slug)
            if (response && response.success) {
                setData(response.data)
            }
            setLoading(false)
        }
        if (slug) {
            fetchData()
        }
    }, [slug])

    const translations = {
        tr: {
            home: "Anasayfa",
            suffix: " Hizmetleri",
            breadcrumb: "Danışmanlık",
            relatedTrainings: "İlgili Eğitimler",
            viewOnUdemy: "Udemy'de Görüntüle",
            packages: "Danışmanlık Paketleri",
            per: "Paket",
            getInformation: "Bilgi Al",
            specialSolutions: "Size özel çözümlerimiz için bizimle iletişime geçin.",
            contactUs: "Bize Ulaşın",
            loading: "Yükleniyor...",
            notFound: "Danışmanlık hizmeti bulunamadı."
        },
        en: {
            home: "Home",
            suffix: " Services",
            breadcrumb: "Consultancy",
            relatedTrainings: "Related Trainings",
            viewOnUdemy: "View on Udemy",
            packages: "Consultancy Packages",
            per: "Package",
            getInformation: "Get Info",
            specialSolutions: "Contact us for your customized solutions.",
            contactUs: "Contact Us",
            loading: "Loading...",
            notFound: "Consultancy service not found."
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

    if (!data) {
        return (
            <Layout>
                <div className="text-center py-20">
                    <h3>{tr.notFound}</h3>
                    <Link href="/" className="btn btn-primary mt-4">{tr.home}'a Dön</Link>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <section className="section-page-header py-10 fix position-relative">
                <div className="container position-relative z-1">
                    <div className="text-start">
                        <h3 className="text-capitalize">{slug?.replace('-', ' ')}{tr.suffix}</h3>
                        <div className="d-flex">
                            <Link href="/">
                                <p className="mb-0 text-900">{tr.home}</p>
                            </Link>
                            <svg className="mx-3 mt-1" xmlns="http://www.w3.org/2000/svg" width={8} height={13} viewBox="0 0 8 13" fill="none">
                                <path className="stroke-dark" d="M1 1.5L6.5 6.75L1 12" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-primary mb-0 text-capitalize">{tr.breadcrumb} / {slug?.replace('-', ' ')}</p>
                        </div>
                    </div>
                </div>
                <img className="position-absolute bottom-0 start-0 end-0 top-0 z-0" src="/assets/imgs/page-header/bg-line.png" alt="bg" />
            </section>

            <section className="section-consultancy-details pt-80 pb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h2 className="mb-4">{t(data, 'title')}</h2>
                            <div className="mb-6 fs-5" dangerouslySetInnerHTML={{ __html: t(data, 'description') }} />

                            {data.udemy_links && data.udemy_links.length > 0 && (
                                <div className="mt-8">
                                    <h4>{tr.relatedTrainings}</h4>
                                    <div className="row mt-4">
                                        {data.udemy_links.map((link: any, index: number) => (
                                            <div key={index} className="col-md-6 mb-4">
                                                <div className="p-4 bg-neutral-100 rounded-4 border border-white shadow-sm h-100">
                                                    <h6>{t(link, 'title')}</h6>
                                                    <p className="fs-7 text-600 mb-4">{t(link, 'description') || (locale === 'en' ? 'Our comprehensive training on Udemy.' : 'Udemy üzerindeki kapsamlı eğitimimiz.')}</p>
                                                    <Link href={link.url} target="_blank" className="btn btn-sm btn-gradient rounded-pill">
                                                        {tr.viewOnUdemy}
                                                        <i className="bi bi-box-arrow-up-right ms-2"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="col-lg-4">
                            <div className="sidebar ms-lg-4 mt-lg-0 mt-8">
                                <h4>{tr.packages}</h4>
                                {data.packages && data.packages.length > 0 ? (
                                    data.packages.map((pkg: any, index: number) => (
                                        <div key={index} className="card-pricing p-5 bg-white border rounded-4 mt-4 hover-up shadow-1">
                                            <div className="d-flex align-items-center mb-4">
                                                <img src="/assets/imgs/pricing-1/icon-1.svg" alt="icon" />
                                                <h5 className="ms-3 mb-0">{t(pkg, 'name')}</h5>
                                            </div>
                                            <h3 className="text-primary mb-4">{pkg.price} <small className="fs-6 text-600 fw-normal">/ {t(pkg, 'period') || tr.per}</small></h3>
                                            <ul className="list-unstyled mb-6">
                                                {pkg.features && pkg.features.map((f: any, i: number) => (
                                                    <li key={i} className="d-flex align-items-center mb-2 fs-7">
                                                        <i className="bi bi-check2 text-primary me-2"></i>
                                                        {typeof f === 'string' ? f : t(f, 'title')}
                                                    </li>
                                                ))}
                                            </ul>
                                            <Link href="/iletisim" className="btn btn-outline-secondary-2 w-100 rounded-pill">
                                                {tr.getInformation}
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-5 bg-neutral-100 rounded-4 mt-4 border border-white shadow-sm text-center">
                                        <p className="mb-0">{tr.specialSolutions}</p>
                                        <Link href="/iletisim" className="btn btn-primary mt-3 rounded-pill">{tr.contactUs}</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
