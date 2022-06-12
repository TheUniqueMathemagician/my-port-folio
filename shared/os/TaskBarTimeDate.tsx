import { useEffect, useState } from "react"
import classes from "./TaskBarTimeDate.module.scss"

const TaskBarTimeDate = () => {
	const [date, setDate] = useState<number>(Date.now())

	useEffect(() => {
		const interval = setInterval(() => { setDate(Date.now()) }, 1000)

		return () => { clearInterval(interval) }
	}, [])

	const _time = new Date(date).toLocaleTimeString().slice(0, -3)

	const _date = new Date(date)
		.toLocaleDateString()
		.split("/")
		.map((x) => x.match(/\d{2}$/))
		.join("-")

	return <div className={classes["root"]}>
		<div>{_time}</div>
		<div>{_date}</div>
	</div>
}

export default TaskBarTimeDate
