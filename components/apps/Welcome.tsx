import { RunningApplicationComponent } from "@/types/Application"
import { memo } from "react"
import Typography from "../ui/Typography"
import classes from "./Welcome.module.scss"

const Welcome: RunningApplicationComponent = () => <div className={classes["root"]}>
	<Typography variant="h2">Bienvenue !</Typography>
	<Typography variant="p">
		Bien qu&apos;il ne soit pas encore entièrement terminé, voici déjà un aperçu
		de mes capacités.
	</Typography>
	<Typography variant="p">
		Attention, ceci reste un navigateur! <br /> Fun fact: il m&apos;est arrivé
		plusieurs fois de vouloir fermer les fenêtres avec un raccourci,
		seulement c&apos;était la page web qui se fermait...
	</Typography>
</div>

export default memo(Welcome)
