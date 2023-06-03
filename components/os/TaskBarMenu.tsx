import { ColorScheme } from "@/types/ColorScheme"
import { Position } from "@/types/Position"
import { useThemeStore } from "context/theme"
import { FunctionComponent, ReactNode, memo } from "react"
import classes from "./TaskBarMenu.module.scss"

type Props = {
	children: ReactNode
	position: Position
	shown: boolean
}

const TaskBarMenu: FunctionComponent<Props> = ({ shown, position, children }) => {
	const contrast = useThemeStore((store) => store.colorScheme === ColorScheme.contrast)

	const rootClasses = [classes["root"]]

	if (!shown && position.bottom) position.bottom -= 6

	if (contrast) rootClasses.push(classes["contrast"])
	if (shown) rootClasses.push(classes["shown"])

	return <nav
		className={rootClasses.join(" ")}
		style={{
			top: position.top ?? undefined,
			left: position.left ?? undefined,
			bottom: position.bottom ?? undefined,
			right: position.right ?? undefined,
		}}
	>
		{children}
	</nav>
}

export default memo(TaskBarMenu)
