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
		</body>
	</html>
}

export default RootLayout
