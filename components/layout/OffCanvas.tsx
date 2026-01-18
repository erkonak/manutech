
"use client"
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function OffCanvas({ isOffCanvas, handleOffCanvas }: any) {
    const { locale } = useLanguage()

    const translations = {
        tr: {
            title: "Bize Ulaşın",
            supportText: "Destek ekibimiz 7/24 hizmetinizdedir.",
            whatsapp: "Whatsapp ile Sohbet",
            office: "Ofis Adresi",
            address: "İstanbul, Türkiye",
            phone: "Telefon",
            email: "E-posta",
            help: "Yardım & Destek",
            helpText: "Mevcut ürün veya hizmetlerle ilgili yardım için bize yazın.",
            social: "Sosyal Medya"
        },
        en: {
            title: "Contact Us",
            supportText: "Our support team is available 24/7.",
            whatsapp: "Chat via Whatsapp",
            office: "Office Address",
            address: "Istanbul, Turkey",
            phone: "Phone Number",
            email: "Email Address",
            help: "Help & Support",
            helpText: "Email us for help with a current product or service.",
            social: "Social Media"
        }
    }

    const tr = locale === 'en' ? translations.en : translations.tr

	return (
		<>
			{/* offCanvas-menu */}
			<div className={`offCanvas__info ${isOffCanvas ? 'active' : ''}`}>
				<div className="offCanvas__close-icon menu-close">
					<button onClick={handleOffCanvas}><i className="bi bi-x" /></button>
				</div>
				<div className="offCanvas__logo mb-30">
					<Link href="/"><img src="/assets/imgs/logo/logo-dark.svg" alt="Manutech" /></Link>
				</div>
				<div className="offCanvas__side-info mb-30">
					<div className="contact-list mb-30">
						<h4>{tr.title}</h4>
						<p className="mb-3">
							{tr.supportText}
						</p>
						<div className="d-flex mb-2">
							<img src="/assets/imgs/contact-2/icon-1.svg" alt="whatsapp" />
							<Link className="ms-2 text-decoration-underline text-900 fs-7" href="https://wa.me/905555555555">{tr.whatsapp}</Link>
						</div>
					</div>
					<div className="contact-list mb-30">
						<h4>{tr.office}</h4>
						<p>
							{tr.address}
						</p>
					</div>
					<div className="contact-list mb-30">
						<h4>{tr.phone}</h4>
						<p>+90 212 000 00 00</p>
					</div>
					<div className="contact-list mb-30">
						<h4>{tr.email}</h4>
						<p><Link href="mailto:info@manutechsolutions.com">info@manutechsolutions.com</Link></p>
					</div>
					<div className="contact-list mb-30">
						<h4>{tr.help}</h4>
						<p>{tr.helpText}</p>
					</div>
				</div>
				<div className="offCanvas__social-icon mt-30">
					<Link href="#"><i className="bi bi-facebook" /></Link>
					<Link href="#"><i className="bi bi-twitter-x" /></Link>
					<Link href="#"><i className="bi bi-linkedin" /></Link>
					<Link href="#"><i className="bi bi-instagram" /></Link>
				</div>
			</div>
			<div className={`offCanvas__overly ${isOffCanvas ? 'active' : ''}`}  onClick={handleOffCanvas}/>
		</>
	)
}
