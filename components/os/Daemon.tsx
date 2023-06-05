import { DaemonInstance } from "@/types/Application"
import { applicationsMap, useApplicationsStore } from "context/applications"
import { FunctionComponent, createElement } from "react"

type DaemonProps = {
	pid: string
}

const Daemon: FunctionComponent<DaemonProps> = (props) => {
	const { pid } = props

	const applicationId = useApplicationsStore((store) => (store.instances[pid] as DaemonInstance).applicationId)
	const args = useApplicationsStore((store) => (store.instances[pid] as DaemonInstance).args)

	const renderComponent = applicationsMap.get(applicationId)

	return renderComponent ? createElement(renderComponent, { args, pid }) : null
}

export default Daemon
