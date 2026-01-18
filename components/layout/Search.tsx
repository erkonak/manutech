
"use client"
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function Search({ isSearch, handleSearch }: any) {
    const { locale } = useLanguage()

    const translations = {
        tr: {
            title: "Ne arıyorsunuz?",
            subtitle: "Hizmetlerimizi keşfedin ve hedeflerinize ulaşmanıza nasıl yardımcı olabileceğimizi görün.",
            placeholder: "Anahtar Kelime Girin",
            suggest: "Öneriler:",
            tags: ["CAD", "CAM", "Post", "Eğitim", "Danışmanlık", "NX", "SolidCAM"]
        },
        en: {
            title: "What are you looking for?",
            subtitle: "Explore our services and discover how we can help you achieve your goals",
            placeholder: "Enter Your Keywords",
            suggest: "Suggest:",
            tags: ["CAD", "CAM", "Post", "Training", "Consultancy", "NX", "SolidCAM"]
        }
    }

    const tr = locale === 'en' ? translations.en : translations.tr

	return (
		<>
			{/* Offcanvas search */}
			<div className={`offcanvas offcanvas-top offcanvasTop h-50 ${isSearch ? 'show' : ''}`} tabIndex={-1}>
				<div className="offcanvas-header">
					<button className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleSearch} />
				</div>
				<div className="offcanvas-body">
					<div className="container">
						<div className="row py-md-5 py-2">
							<div className="col-12 col-lg-8 mx-auto">
								<h4 className="mb-2 fs-sm-5">{tr.title}</h4>
								<p className="text-500 fs-6 mb-5">{tr.subtitle}</p>
								<div className="input-group" data-aos="zoom-in">
									<input type="text" className="form-control ps-5 rounded-start-pill" name="name" placeholder={tr.placeholder} />
									<button className="btn btn-primary rounded-end-pill">
										<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
											<path d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</button>
								</div>
								<div className="d-flex flex-column flex-lg-row mt-5">
									<h6 className="d-inline me-2">{tr.suggest}</h6>
									<div className="d-flex flex-wrap gap-2">
                                        {tr.tags.map((tag, index) => (
                                            <Link key={index} href="#">{tag}</Link>
                                        ))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
