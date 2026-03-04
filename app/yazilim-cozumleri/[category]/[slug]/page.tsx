
"use client"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useParams } from 'next/navigation'
import { getSoftwareSolutionBySlug, getSubSolutionImages } from '@/util/api'
import { useLanguage } from '@/context/LanguageContext'
import { useApi } from '@/hooks/useApi'
import { useEffect } from "react"
import { useSiteInfo } from "@/context/SiteInfoContext"
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules'
import PageHeader from "@/components/layout/PageHeader"
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState } from "react"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

export default function SoftwareDetailsPage() {
    const params = useParams()
    const slug = params.slug as string
    const category = params.category as string
    const { locale, t } = useLanguage()

    // useApi hook kullanımı
    const { data: response, loading } = useApi(() => getSoftwareSolutionBySlug(slug), { deps: [slug] });
    const solution = response?.success ? response.data : null;

    // Alt çözüm resimlerini getir
    const { data: imagesResponse } = useApi(() => solution ? getSubSolutionImages(solution.id) : Promise.resolve(null), { deps: [solution?.id] });
    const images = imagesResponse?.status ? imagesResponse.data : [];

    const [isOpen, setIsOpen] = useState(false)
    const [photoIndex, setPhotoIndex] = useState(0)

    const lightboxImages = images && images.length > 0
        ? images.map((img: any) => ({ src: img.resim }))
        : solution?.resim ? [{ src: solution.resim }] : [];

    const { siteInfo } = useSiteInfo()

    useEffect(() => {
        if (solution) {
            document.title = `${t(solution, 'baslik')} - ${siteInfo?.firma_adi || 'Manutech Solutions'}`
        }
    }, [solution, locale, siteInfo])
    const categoryInfo = response?.success && response?.category ? response.category : null;

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
                <div className="section-padding" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className="container text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">{tr.loading}</span>
                        </div>
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
            <PageHeader
                title={t(solution, 'baslik')}
                slug="yazilim-cozumleri"
                py={10}
            >
                <svg className="mx-3 mt-1" xmlns="http://www.w3.org/2000/svg" width={8} height={13} viewBox="0 0 8 13" fill="none">
                    <path className="stroke-dark" d="M1 1.5L6.5 6.75L1 12" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <Link href={`/yazilim-cozumleri/${categoryInfo ? t(categoryInfo, 'slug') : category}`}>
                    <p className="mb-0 text-900 text-capitalize">{categoryInfo ? t(categoryInfo, 'baslik') : category?.replace('-', ' ')}</p>
                </Link>
                <svg className="mx-3 mt-1" xmlns="http://www.w3.org/2000/svg" width={8} height={13} viewBox="0 0 8 13" fill="none">
                    <path className="stroke-dark" d="M1 1.5L6.5 6.75L1 12" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-primary mb-0">{t(solution, 'baslik')}</p>
            </PageHeader>

            <section className="section-services-details pb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {images && images.length > 0 ? (
                                <div className="mb-5">
                                    <Swiper
                                        modules={[Keyboard, Autoplay, Pagination, Navigation]}
                                        slidesPerView={1}
                                        spaceBetween={30}
                                        loop={images.length > 1}
                                        autoplay={{
                                            delay: 5000,
                                            disableOnInteraction: false,
                                        }}
                                        pagination={{ clickable: true }}
                                        navigation={true}
                                        className="rounded-3 overflow-hidden shadow-sm"
                                    >
                                        {images.map((img: any, index: number) => (
                                            <SwiperSlide key={img.id}>
                                                <img
                                                    src={img.resim}
                                                    alt={t(solution, 'baslik')}
                                                    className="w-100 h-auto cursor-pointer"
                                                    onClick={() => {
                                                        setPhotoIndex(index)
                                                        setIsOpen(true)
                                                    }}
                                                    style={{ maxHeight: '350px', objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            ) : (
                                solution.resim && (
                                    <img
                                        className="rounded-3 img-fluid mb-5 w-100 shadow-sm cursor-pointer"
                                        src={solution.resim}
                                        alt={t(solution, 'baslik')}
                                        onClick={() => setIsOpen(true)}
                                        style={{ maxHeight: '400px', objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                                    />
                                )
                            )}

                            <Lightbox
                                open={isOpen}
                                close={() => setIsOpen(false)}
                                index={photoIndex}
                                slides={lightboxImages}
                            />
                            <div className="content">
                                <h4>{t(solution, 'alt_baslik')}</h4>
                                <div className="mt-4" dangerouslySetInnerHTML={{ __html: t(solution, 'icerik') }} />

                                {/* solution.features yeni API'de dönmüyor (mock veride vardı). Kontrollü ekleyelim */}
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
                                                <path d="M17.4177 5.41772L16.3487 6.48681L21.1059 11.244H0V12.756H21.1059L16.3487 17.5132L17.4177 18.5822L24 12L17.4177 5.41772Z" fill="#1a245c" />
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
