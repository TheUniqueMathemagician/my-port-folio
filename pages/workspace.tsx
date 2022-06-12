import { useRouter } from "next/router"
import { useEffect } from "react"
import { batch } from "react-redux"
import { useDispatch, useSelector } from "../hooks/Store"
import DaemonFrame from "../shared/os/DaemonFrame"
import ScreenFrame from "../shared/os/ScreenFrame"
import ShortcutFrame from "../shared/os/ShortcutFrame"
import TaskBar from "../shared/os/TaskBar"
import WindowFrame from "../shared/os/WindowFrame"
import WorkspaceFrame from "../shared/os/WorkspaceFrame"
import { runApplication } from "../store/slices/Applications"
import { setHasRanStartupApplications } from "../store/slices/OS"
import { Applications } from "../types/Application"
import { Page } from "../types/Page"

const WorkSpace: Page = () => {
	const dispatch = useDispatch()
	const router = useRouter()

	const applications = useSelector((store) => store.applications.pool)
	const hasRanStartupApplications = useSelector((store) => store.os.hasRanStartupApplications)
	const user = useSelector((store) => store.users.elements[store.users.currentUserID])

	useEffect(() => { if (!user) router.replace("/lock") })

	useEffect(() => {
		if (hasRanStartupApplications) return

		batch(() => {
			for (const key in applications) {
				const applicationKey: Applications = +key

				if (!applications[applicationKey]?.runOnStartup) return

				dispatch(runApplication({ aid: applicationKey, args: {} }))
			}

			dispatch(setHasRanStartupApplications(true))
		})
	}, [dispatch, hasRanStartupApplications, applications])

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
