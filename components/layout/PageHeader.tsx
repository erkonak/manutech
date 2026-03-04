"use client"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { useApi } from "@/hooks/useApi"
import { getPageBanner } from "@/util/api"

interface PageHeaderProps {
    title: string
    breadcrumb?: string
    children?: React.ReactNode
    slug: string
    py?: number
}

export default function PageHeader({ title, breadcrumb, children, slug, py = 10 }: PageHeaderProps) {
    const { locale } = useLanguage()
    const { data: bannerResponse } = useApi(() => getPageBanner(slug), { cacheKey: `banner-${slug}`, deps: [slug] });

    const bannerImage = bannerResponse?.status && bannerResponse.data?.resim
        ? bannerResponse.data.resim
        : "/assets/imgs/page-header/bg-line.png";

    const homeText = locale === 'en' ? 'Home' : 'Anasayfa'

    return (
        <section className={`section-page-header py-${py} fix position-relative`}>
            <div className="container position-relative z-1">
                <div className="text-start">
                    <h3>{title}</h3>
                    <div className="d-flex align-items-center">
                        <Link href="/">
                            <p className="mb-0 text-900">{homeText}</p>
                        </Link>
                        {children ? (
                            children
                        ) : (
                            <>
                                <svg className="mx-3" xmlns="http://www.w3.org/2000/svg" width={8} height={13} viewBox="0 0 8 13" fill="none">
                                    <path className="stroke-dark" d="M1 1.5L6.5 6.75L1 12" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="text-primary mb-0">{breadcrumb}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <img
                className="position-absolute bottom-0 start-0 end-0 top-0 z-0 w-100 h-100"
                src={bannerImage}
                alt={title}
                style={{ objectFit: 'cover' }}
            />
        </section>
    )
}
