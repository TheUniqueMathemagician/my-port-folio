import { ClassName } from "@/utils/ClassName"
import { useApplicationsStore } from "context/applications"
import { FunctionComponent } from "react"
import Activity from "./Activity"
import classes from "./ActivityFrame.module.scss"

const ActivityFrame: FunctionComponent = () => {
	const instances = useApplicationsStore((store) => store.instances)

	const classNameBuilder = ClassName.builder(classes["root"])

	return <div className={classNameBuilder.build()}>
		{Object.keys(instances)
			.filter((key) => instances[key].type === "window")
			.map((key) => <Activity pid={key} key={instances[key].pid}></Activity>)
		}
	</div>
}

export default ActivityFrame
