import { FunctionComponent, memo, useEffect, useState } from "react"
import classes from "./TaskBarTimeDate.module.scss"

const SECOND_IN_MS = 1_000

const TaskBarTimeDate: FunctionComponent = () => {
	const [date, setDate] = useState<number>(Date.now())

	useEffect(() => {
		// FIXME: Huge perfomance issue
		const interval = setInterval(() => {
			setDate(Date.now())
		}, SECOND_IN_MS)

		return () => {
			clearInterval(interval)
		}
	}, [])

	const displayTime = new Date(date).toLocaleTimeString().slice(0, -3)
	const displayDate = new Date(date)
		.toLocaleDateString()
		.split("/")
		.map((x) => x.match(/\d{2}$/))
		.join("-")

	return <div className={classes["root"]}>
		<div>{displayTime}</div>
		<div>{displayDate}</div>
	</div>
}

export default memo(TaskBarTimeDate)
