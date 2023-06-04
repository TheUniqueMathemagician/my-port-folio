import Image from "next/image"
import { DetailedHTMLProps, FunctionComponent, HTMLAttributes, memo } from "react"
import { Size } from "../../types/Size"
import classes from "./Avatar.module.scss"

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
	alt: string
	outlined?: boolean
	size?: Size
	square?: boolean
	src: string
}

const Avatar: FunctionComponent<Props> = (props) => {
	const { alt, className, src, outlined, size, square, ...other } = props

	const rootClasses = [classes["root"]]

	if (outlined) rootClasses.push(classes["outlined"])
	if (size) rootClasses.push(classes[size])
	if (square) rootClasses.push(classes["square"])
	if (className) rootClasses.push(className)
	if (!src) return <div className={rootClasses.join(" ")}></div>

	return <div className={rootClasses.join(" ")} {...other}>
		<Image alt={alt} src={src} fill unoptimized unselectable="on" style={{ objectFit: "cover" }} />
	</div>
}

export default memo(Avatar)
