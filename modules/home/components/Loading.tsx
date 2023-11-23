"use client"

import classes from "@/styles/pages/Home.module.scss"
import { motion } from "framer-motion"
import { useCallback, useEffect, useRef, useState, type FunctionComponent } from "react"

const BASE_TIMING = 0.003

type LoadingProps = {
	onAnimationEnd: () => void
}

const Loading: FunctionComponent<LoadingProps> = (props) => {
	const { onAnimationEnd } = props

	const [loader, setLoader] = useState("--------------------")
	const count = useRef(0)

	const handleAnimationComplete = useCallback(() => {
		if (++count.current > loader.length) {
			setTimeout(onAnimationEnd, 333)

			return
		}

		setLoader(Array(count.current).fill("█").join("") + Array(loader.length - count.current).fill("-").join(""))
		setTimeout(handleAnimationComplete, Math.random() * 350)
	}, [loader.length, onAnimationEnd])

	useEffect(() => {
		setTimeout(handleAnimationComplete, BASE_TIMING * loader.length)
	}, [loader.length, handleAnimationComplete])

	return <p className={classes["progress"]}>
		[&nbsp;
		{loader.split("").map((el, i) => <motion.span
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 + 0.1 * i, delay: BASE_TIMING * i }}
			key={i}
		>
			{el}
		</motion.span>)}
		&nbsp;]
	</p>
}

export default Loading
