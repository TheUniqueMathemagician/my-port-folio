import Hotjar from "@/modules/global/Hotjar"
import Setup from "@/modules/global/Setup"
import "@/styles/global.scss"
import type { FunctionComponent, PropsWithChildren } from "react"

const RootLayout: FunctionComponent<PropsWithChildren> = (props) => {
	const { children } = props

	return <html lang="en">
		<head>
			{process.env.NODE_ENV !== "development" && <Hotjar />}
		</head>
		<body>
			<Setup>
				{children}
			</Setup>
		</body>
	</html>
}

export default RootLayout
