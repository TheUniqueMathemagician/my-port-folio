"use client"

import classes from "@/styles/pages/Home.module.scss"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState, type FunctionComponent } from "react"
import Header from "./Header"
import Loading from "./Loading"
import LoadingTitle from "./LoadingTitle"

const AnimatedPage: FunctionComponent = () => {
	const router = useRouter()

	const [step, setStep] = useState(0)

	const handleHeaderAnimationEnd = useCallback(() => setStep((step) => step + 1), [])

	const handleLoadingTitleAnimationEnd = useCallback(() => setStep((step) => step + 1), [])

	const handleLoaded = useCallback(() => setTimeout(() => {
		router.replace("/lock")
	}, 666), [router])

	useEffect(() => {
		router.prefetch("/lock")
	}, [router])

	return <motion.main className={classes["root"]} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
		<Header onAnimationEnd={handleHeaderAnimationEnd} />
		{step > 0 && <LoadingTitle onAnimationEnd={handleLoadingTitleAnimationEnd} />}
		{step > 1 && <Loading onAnimationEnd={handleLoaded} />}
	</motion.main>
}

export default AnimatedPage
