import { FC } from "react"
import { useSelector } from "../../hooks/Store"
import Activity from "./Activity"
import classes from "./ActivityFrame.module.scss"

const ActivityFrame: FC = () => {
	const instances = useSelector((store) => store.applications.instances)

	const rootClasses = [classes["root"]]

	return <div className={rootClasses.join(" ")}>
		{Object.keys(instances)
			.filter((key) => instances[key].type === "window")
			.map((key) => (
				<Activity pid={key} key={instances[key].pid}></Activity>
			))}
	</div>
}

export default ActivityFrame
