"use client"
import Link from "next/link"
import { useState, useEffect } from 'react'
import ModalVideo from 'react-modal-video'
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getBanners, getFromCache, CACHE_KEYS } from '@/util/api'
import type { Banner } from '@/util/api'
import { useLanguage } from '@/context/LanguageContext'

export default function Hero5() {
	const { locale, t } = useLanguage()
	const [isOpen, setOpen] = useState(false)
	const [banners, setBanners] = useState<Banner[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let isMounted = true;

		async function fetchBanners() {
			// SWR: Önce cache'e bak
			const cached = getFromCache<any>(CACHE_KEYS.BANNERS);
			if (cached && isMounted) {
				const activeBanners = cached.data
					.filter((banner: any) => banner.durum === "1")
					.sort((a: any, b: any) => parseInt(a.sira || "999") - parseInt(b.sira || "999"));
				setBanners(activeBanners);
				setLoading(false);
			}

			try {
				const response = await getBanners();
				if (response?.status && Array.isArray(response.data) && isMounted) {
					// Sadece aktif (durum: "1") banner'ları filtrele ve sırala
					const activeBanners = response.data
						.filter((banner) => banner.durum === "1")
						.sort((a, b) => parseInt(a.sira || "999") - parseInt(b.sira || "999"));

					setBanners(activeBanners);
				}
			} catch (error) {
				console.error("Banner güncellenirken hata:", error);
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

			<div className="section-hero-5 position-relative" style={{ minHeight: '600px' }}>
				{/* Loading Skeleton */}
				{loading && (
					<div className="position-relative py-188 img-pull" style={{
						background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
						minHeight: '600px'
					}}>
						<div className="container position-relative z-2">
							<div className="row">
								<div className="col-lg-6">
									<div className="backdrop-filter p-8 position-relative rounded-3" style={{ background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: 'none', boxShadow: 'none' }}>
										<div className="bg-neutral-200 rounded-pill px-4 py-1 d-inline-block" style={{ width: '180px', height: '32px' }}></div>
										<div className="bg-neutral-200 rounded my-3" style={{ width: '100%', height: '120px' }}></div>
										<div className="bg-neutral-200 rounded mb-3" style={{ width: '80%', height: '24px' }}></div>
										<div className="bg-neutral-200 rounded-4" style={{ width: '200px', height: '48px' }}></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				<Swiper {...swiperOptions}
					className="swiper slider-two"
					modules={[Keyboard, Autoplay, Pagination, Navigation]}
					style={{ display: loading ? 'none' : 'block' }}
				>
					<div className="swiper-wrapper">
						{!loading && banners.length > 0 && (
							banners.map((banner, index) => (
								<SwiperSlide key={banner.id || index} className="swiper-slide">
									<div className="position-relative py-188 img-pull" style={{ backgroundImage: `url(${banner.resim})`, backgroundSize: 'cover' }}>
										<div className="container position-relative z-2">
											<div className="row">
												<div className="col-lg-6">
													<div className="backdrop-filter p-7 position-relative rounded-3" style={{ background: 'rgba(255, 255, 255, 0.34)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: 'none', boxShadow: 'none' }}>
														<h4 className="ds-5 my-3">
															{t(banner, 'baslik')}
														</h4>
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
													<div className="backdrop-filter p-8 position-relative rounded-3" style={{ background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: 'none', boxShadow: 'none' }}>
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
															Manutech Solutions, ileri teknoloji çözümlerimizle iş süreçlerinizi optimize etmeniz için profesyonel çözümler sunar.
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
													<div className="backdrop-filter p-8 position-relative rounded-3" style={{ background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: 'none', boxShadow: 'none' }}>
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
