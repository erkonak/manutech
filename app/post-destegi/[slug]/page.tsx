
"use client"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useParams } from 'next/navigation'
import { getPostSupport } from '@/util/api'
import { useLanguage } from '@/context/LanguageContext'
import { useApi } from '@/hooks/useApi'
import { useEffect } from "react"
import { useSiteInfo } from "@/context/SiteInfoContext"

export default function PostSupportDetailsPage() {
    const params = useParams()
    const slug = params.slug as string
    const { locale } = useLanguage()
    const { siteInfo } = useSiteInfo()

    // useApi hook kullanımı
    const { data: response, loading } = useApi(() => getPostSupport(slug), { deps: [slug] });
    const data = response?.success ? response.data : null;

    useEffect(() => {
        if (data) {
             const title = locale === 'tr' ? data.baslik_tr : (data.baslik_en || data.baslik_tr)
             document.title = `${title} - ${siteInfo?.firma_adi || 'Manutech Solutions'}`
        }
    }, [data, locale, siteInfo])

    if (loading) {
        return (
            <Layout>
                <section className="section-page-header py-10 fix position-relative">
                    <div className="container position-relative z-1">
                        <div className="text-start">
                            <h3>{locale === 'tr' ? 'Post Desteği' : 'Post Support'}</h3>
                            <div className="d-flex">
                                <Link href="/">
                                    <p className="mb-0 text-900">{locale === 'tr' ? 'Anasayfa' : 'Home'}</p>
                                </Link>
                                <svg className="mx-3 mt-1" xmlns="http://www.w3.org/2000/svg" width={8} height={13} viewBox="0 0 8 13" fill="none">
                                    <path className="stroke-dark" d="M1 1.5L6.5 6.75L1 12" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="text-primary mb-0">{locale === 'tr' ? 'Yükleniyor...' : 'Loading...'}</p>
                            </div>
                        </div>
                    </div>
                    <img className="position-absolute bottom-0 start-0 end-0 top-0 z-0" src="/assets/imgs/page-header/bg-line.png" alt="infinia" />
                </section>

                <section className="section-post-support-details pt-80 pb-80" style={{ minHeight: '50vh' }}>
                    <div className="container">
                        <div className="text-center py-10">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">{locale === 'tr' ? 'Yükleniyor...' : 'Loading...'}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }

    if (!data) {
        return (
            <Layout>
                <section className="section-page-header py-10 fix position-relative">
                    <div className="container position-relative z-1">
                        <div className="text-start">
                            <h3>{locale === 'tr' ? 'Post Desteği' : 'Post Support'}</h3>
                            <div className="d-flex">
                                <Link href="/">
                                    <p className="mb-0 text-900">{locale === 'tr' ? 'Anasayfa' : 'Home'}</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <img className="position-absolute bottom-0 start-0 end-0 top-0 z-0" src="/assets/imgs/page-header/bg-line.png" alt="infinia" />
                </section>

                <section className="section-post-support-details pt-80 pb-80" style={{ minHeight: '50vh' }}>
                    <div className="container">
                        <div className="text-center py-10">
                            <h3>{locale === 'tr' ? 'Post desteği bilgisi bulunamadı.' : 'Post support information not found.'}</h3>
                            <Link href="/" className="btn btn-primary mt-4">{locale === 'tr' ? 'Anasayfaya Dön' : 'Back to Home'}</Link>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }

    const title = locale === 'tr' ? data.baslik_tr : (data.baslik_en || data.baslik_tr)
    const description = locale === 'tr' ? data.aciklama_tr : (data.aciklama_en || data.aciklama_tr)
    const advantages = locale === 'tr' ? data.avantajlar_tr : (data.avantajlar_en && data.avantajlar_en.length > 0 ? data.avantajlar_en : data.avantajlar_tr)

    return (
        <Layout>
            <section className="section-page-header py-10 fix position-relative">
                <div className="container position-relative z-1">
                    <div className="text-start">
                        <h3>{title} {locale === 'tr' ? 'Post Desteği' : 'Post Support'}</h3>
                        <div className="d-flex">
                            <Link href="/">
                                <p className="mb-0 text-900">{locale === 'tr' ? 'Anasayfa' : 'Home'}</p>
                            </Link>
                            <svg className="mx-3 mt-1" xmlns="http://www.w3.org/2000/svg" width={8} height={13} viewBox="0 0 8 13" fill="none">
                                <path className="stroke-dark" d="M1 1.5L6.5 6.75L1 12" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-primary mb-0">{title} {locale === 'tr' ? 'Post Desteği' : 'Post Support'}</p>
                        </div>
                    </div>
                </div>
                <img className="position-absolute bottom-0 start-0 end-0 top-0 z-0" src="/assets/imgs/page-header/bg-line.png" alt="infinia" />
            </section>

            <section className="section-post-support-details pt-80 pb-80">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <img className="rounded-3 img-fluid" src={data.foto} alt={title} />
                        </div>
                        <div className="col-lg-6 ps-lg-6 mt-lg-0 mt-8">
                            <h4 className="mb-4">{title} {locale === 'tr' ? 'Post İşleme Çözümleri' : 'Post Processing Solutions'}</h4>
                            <div className="mb-6" dangerouslySetInnerHTML={{ __html: description }} />

                            <div className="bg-neutral-100 p-6 rounded-4 border">
                                <h5 className="mb-3">{locale === 'tr' ? 'Avantajlar' : 'Advantages'}</h5>
                                <ul className="list-unstyled">
                                    {advantages.map((item, index) => (
                                        <li key={index} className="d-flex align-items-start mb-3">
                                            <i className="bi bi-patch-check-fill text-primary me-2 mt-1"></i>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-6">
                                    <h4 className="text-primary mb-4">{data.fiyat ? `${data.fiyat} TL` : (locale === 'tr' ? 'Fiyat Teklifi Alın' : 'Get a Quote')}</h4>
                                    <Link href="/iletisim" className="btn btn-gradient w-100 py-3 rounded-3">
                                        {locale === 'tr' ? 'Satın Al / Teklif Al' : 'Buy / Get Quote'}
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
