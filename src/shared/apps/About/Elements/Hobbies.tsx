import Image from "next/image"
import { FC, memo } from "react"
import Paper from "../../../ui/Paper"
import Typography from "../../../ui/Typography"
import classes from "./Hobbies.module.scss"

type Props = {
	pid: string
}

const Hobbies: FC<Props> = () => {
	return <div className={classes["root"]}>
		<Typography variant="h4">Loisirs</Typography>
		<Typography variant="h5">Code</Typography>
		<Paper spaced background="paper" className={classes["paper"]}>
			<Image
				src={"/images/coding.svg"} alt="Coding"
				layout="fixed"
				width={100}
				height={100}
			></Image>
			<Typography variant="p">
				Evidemment le code et le développement en font partie. J&apos;ai commencé
				vers à l&apos;adolescence et j&apos;ai très vite accroché. Bien que la vie et
				les choix que j&apos;ai fait m&apos;ont amené à étudier l&apos;électromécanique,
				j&apos;aimerais coupler mes études à ma passion.
			</Typography>
		</Paper>
		<Typography variant="h5">Guitare</Typography>
		<Paper spaced background="paper" className={classes["paper"]}>
			<Image
				src={"/images/guitar.svg"}
				alt="Guitare"
				layout="fixed"
				width={100}
				height={100}
			></Image>
			<Typography variant="p">
				Je joue de la guitare depuis une bonne décénie et je ne m&apos;en lasse
				pas. Actuellement je ne suis pas dans un groupe, mais si vous cherchez
				un guitariste dans la région de Liège et que vous aimez le métal \m/ (
				PS: Je ne suis pas pour autant sataniste )
			</Typography>
		</Paper>
		<Typography variant="h5">Nature</Typography>
		<Paper spaced background="paper" className={classes["paper"]}>
			<Image
				src={"/images/nature.svg"}
				alt="Nature"
				layout="fixed"
				width={100}
				height={100}
			></Image>
			<Typography variant="p">
				J&apos;aime tout ce qui touche à la nature, que ce soit une promenade en
				forêt ou encore entretenir mon petit potager.
			</Typography>
		</Paper>
		<Typography variant="h5">Technologies</Typography>
		<Paper spaced background="paper" className={classes["paper"]}>
			<Image
				src={"/images/electronics.svg"}
				alt="Electronics"
				layout="fixed"
				width={100}
				height={100}
			></Image>
			<Typography variant="p">
				Je suis un grand amateur de nouvelles technologies, qu&apos;elles soient
				domestiques ou industrielles. Il m&apos;arrive de temps à autres de
				bricoler, que ce soit arduinos, raspberry pi, serveurs domotiques, ...
			</Typography>
		</Paper>
	</div>
}

export default memo<Props>(Hobbies)
