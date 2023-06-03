import NextImage from "next/image"
import { FunctionComponent, memo } from "react"
import classes from "./Image.module.scss"

type Props = {
	pid: string
	args: { alt: string; src: string }
}

const Image: FunctionComponent<Props> = ({ args: { alt, src } }) => <div className={classes["root"]}>
	<NextImage alt={alt} src={src} fill style={{ objectFit: "cover" }} unoptimized />
</div>

export default memo<Props>(Image)
