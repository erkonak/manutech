'use client'

import Layout from "@/components/layout/Layout"
import { useEffect, useState } from "react"

interface Post {
    id: number
    title: string
    img: string
    category: string
    author: string
    date: string
}

export default function BlogContent({ id, data }: { id: string, data: any[] }) {
    const [blogPost, setBlogPost] = useState<Post | null>(null)

    useEffect(() => {
        if (id) {
            const post = data?.find((post: Post) => String(post.id) === String(id))
            setBlogPost(post || null)
        }
    }, [id, data])

    return (
        <Layout>
            {blogPost ? (
                <div className="container">
                    <h1>{blogPost.title}</h1>
                    <p>{blogPost.author} - {blogPost.date}</p>
                </div>
            ) : (
                <p>Yazı yükleniyor...</p>
            )}
        </Layout>
    )
}