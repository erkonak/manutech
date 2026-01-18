import data from "@/util/blog.json"
import BlogContent from "./BlogContent"

// Statik parametreleri burada üretiyoruz (Server Side)
export async function generateStaticParams() {
    return data.map((post) => ({
        id: String(post.id),
    }))
}

// Ana sayfa bileşeni (Server Component)
export default function Page({ params }: { params: { id: string } }) {
    return <BlogContent id={params.id} data={data} />
}