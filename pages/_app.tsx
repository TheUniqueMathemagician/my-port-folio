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

	return <Provider store={store}>
		<QueryClientProvider client={client}>
			<Head><title>Tamburrini Yannick</title></Head>
			{getLayout(<Component {...pageProps} />)}
		</QueryClientProvider>
	</Provider>
}

export default App
