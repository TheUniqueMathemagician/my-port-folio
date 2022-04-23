import { FC, memo } from "react"
import classes from "./Image.module.scss"

type Props = {
	pid: string
	args: { alt: string; src: string }
}

const Image: FC<Props> = ({ args: { alt, src } }) => <div className={classes["root"]}>
	<img alt={alt} src={src} />
</div>

export default memo<Props>(Image)
