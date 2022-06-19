import { Applications } from "@/types/Application"
import { useApplicationsStore } from "context/applications"
import { FC, memo } from "react"
import Shortcut from "./Shortcut"
import styles from "./ShortcutFrame.module.scss"

const ShortcutFrame: FC = () => {
	const aids = useApplicationsStore((store) => Object.keys(store.pool).map((key) => +key as Applications).filter((key) => store.pool[key].shortcut))

	return <div className={styles["root"]}>
		{aids.map((aid) => (<Shortcut aid={aid} key={aid}></Shortcut>))}
	</div>
}

export default memo(ShortcutFrame)
