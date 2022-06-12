import { FC, memo, PropsWithChildren, useCallback, useRef, useState } from "react"
import { MdStar } from "react-icons/md"
import generateID from "../../../functions/generateID"
import classes from "./Rating.module.scss"

type Props = PropsWithChildren<{
	readonly defaultValue?: number
	readonly disabled?: boolean
	readonly max?: number
	readonly min?: number
	readonly onChange?: React.ChangeEventHandler<HTMLInputElement>
	readonly output?: boolean
	readonly readOnly?: boolean
}>

const Star = memo(MdStar)

const Rating: FC<Props> = (props) => {
	const { onChange, defaultValue, max, min, disabled, output, readOnly } = props

	const id = useRef<string>(generateID())

	const [state, setState] = useState<number | null>(defaultValue ?? null)

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (disabled || readOnly) return

		const value = +(e.target as HTMLInputElement).value ?? null

		setState(value)

		onChange?.(e)
	}, [onChange, disabled, readOnly])

	const rates: number[] = []

	const rootClasses = [classes["root"]]

	for (let i = min ?? 0; i <= (max ?? 0); i++) rates.push(i)

	// TODO: make this accessible with tabs
	return <fieldset disabled={disabled} className={rootClasses.join(" ")}>
		{rates.map((i) => (
			<label
				key={i}
				aria-selected={i === state}
				aria-checked={i === state}
				aria-readonly={readOnly}
			>
				<input
					readOnly={readOnly}
					disabled={disabled}
					value={i}
					type="radio"
					aria-labelledby={id.current}
					name={id.current + "_" + i}
					onChange={handleChange}
					checked={i === state}
				></input>
				<span id={id.current}>{i + 1} étoile(s)</span>
				<Star></Star>
			</label>
		))}
		{output && (
			<output name="result">
				{state ?? 0}/{10}
			</output>
		)}
	</fieldset>
}

export default memo(Rating)
