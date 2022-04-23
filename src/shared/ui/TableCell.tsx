import { FC, memo, ReactNode } from "react"
import classes from "./TableCell.module.scss"

type Props = {
	children: ReactNode
	align?: "start" | "center" | "end"
	heading?: boolean
}

const TableCell: FC<Props> = (props) => {
	const { align, children, heading } = props

	const rootClasses = [classes["root"]]
	const containerClasses = [classes["container"]]

	if (align) containerClasses.push(classes[align])

	if (heading) return <th className={rootClasses.join(" ")}>
		<div className={containerClasses.join(" ")}>{children}</div>
	</th>

	return <td className={rootClasses.join(" ")}>
		<div className={containerClasses.join(" ")}>{children}</div>
	</td>
}

export default memo<Props>(TableCell)
