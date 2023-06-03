import { FunctionComponent, memo, useCallback, useEffect, useRef } from "react"
import classes from "./Tab.module.scss"
import Button from "./input/Button"

type Props = {
	active: boolean
	label: string
	value: number
}

const Tab: FunctionComponent<Props> = (props) => {
	const { active, label, value } = props

	const ref = useRef<HTMLButtonElement>(null)

	const handleclick = useCallback(() => {
		const button = ref.current

		if (!button) return

		button.dispatchEvent(new CustomEvent<number>("input", { bubbles: true, detail: value }))
	}, [value])

	useEffect(() => {
		if (ref.current && active) {
			ref.current.dispatchEvent(
				new CustomEvent<number>("input", {
					bubbles: true,
					detail: value,
				})
			)
		}
	}, [active, value])

	const rootClasses = [classes["root"]]

	return <Button
		aria-controls={`tabpanel-${value}`}
		className={rootClasses.join(" ")}
		focusable
		onClick={handleclick}
		ref={ref}
		ripple
		role="tab"
		size="md"
		title={label}
	>
		{label}
	</Button>
}

export default memo<Props>(Tab)
