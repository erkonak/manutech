"use client"
import Link from "next/link"
import { useState, useEffect } from 'react'
import ModalVideo from 'react-modal-video'
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getBanners } from '@/util/api'
import { useLanguage } from '@/context/LanguageContext'

const BANNERS_CACHE_KEY = 'banners-cache';
const BANNERS_CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 saat

// Banner cache'den veri okuma helper fonksiyonu
function getCachedBanners(): any[] | null {
	if (typeof window === 'undefined') return null;

	try {
		const cachedData = localStorage.getItem(BANNERS_CACHE_KEY);
		if (cachedData) {
			const { data, timestamp } = JSON.parse(cachedData);
			const now = Date.now();

			// Cache geçerli mi kontrol et
			if (now - timestamp < BANNERS_CACHE_EXPIRY) {
				return data;
			}
		}
	} catch (error) {
		console.error("Banner cache okunurken hata:", error);
	}

	return null;
}

export default function Hero5() {
	const { locale, t } = useLanguage()
	const [isOpen, setOpen] = useState(false)
	// Hydration hatası önlemek için initial state her zaman boş array (server ve client aynı başlasın)
	const [banners, setBanners] = useState<any[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let isMounted = true;

		async function fetchBanners() {
			// Önce cache'den senkron kontrol et (client-side'da hızlı yükleme için)
			const cachedBanners = getCachedBanners();
			if (cachedBanners && cachedBanners.length > 0 && isMounted) {
				// Cache geçerli, hemen state'i güncelle (senkron, anında görünsün)
				setBanners(cachedBanners);
				setLoading(false);
				return; // Cache geçerli, API çağrısı yapma
			}

			// Cache yoksa veya süresi dolmuşsa API'den çek
			try {
				const response = await getBanners();
				if (response && response.status === true && Array.isArray(response.data) && isMounted) {
					// Sadece aktif (durum: "1") banner'ları filtrele ve sırala
					const activeBanners = response.data
						.filter((banner: any) => banner.durum === "1")
						.sort((a: any, b: any) => parseInt(a.sira || "999") - parseInt(b.sira || "999"));

					setBanners(activeBanners);

					// Yeni veriyi cache'e kaydet
					if (typeof window !== 'undefined') {
						localStorage.setItem(BANNERS_CACHE_KEY, JSON.stringify({
							data: activeBanners,
							timestamp: Date.now()
						}));
					}
				}
			} catch (error) {
				console.error("Banner yüklenirken hata:", error);
				// Hata durumunda cache'den yükle (varsa)
				const fallbackCache = getCachedBanners();
				if (fallbackCache && fallbackCache.length > 0 && isMounted) {
					setBanners(fallbackCache);
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		}

		fetchBanners();

		return () => {
			isMounted = false;
		};
	}, [])

	const swiperOptions = {
		slidesPerView: 1,
		// spaceBetween: 20,
		slidesPerGroup: 1,
		centeredSlides: false,
		loop: true,
		autoplay: {
			delay: 4000,
		},
		pagination: {
			el: '.swiper-pagination',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	}


	return (
		<>

			<div className="section-hero-5 position-relative">
				<Swiper {...swiperOptions}
					className="swiper slider-two"
					modules={[Keyboard, Autoplay, Pagination, Navigation]}
				>
					<div className="swiper-wrapper">
						{!loading && banners.length > 0 && (
							banners.map((banner, index) => (
								<SwiperSlide key={banner.id || index} className="swiper-slide">
									<div className="position-relative py-188 img-pull" style={{ backgroundImage: `url(${banner.resim})`, backgroundSize: 'cover' }}>
										<div className="container position-relative z-2">
											<div className="row">
												<div className="col-lg-6">
													<div className="backdrop-filter p-8 position-relative rounded-3">
														<div className="bg-white bg-opacity-50 border border-primary-soft d-inline-flex rounded-pill px-4 py-1">
															<span className="tag-spacing fs-6 text-primary">🚀 {locale === 'en' ? 'Welcome' : locale === 'ar' ? 'مرحبا' : 'Hoş Geldiniz'}</span>
														</div>
														<h3 className="ds-3 my-3">
															{t(banner, 'baslik')}
														</h3>
														<p className="fs-5 text-900">
															{t(banner, 'aciklama')}
														</p>
														{(banner.url && banner.url.trim().length > 1) && (
															<div className="d-flex flex-column flex-md-row align-items-center mt-4">
																<Link href={banner.url} className="btn btn-gradient rounded-4">
																	{locale === 'en' ? 'Learn More' : locale === 'ar' ? 'المزيد' : 'Daha Fazla'}
																	<svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
																		<path d="M17.25 15.25V6.75H8.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
																		<path d="M17 7L6.75 17.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
																	</svg>
																</Link>
															</div>
														)}
													</div>
												</div>
											</div>
										</div>
										<div className="position-absolute top-0 start-0 z-0">
											<img src="/assets/imgs/hero-5/img-bg-line.png" alt="infinia" />
										</div>
									</div>
								</SwiperSlide>
							))
						)}
						{!loading && banners.length === 0 && (
							<>
								<SwiperSlide className="swiper-slide">
									<div className="position-relative py-188 img-pull" style={{ backgroundImage: `url(/assets/imgs/hero-5/img-bg-1.png` }}>
										<div className="container position-relative z-2">
											<div className="row">
												<div className="col-lg-6">
													<div className="backdrop-filter p-8 position-relative rounded-3">
														<div className="bg-white bg-opacity-50 border border-primary-soft d-inline-flex rounded-pill px-4 py-1">
															<span className="tag-spacing fs-6 text-primary">🚀 Manutech Solutions</span>
														</div>
														<h3 className="ds-3 my-3">İnovasyon İçin
															<span className="fw-regular">
																En İyi <br />
																<img className="alltuchtopdown img-fluid filter-invert" src="/assets/imgs/hero-5/icon-1.svg" alt="infinia" />
																Çözümler
															</span>
														</h3>
														<p className="fs-5 text-900">
															Manutech Solutions, iş danışmanlığı için geniş bir danışmanlık ve eğitim yelpazesi sunar.
														</p>
														<div className="d-flex flex-column flex-md-row align-items-center">
															<Link href="/page-services-1" className="btn btn-gradient rounded-4">
																Hizmetlerimizi Görüntüleyin
																<svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
																	<path d="M17.25 15.25V6.75H8.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
																	<path d="M17 7L6.75 17.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
																</svg>
															</Link>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="position-absolute top-0 start-0 z-0">
											<img src="/assets/imgs/hero-5/img-bg-line.png" alt="infinia" />
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide className="swiper-slide">
									<div className="position-relative py-188 img-pull" style={{ backgroundImage: `url(/assets/imgs/hero-5/img-bg-2.png` }}>
										<div className="container position-relative z-2">
											<div className="row">
												<div className="col-lg-6">
													<div className="backdrop-filter p-8 position-relative rounded-3">
														<div className="bg-white bg-opacity-50 border border-primary-soft d-inline-flex rounded-pill px-4 py-1">
															<span className="tag-spacing fs-6 text-primary">🚀 Manutech Solutions</span>
														</div>
														<h3 className="ds-3 my-3">Geleceği
															<span className="fw-regular">
																Birlikte <br />
																<img className="alltuchtopdown img-fluid filter-invert" src="/assets/imgs/hero-5/icon-1.svg" alt="infinia" />
																İnşa Edelim
															</span>
														</h3>
														<p className="fs-5 text-900">
															İleri teknoloji çözümlerimizle iş süreçlerinizi optimize edin.
														</p>
														<div className="d-flex flex-column flex-md-row align-items-center">
															<Link href="/page-services-1" className="btn btn-gradient rounded-4">
																Detaylı Bilgi
																<svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
																	<path d="M17.25 15.25V6.75H8.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
																	<path d="M17 7L6.75 17.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
																</svg>
															</Link>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="position-absolute top-0 start-0 z-0">
											<img src="/assets/imgs/hero-5/img-bg-line.png" alt="infinia" />
										</div>
									</div>
								</SwiperSlide>
							</>
						)}
					</div>
					<div className="swiper-button-prev d-none d-lg-flex shadow-2 position-absolute top-50 translate-middle-y bg-white ms-lg-7">
						<i className="bi bi-arrow-left" />
					</div>
					<div className="swiper-button-next d-none d-lg-flex shadow-2 position-absolute top-50 translate-middle-y bg-white me-lg-7">
						<i className="bi bi-arrow-right" />
					</div>
					<div className="swiper-pagination mb-8" />
				</Swiper>
			</div>


			<ModalVideo channel='youtube' isOpen={isOpen} videoId="gXFATcwrO-U" onClose={() => setOpen(false)} />
		</>
	)
}
