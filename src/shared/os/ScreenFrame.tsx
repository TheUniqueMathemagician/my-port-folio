import { FC, ReactNode } from "react"
import { useSelector } from "../../hooks/Store"
import classes from "./ScreenFrame.module.scss"

type Props = {
	children: ReactNode
}

const ScreenFrame: FC<Props> = ({ children }) => {
	const bg = useSelector((store) => store.theme.workspaceBackgroundURL)

	const isMobile = useSelector((store) => store.os.isMobile)

	const rootClasses = [classes["root"]]

	if (isMobile) rootClasses.push(classes["mobile"])

	return <div
		style={{
			background: `url(${bg})`,
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
		}}
		className={rootClasses.join(" ")}
	>
		{children}
	</div>
}

export default ScreenFrame
