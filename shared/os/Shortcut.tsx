import { Applications } from "@/types/Application"
import { useApplicationsStore } from "context/applications"
import { useOsStore } from "context/os"
import Image from "next/image"
import { FC, KeyboardEvent, memo, useCallback } from "react"
import styles from "./Shortcut.module.scss"

type Props = {
	aid: Applications
}

const Shortcut: FC<Props> = (props) => {
	const { aid } = props

	const runApplication = useApplicationsStore((store) => store.runApplication)

	const application = useApplicationsStore((store) => store.pool[aid])
	const isMobile = useOsStore((store) => store.isMobile)

	const handleDoubleClick = useCallback(() => {
		if (!isMobile) runApplication(aid, {})
	}, [aid, isMobile, runApplication])

	const handleClick = useCallback(() => {
		if (isMobile) runApplication(aid, {})
	}, [aid, isMobile, runApplication])

	return <button
		className={styles["shortcut"]}
		onDoubleClick={handleDoubleClick}
		onClick={handleClick}
		onKeyPress={(e: KeyboardEvent) => {
			switch (e.code) {
				case "Enter":
				case "Space":
					runApplication(aid, {})
					break
				default:
					break
			}
		}}
	>
		<figure>
			<Image src={application.icon} alt={application.displayName} layout="fixed" width={32} height={32} />
			<figcaption>{application.displayName}</figcaption>
		</figure>
	</button>
}

export default memo(Shortcut)
