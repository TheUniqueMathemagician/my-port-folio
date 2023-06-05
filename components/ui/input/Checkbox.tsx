import { Size } from "@/types/Size"
import { ClassName } from "@/utils/ClassName"
import { DetailedHTMLProps, FunctionComponent, InputHTMLAttributes, MouseEventHandler, memo } from "react"
import Mark from "../../icons/Mark"
import classes from "./Checkbox.module.scss"

type CheckboxProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onClick" | "size" | "type"> & {
	readonly color?: "primary" | "secondary" | "info" | "success" | "warning" | "error"
	readonly onClick?: MouseEventHandler<HTMLLabelElement>
	readonly size?: Size
}

const Checkbox: FunctionComponent<CheckboxProps> = (props) => {
	const { className, color, onClick, size, ...other } = props

	const classNameBuilder = ClassName.builder(classes["root"])

	if (className) classNameBuilder.add(className)
	if (color) classNameBuilder.add(classes[color])
	if (size) classNameBuilder.add(classes[size])

	return <label className={classNameBuilder.build()} onClick={onClick}>
		<input type="checkbox" {...other}></input>
		<div className={classes["checkbox"]}>
			<div className={classes["effect"]}></div>
			<Mark></Mark>
		</div>
	</label>
}

export default memo(Checkbox)
