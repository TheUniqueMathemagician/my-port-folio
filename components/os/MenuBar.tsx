import { ApplicationId } from "@/types/Application"
import { useApplicationsStore } from "context/applications"
import { FunctionComponent, memo, useCallback } from "react"
import { IoMdClose } from "react-icons/io"
import { MdSend } from "react-icons/md"
import Button from "../ui/input/Button"
import classes from "./MenuBar.module.scss"

const CloseIcon = memo(IoMdClose)
const SendIcon = memo(MdSend)

type MenuBarProps = {
	pid: string
}

const MenuBar: FunctionComponent<MenuBarProps> = (props) => {
	const { pid } = props

	const runApplication = useApplicationsStore((store) => store.runApplication)
	const closeApplication = useApplicationsStore((store) => store.closeApplication)

	const handleContactClick = useCallback(() => runApplication(ApplicationId.Contact, {}), [runApplication])

	const handleCloseClick = useCallback(() => closeApplication(pid), [closeApplication, pid])

	return <div className={classes["root"]}>
		<Button focusable startIcon onClick={handleCloseClick}>
			<CloseIcon />
			<span>Fermer</span>
		</Button>
		<Button focusable startIcon color="primary" onClick={handleContactClick}>
			<SendIcon />
			<span>Contacter</span>
		</Button>
	</div>
}

export default MenuBar
