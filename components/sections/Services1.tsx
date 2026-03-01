
"use client"
import Link from "next/link"
import { useLanguage } from '@/context/LanguageContext'
import { useSiteInfo } from '@/context/SiteInfoContext'

export default function Services1() {
    const { locale, t } = useLanguage()
    const { siteInfo } = useSiteInfo()

    const translations = {
        tr: {
            title: "Hizmetlerimiz",
            subtitle: "Hizmetlerimizi Keşfedin",
            desc: "İmalat ve tasarımı birleştiren uçtan uca çözümlerimizle tanışın.",
            software: "Yazılım Çözümleri",
            softwareDesc: "CAD/CAM, Simülasyon ve PLM alanlarında dünya lideri yazılımlar.",
            production: "Üretim Çözümleri",
            productionDesc: "Üretim süreçlerinizi optimize eden ileri teknoloji imalat çözümleri.",
            post: "Post Desteği",
            postDesc: "SolidCAM, Mastercam ve NX CAM için profesyonel post işlemci desteği.",
            training: "Eğitim Hizmetleri",
            trainingDesc: "Uzman kadromuzdan birebir veya online teknik eğitimler.",
            readMore: "Detayları İncele"
        },
        en: {
            title: "Our Services",
            subtitle: "Explore Our Services",
            desc: "Meet our end-to-end solutions combining manufacturing and design.",
            software: "Software Solutions",
            softwareDesc: "World-leading software in CAD/CAM, Simulation, and PLM.",
            production: "Production Solutions",
            productionDesc: "Advanced manufacturing solutions optimizing your production processes.",
            post: "Post Support",
            postDesc: "Professional post-processor support for SolidCAM, Mastercam, and NX CAM.",
            training: "Training Services",
            trainingDesc: "One-on-one or online technical training from our expert staff.",
            readMore: "Read More"
        }
    }

    const tr = locale === 'en' ? translations.en : translations.tr

    return (
        <>
            <section className="section-padding position-relative overflow-hidden">
                {/* Geometrik Süslemeler */}
                <div className="position-absolute top-0 end-0 p-10 opacity-10 z-0">
                    <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="200" cy="200" r="150" stroke="#1a245c" strokeWidth="2" strokeDasharray="20 20" />
                        <circle cx="200" cy="200" r="100" stroke="#5263bd" strokeWidth="2" strokeDasharray="10 10" />
                    </svg>
                </div>

                <div className="container position-relative z-1">
                    <div className="text-center mb-10">
                        <div className="d-flex align-items-center justify-content-center bg-white shadow-sm border border-primary-subtle d-inline-flex rounded-pill px-4 py-2 mb-4" data-aos="zoom-in">
                            <span className="tag-spacing fs-7 fw-bold text-primary ms-2 text-uppercase" style={{ letterSpacing: '2px' }}>{tr.title}</span>
                        </div>
                        <h2 className="ds-3 fw-bold mb-4" data-aos="fade-up">{tr.subtitle}</h2>
                        <p className="fs-5 text-600 max-w-700 mx-auto" data-aos="fade-up" data-aos-delay={100}>
                            {(locale === 'en' ? siteInfo?.hizmetlerimiz_metni_en : siteInfo?.hizmetlerimiz_metni) || tr.desc}
                        </p>
                    </div>

                    <div className="row g-5 align-items-start">
                        {/* Sol Sütun */}
                        <div className="col-lg-6">
                            <div className="row g-5">
                                {/* 01 - Yazılım Çözümleri */}
                                <div className="col-12" data-aos="fade-right">
                                    <div className="service-card-premium staggered-card p-5 rounded-5 bg-white shadow-sm position-relative overflow-hidden h-100 border-start-highlight">
                                        <div className="bg-number">01</div>
                                        <div className="card-top-icon mb-4 rounded-4 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #1a245c 0%, #3a4ca6 100%)', width: '60px', height: '60px' }}>
                                            <i className="bi bi-laptop fs-3 text-white"></i>
                                        </div>
                                        <div className="position-relative z-1">
                                            <h4 className="fw-bold mb-3">{tr.software}</h4>
                                            <p className="text-600 mb-5">{tr.softwareDesc}</p>
                                            <Link href="/yazilim-cozumleri" className="link-with-arrow text-primary fw-bold text-decoration-none d-inline-flex align-items-center gap-2">
                                                <span>{tr.readMore}</span>
                                                <div className="arrow-circle">
                                                    <i className="bi bi-arrow-right"></i>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* 03 - Post Desteği */}
                                <div className="col-12" data-aos="fade-right" data-aos-delay={200}>
                                    <div className="service-card-premium staggered-card p-5 rounded-5 bg-white shadow-sm position-relative overflow-hidden h-100 border-start-highlight">
                                        <div className="bg-number">03</div>
                                        <div className="card-top-icon mb-4 rounded-4 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #121940 0%, #5263bd 100%)', width: '60px', height: '60px' }}>
                                            <i className="bi bi-gear-wide-connected fs-3 text-white"></i>
                                        </div>
                                        <div className="position-relative z-1">
                                            <h4 className="fw-bold mb-3">{tr.post}</h4>
                                            <p className="text-600 mb-5">{tr.postDesc}</p>
                                            <Link href="/post-destegi" className="link-with-arrow text-primary fw-bold text-decoration-none d-inline-flex align-items-center gap-2">
                                                <span>{tr.readMore}</span>
                                                <div className="arrow-circle">
                                                    <i className="bi bi-arrow-right"></i>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sağ Sütun (Hafif Aşağı Kaydırılmış) */}
                        <div className="col-lg-6 mt-lg-10">
                            <div className="row g-5">
                                {/* 02 - Üretim Çözümleri */}
                                <div className="col-12" data-aos="fade-left" data-aos-delay={100}>
                                    <div className="service-card-premium staggered-card p-5 rounded-5 bg-white shadow-sm position-relative overflow-hidden h-100 border-start-highlight">
                                        <div className="bg-number">02</div>
                                        <div className="card-top-icon mb-4 rounded-4 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #5263bd 0%, #1a245c 100%)', width: '60px', height: '60px' }}>
                                            <i className="bi bi-cpu fs-3 text-white"></i>
                                        </div>
                                        <div className="position-relative z-1">
                                            <h4 className="fw-bold mb-3">{tr.production}</h4>
                                            <p className="text-600 mb-5">{tr.productionDesc}</p>
                                            <Link href="/uretim-cozumleri" className="link-with-arrow text-primary fw-bold text-decoration-none d-inline-flex align-items-center gap-2">
                                                <span>{tr.readMore}</span>
                                                <div className="arrow-circle">
                                                    <i className="bi bi-arrow-right"></i>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* 04 - Eğitim Hizmetleri */}
                                <div className="col-12" data-aos="fade-left" data-aos-delay={300}>
                                    <div className="service-card-premium staggered-card p-5 rounded-5 bg-white shadow-sm position-relative overflow-hidden h-100 border-start-highlight">
                                        <div className="bg-number">04</div>
                                        <div className="card-top-icon mb-4 rounded-4 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #1a245c 0%, #121940 100%)', width: '60px', height: '60px' }}>
                                            <i className="bi bi-mortarboard fs-3 text-white"></i>
                                        </div>
                                        <div className="position-relative z-1">
                                            <h4 className="fw-bold mb-3">{tr.training}</h4>
                                            <p className="text-600 mb-5">{tr.trainingDesc}</p>
                                            <Link href="/egitim" className="link-with-arrow text-primary fw-bold text-decoration-none d-inline-flex align-items-center gap-2">
                                                <span>{tr.readMore}</span>
                                                <div className="arrow-circle">
                                                    <i className="bi bi-arrow-right"></i>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    .service-card-premium {
                        transition: all 0.4s ease;
                        border: 1px solid rgba(26, 36, 92, 0.05);
                    }
                    .service-card-premium:hover {
                        transform: translateY(-10px) scale(1.02);
                        box-shadow: 0 30px 60px rgba(26, 36, 92, 0.1) !important;
                        border-color: rgba(26, 36, 92, 0.2);
                    }
                    .bg-number {
                        position: absolute;
                        top: -10px;
                        right: 20px;
                        font-size: 100px;
                        font-weight: 900;
                        color: rgba(26, 36, 92, 0.03);
                        pointer-events: none;
                        line-height: 1;
                        transition: all 0.4s ease;
                    }
                    .service-card-premium:hover .bg-number {
                        color: rgba(26, 36, 92, 0.08);
                        transform: scale(1.1) translateX(-10px);
                    }
                    .link-with-arrow {
                        transition: all 0.3s ease;
                    }
                    .link-with-arrow .arrow-circle {
                        width: 30px;
                        height: 30px;
                        background: rgba(26, 36, 92, 0.1);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #1a245c;
                        font-size: 0.9rem;
                        transition: all 0.3s ease;
                    }
                    .link-with-arrow:hover .arrow-circle {
                        background: #1a245c;
                        color: white;
                        transform: translateX(5px);
                    }
                    .max-w-700 {
                        max-width: 700px;
                    }
                    @media (min-width: 992px) {
                        .mt-lg-10 {
                            margin-top: 10rem;
                        }
                    }
                    .border-start-highlight {
                        border-left: 4px solid #1a245c !important;
                    }
                `}</style>
            </section>
        </>
    )
}
