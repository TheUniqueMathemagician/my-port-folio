import { useOsStore } from "context/os"
import { useThemeStore } from "context/theme"
import { FC, ReactNode } from "react"
import classes from "./ScreenFrame.module.scss"

type Props = {
	children: ReactNode
}

const ScreenFrame: FC<Props> = ({ children }) => {
	const workspaceBackgroundURL = useThemeStore((store) => store.workspaceBackgroundURL)

	const isMobile = useOsStore((store) => store.isMobile)

	const rootClasses = [classes["root"]]

	if (isMobile) rootClasses.push(classes["mobile"])

	return <div
		style={{
			background: `url(${workspaceBackgroundURL})`,
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
