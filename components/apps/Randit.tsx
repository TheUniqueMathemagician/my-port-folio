import { RunningApplicationComponent } from "@/types/Application"
import { memo } from "react"
import classes from "./Randit.module.scss"

const Randit: RunningApplicationComponent = (props) => {
	const { pid } = props

	return <iframe
		className={classes["root"]}
		src="https://randit.web.app/"
		title={`${pid}_location_frame`}
	></iframe>
}

export default memo(Randit)
