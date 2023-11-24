import { ClassName } from "@/utils/ClassName"
import { ChangeEvent, ChangeEventHandler, FunctionComponent, PropsWithChildren, memo, useCallback, useState } from "react"
import classes from "./Text.module.scss"

type TextProps = PropsWithChildren & {
	readonly className?: string
	readonly defaultValue?: string
	readonly disabled?: boolean
	readonly fullWidth?: boolean
	readonly label?: string
	readonly name?: string
	readonly onChange?: ChangeEventHandler<HTMLInputElement>
	readonly required?: boolean
	readonly type?: "password" | "text" | "email" | "tel"
	readonly validator?: RegExp
}

const Text: FunctionComponent<TextProps> = (props) => {
	const { className, defaultValue, fullWidth, disabled, onChange, label, name, required, type } = props

	const [value, setValue] = useState<string>("")

	const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)

		onChange?.(event)
	}, [onChange])

	const classNameBuilder = ClassName.builder(classes["root"])

	if (fullWidth) classNameBuilder.add(classes["full-width"])

	return <label className={classNameBuilder.build()}>
		<input
			className={className}
			defaultValue={defaultValue}
			disabled={disabled}
			name={name}
			onChange={handleChange}
			required={required}
			type={type ?? "text"}
			value={value}
		/>
		{label && <span>{label}</span>}
		<div className={classes["effect"]} />
	</label>
}

export default memo(Text)
