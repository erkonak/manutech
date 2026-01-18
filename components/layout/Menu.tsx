
"use client"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"

export default function Menu() {
    const { locale } = useLanguage()

    const menuItems = {
        tr: {
            home: "Anasayfa",
            software: "Yazılım Çözümleri",
            cad: "CAD Çözümleri",
            cam: "CAM Çözümleri",
            aea: "AEA (Analiz)",
            fma: "FMA (Simülasyon)",
            pdm: "PDM (Veri Yönetimi)",
            plm: "PLM (Ürün Yaşam Döngüsü)",
            post: "Post Desteği",
            training: "Eğitim",
            consultancy: "Danışmanlık",
            production: "Üretim Süreçleri",
            design: "Tasarım Süreçleri",
            blog: "Blog",
            interviews: "Röportajlar",
            contact: "İletişim"
        },
        en: {
            home: "Home",
            software: "Software Solutions",
            cad: "CAD Solutions",
            cam: "CAM Solutions",
            aea: "FEA (Analysis)",
            fma: "FMA (Simulation)",
            pdm: "PDM (Data Management)",
            plm: "PLM (Product Lifecycle)",
            post: "Post Support",
            training: "Training",
            consultancy: "Consultancy",
            production: "Production Processes",
            design: "Design Processes",
            blog: "Blog",
            interviews: "Interviews",
            contact: "Contact"
        }
    }

    const m = locale === 'en' ? menuItems.en : menuItems.tr

    return (
        <div className="d-none d-lg-flex">
            <ul className="navbar-nav mx-auto gap-4 align-items-lg-center">
                <li className="nav-item">
                    <Link className="nav-link fw-bold d-flex align-items-center" href="/">{m.home}</Link>
                </li>
                <li className="nav-item dropdown menu-item-has-children">
                    <Link className="nav-link fw-bold d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {m.software}
                    </Link>
                    <div className="dropdown-menu fix">
                        <ul className="list-unstyled">
                            <li className="position-relative z-1 border-bottom">
                                <Link className="dropdown-item position-relative z-1 d-flex align-items-start" href="/yazilim-cozumleri/cad">
                                    <span className="ms-2">CAD</span>
                                </Link>
                            </li>
                            <li className="position-relative z-1 border-bottom">
                                <Link className="dropdown-item position-relative z-1 d-flex align-items-start" href="/yazilim-cozumleri/cam">
                                    <span className="ms-2">CAM</span>
                                </Link>
                            </li>
                            <li className="position-relative z-1 border-bottom">
                                <Link className="dropdown-item position-relative z-1 d-flex align-items-start" href="/yazilim-cozumleri/aea">
                                    <span className="ms-2">AEA / FEA</span>
                                </Link>
                            </li>
                            <li className="position-relative z-1 border-bottom">
                                <Link className="dropdown-item position-relative z-1 d-flex align-items-start" href="/yazilim-cozumleri/fma">
                                    <span className="ms-2">FMA</span>
                                </Link>
                            </li>
                            <li className="position-relative z-1 border-bottom">
                                <Link className="dropdown-item position-relative z-1 d-flex align-items-start" href="/yazilim-cozumleri/pdm">
                                    <span className="ms-2">PDM</span>
                                </Link>
                            </li>
                            <li className="position-relative z-1">
                                <Link className="dropdown-item position-relative z-1 d-flex align-items-start" href="/yazilim-cozumleri/plm">
                                    <span className="ms-2">PLM</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item dropdown menu-item-has-children">
                    <Link className="nav-link fw-bold d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {m.post}
                    </Link>
                    <div className="dropdown-menu fix">
                        <ul className="list-unstyled">
                            <li className="position-relative z-1 border-bottom">
                                <Link className="dropdown-item position-relative z-1 d-flex align-items-start" href="/post-destegi/solidcam">
                                    <span className="ms-2">SolidCAM</span>
                                </Link>
                            </li>
                            <li className="position-relative z-1 border-bottom">
                                <Link className="dropdown-item position-relative z-1 d-flex align-items-start" href="/post-destegi/mastercam">
                                    <span className="ms-2">Mastercam</span>
                                </Link>
                            </li>
                            <li className="position-relative z-1">
                                <Link className="dropdown-item position-relative z-1 d-flex align-items-start" href="/post-destegi/nx-cam">
                                    <span className="ms-2">NX CAM</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <Link className="nav-link fw-bold d-flex align-items-center" href="/egitim">{m.training}</Link>
                </li>
                <li className="nav-item dropdown menu-item-has-children">
                    <Link className="nav-link fw-bold d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {m.consultancy}
                    </Link>
                    <div className="dropdown-menu fix">
                        <ul className="list-unstyled">
                            <li className="position-relative z-1 border-bottom">
                                <Link className="dropdown-item position-relative z-1 d-flex align-items-start" href="/danismanlik/uretim-surecleri">
                                    <span className="ms-2">{m.production}</span>
                                </Link>
                            </li>
                            <li className="position-relative z-1">
                                <Link className="dropdown-item position-relative z-1 d-flex align-items-start" href="/danismanlik/tasarim-surecleri">
                                    <span className="ms-2">{m.design}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <Link className="nav-link fw-bold d-flex align-items-center" href="/blog">{m.blog}</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link fw-bold d-flex align-items-center" href="/roportajlar">{m.interviews}</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link fw-bold d-flex align-items-center" href="/iletisim">{m.contact}</Link>
                </li>
            </ul>
        </div>
    )
}
