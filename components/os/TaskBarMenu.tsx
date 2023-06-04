import { ColorScheme } from "@/types/ColorScheme"
import { Position } from "@/types/Position"
import { ClassName } from "@/utils/ClassName"
import { useThemeStore } from "context/theme"
import { FunctionComponent, PropsWithChildren, memo } from "react"
import classes from "./TaskBarMenu.module.scss"

type TaskBarMenuProps = PropsWithChildren & {
	position: Position
	shown: boolean
}

const TaskBarMenu: FunctionComponent<TaskBarMenuProps> = (props) => {
	const { children, position, shown } = props

	const contrast = useThemeStore((store) => store.colorScheme === ColorScheme.contrast)

	const classNameBuilder = ClassName.builder(classes["root"])

	if (!shown && position.bottom) position.bottom -= 6

	if (contrast) classNameBuilder.add(classes["contrast"])
	if (shown) classNameBuilder.add(classes["shown"])

	return <nav
		className={classNameBuilder.build()}
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
