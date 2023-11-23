"use client"

import classes from "@/styles/pages/Home.module.scss"
import { motion } from "framer-motion"
import { useCallback, useEffect, useState, type FunctionComponent } from "react"

const BASE_TIMING = 0.003

type LoadingTitleProps = {
	onAnimationEnd: () => void
}

const LoadingTitle: FunctionComponent<LoadingTitleProps> = (props) => {
	const { onAnimationEnd } = props

	const [index, setIndex] = useState(0)
	const [title] = useState("Loading ")

	const handleAnimationComplete = useCallback(() => onAnimationEnd(), [onAnimationEnd])

	useEffect(() => {
		const timeout = window.setTimeout(() => {
			if (index > 2) setIndex(0)
			else setIndex((index) => index + 1)
		}, 100 + 300 * Math.random())

		return () => window.clearTimeout(timeout)
	}, [index])

	return (
		<p className={classes["loading"]}>
			{title.split("").map((letter, i) => <motion.span
				key={i}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: i * BASE_TIMING, duration: 0.5 }}
			>
				{letter}
			</motion.span>)}
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: title.length * BASE_TIMING, duration: 0.5 }}
			>
				[
			</motion.span>
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: (title.length + 1) * BASE_TIMING, duration: 0.5 }}
			>
				{["\\", "|", "/", "-"][index]}
			</motion.span>
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: (title.length + 2) * BASE_TIMING, duration: 0.5 }}
				onAnimationComplete={handleAnimationComplete}
			>
				]
			</motion.span>
		</p>
	)
}

export default LoadingTitle
