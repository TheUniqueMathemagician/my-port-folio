import { useApplicationsStore } from "context/applications"
import { FC, memo, useEffect, useState } from "react"

const LOG_INTERVAL_MS = 300000
const MAX_INSTANCES = 30

const NightWatcher: FC = () => {
	const count = useApplicationsStore((store) => Object.keys(store.instances).length)
	const [hasWarned, setHasWarned] = useState(false)

	useEffect(() => {
		const interval = setInterval(() => console.log("I'm watching"), LOG_INTERVAL_MS)

		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		if (count <= MAX_INSTANCES || hasWarned) return

		alert("Attention, il se peut que les performances soient réduites")

		setHasWarned(true)
	}, [count, hasWarned])

	return null
}

export default memo(NightWatcher)
