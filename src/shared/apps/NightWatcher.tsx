import { FC, memo, useEffect, useState } from "react"
import { useSelector } from "../../hooks/Store"

const NightWatcher: FC = () => {
	const count = useSelector((store) => Object.keys(store.applications.instances).length)
	const [hasWarned, setHasWarned] = useState(false)

	useEffect(() => {
		const interval = setInterval(() => console.log("I'm watching"), 300000)

		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		if (count <= 30 || hasWarned) return
		alert("Attention, il se peut que les performances soient réduites")
		setHasWarned(true)
	}, [count, hasWarned])

	return null
}

export default memo(NightWatcher)
