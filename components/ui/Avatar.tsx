import { ClassName } from "@/utils/ClassName"
import Image from "next/image"
import { DetailedHTMLProps, FunctionComponent, HTMLAttributes, memo } from "react"
import { Size } from "../../types/Size"
import classes from "./Avatar.module.scss"

type AvatarProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
	alt: string
	outlined?: boolean
	size?: Size
	square?: boolean
	src: string
}

const Avatar: FunctionComponent<AvatarProps> = (props) => {
	const { alt, className, src, outlined, size, square, ...other } = props

	const classNameBuilder = ClassName.builder(classes["root"])

	if (outlined) classNameBuilder.add(classes["outlined"])
	if (size) classNameBuilder.add(classes[size])
	if (square) classNameBuilder.add(classes["square"])
	if (className) classNameBuilder.add(className)

	if (!src) return <div className={classNameBuilder.build()}></div>

	return <div className={classNameBuilder.build()} {...other}>
		<Image alt={alt} src={src} fill unoptimized unselectable="on" style={{ objectFit: "cover" }} />
	</div>
}

export default memo(Avatar)
