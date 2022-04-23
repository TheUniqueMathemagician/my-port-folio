import { FC, memo, ReactNode } from "react"
import { useSelector } from "../../hooks/Store"
import { EColorScheme } from "../../types/EColorScheme"
import { IPosition } from "../../types/IPosition"
import classes from "./TaskBarMenu.module.scss"

type Props = {
	children: ReactNode
	position: IPosition
	shown: boolean
}

const TaskBarMenu: FC<Props> = ({ shown, position, children }) => {
	const rootClasses = [classes["root"]]

	const contrast = useSelector((store) => store.theme.colorScheme === EColorScheme.contrast)

	if (!shown && position.bottom) position.bottom = position.bottom - 6

	if (contrast) rootClasses.push(classes["contrast"])
	if (shown) rootClasses.push(classes["shown"])

	return <nav
		className={rootClasses.join(" ")}
		style={{
			top: position.top ?? "",
			left: position.left ?? "",
			bottom: position.bottom ?? "",
			right: position.right ?? "",
		}}
	>
		{children}
	</nav>
}

export default memo<Props>(TaskBarMenu)
