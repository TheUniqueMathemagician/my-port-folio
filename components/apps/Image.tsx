import { RunningApplicationComponent } from "@/types/Application"
import NextImage from "next/image"
import { memo } from "react"
import classes from "./Image.module.scss"

const Image: RunningApplicationComponent = ({ args: { alt, src } }) => <div className={classes["root"]}>
	{alt && src && <NextImage alt={String(alt)} src={String(src)} fill style={{ objectFit: "cover" }} unoptimized />}
</div>

export default memo(Image)
