import { Size } from "@/types/Size"
import { ClassName } from "@/utils/ClassName"
import { FunctionComponent, PropsWithChildren, memo } from "react"
import classes from "./Table.module.scss"

type TableProps = PropsWithChildren & {
	fullWidth?: boolean
	outlined?: boolean
	size?: Size
}

const Table: FunctionComponent<TableProps> = (props) => {
	const { children, outlined, fullWidth } = props

	const classNameBuilder = ClassName.builder(classes["root"])

	if (fullWidth) classNameBuilder.add(classes["full-width"])
	if (outlined) classNameBuilder.add(classes["outlined"])

	return <table className={classNameBuilder.build()}>{children}</table>
}

export default memo(Table)
