import { Color } from "@/types/Color"
import { Size } from "@/types/Size"
import { ClassName } from "@/utils/ClassName"
import contrastColor from "@/utils/contrastColor"
import { useThemeStore } from "context/theme"
import Link from "next/link"
import React, { DetailedHTMLProps, HTMLAttributes, MouseEventHandler, PropsWithChildren, RefObject, forwardRef, useCallback, useEffect, useRef } from "react"
import classes from "./Button.module.scss"

type HTMLProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

interface ButtonAProps extends HTMLProps {
	readonly align?: "center" | "end" | "start"
	readonly color?: Color
	readonly contrast?: boolean
	readonly endIcon?: boolean
	readonly focusable?: boolean
	readonly fullWidth?: boolean
	readonly isIcon?: boolean
	readonly loading?: boolean
	readonly outlined?: boolean
	readonly readOnly?: undefined
	readonly ripple?: boolean
	readonly size?: Size
	readonly startIcon?: boolean
	readonly to: string
	readonly variant?: "flat" | "filled" | "blur"
}

interface ButtonBProps extends HTMLProps {
	readonly align?: "center" | "end" | "start"
	readonly color?: Color
	readonly contrast?: boolean
	readonly disabled?: boolean
	readonly endIcon?: boolean
	readonly focusable?: boolean
	readonly fullWidth?: boolean
	readonly isIcon?: boolean
	readonly loading?: boolean
	readonly outlined?: boolean
	readonly readOnly?: boolean
	readonly ripple?: boolean
	readonly size?: Size
	readonly startIcon?: boolean
	readonly to?: undefined
	readonly variant?: "flat" | "filled" | "blur"
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonAProps | ButtonBProps>>((props, parentRef) => {
	const { ripple, readOnly, color, fullWidth, size, variant, startIcon, endIcon, align, contrast, outlined, isIcon, className, loading, children, onClick, ...rest } = props

	const innerRef = useRef<HTMLElement>(null)
	const ref = (parentRef as RefObject<HTMLElement>) ?? innerRef

	const backgroundColor = useThemeStore((store) => store.palette[color ?? "background"][store.colorScheme])

	const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
		if (e.code !== "Space" || !ripple || readOnly || !ref.current) return

		const button = ref.current

		const x = button.clientWidth / 2
		const y = button.clientHeight / 2
		const ripples = document.createElement("span")

		ripples.classList.add(classes["ripple"])
		ripples.style.left = `${x}px`
		ripples.style.top = `${y}px`

		button.appendChild(ripples)

		setTimeout(() => ripples.remove(), 666)
	}, [ripple, readOnly, ref])

	const handleClick: MouseEventHandler<HTMLElement> = useCallback((e) => {
		if (readOnly || !ref.current) return

		if (ripple) {
			const BC = ref.current.getBoundingClientRect()
			const x = e.clientX - BC.x
			const y = e.clientY - BC.y
			const element = document.createElement("span")

			element.classList.add(classes["ripple"])
			element.style.left = `${x}px`
			element.style.top = `${y}px`

			ref.current.prepend(element)

			setTimeout(() => element.remove(), 666)
		}

		onClick?.(e)
	}, [ripple, readOnly, onClick, ref])

	useEffect(() => {
		if (!ref.current) return

		const button = ref.current

		button.style.setProperty("--text-color", contrastColor(backgroundColor))
	}, [backgroundColor, ref])

	const classNameBuilder = ClassName.builder(classes["root"])

	if (align) classNameBuilder.add(classes[`align--${align}`])
	if (className) classNameBuilder.add(className)
	if (color) classNameBuilder.add(classes[color])
	if (contrast) classNameBuilder.add(classes["contrast"])
	if (endIcon) classNameBuilder.add(classes["has-end-img"])
	if (fullWidth) classNameBuilder.add(classes["full-width"])
	if (isIcon) classNameBuilder.add(classes["is-icon"])
	if (loading) classNameBuilder.add(classes["loading"])
	if (outlined) classNameBuilder.add(classes["outlined"])
	if (size) classNameBuilder.add(classes[size])
	if (startIcon) classNameBuilder.add(classes["has-start-img"])
	if (variant) classNameBuilder.add(classes[variant])

	if (props.to) {
		return <Link href={props.to} className={classNameBuilder.build()} {...rest} ref={ref as any} onClick={handleClick}>
			<div className={classes["content"]}>{children}</div>
			<div className={classes["loader"]}>
				<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
					<circle cx="50" cy="50" r="45" />
				</svg>
			</div>
		</Link>
	}

	return <button className={classNameBuilder.build()} onClick={handleClick} onKeyPress={handleKeyPress} ref={ref as any} {...rest}>
		<div className={classes["content"]}>{children}</div>
		<div className={classes["loader"]}>
			<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
				<circle cx="50" cy="50" r="45" />
			</svg>
		</div>
	</button>
})

Button.displayName = "Button"

export default Button
