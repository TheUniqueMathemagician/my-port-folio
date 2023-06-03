import DaemonFrame from "@/components/os/DaemonFrame"
import ScreenFrame from "@/components/os/ScreenFrame"
import ShortcutFrame from "@/components/os/ShortcutFrame"
import TaskBar from "@/components/os/TaskBar"
import WindowFrame from "@/components/os/WindowFrame"
import WorkspaceFrame from "@/components/os/WorkspaceFrame"
import { ApplicationId } from "@/types/Application"
import { useApplicationsStore } from "context/applications"
import { useOsStore } from "context/os"
import { useUsersStore } from "context/users"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { Page } from "../types/Page"

const WorkSpace: Page = () => {
	const router = useRouter()

	const applications = useApplicationsStore((store) => store.pool)
	const hasRanStartupApplications = useOsStore((store) => store.hasRanStartupApplications)
	const user = useUsersStore((store) => store.elements[store.currentUserID])

	const setHasRanStartupApplications = useOsStore((store) => store.setHasRanStartupApplications)

	const runApplication = useApplicationsStore((store) => store.runApplication)

	useEffect(() => {
		if (!user) router.replace("/lock")
	}, [user, router])

	useEffect(() => {
		if (hasRanStartupApplications) return

		for (const key in applications) {
			if (!key) continue

			const applicationKey: ApplicationId = Number(key)

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
