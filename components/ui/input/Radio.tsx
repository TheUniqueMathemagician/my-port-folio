import { ClassName } from "@/utils/ClassName"
import { DetailedHTMLProps, FunctionComponent, InputHTMLAttributes, MouseEventHandler, memo } from "react"
import classes from "./Radio.module.scss"

type RadioProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onClick" | "type"> & {
	readonly color?: "primary" | "secondary" | "info" | "success" | "warning" | "error"
	readonly label: string
	readonly noSelect?: boolean
	readonly onClick?: MouseEventHandler<HTMLLabelElement>
}

const Radio: FunctionComponent<RadioProps> = (props) => {
	const { label, noSelect, onClick, className, ...other } = props

	const classNameBuilder = ClassName.builder(classes["root"])

	if (className) classNameBuilder.add(className)
	if (noSelect) classNameBuilder.add(classes["no-select"])

	return <label className={classNameBuilder.build()} onClick={onClick}>
		<input type="radio" {...other} />
		<div className={classes["radio"]}>
			<div className={classes["effect"]} />
		</div>
		{label && <span className={classes["label"]}>{label}</span>}
	</label>
}

export default memo(Radio)
