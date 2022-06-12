import { FC, memo, PropsWithChildren, useCallback, useState } from "react"
import classes from "./Text.module.scss"

type Props = PropsWithChildren<{
	readonly className?: string
	readonly defaultValue?: string
	readonly disabled?: boolean
	readonly fullWidth?: boolean
	readonly label?: string
	readonly name?: string
	readonly onChange?: React.ChangeEventHandler<HTMLInputElement>
	readonly required?: boolean
	readonly type?: "password" | "text" | "email" | "tel"
	readonly validator?: RegExp
}>

const Text: FC<Props> = (props) => {
	const { className, defaultValue, fullWidth, disabled, onChange, label, name, required, type } = props

	const [value, setValue] = useState<string>("")

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)

		onChange?.(e)
	}, [onChange])

	const rootClasses = [classes["root"]]

	if (fullWidth) rootClasses.push(classes["full-width"])

	return <label className={rootClasses.join(" ")}>
		<input
			className={className}
			defaultValue={defaultValue}
			disabled={disabled}
			name={name}
			onChange={handleChange}
			required={required}
			type={type ?? "text"}
			value={value}
		></input>
		{label && <span>{label}</span>}
		<div className={classes["effect"]}></div>
	</label>
}

export default memo(Text)
