import { ClassName } from "@/utils/ClassName"
import { useOsStore } from "context/os"
import { useThemeStore } from "context/theme"
import { FunctionComponent, PropsWithChildren } from "react"
import classes from "./ScreenFrame.module.scss"

type ScreenFrameProps = PropsWithChildren

const ScreenFrame: FunctionComponent<ScreenFrameProps> = ({ children }) => {
	const workspaceBackgroundURL = useThemeStore((store) => store.workspaceBackgroundURL)

	const isMobile = useOsStore((store) => store.isMobile)

	const classNameBuilder = ClassName.builder(classes["root"])

	if (isMobile) classNameBuilder.add(classes["mobile"])

	return <div
		className={classNameBuilder.build()}
		style={{
			background: `url(${workspaceBackgroundURL})`,
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
		}}
	>
		{children}
	</div>
}

export default ScreenFrame
