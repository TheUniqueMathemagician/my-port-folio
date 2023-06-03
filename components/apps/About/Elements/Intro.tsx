import Avatar from "@/components/ui/Avatar"
import Divider from "@/components/ui/Divider"
import Paper from "@/components/ui/Paper"
import Typography from "@/components/ui/Typography"
import { WindowInstance } from "@/types/Application"
import { Breakpoints } from "@/types/Breakpoints"
import generateID from "@/utils/generateID"
import { useApplicationsStore } from "context/applications"
import Image from "next/image"
import { FunctionComponent, memo } from "react"
import classes from "./Intro.module.scss"

type Props = {
	pid: string
}

type Education = {
	date: number
	detail: string
	title: string
}

const emEducation: Education[] = [
	{
		date: 2019,
		detail: "Haute École de la Province de Liège",
		title: "Master électronique ( non complété )",
	},
	{
		date: 2017,
		detail: "Haute École Henallux Seraing",
		title: "Bachelier électromécanique",
	},
	{
		date: 2013,
		detail: "Enseignement Polytechnique Verviers",
		title: "CESS électronique-informatique",
	},
	{
		date: 2015,
		detail: "Institut Saint-Laurent",
		title: "Soudure arc, oxy-acétylène, TIG",
	},
	{
		date: 2016,
		detail: "Vinçotte-Academy sa",
		title: "BA4, BA5, VCA",
	},
]

const itEducation: Education[] = [
	{
		date: -1,
		detail: "Openclassroom",
		title: "HTML CSS  JS C++  C#",
	},
	{
		date: -1,
		detail: "Openclassroom",
		title: "WebPack",
	},
	{
		date: -1,
		detail: "Openclassroom",
		title: "NodeJS",
	},
	{
		date: -1,
		detail: "Sololearn",
		title: "HTML CSS  JS C++  C#",
	},
	{
		date: -1,
		detail: "Autodidacte",
		title: "Le reste",
	},
]

const Intro: FunctionComponent<Props> = (props) => {
	const { pid } = props

	const small = useApplicationsStore((store) => {
		const instance = store.instances[pid] as WindowInstance

		if (instance.breakpoint === Breakpoints.sm) return true
		if (instance.breakpoint === Breakpoints.xs) return true

		return false
	})

	const rootClasses = [classes["root"]]

	if (small) rootClasses.push(classes["small"])

	return <div className={rootClasses.join(" ")}>
		<header className={classes["intro"]}>
			<div className={classes["avatar-container"]}>
				<Avatar
					square
					className={classes["avatar"]}
					alt="Moi"
					src="https://alexstudio.ch/wp-content/uploads/2019/01/business.portrait.cv_.resume.geneva.30.jpg"
					size="xl"
				></Avatar>
				<Paper
					blur
					spaced
					className={classes["name"]}
					background="background"
				>
					<Typography variant="h2" tag="h1" className={classes["name"]}>TAMBURRINI Yannick</Typography>
				</Paper>
			</div>
			<div className={classes["text-container"]}>
				<Typography variant="p" className={classes["text"]}>
					Electromécanicien de formation, développeur par passion. Esprit
					analytique, team-player, enthousiaste des nouvelles technologies,
					orienté performance et expérience utilisateur, spécialisé frameworks
					fron-tend tels que Vue et React en TypeScript
				</Typography>
			</div>
			<Typography variant="body">PS: Ce n&apos;est pas moi sur l&apos;image, mais en attendant ça fait joli :p</Typography>
		</header>
		<Divider inset></Divider>
		<Typography variant="h4">Mes compétences</Typography>
		<article className={classes["skills"]}>
			<Paper spaced className={classes["bubble"]} background="paper">
				{/* <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
				<Image
					alt="UI/UX"
					fill
					src={"/images/solved.svg"}
				/>
				<Typography variant="h6" tag="h5">Problem solving</Typography>
			</Paper>
			<Paper spaced className={classes["bubble"]} background="paper">
				{/* <div>Icônes conçues par <a href="https://www.flaticon.com/fr/auteurs/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/fr/" title="Flaticon">www.flaticon.com</a></div> */}
				<Image
					alt="UI/UX"
					fill
					src={"/images/ui.svg"}
				/>
				<Typography variant="h6" tag="h5">UI / UX</Typography>
			</Paper>
			<Paper spaced className={classes["bubble"]} background="paper">
				{/* <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
				<Image
					alt="UI/UX"
					fill
					src={"/images/innovation.svg"}
				/>
				<Typography variant="h6" tag="h5">Innovation</Typography>
			</Paper>
		</article>
		<Divider inset></Divider>
		<article className={classes["experiences"]}>
			<Typography variant="h4">Mon expérience</Typography>
			<ul>
				<li>
					<Paper fullWidth spaced background="paper">
						<div className={classes["date"]}>2017</div>
						<div>
							<Typography variant="h5">Electromécanicien</Typography>
							<ul>
								<Typography variant="body" tag="li">
									Acquisition de données
								</Typography>
								<Typography variant="body" tag="li">
									Conception d’un logiciel d’interfaçage ( VB .Net, RS485 )
								</Typography>
								<Typography variant="body" tag="li">
									Configuration de thermorégulateurs ( Cycles et PID )
								</Typography>
								<Typography variant="body" tag="li">
									Conception de plans électrique ( Eplan )
								</Typography>
								<Typography variant="body" tag="li">
									Maintenance curative et préventive ( tableaux électriques,
									tours &amp; fraiseuses, moteurs asynchrones, étuves, etc... )
								</Typography>
							</ul>
						</div>
					</Paper>
				</li>
			</ul>
		</article>
		<Divider inset></Divider>
		<article className={classes["education"]}>
			<Typography variant="h4">Mes formations</Typography>
			<Typography variant="h5">Enseignement</Typography>
			<ul>
				{emEducation
					.sort((a, b) => b.date - a.date)
					.map((education) => (
						<li key={education.title}>
							<Typography variant="body" className={classes["date"]}>
								{education.date}
							</Typography>
							<Typography variant="h6">{education.title}</Typography>
							<Typography variant="body" color="hint">
								{education.detail}
							</Typography>
						</li>
					))}
			</ul>
			<Typography variant="h5">Autodidacte</Typography>
			<ul>
				{itEducation
					.sort((a, b) => b.date - a.date)
					.map((education) => (
						<li key={generateID()}>
							<Typography variant="body" className={classes["date"]}>
								/
							</Typography>
							<Typography variant="h6">{education.title}</Typography>
							<Typography variant="body" color="hint">
								{education.detail}
							</Typography>
						</li>
					))}
			</ul>
		</article>
	</div>
}

export default memo(Intro)
