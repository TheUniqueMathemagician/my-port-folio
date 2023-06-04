import { ClassName } from "@/utils/ClassName"
import { FunctionComponent, PropsWithChildren, memo } from "react"
import classes from "./TableCell.module.scss"

type TableCellProps = PropsWithChildren & {
	align?: "start" | "center" | "end"
	heading?: boolean
}

const TableCell: FunctionComponent<TableCellProps> = (props) => {
	const { align, children, heading } = props

	const classNameBuilder = ClassName.builder(classes["root"])
	const containerClassNameBuilder = ClassName.builder(classes["container"])

	if (align) containerClassNameBuilder.add(classes[align])

	if (heading) {
		return <th className={classNameBuilder.build()}>
			<div className={containerClassNameBuilder.build()}>{children}</div>
		</th>
	}

	return <td className={classNameBuilder.build()}>
		<div className={containerClassNameBuilder.build()}>{children}</div>
	</td>
}

export default memo(TableCell)
