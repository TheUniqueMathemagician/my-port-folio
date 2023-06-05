import { useApplicationsStore } from "context/applications"
import { FunctionComponent } from "react"
import Daemon from "./Daemon"

const DaemonFrame: FunctionComponent = () => {
	const instances = useApplicationsStore((store) => store.instances)

	return <>
		{Object.keys(instances)
			.filter((key) => instances[key].type === "daemon")
			.map((key) => (
				<Daemon pid={key} key={instances[key].pid}></Daemon>
			))}
	</>
}

export default DaemonFrame
