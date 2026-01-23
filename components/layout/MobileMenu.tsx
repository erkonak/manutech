
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useSiteInfo } from '@/context/SiteInfoContext'
import { useData } from '@/context/DataContext'

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
	const [isAccordion, setIsAccordion] = useState(0)
    const { locale } = useLanguage()
    const { siteInfo } = useSiteInfo()
    const { solutions, postSupports } = useData()

	const handleAccordion = (key: any) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}

    const menuItems = {
        tr: {
            home: "Anasayfa",
            software: "Yazılım Çözümleri",
            post: "Post Desteği",
            training: "Eğitim",
            blog: "Blog",
            interviews: "Röportajlar",
            contact: "İletişim"
        },
        en: {
            home: "Home",
            software: "Software Solutions",
            post: "Post Support",
            training: "Training",
            blog: "Blog",
            interviews: "Interviews",
            contact: "Contact"
        }
    }

    const m = locale === 'en' ? menuItems.en : menuItems.tr

	return (
		<>
			{/* Offcanvas search */}
			<div className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar button-bg-2 ${isMobileMenu ? 'sidebar-visible' : ''}`}>
				<div className="mobile-header-wrapper-inner">
					<div className="mobile-header-logo">
						<Link className="navbar-brand d-flex main-logo align-items-center" href="/">
							{siteInfo?.logo ? (
								<img src={siteInfo.logo} alt={siteInfo.firma_adi || "Logo"} style={{ width: siteInfo.logo_w ? `${Number(siteInfo.logo_w) * 0.8}px` : 'auto', height: siteInfo.logo_h ? `${Number(siteInfo.logo_h) * 0.8}px` : 'auto' }} />
							) : (
								<>
									<img src="https://demo.eemre.tr/assets/img/site/logo/logo.png" alt="Logo" style={{ width: '150px' }} />
								</>
							)}
						</Link>
						<div className={`burger-icon burger-icon-white border rounded-3 ${isMobileMenu ? 'burger-close' : ''}`} onClick={handleMobileMenu}>
							<span className="burger-icon-top" />
							<span className="burger-icon-mid" />
							<span className="burger-icon-bottom" />
						</div>
					</div>
					<div className="mobile-header-content-area">
						<div className="perfect-scroll">
							<div className="mobile-menu-wrap mobile-header-border">
								<nav>
									<ul className="mobile-menu font-heading ps-0">
										<li className="nav-item">
											<Link href="/">{m.home}</Link>
										</li>
										<li className={`has-children ${isAccordion === 1 ? "active" : ""}`}>
											<span className="menu-expand" onClick={() => handleAccordion(1)}>
												<i className="arrow-small-down"></i>
											</span>
											<Link href="#">{m.software}</Link>
											<ul className="sub-menu" style={{ display: `${isAccordion == 1 ? "block" : "none"}` }}>
                                                {solutions.map((item) => (
                                                    <li key={item.id}>
                                                        <Link href={`/yazilim-cozumleri/${item.slug}`} onClick={handleMobileMenu}>{item.baslik}</Link>
                                                    </li>
                                                ))}
											</ul>
										</li>
										<li className={`has-children ${isAccordion === 2 ? "active" : ""}`}>
											<span className="menu-expand" onClick={() => handleAccordion(2)}>
												<i className="arrow-small-down"></i>
											</span>
											<Link href="#">{m.post}</Link>
											<ul className="sub-menu" style={{ display: `${isAccordion == 2 ? "block" : "none"}` }}>
                                                {postSupports.map((item) => (
                                                    <li key={item.id}>
                                                        <Link href={`/post-destegi/${locale === 'tr' ? item.slug_tr : (item.slug_en || item.slug_tr)}`} onClick={handleMobileMenu}>
                                                            {locale === 'tr' ? item.baslik_tr : (item.baslik_en || item.baslik_tr)}
                                                        </Link>
                                                    </li>
                                                ))}
											</ul>
										</li>
										<li className="nav-item">
											<Link href="/egitim">{m.training}</Link>
										</li>

										<li className="nav-item">
											<Link href="/blog">{m.blog}</Link>
										</li>
										<li className="nav-item">
											<Link href="/roportajlar">{m.interviews}</Link>
										</li>
										<li className="nav-item">
											<Link href="/iletisim">{m.contact}</Link>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
