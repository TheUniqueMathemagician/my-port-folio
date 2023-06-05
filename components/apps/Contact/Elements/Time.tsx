import { FunctionComponent, memo, useEffect, useState } from "react"
import Typography from "../../../ui/Typography"
import classes from "./Time.module.scss"

type TimeProps = {
	readonly date: Date
	readonly onAvailable: () => void
}

const SECOND_IN_MILLISECONDS = 1000

const Time: FunctionComponent<TimeProps> = (props) => {
	const { date, onAvailable } = props

	const [time, setTime] = useState<number>(date.getTime() - Date.now())

	useEffect(() => {
		if (time <= 0) onAvailable()
	}, [time, onAvailable])

	useEffect(() => {
		const interval = setInterval(() => {
			const time = date.getTime() - Date.now()

			setTime(time > 0 ? time : 0)
		}, SECOND_IN_MILLISECONDS)

		return () => {
			clearInterval(interval)
		}
	}, [date, onAvailable])

	if (time === null) return null

	return <Typography variant="body" className={classes["root"]}>
		{Math.round(time / SECOND_IN_MILLISECONDS)}
	</Typography>
}

export default memo(Time)
