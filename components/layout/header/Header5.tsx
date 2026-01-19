"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import MobileMenu from '../MobileMenu'
import Search from '../Search'
import OffCanvas from '../OffCanvas'
import ThemeSwitch from '@/components/elements/ThemeSwitch'
import Menu from '../Menu'
import { useSiteInfo } from '@/context/SiteInfoContext'
import LanguageSwitcher from '@/components/elements/LanguageSwitcher'

export default function Header5({ scroll, scrollDirection, isMobileMenu, handleMobileMenu, isSearch, handleSearch, isOffCanvas, handleOffCanvas }: any) {
	const { siteInfo } = useSiteInfo()
	const [isMobile, setIsMobile] = useState<boolean>(false)
	const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true)

	useEffect(() => {
		// Mobil cihaz kontrolü
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 992) // Bootstrap lg breakpoint
		}

		checkMobile()
		window.addEventListener('resize', checkMobile)

		return () => {
			window.removeEventListener('resize', checkMobile)
		}
	}, [])

	useEffect(() => {
		// Mobilde scroll yönüne göre header'ı gizle/göster
		if (isMobile && scroll) {
			if (scrollDirection === 'down') {
				// Aşağı scroll - header'ı gizle
				setIsHeaderVisible(false)
			} else if (scrollDirection === 'up') {
				// Yukarı scroll - header'ı göster
				setIsHeaderVisible(true)
			}
		} else {
			// Desktop veya sayfa üstünde - her zaman göster
			setIsHeaderVisible(true)
		}
	}, [scroll, scrollDirection, isMobile])

	return (
		<>
			<div className={`top-bar position-relative z-4 ${scroll ? 'd-none' : ''}`} style={{ transition: 'opacity 0.3s ease-in-out' }}>
				<div className="container-fluid bg-primary">
					<div className="container-fluid py-2 px-8">
						<div className="d-flex flex-column flex-lg-row justify-content-between align-items-center">
							<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
								{siteInfo?.mail && (
									<a href={`mailto:${siteInfo.mail}`} className="pe-4 d-none d-md-flex">
										<svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} viewBox="0 0 20 21" fill="none">
											<path d="M3.9585 6.95834C3.9585 6.03786 4.70469 5.29167 5.62516 5.29167H14.3752C15.2957 5.29167 16.0418 6.03786 16.0418 6.95834V14.0417C16.0418 14.9622 15.2957 15.7083 14.3752 15.7083H5.62516C4.70469 15.7083 3.9585 14.9622 3.9585 14.0417V6.95834Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M4.5835 5.91667L10.0002 10.7083L15.4168 5.91667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
										<span className="text-white ps-1 fs-7">{siteInfo?.mail}</span>
									</a>
								)}
								{siteInfo?.telefon && (
									<a href={`tel:${siteInfo.telefon.replace(/\s/g, '')}`} className="pe-4 d-none d-md-flex">
										<svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} viewBox="0 0 20 21" fill="none">
											<path d="M16.6667 13.875C15.8458 13.875 15.0417 13.7792 14.2708 13.5958C13.9292 13.5042 13.5542 13.6 13.2875 13.8667L11.1792 15.975C8.15417 14.6458 5.35417 11.8625 4.04167 8.8375L6.13333 6.7125C6.4 6.44583 6.49583 6.07083 6.40417 5.72917C6.22083 4.95833 6.125 4.15417 6.125 3.33333C6.125 2.77917 5.67917 2.33333 5.125 2.33333H3.33333C2.77917 2.33333 2.33333 2.77917 2.33333 3.33333C2.33333 11.5292 9.47083 18.6667 17.6667 18.6667C18.2208 18.6667 18.6667 18.2208 18.6667 17.6667V15.875C18.6667 15.3208 18.2208 14.875 17.6667 14.875H16.6667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
										<span className="text-white ps-1 fs-7">+90 {siteInfo?.telefon}</span>
									</a>
								)}
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

			<header className={!isHeaderVisible ? 'header-hidden' : ''} style={{ 
				transform: !isHeaderVisible ? 'translateY(-100%)' : 'translateY(0)',
				transition: 'transform 0.3s ease-in-out',
				position: scroll ? 'fixed' : 'relative',
				top: scroll ? '0' : 'auto',
				width: '100%',
				zIndex: 999
			}}>
				<nav className={`navbar navbar-expand-lg navbar-light w-100 border-bottom z-999 ${scroll ? 'navbar-stick' : ''}`}>
					<div className="container-fluid px-lg-8">
						<Link className="navbar-brand d-flex main-logo align-items-center" href="/">
							{siteInfo?.logo ? (
								<img src={siteInfo.logo} alt={siteInfo.firma_adi || "Logo"} style={{ width: siteInfo.logo_w ? `${siteInfo.logo_w}px` : 'auto', height: siteInfo.logo_h ? `${siteInfo.logo_h}px` : 'auto' }} />
							) : (
								<img src="https://demo.eemre.tr/assets/img/site/logo/logo.png" width={200} height={60} alt="Logo" />
							)}
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
