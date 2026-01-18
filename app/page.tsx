
"use client"
import Layout from "@/components/layout/Layout"
import Hero1 from "@/components/sections/Hero5"
import LogoCloud1 from "@/components/sections/LogoCloud1"
import Services1 from "@/components/sections/Services1"
import Testimonial1 from "@/components/sections/Testimonial1"
import Blog1 from "@/components/sections/Blog1"

export default function Home() {
	return (
		<>
			<Layout headerStyle={5} footerStyle={1}>
				<Hero1 />
				<LogoCloud1 />
				<Services1 />
				<Testimonial1 />
				<Blog1 />
			</Layout>
		</>
	)
}