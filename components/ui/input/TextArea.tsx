import { ClassName } from "@/utils/ClassName"
import { ChangeEvent, ChangeEventHandler, FunctionComponent, memo, useCallback, useState } from "react"
import classes from "./TextArea.module.scss"

type TextAreaProps = {
	readonly autoResize?: boolean
	readonly className?: string
	readonly defaultValue?: string
	readonly disabled?: boolean
	readonly fullWidth?: boolean
	readonly label?: string
	readonly name?: string
	readonly onChange?: ChangeEventHandler<HTMLTextAreaElement>
	readonly required?: boolean
	readonly vertical?: boolean
}

const TextArea: FunctionComponent<TextAreaProps> = (props) => {
	const { autoResize, className, defaultValue, disabled, fullWidth, label, name, onChange, required, vertical } = props

	const [value, setValue] = useState<string>(defaultValue ?? "")

	const changeHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value)

		if (autoResize) e.target.style.height = `${e.target.scrollHeight + 2}px`

		onChange?.(e)
	}, [autoResize, onChange])

	const classNameBuilder = ClassName.builder(classes["root"])

	if (autoResize) classNameBuilder.add(classes["auto-resize"])
	if (className) classNameBuilder.add(className)
	if (fullWidth) classNameBuilder.add(classes["full-width"])
	if (vertical) classNameBuilder.add(classes["vertical"])

	return <label className={classNameBuilder.build()}>
		<textarea
			defaultValue={defaultValue}
			disabled={disabled}
			name={name}
			onChange={changeHandler}
			required={required}
			value={value}
		></textarea>
		{label && <span>{label}</span>}
	</label>
}

export default memo(TextArea)
