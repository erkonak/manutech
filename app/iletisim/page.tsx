
"use client"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { sendContactForm } from '@/util/api'
import './contact-styles.css'
import { useSiteInfo } from '@/context/SiteInfoContext'

export default function ContactPage() {
    const { locale } = useLanguage()
    const { siteInfo } = useSiteInfo()
    const formContainerRef = useRef<HTMLDivElement>(null)
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        firma: ''
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess(false)

        // API Messages Translation Map
        const getLocalizedApiMessage = (msg: string) => {
            if (!msg) return null;
            if (locale === 'en') {
                const map: { [key: string]: string } = {
                    'Lütfen formu eksiksiz doldurunuz.': 'Please fill in all required fields.',
                    'Mesajınız başarıyla iletildi. En kısa sürede dönüş sağlanacaktır.': 'Your message has been sent successfully. We will get back to you as soon as possible.',
                    'Mesaj iletilemedi.': 'Message could not be sent.'
                };
                return map[msg] || msg;
            }
            return msg;
        }

        try {
            // Map frontend form fields to API expected field names
            const apiData = {
                ad_soyad: formData.name,
                mail: formData.email,
                telefon: formData.phone, // API'ye boşluklu formatta gönderiliyor
                konu: formData.subject,
                mesaj: formData.message,
                firma: formData.company
            }

            const response = await sendContactForm(apiData)

            // Check if the response indicates success
            if (response && response.status === true) {
                setSuccess(true)
                setFormData({
                    name: '',
                    company: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: '',
                    firma: ''
                })
                // Auto-hide success message after 5 seconds
                setTimeout(() => setSuccess(false), 5000)

                // Scroll to top of the form for mobile users
                formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            } else {
                // Handle API error messages
                const rawMsg = response?.message || response?.error || '';
                const errorMessage = getLocalizedApiMessage(rawMsg) || (locale === 'en' ? 'An error occurred. Please try again.' : 'Bir hata oluştu. Lütfen tekrar deneyiniz.')
                setError(errorMessage)

                // Scroll to top of the form for mobile users
                formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        } catch (err: any) {
            console.error('Contact form error:', err)
            const errorMessage = err?.message || (locale === 'en' ? 'An error occurred. Please try again.' : 'Bir hata oluştu. Lütfen tekrar deneyiniz.')
            setError(errorMessage)

            // Scroll to top of the form for mobile users
            formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } finally {
            setLoading(false)
        }
    }

    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/\D/g, ''); // Sadece rakamları al
        const char = { 3: ' ', 6: ' ', 8: ' ' };
        let formatted = '';
        for (let i = 0; i < Math.min(numbers.length, 10); i++) {
            formatted += (char[i as keyof typeof char] || '') + numbers[i];
        }
        return formatted;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            setFormData({
                ...formData,
                phone: formatPhoneNumber(value)
            })
        } else {
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }

    const translations = {
        tr: {
            home: "Anasayfa",
            contact: "İletişim",
            getInTouch: "İletişime Geçin",
            subtitle: "Projeleriniz için en uygun çözümleri sunmak üzere yanınızdayız.",
            office: "Ofisimiz",
            address: "İstanbul, Türkiye",
            email: "E-posta",
            phone: "Telefon",
            workingHours: "Çalışma Saatleri",
            hours: "Pzt - Cum: 09:00 - 18:00",
            formTitle: "Bize Mesaj Gönderin",
            name: "Adınız Soyadınız",
            company: "Firma Adı",
            emailLabel: "E-posta Adresiniz",
            phoneLabel: "Telefon Numaranız",
            subject: "Konu",
            subjectPlaceholder: "Seçiniz...",
            software: "Yazılım Çözümleri",
            post: "Post Desteği",
            training: "Eğitim",
            other: "Diğer",
            message: "Mesajınız",
            send: "Gönder",
            sending: "Gönderiliyor...",
            success: "Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.",
            error: "Mesaj gönderilirken bir hata oluştu.",
            mapTitle: "Konumumuz"
        },
        en: {
            home: "Home",
            contact: "Contact",
            getInTouch: "Get In Touch",
            subtitle: "We are here to provide the most suitable solutions for your projects.",
            office: "Our Office",
            address: "Istanbul, Turkey",
            email: "Email",
            phone: "Phone",
            workingHours: "Working Hours",
            hours: "Mon - Fri: 09:00 - 18:00",
            formTitle: "Send Us a Message",
            name: "Full Name",
            company: "Company Name",
            emailLabel: "Email Address",
            phoneLabel: "Phone Number",
            subject: "Subject",
            subjectPlaceholder: "Select...",
            software: "Software Solutions",
            post: "Post Support",
            training: "Training",
            other: "Other",
            message: "Your Message",
            send: "Send Message",
            sending: "Sending...",
            success: "Your message has been sent successfully. We will contact you as soon as possible.",
            error: "An error occurred while sending the message.",
            mapTitle: "Our Location"
        }
    }

    const tr = locale === 'en' ? translations.en : translations.tr

    return (
        <Layout>
            <section className="section-page-header py-10 fix position-relative">
                <div className="container position-relative z-1">
                    <div className="text-start">
                        <h3>{tr.contact}</h3>
                        <div className="d-flex">
                            <Link href="/">
                                <p className="mb-0 text-900">{tr.home}</p>
                            </Link>
                            <svg className="mx-3 mt-1" xmlns="http://www.w3.org/2000/svg" width={8} height={13} viewBox="0 0 8 13" fill="none">
                                <path className="stroke-dark" d="M1 1.5L6.5 6.75L1 12" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-primary mb-0">{tr.contact}</p>
                        </div>
                    </div>
                </div>
                <img className="position-absolute bottom-0 start-0 end-0 top-0 z-0" src="/assets/imgs/page-header/bg-line.png" alt="bg" />
            </section>

            <section className="section-contact-1 py-10">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="d-flex align-items-center justify-content-center bg-primary-soft-keep border border-2 border-white-keep d-inline-flex rounded-pill px-4 py-2">
                                <img src="/assets/imgs/features-1/dots.png" alt="infinia" />
                                <span className="tag-spacing fs-7 fw-bold text-linear-2 ms-2 text-uppercase">{tr.contact}</span>
                            </div>
                            <h5 className="ds-5 mt-3 mb-3 text-white">{tr.getInTouch}</h5>
                            <span className="fs-5 fw-medium text-white">
                                {/* Site Info'dan gelen metni dile göre seç (en ise _en ekli halini al, yoksa normalini al) */}
                                {(locale === 'en' ? siteInfo?.iletisim_metni_en : siteInfo?.iletisim_metni) || tr.subtitle}
                            </span>
                            <div className="d-flex pt-6 pb-3 align-items-center">
                                <div className="bg-white-keep icon-flip position-relative icon-shape icon-xxl rounded-3">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <i className="bi bi-geo-alt-fill text-primary fs-2"></i>
                                    </div>
                                </div>
                                <div className="ps-5">
                                    <h6 className="text-white">{tr.office}</h6>
                                    <p className="text-white mb-0">{siteInfo?.adres || tr.address}</p>
                                </div>
                            </div>
                            <div className="d-flex pt-3 pb-3 align-items-center">
                                <div className="bg-white-keep icon-flip position-relative icon-shape icon-xxl rounded-3">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <i className="bi bi-envelope-fill text-primary fs-2"></i>
                                    </div>
                                </div>
                                <div className="ps-5">
                                    <h6 className="text-white">{tr.email}</h6>
                                    <p className="text-white mb-0"><a href={`mailto:${siteInfo?.mail}`} className="text-white">{siteInfo?.mail}</a></p>
                                </div>
                            </div>
                            <div className="d-flex pt-3 pb-3 align-items-center">
                                <div className="bg-white-keep icon-flip position-relative icon-shape icon-xxl rounded-3">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <i className="bi bi-telephone-fill text-primary fs-2"></i>
                                    </div>
                                </div>
                                <div className="ps-5">
                                    <h6 className="text-white">{tr.phone}</h6>
                                    <p className="text-white mb-0">
                                        <a href={`tel:+90${siteInfo?.telefon}`} className="text-white">{'+90 ' + siteInfo?.telefon}</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 ps-lg-0 pt-5 pt-lg-0">
                            <div className="position-relative">
                                <div ref={formContainerRef} className="position-relative z-2 p-3 p-md-5 p-lg-8 rounded-3 bg-primary">
                                    <h3 className="text-white mb-4">{tr.formTitle}</h3>
                                    {success && (
                                        <div className="alert alert-success mb-4">{tr.success}</div>
                                    )}
                                    {error && (
                                        <div className="alert alert-danger mb-4">{error}</div>
                                    )}
                                    {!success && (
                                        <form onSubmit={handleSubmit}>
                                            <div className="row mt-5">
                                                <div className="col-md-6 mb-4">
                                                    <div className="input-group d-flex align-items-center">
                                                         <div className="icon-input border border-white border-end-0 rounded-2 rounded-end-0 ps-3 d-flex align-items-center justify-content-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                <path d="M12 11.25C13.7949 11.25 15.25 9.79493 15.25 8C15.25 6.20507 13.7949 4.75 12 4.75C10.2051 4.75 8.75 6.20507 8.75 8C8.75 9.79493 10.2051 11.25 12 11.25Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M6.84723 19.25H17.1522C18.2941 19.25 19.1737 18.2681 18.6405 17.2584C17.856 15.7731 16.0677 14 11.9997 14C7.93174 14 6.1434 15.7731 5.35897 17.2584C4.8257 18.2681 5.70531 19.25 6.84723 19.25Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                        <input type="text" className="form-control ms-0 border border-white rounded-2 rounded-start-0 border-start-0 bg-transparent text-white placeholder-white" style={{color: 'white'}} name="name" placeholder={tr.name} value={formData.name} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                     <div className="input-group d-flex align-items-center">
                                                        <div className="icon-input border border-white border-end-0 rounded-2 rounded-end-0 ps-3 d-flex align-items-center justify-content-center">
                                                           <i className="bi bi-building text-white fs-5"></i>
                                                        </div>
                                                        <input type="text" className="form-control ms-0 border border-white rounded-2 rounded-start-0 border-start-0 bg-transparent text-white placeholder-white" style={{color: 'white'}} name="company" placeholder={tr.company} value={formData.company} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="icon-input border border-white border-end-0 rounded-2 rounded-end-0 ps-3 d-flex align-items-center justify-content-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                <path d="M8.89286 4.75H6.06818C5.34017 4.75 4.75 5.34017 4.75 6.06818C4.75 13.3483 10.6517 19.25 17.9318 19.25C18.6598 19.25 19.25 18.6598 19.25 17.9318V15.1071L16.1429 13.0357L14.5317 14.6468C14.2519 14.9267 13.8337 15.0137 13.4821 14.8321C12.8858 14.524 11.9181 13.9452 10.9643 13.0357C9.98768 12.1045 9.41548 11.1011 9.12829 10.494C8.96734 10.1537 9.06052 9.76091 9.32669 9.49474L10.9643 7.85714L8.89286 4.75Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                        <input type="email" className="form-control ms-0 border border-white rounded-2 rounded-start-0 border-start-0 bg-transparent text-white placeholder-white" style={{color: 'white'}} name="email" placeholder={tr.emailLabel} value={formData.email} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="icon-input border border-white border-end-0 rounded-2 rounded-end-0 ps-3 d-flex align-items-center justify-content-center">
                                                            <i className="bi bi-telephone-fill text-white fs-5"></i>
                                                        </div>
                                                        <input type="tel" className="form-control ms-0 border border-white rounded-2 rounded-start-0 border-start-0 bg-transparent text-white placeholder-white" style={{color: 'white'}} name="phone" placeholder={tr.phoneLabel} value={formData.phone} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-12 mb-4">
                                                    <label className="text-white mb-3 d-flex align-items-center">
                                                        <i className="bi bi-tag-fill me-2"></i>
                                                        <span className="fw-medium">{tr.subject}</span>
                                                    </label>
                                                    <div className="d-flex flex-wrap gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => setFormData({...formData, subject: 'yazilim_cozumleri'})}
                                                            className={`btn rounded-pill px-4 py-2 subject-btn text-white ${formData.subject === 'yazilim_cozumleri' ? 'active text-primary fw-semibold' : ''}`}
                                                        >
                                                            {tr.software}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setFormData({...formData, subject: 'post_destegi'})}
                                                            className={`btn rounded-pill px-4 py-2 subject-btn text-white ${formData.subject === 'post_destegi' ? 'active text-primary fw-semibold' : ''}`}
                                                        >
                                                            {tr.post}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setFormData({...formData, subject: 'egitim'})}
                                                            className={`btn rounded-pill px-4 py-2 subject-btn text-white ${formData.subject === 'egitim' ? 'active text-primary fw-semibold' : ''}`}
                                                        >
                                                            {tr.training}
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => setFormData({...formData, subject: 'diger'})}
                                                            className={`btn rounded-pill px-4 py-2 subject-btn text-white ${formData.subject === 'diger' ? 'active text-primary fw-semibold' : ''}`}
                                                        >
                                                            {tr.other}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-12 mb-4">
                                                    <div className="input-group d-flex">
                                                        <div className="icon-input pt-2 ps-3 align-items-start border border-white border-end-0 rounded-1 rounded-end-0">
                                                            <i className="bi bi-chat-left-text-fill text-white fs-5"></i>
                                                        </div>
                                                        <textarea className="form-control border border-white border-start-0 ms-0 rounded-start-0 rounded-1 pb-10 bg-transparent text-white placeholder-white" style={{color: 'white'}} rows={5} name="message" value={formData.message} onChange={handleChange} placeholder={tr.message}></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <button type="submit" className="btn bg-white text-primary hover-up mt-3" disabled={loading}>
                                                        {loading ? tr.sending : tr.send}
                                                        <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                            <path d="M21.1059 12.2562H0.5V11.7443H21.1059H22.313L21.4594 10.8907L17.0558 6.48705L17.4177 6.12508L23.2929 12.0002L17.4177 17.8754L17.0558 17.5134L21.4594 13.1098L22.313 12.2562H21.1059Z" fill="black" stroke="#6D4DF2" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </div>
                                <div className="z-0 bg-primary-dark rectangle-bg z-1 rounded-3" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-map">
                <div>
                    <div className="border shadow-sm" style={{ height: '400px' }}>
                        {siteInfo?.harita_iframe ? (
                            <div dangerouslySetInnerHTML={{ __html: siteInfo.harita_iframe }} style={{ width: '100%', height: '100%' }} />
                        ) : (
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.6504900115626!2d29.02053177651817!3d40.99042897135252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab8631627c02b%3A0x8e831637e1087814!2zS2FkxLFrw7Y5LCDEsHN0YW5idWw!5e0!3m2!1str!2str!4v1705663673620!5m2!1str!2str"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    )
}
