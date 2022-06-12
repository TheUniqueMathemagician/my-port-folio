import { AppProps } from "next/dist/shared/lib/router/router"
import Head from "next/head"
import { FC } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { Provider } from "react-redux"
import { store } from "../store"
import "../styles/global.scss"
import { Page } from "../types/Page"

type AppPropsWithLayout = AppProps & { Component: Page }

const client = new QueryClient()

const App: FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
	const getLayout = Component.layout || ((page) => page)

	// const setRootVariables = () => {
	// 	const root = document.getElementById("__next")

	// 	for (const key in initialState.palette) {
	// 		const value = (initialState.palette[key] as ColorPalette)[initialState.colorScheme]

	// 		root?.style.setProperty(`--cvos-${key}`, value)
	// 		// root?.style.setProperty(`--cvos-${key}-20`, `${value}14`);
	// 		root?.style.setProperty(`--cvos-${key}-33`, `${value}55`)
	// 		root?.style.setProperty(`--cvos-${key}-50`, `${value}80`)
	// 		root?.style.setProperty(`--cvos-${key}-67`, `${value}aa`)
	// 	}
	// }

	// if (typeof window !== "undefined") setRootVariables()

	return <Provider store={store}>
		<QueryClientProvider client={client}>
			<Head><title>Tamburrini Yannick</title></Head>
			{getLayout(<Component {...pageProps} />)}
		</QueryClientProvider>
	</Provider>
}

export default App
