
"use client"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getBlogBySlug, postBlogComment } from '@/util/api'
import { useLanguage } from '@/context/LanguageContext'
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

export default function BlogDetailPage() {
    const params = useParams()
    const slug = params.slug as string
    const { locale, t } = useLanguage()
    const [blog, setBlog] = useState<any>(null)
    const [images, setImages] = useState<any[]>([])
    const [comments, setComments] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [index, setIndex] = useState(0)

    // Comment Form State
    const [commentData, setCommentData] = useState({ name: '', email: '', comment: '', website: '' })
    const [replyTo, setReplyTo] = useState<{ id: number, name: string } | null>(null)
    const [commentStatus, setCommentStatus] = useState({ loading: false, success: false, error: '', message: '' })

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setCommentStatus({ loading: true, success: false, error: '', message: '' })

        // API Messages Translation Map
        const getLocalizedApiMessage = (msg: string) => {
            if (!msg) return null;
            if (locale === 'en') {
                const map: { [key: string]: string } = {
                    'Lütfen formu eksiksiz doldurunuz.': 'Please fill in all required fields.',
                    'Yorumunuz başarıyla gönderildi. Onaylandıktan sonra yayınlanacaktır.': 'Your comment has been sent successfully. It will be published after approval.',
                    'Yorum gönderilemedi.': 'Comment could not be sent.'
                };
                return map[msg] || msg;
            }
            return msg;
        }

        if (!commentData.name || !commentData.email || !commentData.comment) {
            setCommentStatus({
                loading: false,
                success: false,
                error: 'validation',
                message: locale === 'en' ? 'Please fill in required fields.' : 'Lütfen zorunlu alanları doldurunuz.'
            })
            return
        }

        try {
            const formData = {
                blog_id: blog.id,
                ad_soyad: commentData.name,
                eposta: commentData.email,
                yorum: commentData.comment,
                parent_id: replyTo ? replyTo.id : null
            }

            const res = await postBlogComment(formData)

            if (res && res.status === true) {
                const rawMsg = res.message || 'Yorumunuz başarıyla gönderildi.';
                setCommentStatus({
                    loading: false,
                    success: true,
                    error: '',
                    message: getLocalizedApiMessage(rawMsg) || ''
                })
                setCommentData({ name: '', email: '', comment: '', website: '' })
                setReplyTo(null)
            } else {
                const rawMsg = res?.message || res?.error;
                setCommentStatus({
                    loading: false,
                    success: false,
                    error: 'api',
                    message: getLocalizedApiMessage(rawMsg) || (locale === 'en' ? 'An error occurred.' : 'Bir hata oluştu.')
                })
            }
        } catch (err) {
            console.error(err)
            setCommentStatus({
                loading: false,
                success: false,
                error: 'network',
                message: locale === 'en' ? 'An error occurred.' : 'Bir hata oluştu.'
            })
        }
    }

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

    useEffect(() => {
        async function fetchBlog() {
            try {
                const response = await getBlogBySlug(slug)
                if (response && response.status === true && response.data && response.data.blog) {
                    setBlog(response.data.blog)
                    setImages(response.data.resimler || [])
                    setComments(response.data.yorumlar || [])
                }
            } catch (error) {
                console.error("Blog detayı yüklenirken hata:", error)
            } finally {
                setLoading(false)
            }
        }
        if (slug) {
            fetchBlog()
        }
    }, [slug])

    const translations = {
        tr: {
            loading: "Yükleniyor...",
            notFound: "Yazı bulunamadı.",
            backToList: "Blog Listesine Dön",
            minsRead: "okuma süresi",
            share: "Paylaş",
            leaveComment: "Bir Yorum Yapın",
            name: "Adınız Soyadınız",
            email: "E-posta",
            website: "Web Sitesi",
            comment: "Yorumunuz",
            send: "Gönder",
            reply: "Cevapla",
            comments: "Yorumlar",
            related: "İlginizi Çekebilir"
        },
        en: {
            loading: "Loading...",
            notFound: "Article not found.",
            backToList: "Back to Blog List",
            minsRead: "mins to read",
            share: "Share",
            leaveComment: "Leave a comment",
            name: "Your name *",
            email: "info@",
            website: "Website",
            comment: "Describe Your Project in Short",
            send: "Send Message",
            reply: "Reply",
            comments: "Comments",
            related: "Related Posts"
        }
    }

    const tr = locale === 'en' ? translations.en : translations.tr

    // Helper to organize comments
    const rootComments = comments.filter(c => !c.parent_id);
    const getReplies = (parentId: number) => comments.filter(c => c.parent_id == parentId);

    if (loading) {
        return (
            <Layout>
                <div className="text-center py-20">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">{tr.loading}</span>
                    </div>
                </div>
            </Layout>
        )
    }

    if (!blog) {
        return (
            <Layout>
                <div className="text-center py-20">
                    <h3>{tr.notFound}</h3>
                    <Link href="/blog" className="btn btn-primary mt-4">{tr.backToList}</Link>
                </div>
            </Layout>
        )
    }

    // Slider Images Logic
    let sliderImages = [...images];
    if (sliderImages.length === 0 && blog.kapak) {
        sliderImages.push({ url: blog.kapak, alt: 'Cover' });
    }
    if (sliderImages.length === 0) {
        sliderImages.push({ url: "/assets/imgs/blog-details/img-1.png", alt: "default" });
    }

    const hasGalleryImages = images.length > 0;

    // Prepare slides for lightbox
    const lightboxSlides = images.map(img => ({ src: img.url }));

    return (
        <Layout>
            <section>
                 {/* Standard Theme Image - Not Full Width */}
                 {/* Container is used to limit width, similar to theme blog details page */}
                <div className="container pt-4">
                    <div className="row justify-content-center">
                         <div className="col-12">
                            {/* Slider Section */}
                            <div className="position-relative group-slider rounded-4 overflow-hidden" style={{maxHeight:'500px'}}>
                                <Swiper {...swiperOptions}
                                    modules={[Autoplay, Navigation, Pagination]}
                                    className="mySwiper position-relative h-100"
                                >
                                    {sliderImages.map((img, idx) => (
                                        <SwiperSlide key={idx}>
                                            <div className="w-100 h-100 position-relative">
                                                <img
                                                    className="w-100 h-100"
                                                    src={img.url}
                                                    alt={t(blog, 'baslik')}
                                                    style={{ objectFit: 'cover', maxHeight: '500px' }}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}

                                    {/* Navigation Buttons */}
                                    <div className="swiper-button-prev d-none d-lg-flex shadow-2 position-absolute top-50 translate-middle-y bg-white ms-lg-7">
                                        <i className="bi bi-arrow-left" />
                                    </div>
                                    <div className="swiper-button-next d-none d-lg-flex shadow-2 position-absolute top-50 translate-middle-y bg-white me-lg-7">
                                        <i className="bi bi-arrow-right" />
                                    </div>
                                    <div className="swiper-pagination mb-8" />
                                </Swiper>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-10">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div className="d-flex gap-2">
                                <span className="bg-primary-soft rounded-pill px-3 fw-bold py-2 text-primary text-uppercase fs-7">
                                    {blog.k ? t(blog.k, 'kategori') : 'News'}
                                </span>
                            </div>
                            <h5 className="ds-5 mt-3 mb-4">{t(blog, 'baslik')}</h5>

                            {/* Author & Meta */}
                            <div className="d-flex align-items-center justify-content-between mt-7 py-3 border-top border-bottom">
                                <div className="d-flex align-items-center position-relative z-1">
                                    <div className="icon-shape rounded-circle border border-2 border-white">
                                        <img className="rounded-circle" src="/assets/imgs/blog-4/avatar-1.png" alt="author" />
                                    </div>
                                    <div className="ms-3">
                                        <h6 className="fs-7 m-0">{blog.yazar || blog.ky?.ad_soyad}</h6>
                                        <p className="mb-0 fs-8">{blog.tarih}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                        <path d="M12 19.25C16.0041 19.25 19.25 16.0041 19.25 12C19.25 7.99594 16.0041 4.75 12 4.75C7.99594 4.75 4.75 7.99594 4.75 12C4.75 16.0041 7.99594 19.25 12 19.25Z" stroke="#111827" strokeWidth="1.5" />
                                        <path d="M12 8V12L14 14" stroke="#111827" strokeWidth="1.5" />
                                    </svg>
                                    <span className="ms-2 fs-7 text-900">5 {tr.minsRead}</span>
                                </div>
                            </div>

                            {/* Blog Content */}
                             <div className="mt-5 blog-content" dangerouslySetInnerHTML={{ __html: t(blog, 'aciklama') }} />

                             {/* Gallery Section - Updated with Lightbox */}
                             {hasGalleryImages && (
                                <div className="mt-8 mb-5">
                                    <h4 className="mb-4">Galeri</h4>
                                    <div className="row g-4">
                                        {images.map((img, idx) => (
                                            <div key={idx} className="col-md-6" onClick={() => { setIndex(idx); setOpen(true); }} style={{cursor: 'pointer'}}>
                                                <div className="rounded-4 overflow-hidden position-relative group-image-zoom" style={{height:'300px'}}>
                                                    <img
                                                        className="w-100 h-100 object-fit-cover hover-scale transition-all duration-300"
                                                        src={img.url}
                                                        alt={`Gallery ${idx+1}`}
                                                    />
                                                    <div className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center bg-white rounded-circle shadow-sm" style={{width:'50px', height:'50px', opacity: 0.8}}>
                                                         <i className="bi bi-zoom-in text-primary fs-5"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Lightbox
                                        open={open}
                                        close={() => setOpen(false)}
                                        index={index}
                                        slides={lightboxSlides}
                                        on={{
                                            view: ({ index: newIndex }) => setIndex(newIndex),
                                        }}
                                    />
                                </div>
                             )}

                             {/* Social Share */}
                            <div className="d-flex align-items-center justify-content-between mt-5 py-3 border-top border-bottom">
                                <div className="d-lg-flex align-items-center">
                                    <p className="fw-bold text-500 mb-0 me-2">{tr.share}:</p>
                                    <div className="d-flex social-icons">
                                        <a href="#" onClick={(e) => e.preventDefault()} className=" text-900 border border-end-0  border-opacity-10 icon-shape icon-md">
                                            <i className="bi bi-facebook" />
                                        </a>
                                        <a href="#" onClick={(e) => e.preventDefault()} className=" text-900 border border-end-0  border-opacity-10 icon-shape icon-md">
                                            <i className="bi bi-twitter-x" />
                                        </a>
                                        <a href="#" onClick={(e) => e.preventDefault()} className=" text-900 border  border-opacity-10 icon-shape icon-md">
                                            <i className="bi bi-linkedin" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Comments Section */}
                            <h3 className="mt-8 pb-4">{tr.comments} ({comments.length})</h3>

                            {rootComments.map(comment => (
                                <div key={comment.id}>
                                    {/* Root Comment */}
                                    <div className="d-flex align-items-start border-top pt-6">
                                        <div className="rounded-circle border d-flex align-items-center justify-content-center me-4 bg-light" style={{width:'60px', height:'60px', minWidth:'60px'}}>
                                             <i className="bi bi-person-fill fs-3 text-secondary"></i>
                                        </div>
                                        <div className="w-100">
                                            <div className="d-flex align-items-center">
                                                <h6 className="mb-0 fs-6 text-900 fw-bold">{comment.ad_soyad}</h6>
                                                <span className="mb-0 ms-2 fs-6 text-500">
                                                    {new Date(comment.created_at).toLocaleDateString()} {new Date(comment.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </span>
                                            </div>
                                            <p className="py-3 tex-500">{comment.yorum}</p>
                                            <button onClick={(e) => { e.preventDefault(); setReplyTo({ id: comment.id, name: comment.ad_soyad }); document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth' }); }} className="d-flex align-items-center d-inline-flex mb-8 bg-transparent border-0 p-0">
                                                <span className="icon-shape icon-sm bg-white border rounded-3 me-2 p-3">
                                                    <i className="bi bi-reply text-900" />
                                                </span>
                                                <span className="text-900 fw-medium fs-7"> {tr.reply} </span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Replies */}
                                    {getReplies(comment.id).map(reply => (
                                        <div key={reply.id} className="d-flex align-items-start border-top pt-6 ms-10">
                                            <div className="rounded-circle border d-flex align-items-center justify-content-center me-4 bg-light" style={{width:'60px', height:'60px', minWidth:'60px'}}>
                                                <i className="bi bi-person-fill fs-3 text-secondary"></i>
                                            </div>
                                            <div>
                                                <div className="d-flex align-items-center">
                                                    <h6 className="mb-0 fs-6 text-900 fw-bold">{reply.ad_soyad}</h6>
                                                    <span className="mb-0 ms-2 fs-6 text-500">
                                                        {new Date(reply.created_at).toLocaleDateString()} {new Date(reply.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                    </span>
                                                </div>
                                                <p className="py-3 tex-500">{reply.yorum}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}

                            {/* Comment Form */}
                            <h3 className="mt-7 mb-4 pb-4 border-bottom" id="comment-form">{tr.leaveComment}</h3>

                            {replyTo && (
                                <div className="alert alert-info d-flex justify-content-between align-items-center mb-4">
                                    <span>
                                        {locale === 'en' ? `Replying to: ${replyTo.name}` : `Cevap veriliyor: ${replyTo.name}`}
                                    </span>
                                    <button className="btn btn-sm btn-outline-dark" onClick={() => setReplyTo(null)}>
                                        {locale === 'en' ? 'Cancel' : 'İptal'}
                                    </button>
                                </div>
                            )}

                            {commentStatus.message && (
                                <div className={`alert ${commentStatus.success ? 'alert-success' : 'alert-danger'} mb-4`}>
                                    {commentStatus.message}
                                </div>
                            )}

                            <form onSubmit={handleCommentSubmit} className="row mt-5">
                                <div className="col-md-6 col-lg-4">
                                    <div className="input-group d-flex align-items-center mb-3">
                                        <div className="icon-input border border-end-0 rounded-2 rounded-end-0 ps-3 d-flex align-items-center justify-content-center bg-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                <path d="M12 11.25C13.7949 11.25 15.25 9.79493 15.25 8C15.25 6.20507 13.7949 4.75 12 4.75C10.2051 4.75 8.75 6.20507 8.75 8C8.75 9.79493 10.2051 11.25 12 11.25Z" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M6.84723 19.25H17.1522C18.2941 19.25 19.1737 18.2681 18.6405 17.2584C17.856 15.7731 16.0677 14 11.9997 14C7.93174 14 6.1434 15.7731 5.35897 17.2584C4.8257 18.2681 5.70531 19.25 6.84723 19.25Z" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control ms-0 border rounded-2 rounded-start-0 border-start-0 bg-white"
                                            name="name"
                                            placeholder={tr.name}
                                            value={commentData.name}
                                            onChange={(e) => setCommentData({...commentData, name: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 mt-3 mt-md-0">
                                    <div className="input-group d-flex align-items-center mb-3">
                                        <div className="icon-input border border-end-0 rounded-2 rounded-end-0 ps-3 d-flex align-items-center justify-content-center bg-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                <path d="M8.89286 4.75H6.06818C5.34017 4.75 4.75 5.34017 4.75 6.06818C4.75 13.3483 10.6517 19.25 17.9318 19.25C18.6598 19.25 19.25 18.6598 19.25 17.9318V15.1071L16.1429 13.0357L14.5317 14.6468C14.2519 14.9267 13.8337 15.0137 13.4821 14.8321C12.8858 14.524 11.9181 13.9452 10.9643 13.0357C9.98768 12.1045 9.41548 11.1011 9.12829 10.494C8.96734 10.1537 9.06052 9.76091 9.32669 9.49474L10.9643 7.85714L8.89286 4.75Z" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            className="form-control ms-0 border rounded-2 rounded-start-0 border-start-0 bg-white"
                                            name="email"
                                            placeholder={tr.email}
                                            value={commentData.email}
                                            onChange={(e) => setCommentData({...commentData, email: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-4 mt-3 mt-lg-0">
                                    <div className="input-group d-flex align-items-center mb-3">
                                        <div className="icon-input border border-end-0 rounded-2 rounded-end-0 ps-3 d-flex align-items-center justify-content-center bg-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="9" stroke="#111827" strokeWidth="1.5"/>
                                                <path d="M3.6 9h16.8M3.6 15h16.8" stroke="#111827" strokeWidth="1.5"/>
                                                <path d="M12 3a15.3 15.3 0 0 0 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 0 4-9z" stroke="#111827" strokeWidth="1.5"/>
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control ms-0 border rounded-2 rounded-start-0 border-start-0 bg-white"
                                            name="website"
                                            placeholder={tr.website}
                                            value={commentData.website}
                                            onChange={(e) => setCommentData({...commentData, website: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 mt-4">
                                    <div className="input-group d-flex">
                                        <div className="icon-input pt-2 ps-3 align-items-start border border-end-0 rounded-1 rounded-end-0 bg-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" fill="none">
                                                <path d="M5.5 2.14844H3C1.89543 2.14844 1 3.04387 1 4.14844V14.6484C1 15.753 1.89543 16.6484 3 16.6484H13.5C14.6046 16.6484 15.5 15.753 15.5 14.6484V12.1484" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M17.3285 1.20344L16.4448 0.319749C16.0185 -0.106583 15.3248 -0.106583 14.8984 0.319749L7.82915 7.38907C7.76373 7.45449 7.71914 7.53782 7.70096 7.62854L7.2591 9.83772C7.22839 9.99137 7.27647 10.1502 7.38729 10.261C7.47605 10.3498 7.59561 10.3983 7.71864 10.3983C7.74923 10.3983 7.77997 10.3953 7.81053 10.3892L10.0197 9.94732C10.1104 9.92917 10.1938 9.88455 10.2592 9.81913L17.3285 2.74984C17.3285 2.74984 17.3286 2.74984 17.3286 2.74981C17.7549 2.32351 17.7549 1.6298 17.3285 1.20344ZM9.69678 9.05607L8.31606 9.33225L8.59224 7.95153L14.3461 2.19754L15.4507 3.30214L9.69678 9.05607ZM16.6658 2.0871L16.1135 2.6394L15.0089 1.53479L15.5612 0.982524C15.6221 0.921601 15.7212 0.92157 15.7821 0.982493L16.6658 1.86618C16.7267 1.92707 16.7267 2.0262 16.6658 2.0871Z" fill="#111827" />
                                            </svg>
                                        </div>
                                        <textarea
                                            className="form-control border border-start-0 ms-0 rounded-start-0 rounded-1 pb-10 bg-white"
                                            name="comment"
                                            rows={5}
                                            placeholder={tr.comment}
                                            value={commentData.comment}
                                            onChange={(e) => setCommentData({...commentData, comment: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 my-4">
                                    <button type="submit" className="btn btn-gradient rounded-pill" disabled={commentStatus.loading}>
                                        {commentStatus.loading ? (locale === 'en' ? 'Sending...' : 'Gönderiliyor...') : tr.send}
                                        {!commentStatus.loading && <i className="bi bi-arrow-right ms-2"></i>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
