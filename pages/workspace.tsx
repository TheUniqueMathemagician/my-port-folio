import { useApplicationsStore } from "context/applications"
import { useOsStore } from "context/os"
import { useUsersStore } from "context/users"
import { useRouter } from "next/router"
import { useEffect } from "react"
import DaemonFrame from "../shared/os/DaemonFrame"
import ScreenFrame from "../shared/os/ScreenFrame"
import ShortcutFrame from "../shared/os/ShortcutFrame"
import TaskBar from "../shared/os/TaskBar"
import WindowFrame from "../shared/os/WindowFrame"
import WorkspaceFrame from "../shared/os/WorkspaceFrame"
import { Applications } from "../types/Application"
import { Page } from "../types/Page"

const WorkSpace: Page = () => {
	const router = useRouter()

	const applications = useApplicationsStore((store) => store.pool)
	const hasRanStartupApplications = useOsStore((store) => store.hasRanStartupApplications)
	const user = useUsersStore((store) => store.elements[store.currentUserID])

	const setHasRanStartupApplications = useOsStore((store) => store.setHasRanStartupApplications)

	const runApplication = useApplicationsStore((store) => store.runApplication)

	useEffect(() => { if (!user) router.replace("/lock") })

	useEffect(() => {
		if (hasRanStartupApplications) return

		for (const key in applications) {
			const applicationKey: Applications = +key

			if (!applications[applicationKey]?.runOnStartup) return

			runApplication(applicationKey, {})
		}

		setHasRanStartupApplications(true)
	}, [hasRanStartupApplications, applications, runApplication, setHasRanStartupApplications])

	return <ScreenFrame>
		<WorkspaceFrame>
			<ShortcutFrame></ShortcutFrame>
			<WindowFrame></WindowFrame>
			<DaemonFrame></DaemonFrame>
		</WorkspaceFrame>
		<TaskBar></TaskBar>
	</ScreenFrame>
}

export default WorkSpace
