import { useThemeStore } from "context/theme"
import { AppProps } from "next/dist/shared/lib/router/router"
import Head from "next/head"
import { FunctionComponent } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import "../styles/global.scss"
import { Page } from "../types/Page"

type AppPropsWithLayout = AppProps & { Component: Page }

const Setup: FunctionComponent = () => {
	const palette = useThemeStore((store) => store.palette)
	const colorScheme = useThemeStore((store) => store.colorScheme)

	const colorProperties = []

	for (const key in palette) {
		const paletteKey = key as keyof typeof palette

		const value = palette[paletteKey]?.[colorScheme]

		if (!value) continue

		colorProperties.push(`--cvos-${key}:${value};`)
		colorProperties.push(`--cvos-${key}-20:${value}14;`)
		colorProperties.push(`--cvos-${key}-33:${value}55;`)
		colorProperties.push(`--cvos-${key}-50:${value}80;`)
		colorProperties.push(`--cvos-${key}-67:${value}aa;`)
	}

	const colorPropertiesString = `#__next{${colorProperties.join("")}}`

	return <style>{colorPropertiesString}</style>
}

const client = new QueryClient()

const App: FunctionComponent<AppPropsWithLayout> = ({ Component, pageProps }) => {
	const getLayout = Component.layout || ((page) => page)

	return <QueryClientProvider client={client}>
		<Head>
			<title>Tamburrini Yannick</title>
			<meta name="description" content="Ceci est mon portfolio." />
		</Head>
		<Setup />
		{getLayout(<Component {...pageProps} />)}
	</QueryClientProvider>
}

export default App
