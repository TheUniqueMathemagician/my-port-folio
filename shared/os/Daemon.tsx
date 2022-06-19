import { DaemonInstance } from "@/types/Application"
import { applicationsMap, useApplicationsStore } from "context/applications"
import { createElement, FC } from "react"

type Props = {
	pid: string
}

const Daemon: FC<Props> = (props) => {
	const { pid } = props

	const component = useApplicationsStore((store) => (store.instances[pid] as DaemonInstance).component)
	const args = useApplicationsStore((store) => (store.instances[pid] as DaemonInstance).args)

	const renderComponent = applicationsMap.get(component)

	return renderComponent ? createElement(renderComponent, { args, pid }) : null
}

export default Daemon
