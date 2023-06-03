import { memo } from "react"
import classes from "./Randit.module.scss"

type Props = {
	pid: string
}

const Randit: FunctionComponent<Props> = (props) => {
	const { pid } = props

	return <iframe
		className={classes["root"]}
		src="https://randit.web.app/"
		title={`${pid}_location_frame`}
	></iframe>
}

export default memo(Randit)
