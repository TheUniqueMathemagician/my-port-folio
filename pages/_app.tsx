import { AppProps } from "next/dist/shared/lib/router/router"
import Head from "next/head"
import { FC, useCallback, useEffect } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { Provider } from "react-redux"
import { initialState as themeInitialState } from "store/slices/Theme"
import { store } from "../store"
import "../styles/global.scss"
import { Page } from "../types/Page"

type AppPropsWithLayout = AppProps & { Component: Page }

const Setup: FC = () => {
	const setRootVariables = useCallback(() => {
		const root = document.getElementById("__next")

		for (const key in themeInitialState.palette) {
			type Palette = typeof themeInitialState.palette
			const paletteKey = key as keyof Palette
			const value = themeInitialState.palette[paletteKey][themeInitialState.colorScheme]

			root?.style.setProperty(`--cvos-${key}`, value)
			// root?.style.setProperty(`--cvos-${key}-20`, `${value}14`);
			root?.style.setProperty(`--cvos-${key}-33`, `${value}55`)
			root?.style.setProperty(`--cvos-${key}-50`, `${value}80`)
			root?.style.setProperty(`--cvos-${key}-67`, `${value}aa`)
		}
	}, [])

	useEffect(() => {
		if (typeof window !== "undefined") setRootVariables()
	}, [setRootVariables])

	return null
}

const client = new QueryClient()

const App: FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
	const getLayout = Component.layout || ((page) => page)

	return <Provider store={store}>
		<QueryClientProvider client={client}>
			<Head><title>Tamburrini Yannick</title></Head>
			<Setup />
			{getLayout(<Component {...pageProps} />)}
		</QueryClientProvider>
	</Provider>
}

export default App
