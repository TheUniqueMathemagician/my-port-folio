import { Applications } from "@/types/Application"
import { FC, memo } from "react"
import { useSelector } from "../../hooks/Store"
import Shortcut from "./Shortcut"
import styles from "./ShortcutFrame.module.scss"

const ShortcutFrame: FC = () => {
	const aids = useSelector((store) => Object.keys(store.applications.pool).map((key) => +key as Applications).filter((key) => store.applications.pool[key].shortcut))

	return <div className={styles["root"]}>
		{aids.map((aid) => (<Shortcut aid={aid} key={aid}></Shortcut>))}
	</div>
}

export default memo(ShortcutFrame)
