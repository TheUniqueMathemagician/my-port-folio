import Hotjar from "@/modules/global/Hotjar"
import Setup from "@/modules/global/Setup"
import "@/styles/global.scss"
import type { FunctionComponent, PropsWithChildren } from "react"

const RootLayout: FunctionComponent<PropsWithChildren> = (props) => {
	const { children } = props

	return <html lang="en">
		<body>
			<Setup>
				{children}
			</Setup>
			<Hotjar />
		</body>
	</html>
}

export default RootLayout
