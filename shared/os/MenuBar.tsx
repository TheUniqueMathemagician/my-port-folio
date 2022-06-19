import { Applications } from "@/types/Application"
import { useApplicationsStore } from "context/applications"
import { FC, memo, useCallback } from "react"
import { IoMdClose } from "react-icons/io"
import { MdSend } from "react-icons/md"
import Button from "../ui/input/Button"
import classes from "./MenuBar.module.scss"

const Close = memo(IoMdClose)
const Send = memo(MdSend)

type Props = {
	pid: string
}

const MenuBar: FC<Props> = (props) => {
	const { pid } = props

	const runApplication = useApplicationsStore((store) => store.runApplication)
	const closeApplication = useApplicationsStore((store) => store.closeApplication)

	const handleContactClick = useCallback(() => runApplication(Applications.Contact, {}), [runApplication])

	const handleCloseClick = useCallback(() => closeApplication(pid), [closeApplication, pid])

	const rootClasses = [classes["root"]]

	return <div className={rootClasses.join(" ")}>
		<Button focusable startIcon onClick={handleCloseClick}>
			<Close></Close>
			<span>Fermer</span>
		</Button>
		<Button focusable startIcon color="primary" onClick={handleContactClick}>
			<Send></Send>
			<span>Contacter</span>
		</Button>
	</div>
}

export default MenuBar
