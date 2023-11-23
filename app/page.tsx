import AnimatedPage from "@/modules/home/components/AnimatedPage"
import type { Metadata } from "next"
import type { FunctionComponent } from "react"

export const metadata: Metadata = {
	title: "Root Layout",
	description: "This is my portfolio website.",
}

const HomePage: FunctionComponent = () => <AnimatedPage />

export default HomePage
