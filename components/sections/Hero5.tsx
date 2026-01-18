"use client"
import Link from "next/link"
import { useState, useEffect } from 'react'
import ModalVideo from 'react-modal-video'
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getBanners } from '@/util/api'
import { useLanguage } from '@/context/LanguageContext'

export default function Hero5() {
	const { t } = useLanguage()
	const [isOpen, setOpen] = useState(false)
	const [banners, setBanners] = useState<any[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchBanners() {
			const data = await getBanners()
			if (data && data.success) {
				setBanners(data.data)
			}
			setLoading(false)
		}
		fetchBanners()
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
						{banners.length > 0 ? (
							banners.map((banner, index) => (
								<SwiperSlide key={index} className="swiper-slide">
									<div className="position-relative py-188 img-pull" style={{ backgroundImage: `url(${banner.image})`, backgroundSize: 'cover' }}>
										<div className="container position-relative z-2">
											<div className="row">
												<div className="col-lg-6">
													<div className="backdrop-filter p-8 position-relative rounded-3">
														<div className="bg-white bg-opacity-50 border border-primary-soft d-inline-flex rounded-pill px-4 py-1">
															<span className="tag-spacing fs-6 text-primary">🚀 {t(banner, 'subtitle') || 'Welcome'}</span>
														</div>
														<h3 className="ds-3 my-3">
															{t(banner, 'title')}
														</h3>
														<p className="fs-5 text-900">
															{t(banner, 'description')}
														</p>
														<div className="d-flex flex-column flex-md-row align-items-center">
															{banner.button_link && (
																<Link href={banner.button_link} className="btn btn-gradient rounded-4">
																	{t(banner, 'button_text') || 'Daha Fazla'}
																	<svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
																		<path d="M17.25 15.25V6.75H8.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
																		<path d="M17 7L6.75 17.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
																	</svg>
																</Link>
															)}
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
							))
						) : (
							<>
								<SwiperSlide className="swiper-slide">
									<div className="position-relative py-188 img-pull" style={{ backgroundImage: `url(/assets/imgs/hero-5/img-bg-1.png` }}>
										<div className="container position-relative z-2">
											<div className="row">
												<div className="col-lg-6">
													<div className="backdrop-filter p-8 position-relative rounded-3">
														<div className="bg-white bg-opacity-50 border border-primary-soft d-inline-flex rounded-pill px-4 py-1">
															<span className="tag-spacing fs-6 text-primary">🚀 Erkonak Manutech</span>
														</div>
														<h3 className="ds-3 my-3">İnovasyon İçin
															<span className="fw-regular">
																En İyi <br />
																<img className="alltuchtopdown img-fluid filter-invert" src="/assets/imgs/hero-5/icon-1.svg" alt="infinia" />
																Çözümler
															</span>
														</h3>
														<p className="fs-5 text-900">
															Erkonak Manutech, iş danışmanlığı için geniş bir danışmanlık ve eğitim yelpazesi sunar.
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
															<span className="tag-spacing fs-6 text-primary">🚀 Erkonak Manutech</span>
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
