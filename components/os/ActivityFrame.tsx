import { useApplicationsStore } from "context/applications"
import { FC } from "react"
import Activity from "./Activity"
import classes from "./ActivityFrame.module.scss"

const ActivityFrame: FC = () => {
	const instances = useApplicationsStore((store) => store.instances)

	const rootClasses = [classes["root"]]

	return <div className={rootClasses.join(" ")}>
		{Object.keys(instances)
			.filter((key) => instances[key].type === "window")
			.map((key) => <Activity pid={key} key={instances[key].pid}></Activity>)
		}
	</div>
}

export default ActivityFrame
