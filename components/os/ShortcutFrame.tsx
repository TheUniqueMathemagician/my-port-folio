import { ApplicationId } from "@/types/Application"
import { useApplicationsStore } from "context/applications"
import { FunctionComponent, memo } from "react"
import Shortcut from "./Shortcut"
import styles from "./ShortcutFrame.module.scss"

const ShortcutFrame: FunctionComponent = () => {
	const applicationIds = useApplicationsStore((store) => Object.keys(store.pool).map((key) => Number(key) as ApplicationId).filter((key) => store.pool[key].shortcut))

	return <div className={styles["root"]}>
		{applicationIds.map((aid) => (<Shortcut applicationId={aid} key={aid}></Shortcut>))}
	</div>
}

export default memo(ShortcutFrame)
