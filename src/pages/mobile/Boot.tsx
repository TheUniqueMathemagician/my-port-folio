import { FC, useCallback, useState, useEffect, memo } from "react";
import { useHistory } from "react-router";
import { motion } from "framer-motion";

import classes from "./Boot.module.scss";
import { useSelector } from "../../hooks/Store";
import { batch } from "react-redux";

const header = `
 ██████╗ ██╗   ██╗  ██████╗  ███████╗
██╔════╝ ██║   ██║ ██╔═══██╗ ██╔════╝
██║      ██║   ██║ ██║   ██║ ███████╗
██║      ╚██╗ ██╔╝ ██║   ██║ ╚════██║
╚██████╗  ╚████╔╝  ╚██████╔╝ ███████║
 ╚═════╝   ╚═══╝    ╚═════╝  ╚══════╝
`;

const timing = 0.003;

interface HeaderProps {
	onAnimationEnd: () => void;
}

let headerCount = 0;
const Header: FC<HeaderProps> = (props) => {
	const { onAnimationEnd } = props;

	const handleAnimationComplete = useCallback(() => {
		headerCount++;
		if (headerCount >= header.length) onAnimationEnd();
	}, [onAnimationEnd]);

	useEffect(() => {
		if (headerCount >= header.length) onAnimationEnd();
		window.setTimeout(() => {
			onAnimationEnd();
		}, 2000);
	}, [onAnimationEnd]);

	return (
		<div className={classes["header"]}>
			<h2 className={classes["monospace"]}>
				{header.split("").map((letter, i) =>
					letter === "\n" ? (
						<motion.br
							key={i}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: i * timing }}
							onAnimationComplete={handleAnimationComplete}
						></motion.br>
					) : (
						<motion.span
							key={i}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: i * timing }}
							onAnimationComplete={handleAnimationComplete}
						>
							{letter}
						</motion.span>
					)
				)}
			</h2>
		</div>
	);
};

interface LoadingTitleProps {
	onAnimationEnd: () => void;
}

const LoadingTitle: FC<LoadingTitleProps> = (props) => {
	const { onAnimationEnd } = props;

	const [index, setIndex] = useState<number>(0);
	const [title] = useState<string>("Chargement ");

	const handleAnimationComplete = useCallback(() => {
		onAnimationEnd();
	}, [onAnimationEnd]);

	useEffect(() => {
		const timeout = window.setTimeout(() => {
			if (index > 2) setIndex(0);
			else setIndex((index) => index + 1);
		}, 100 + 300 * Math.random());
		return () => window.clearTimeout(timeout);
	}, [index]);

	// FIXME: animationEnd not firing with framer motion on mobiles
	useEffect(() => {
		window.setTimeout(() => {
			onAnimationEnd();
		}, title.length + 10);
	}, [onAnimationEnd, title]);

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
				transition={{
					duration: 0.5,
					delay: title.length * timing
				}}
			>
				[
			</motion.span>
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{
					duration: 0.5,
					delay: (title.length + 1) * timing
				}}
			>
				{["\\", "|", "/", "-"][index]}
			</motion.span>
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{
					duration: 0.5,
					delay: (title.length + 2) * timing
				}}
				onAnimationComplete={handleAnimationComplete}
			>
				]
			</motion.span>
		</p>
	);
};

interface LoadingProps {
	onLoaded: () => void;
}

const Loading: FC<LoadingProps> = (props) => {
	const { onLoaded } = props;

	const apps = useSelector((store) => store.applications.pool);

	const [loader, setLoader] = useState<string>("--------------------");
	const [total, setTotal] = useState<number>(0);
	const [loaded, setLoaded] = useState<number>(0);

	useEffect(() => {
		if (total === 0) return;

		const elements = 20;
		const completed = Math.round((loaded * elements) / total);
		const tmpLoader: string[] = [];
		for (let i = 0; i < elements; i++) {
			if (i < completed) {
				tmpLoader.push("█");
			} else {
				tmpLoader.push("-");
			}
		}

		setLoader(tmpLoader.join(""));

		if (loaded >= total) onLoaded();
	}, [loader, loaded, total, onLoaded]);

	const load = useCallback((url: string) => {
		const head = document.querySelector("head");
		setTotal((total) => total + 1);
		const link = document.createElement("link");
		link.setAttribute("rel", "preload");
		link.setAttribute("as", "image");
		link.setAttribute("href", url);
		link.addEventListener("load", () => {
			setLoaded((loaded) => loaded + 1);
		});
		link.addEventListener("error", () => {
			setLoaded((loaded) => loaded + 1);
		});
		head?.appendChild(link);
	}, []);

	useEffect(() => {
		window.setTimeout(() => {
			batch(() => {
				load(
					"https://images.unsplash.com/photo-1536859975388-b5e6623e9223?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
				);
				load(
					"https://images.unsplash.com/photo-1526137844794-45f1041f397a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
				);
				load(
					"https://images.unsplash.com/photo-1607053075722-dff3fb966413?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
				);
				for (const key of Object.keys(apps)) {
					const icon = apps[+key].icon;
					if (icon) {
						load(icon);
					}
				}
			});
		}, 666);
	}, [load, apps]);

	return (
		<p className={classes["progress"]}>
			[&nbsp;
			{loader.split("").map((el, i) => (
				<motion.span
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.5
					}}
					style={{ display: "inline-block", width: "1.1ch" }}
					key={i}
				>
					{el}
				</motion.span>
			))}
			&nbsp;]
		</p>
	);
};

const Boot: FC = () => {
	const history = useHistory();

	const [step, setStep] = useState<number>(0);

	const handleHeaderAnimationEnd = useCallback(() => {
		setStep(1);
	}, []);

	const handleLoadingTitleAnimationEnd = useCallback(() => {
		setStep(2);
	}, []);

	const handleLoaded = useCallback(() => {
		window.setTimeout(() => {
			history.push("/lock");
		}, 666);
	}, [history]);

	return (
		<motion.main
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className={classes["root"]}
		>
			<Header onAnimationEnd={handleHeaderAnimationEnd}></Header>
			{step > 0 && (
				<LoadingTitle
					onAnimationEnd={handleLoadingTitleAnimationEnd}
				></LoadingTitle>
			)}
			{step > 1 && <Loading onLoaded={handleLoaded}></Loading>}
		</motion.main>
	);
};

export default memo(Boot);
