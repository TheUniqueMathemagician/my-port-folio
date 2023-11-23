"use client"

import classes from "@/styles/pages/Home.module.scss"
import { motion } from "framer-motion"
import { useCallback, useRef, type FunctionComponent } from "react"

const headerText = `
██████╗  ██╗   ██╗  ██████╗  ███████╗
██╔════╝ ██║   ██║ ██╔═══██╗ ██╔════╝
██║      ██║   ██║ ██║   ██║ ███████╗
██║      ╚██╗ ██╔╝ ██║   ██║ ╚════██║
╚██████╗  ╚████╔╝  ╚██████╔╝ ███████║
╚═════╝   ╚═══╝    ╚═════╝  ╚══════╝
`

const BASE_TIMING = 0.003
const MILLIS_TO_SECONDS = 1_000
const BASE_TIMING_MS = BASE_TIMING * MILLIS_TO_SECONDS

type HeaderProps = {
	onAnimationEnd: () => void
}

const Header: FunctionComponent<HeaderProps> = (props) => {
	const { onAnimationEnd } = props

	const count = useRef(0)

	const handleAnimationComplete = useCallback(() => {
		if (++count.current >= headerText.length) setTimeout(onAnimationEnd, BASE_TIMING_MS)
	}, [onAnimationEnd])

	return <div className={classes["header"]}>
		<h2 className={classes["monospace"]}>
			{headerText.split("").map((l, i) => {
				if (l === "\n") {
					return <motion.br
						key={i}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: BASE_TIMING * i, duration: 0.3 }}
						onAnimationComplete={handleAnimationComplete}
					/>
				}

				return <motion.span
					key={i}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: BASE_TIMING * i, duration: 0.5 }}
					onAnimationComplete={handleAnimationComplete}
				>
					{l}
				</motion.span>
			})}
		</h2>
	</div>
}

export default Header
