import { motion } from "framer-motion"
import { useRouter } from "next/dist/client/router"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import classes from "../styles/pages/Home.module.scss"
import { Page } from "../types/Page"

type HeaderProps = {
	onAnimationEnd: () => void
}

type LoadingTitleProps = {
	onAnimationEnd: () => void
}

type LoadingProps = {
	onAnimationEnd: () => void
}

const timing = 0.003

const headerText = `
██████╗  ██╗   ██╗  ██████╗  ███████╗
██╔════╝ ██║   ██║ ██╔═══██╗ ██╔════╝
██║      ██║   ██║ ██║   ██║ ███████╗
██║      ╚██╗ ██╔╝ ██║   ██║ ╚════██║
╚██████╗  ╚████╔╝  ╚██████╔╝ ███████║
╚═════╝   ╚═══╝    ╚═════╝  ╚══════╝
`

const Header: FC<HeaderProps> = (props) => {
	const { onAnimationEnd } = props

	const count = useRef(0)

	const handleAnimationComplete = useCallback(() => {
		if (++count.current >= headerText.length) setTimeout(onAnimationEnd, 333)
	}, [onAnimationEnd])

	return <div className={classes["header"]}>
		<h2 className={classes["monospace"]}>
			{headerText.split("").map((l, i) => l === "\n" ?
				<motion.br
					key={i}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3, delay: timing * i }}
					onAnimationComplete={handleAnimationComplete}
				/> :
				<motion.span
					key={i}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: timing * i }}
					onAnimationComplete={handleAnimationComplete}
				>
					{l}
				</motion.span>
			)}
		</h2>
	</div>
}

const LoadingTitle: FC<LoadingTitleProps> = (props) => {
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
			{title.split("").map((letter, i) => (
				<motion.span
					key={i}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: i * timing }}
				>
					{letter}
				</motion.span>
			))}
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: title.length * timing }}
			>
				[
			</motion.span>
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: (title.length + 1) * timing }}
			>
				{["\\", "|", "/", "-"][index]}
			</motion.span>
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: (title.length + 2) * timing }}
				onAnimationComplete={handleAnimationComplete}
			>
				]
			</motion.span>
		</p>
	)
}

const Loading: FC<LoadingProps> = (props) => {
	const { onAnimationEnd } = props

	const [loader, setLoader] = useState("--------------------")
	const count = useRef(0)

	const handleAnimationComplete = useCallback(() => {
		if (++count.current > loader.length) return setTimeout(onAnimationEnd, 333)

		setLoader(Array(count.current).fill("█").join("") + Array(loader.length - count.current).fill("-").join(""))
		setTimeout(handleAnimationComplete, Math.random() * 350)
	}, [loader.length, onAnimationEnd])

	useEffect(() => { setTimeout(handleAnimationComplete, timing * loader.length) }, [loader.length, handleAnimationComplete])

	return <p className={classes["progress"]}>
		[&nbsp;
		{loader.split("").map((el, i) => <motion.span
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 + 0.1 * i, delay: timing * i }}
			key={i}
		>
			{el}
		</motion.span>
		)}
		&nbsp;]
	</p>
}

const Home: Page = () => {
	const router = useRouter()

	const [step, setStep] = useState(0)

	const handleHeaderAnimationEnd = useCallback(() => setStep((step) => step + 1), [])

	const handleLoadingTitleAnimationEnd = useCallback(() => setStep((step) => step + 1), [])

	const handleLoaded = useCallback(() => setTimeout(() => { router.replace("/lock") }, 666), [router])

	useEffect(() => { router.prefetch("/lock") }, [router])

	return <motion.main className={classes["root"]} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
		<Header onAnimationEnd={handleHeaderAnimationEnd}></Header>
		{step > 0 && <LoadingTitle onAnimationEnd={handleLoadingTitleAnimationEnd}></LoadingTitle>}
		{step > 1 && <Loading onAnimationEnd={handleLoaded}></Loading>}
	</motion.main>
}

export default Home
