import Image from "next/image"
import { DetailedHTMLProps, FC, HTMLAttributes, memo } from "react"
import { TSize } from "../../types/TSize"
import classes from "./Avatar.module.scss"

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
	alt: string
	src: string
	size?: TSize
	outlined?: boolean
	square?: boolean
}

const Avatar: FC<Props> = (props) => {
	const { alt, className, src, outlined, size, square, ...other } = props

	const rootClasses = [classes["root"]]

	if (outlined) rootClasses.push(classes["outlined"])
	if (size) rootClasses.push(classes[size])
	if (square) rootClasses.push(classes["square"])
	if (className) rootClasses.push(className)

	if (!src) return <div className={rootClasses.join(" ")}></div>

	return <div className={rootClasses.join(" ")}    {...other}		>
		<Image
			alt={alt}
			src={src}
			layout="fill"
			unoptimized
			unselectable="on"
			objectFit="cover"
		>
		</Image>
	</div>
}

export default memo(Avatar)
