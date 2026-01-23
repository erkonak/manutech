
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
            <section className="section-padding">
                <div className="container">
                    <div className="text-center">
                        <div className="d-flex align-items-center justify-content-center bg-primary-soft border border-2 border-white d-inline-flex rounded-pill px-4 py-2" data-aos="zoom-in" data-aos-delay={100}>
                            <img src="/assets/imgs/features-1/dots.png" alt="infinia" />
                            <span className="tag-spacing fs-7 fw-bold text-linear-2 ms-2 text-uppercase">{tr.title}</span>
                        </div>
                        <h3 className="ds-3 my-3" data-aos="fade-zoom-in" data-aos-delay={300}>{tr.subtitle}</h3>
                        <p data-aos="fade-zoom-in" data-aos-delay={100}>
                            {/* Site Info'dan gelen metni dile göre seç (en ise _en ekli halini al, yoksa normalini al) */}
                            {(locale === 'en' ? siteInfo?.hizmetlerimiz_metni_en : siteInfo?.hizmetlerimiz_metni) || tr.desc}
                        </p>
                    </div>
                    <div className="row mt-6 position-relative justify-content-center">
                        <div className="col-lg-6">
                            <div className="p-2 mt-lg-8 rounded-4 shadow-1 bg-white position-relative z-1 hover-up" data-aos="fade-zoom-in" data-aos-delay={100}>
                                <div className="card-service bg-white p-6 border rounded-4">
                                    <div className="icon-shape icon-lg rounded-circle bg-primary-soft mb-3">
                                        <i className="bi bi-laptop fs-3 text-primary"></i>
                                    </div>
                                    <h6 className="my-3">{tr.software}</h6>
                                    <p className="mb-6">{tr.softwareDesc}</p>
                                    <Link href="/yazilim-cozumleri/cad" className="rounded-pill border icon-shape d-inline-flex gap-3 icon-learn-more">
                                        <span className="fw-bold fs-7 text-900">{tr.readMore}</span>
                                        <i className="bi bi-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-2 mt-5 rounded-4 shadow-1 bg-white position-relative z-1 hover-up" data-aos="fade-zoom-in" data-aos-delay={200}>
                                <div className="card-service bg-white p-6 border rounded-3">
                                    <div className="icon-shape icon-lg rounded-circle bg-primary-soft mb-3">
                                        <i className="bi bi-gear-wide-connected fs-3 text-primary"></i>
                                    </div>
                                    <h6 className="my-3">{tr.post}</h6>
                                    <p className="mb-6">{tr.postDesc}</p>
                                    <Link href="/post-destegi/solidcam" className="rounded-pill border icon-shape d-inline-flex gap-3 icon-learn-more">
                                        <span className="fw-bold fs-7 text-900">{tr.readMore}</span>
                                        <i className="bi bi-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="p-2 mt-5 rounded-4 shadow-1 bg-white position-relative z-1 hover-up" data-aos="fade-zoom-in" data-aos-delay={300}>
                                <div className="card-service bg-white p-6 border rounded-3">
                                    <div className="icon-shape icon-lg rounded-circle bg-primary-soft mb-3">
                                        <i className="bi bi-mortarboard fs-3 text-primary"></i>
                                    </div>
                                    <h6 className="my-3">{tr.training}</h6>
                                    <p className="mb-6">{tr.trainingDesc}</p>
                                    <Link href="/egitim" className="rounded-pill border icon-shape d-inline-flex gap-3 icon-learn-more">
                                        <span className="fw-bold fs-7 text-900">{tr.readMore}</span>
                                        <i className="bi bi-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
