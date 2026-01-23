
'use client'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { useSiteInfo } from '@/context/SiteInfoContext'
import { useData } from '@/context/DataContext'

export default function Footer1() {
	const { locale } = useLanguage()
	const { siteInfo } = useSiteInfo()
	const { solutions, postSupports } = useData()

	const translations = {
		tr: {
			description: "Üretim ve tasarım süreçlerinizde verimliliği artıran, maliyetleri düşüren ve yenilikçi çözümler sunan teknoloji ortağınız.",
			company: "Kurumsal",
			solutions: "Yazılım Çözümleri",
			post: "Post Destekleri",
			training: "Eğitim",
			contact: "İletişim",
			rights: "Tüm Hakları Saklıdır",
			blog: "Blog",
			interviews: "Röportajlar",
			kvkk: "KVKK Aydınlatma Metni",
			privacy: "Gizlilik Politikası"
		},
		en: {
			description: "Your technology partner providing innovative solutions that increase efficiency and reduce costs in your production and design processes.",
			company: "Corporate",
			solutions: "Software Solutions",
			post: "Post Support",
			training: "Training",
			contact: "Contact",
			rights: "All Rights Reserved",
			blog: "Blog",
			interviews: "Interviews",
			kvkk: "KVKK Text",
			privacy: "Privacy Policy"
		}
	}

	const t = locale === 'en' ? translations.en : translations.tr

	return (
		<>
			<footer>
				<div className="section-footer position-relative overflow-hidden">
					<div className="container-fluid bgft-1">
						<div className="container position-relative z-2">
							<div className="row py-90">
								<div className="col-lg-4 pe-10">
									<Link href="/">
										{siteInfo?.logo_dark ? (
											<img src={siteInfo.logo_dark} alt={siteInfo.firma_adi || "Logo"} style={{ maxHeight: '50px', width: siteInfo.logo_w ? `${siteInfo.logo_w}px` : 'auto', height: siteInfo.logo_h ? `${siteInfo.logo_h}px` : 'auto' }} />
										) : (
											<img src="https://admin.manutechsolutions.com/assets/img/site/logo/logo-dark.svg" width={200} height={60} alt="Logo" />
										)}
									</Link>
									<p className="text-white fw-medium mt-3 mb-6 opacity-50">
										{/* Site Info'dan gelen metni dile göre seç (en ise _en ekli halini al, yoksa normalini al) */}
										{(locale === 'en' ? siteInfo?.footer_metni_en : siteInfo?.footer_metni) || t.description}
									</p>
									<div className="d-flex social-icons">
										{siteInfo?.facebook && (
											<Link href={siteInfo.facebook} target="_blank" rel="noopener noreferrer" className=" text-white border border-end-0 border-light border-opacity-10 icon-shape icon-md">
												<svg xmlns="http://www.w3.org/2000/svg" width={10} height={17} viewBox="0 0 10 17" fill="none">
													<path d="M8.84863 9.20312H6.5415V16.0938H3.46533V9.20312H0.942871V6.37305H3.46533V4.18896C3.46533 1.72803 4.94189 0.34375 7.1875 0.34375C8.26416 0.34375 9.40234 0.559082 9.40234 0.559082V2.98926H8.14111C6.91064 2.98926 6.5415 3.72754 6.5415 4.52734V6.37305H9.2793L8.84863 9.20312Z" fill="white" />
												</svg>
											</Link>
										)}
										{siteInfo?.linkedin && (
											<Link href={siteInfo.linkedin} target="_blank" rel="noopener noreferrer" className=" text-white border border-light border-opacity-10 icon-shape icon-md">
												<i className="bi bi-linkedin" />
											</Link>
										)}
										{siteInfo?.instagram && (
											<Link href={siteInfo.instagram} target="_blank" rel="noopener noreferrer" className=" text-white border border-start-0 border-light border-opacity-10 icon-shape icon-md">
												<i className="bi bi-instagram" />
											</Link>
										)}
									</div>
								</div>
								<div className="col-lg-8">
									<div className="row">
										<div className="col-lg-4 col-md-4 col-6">
											<h3 className="text-white opacity-50 fs-6 fw-black text-uppercase pb-3 pt-5">{t.company}</h3>
											<div className="d-flex flex-column align-items-start">
												<Link className="hover-effect text-white mb-2 fw-medium fs-6" href="/blog">{t.blog}</Link>
												<Link className="hover-effect text-white mb-2 fw-medium fs-6" href="/roportajlar">{t.interviews}</Link>
												<Link className="hover-effect text-white mb-2 fw-medium fs-6" href="/iletisim">{t.contact}</Link>
											</div>
										</div>
										<div className="col-lg-4 col-md-4 col-6">
											<h3 className="text-white opacity-50 fs-6 fw-black text-uppercase pb-3 pt-5">{t.solutions}</h3>
											<div className="d-flex flex-column align-items-start">
												{solutions.slice(0, 5).map((item) => (
													<Link key={item.id} className="hover-effect text-white mb-2 fw-medium fs-6" href={`/yazilim-cozumleri/${item.slug}`}>
														{item.baslik}
													</Link>
												))}
											</div>
										</div>
										<div className="col-lg-4 col-md-4 col-6">
											<h3 className="text-white opacity-50 fs-6 fw-black text-uppercase pb-3 pt-5">{t.post}</h3>
											<div className="d-flex flex-column align-items-start">
												{postSupports.slice(0, 5).map((item) => (
													<Link key={item.id} className="hover-effect text-white mb-2 fw-medium fs-6" href={`/post-destegi/${locale === 'tr' ? item.slug_tr : (item.slug_en || item.slug_tr)}`}>
														{locale === 'tr' ? item.baslik_tr : (item.baslik_en || item.baslik_tr)}
													</Link>
												))}
												<Link className="hover-effect text-white mb-2 fw-medium fs-6" href="/egitim">{t.training}</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row text-center py-4 border-top border-white border-opacity-10">
								<span className="text-white opacity-50">
									Copyright © {new Date().getFullYear()} {siteInfo?.firma_adi || "Manutech Solutions"}. {t.rights}
								</span>
							</div>
						</div>
					</div>
					<div className="position-absolute top-0 start-50 translate-middle-x z-0">
						<img src="/assets/imgs/footer-1/line-bg.png" alt="infinia" style={{ maxHeight: '100%' }} />
					</div>
					<div className="position-absolute top-0 start-0 z-0">
						<img src="/assets/imgs/footer-1/ellipse-left.png" alt="infinia" />
					</div>
					<div className="position-absolute top-0 end-0 z-0">
						<img src="/assets/imgs/footer-1/ellipse-right.png" alt="infinia" />
					</div>
				</div>
			</footer>

		</>
	)
}
