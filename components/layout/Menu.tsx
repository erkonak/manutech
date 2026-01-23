
"use client"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { useEffect, useState } from "react"
import { getSolutions, Solution, getPostSupports, PostSupport } from "@/util/api"

export default function Menu() {
    const { locale } = useLanguage()
    const [solutions, setSolutions] = useState<Solution[]>([])
    const [postSupports, setPostSupports] = useState<PostSupport[]>([])

    useEffect(() => {
        async function fetchMenuData() {
            const solutionsData = await getSolutions()
            if (solutionsData && solutionsData.status) {
                setSolutions(solutionsData.data)
            }

            const postResponse = await getPostSupports()
            if (postResponse && postResponse.status) {
                setPostSupports(postResponse.data)
            }
        }
        fetchMenuData()
    }, [])

    const menuItems = {
        tr: {
            home: "Anasayfa",
            software: "Yazılım Çözümleri",
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
                            {solutions.map((item) => (
                                <li key={item.id} className="position-relative z-1 border-bottom">
                                    <Link className="dropdown-item position-relative z-1 d-flex align-items-start" href={`/yazilim-cozumleri/${item.slug}`}>
                                        <span className="ms-2">{item.baslik}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </li>
                <li className="nav-item dropdown menu-item-has-children">
                    <Link className="nav-link fw-bold d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {m.post}
                    </Link>
                    <div className="dropdown-menu fix">
                        <ul className="list-unstyled">
                            {postSupports.map((item, index) => (
                                <li key={item.id} className={`position-relative z-1 ${index !== postSupports.length - 1 ? 'border-bottom' : ''}`}>
                                    <Link className="dropdown-item position-relative z-1 d-flex align-items-start" href={`/post-destegi/${locale === 'tr' ? item.slug_tr : (item.slug_en || item.slug_tr)}`}>
                                        <span className="ms-2">{locale === 'tr' ? item.baslik_tr : (item.baslik_en || item.baslik_tr)}</span>
                                    </Link>
                                </li>
                            ))}
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
