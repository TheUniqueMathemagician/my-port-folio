import {AppProps} from "next/dist/shared/lib/router/router";
import Head from "next/head";
import {QueryClient, QueryClientProvider} from "react-query";
import {Provider} from "react-redux";
import {store} from "../store";
import "../styles/core/_reset.scss";

const client = new QueryClient();

export default function App({Component, pageProps}: AppProps) {
  return <>
    <Head>
      <title>Tamburrini Yannick</title>
    </Head>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  </>;
}
