
"use client"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getPostSupport } from '@/util/api'

export default function PostSupportDetailsPage() {
    const params = useParams()
    const slug = params.slug as string
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const response = await getPostSupport(slug)
            if (response && response.success) {
                setData(response.data)
            }
            setLoading(false)
        }
        if (slug) {
            fetchData()
        }
    }, [slug])

    if (loading) {
        return (
            <Layout>
                <div className="text-center py-20">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Yükleniyor...</span>
                    </div>
                </div>
            </Layout>
        )
    }

    if (!data) {
        return (
            <Layout>
                <div className="text-center py-20">
                    <h3>Post desteği bilgisi bulunamadı.</h3>
                    <Link href="/" className="btn btn-primary mt-4">Anasayfaya Dön</Link>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <section className="section-page-header py-10 fix position-relative">
                <div className="container position-relative z-1">
                    <div className="text-start">
                        <h3>{data.title} Post Desteği</h3>
                        <div className="d-flex">
                            <Link href="/">
                                <p className="mb-0 text-900">Anasayfa</p>
                            </Link>
                            <svg className="mx-3 mt-1" xmlns="http://www.w3.org/2000/svg" width={8} height={13} viewBox="0 0 8 13" fill="none">
                                <path className="stroke-dark" d="M1 1.5L6.5 6.75L1 12" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-primary mb-0">{data.title} Post Desteği</p>
                        </div>
                    </div>
                </div>
                <img className="position-absolute bottom-0 start-0 end-0 top-0 z-0" src="/assets/imgs/page-header/bg-line.png" alt="infinia" />
            </section>

            <section className="section-post-support-details pt-80 pb-80">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <img className="rounded-3 img-fluid" src={data.image || `/assets/imgs/post-support/${slug}.png`} alt={data.title} />
                        </div>
                        <div className="col-lg-6 ps-lg-6 mt-lg-0 mt-8">
                            <h4 className="mb-4">{data.title} Post İşleme Çözümleri</h4>
                            <div className="mb-6" dangerouslySetInnerHTML={{ __html: data.description }} />

                            <div className="bg-neutral-100 p-6 rounded-4 border">
                                <h5 className="mb-3">Avantajlar</h5>
                                <ul className="list-unstyled">
                                    <li className="d-flex align-items-start mb-3">
                                        <i className="bi bi-patch-check-fill text-primary me-2 mt-1"></i>
                                        <span>Yüksek hassasiyetli kod üretimi</span>
                                    </li>
                                    <li className="d-flex align-items-start mb-3">
                                        <i className="bi bi-patch-check-fill text-primary me-2 mt-1"></i>
                                        <span>Makineye özel optimizasyon</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                        <i className="bi bi-patch-check-fill text-primary me-2 mt-1"></i>
                                        <span>7/24 Teknik destek</span>
                                    </li>
                                </ul>

                                <div className="mt-6">
                                    <h4 className="text-primary mb-4">{data.price ? `${data.price} TL` : 'Fiyat Teklifi Alın'}</h4>
                                    <Link href={data.purchase_link || "/iletisim"} className="btn btn-gradient w-100 py-3 rounded-3">
                                        Satın Al / Teklif Al
                                        <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                            <path d="M17.25 15.25V6.75H8.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M17 7L6.75 17.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
