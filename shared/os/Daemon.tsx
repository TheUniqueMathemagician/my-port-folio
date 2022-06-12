import { DaemonInstance } from "@/types/Application"
import { createElement, FC } from "react"
import { applicationsMap } from "store/slices/Applications"
import { useSelector } from "../../hooks/Store"

type Props = {
	pid: string
}

const Daemon: FC<Props> = (props) => {
	const { pid } = props

	const component = useSelector((store) => (store.applications.instances[pid] as DaemonInstance).component)
	const args = useSelector((store) => (store.applications.instances[pid] as DaemonInstance).args)

	const renderComponent = applicationsMap.get(component)

	return renderComponent ? createElement(renderComponent, { args, pid }) : null
}

export default Daemon
