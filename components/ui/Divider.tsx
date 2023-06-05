import { ClassName } from "@/utils/ClassName"
import { FunctionComponent, memo } from "react"
import classes from "./Divider.module.scss"

type DividerProps = {
	inset?: boolean
	margin?: boolean
	vertical?: boolean
}

const Divider: FunctionComponent<DividerProps> = (props) => {
	const { inset, margin, vertical } = props

	const classNameBuilder = ClassName.builder(classes["root"])

	if (inset) classNameBuilder.add(classes["inset"])
	if (margin) classNameBuilder.add(classes["margin"])
	if (vertical) classNameBuilder.add(classes["vertical"])

	return <div className={classNameBuilder.build()}>
		<hr></hr>
	</div>
}

export default memo(Divider)
