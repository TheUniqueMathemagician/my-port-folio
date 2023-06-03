import { FC, memo } from "react"
import classes from "./Menu.module.scss"

const Menu: FC = () => {
	return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.87 15.87" className={classes["root"]} >
		<rect
			x="9.4"
			y="9.4"
			width="6"
			height="6"
			transform="translate(24.8 24.8) rotate(180)"
		/>
		<rect
			x="0.47"
			y="9.4"
			width="6"
			height="6"
			transform="translate(6.93 24.8) rotate(180)"
		/>
		<rect
			x="9.4"
			y="0.47"
			width="6"
			height="6"
			transform="translate(24.8 6.93) rotate(180)"
		/>
		<rect
			x="0.47"
			y="0.47"
			width="6"
			height="6"
			transform="translate(6.93 6.93) rotate(180)"
		/>
	</svg>
}

export default memo(Menu)
