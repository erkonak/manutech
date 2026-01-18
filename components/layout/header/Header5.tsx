import Link from 'next/link'
import MobileMenu from '../MobileMenu'
import Search from '../Search'
import OffCanvas from '../OffCanvas'
import ThemeSwitch from '@/components/elements/ThemeSwitch'
import Menu from '../Menu'

import LanguageSwitcher from '@/components/elements/LanguageSwitcher'

export default function Header5({ scroll, isMobileMenu, handleMobileMenu, isSearch, handleSearch, isOffCanvas, handleOffCanvas }: any) {
	return (
		<>
			<div className="top-bar position-relative z-4">
				<div className="container-fluid bg-primary">
					<div className="container-fluid py-2 px-8">
						<div className="d-flex flex-column flex-lg-row justify-content-between align-items-center">
							<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
								<a href="mailto:info@manutechsolutions.com" className="pe-4 d-none d-md-flex">
									<svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} viewBox="0 0 20 21" fill="none">
										<path d="M3.9585 6.95834C3.9585 6.03786 4.70469 5.29167 5.62516 5.29167H14.3752C15.2957 5.29167 16.0418 6.03786 16.0418 6.95834V14.0417C16.0418 14.9622 15.2957 15.7083 14.3752 15.7083H5.62516C4.70469 15.7083 3.9585 14.9622 3.9585 14.0417V6.95834Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M4.5835 5.91667L10.0002 10.7083L15.4168 5.91667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
									<span className="text-white ps-1 fs-7">info@manutechsolutions.com</span>
								</a>
								<div className="location d-flex align-items-center">
									<svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} viewBox="0 0 20 21" fill="none">
										<path d="M5.62516 16.5418H14.3751C15.2956 16.5418 16.0418 15.7957 16.0418 14.8752V8.6252L10.0001 4.45853L3.9585 8.6252V14.8752C3.9585 15.7957 4.7047 16.5418 5.62516 16.5418Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M8.12476 13.6244C8.12476 12.7039 8.87098 11.9577 9.7914 11.9577H10.2081C11.1286 11.9577 11.8747 12.7039 11.8747 13.6244V16.5411H8.12476V13.6244Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
									<span className="text-white ps-1 fs-7">Istanbul, Turkey</span>
								</div>
							</div>
							<div className="d-flex d-none d-lg-flex align-items-center justify-content-center justify-content-lg-end">
								<svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} viewBox="0 0 20 21" fill="none">
									<path d="M10.0002 16.5417C13.3369 16.5417 16.0418 13.8367 16.0418 10.5C16.0418 7.16327 13.3369 4.45833 10.0002 4.45833C6.66344 4.45833 3.9585 7.16327 3.9585 10.5C3.9585 13.8367 6.66344 16.5417 10.0002 16.5417Z" stroke="white" strokeWidth="1.5" />
									<path d="M10 7.16667V10.5L11.6667 12.1667" stroke="white" strokeWidth="1.5" />
								</svg>
								<span className="text-white pe-3 ps-1 fs-7">Pzt-Cuma: 09:00 - 18:00</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<header>
				<nav className={`navbar navbar-expand-lg navbar-light w-100 border-bottom z-999 ${scroll ? 'navbar-stick' : ''}`} style={{ position: `${scroll? "fixed" : "relative"}`, top: `${scroll? "0" : "auto"}`, bottom: `${scroll? "auto" : "0"}` }}>
					<div className="container-fluid px-lg-8">
						<Link className="navbar-brand d-flex main-logo align-items-center" href="/">
							<img src="/assets/imgs/template/favicon.svg" alt="Manutech" />
							<span>Manutech Solutions</span>
						</Link>
						<Menu />
						<div className="d-flex align-items-center pe-5 pe-lg-0 me-5 me-lg-0">
							<LanguageSwitcher />
							<ThemeSwitch />
							<a href="/iletisim" className="btn btn-gradient d-none d-md-block ms-3">
								Teklif Alın
								<svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width={19} height={18} viewBox="0 0 19 18" fill="none">
									<g clipPath="url(#clip0_474_2370)">
										<path className="fill-white" d="M13.5633 4.06331L12.7615 4.86512L16.3294 8.43305H0.5V9.56699H16.3294L12.7615 13.1349L13.5633 13.9367L18.5 8.99998L13.5633 4.06331Z" fill="white" />
									</g>
									<defs>
										<clipPath>
											<rect width={18} height={18} fill="white" transform="translate(0.5)" />
										</clipPath>
									</defs>
								</svg>
							</a>
							<div className="burger-icon burger-icon-white border rounded-3" onClick={handleMobileMenu}>
								<span className="burger-icon-top" />
								<span className="burger-icon-mid" />
								<span className="burger-icon-bottom" />
							</div>
						</div>
					</div>
				</nav>

				<OffCanvas handleOffCanvas={handleOffCanvas} isOffCanvas={isOffCanvas} />
				<Search isSearch={isSearch} handleSearch={handleSearch} />
				<MobileMenu handleMobileMenu={handleMobileMenu} isMobileMenu={isMobileMenu} />
			</header>

		</>
	)
}
