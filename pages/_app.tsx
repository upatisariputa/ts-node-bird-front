import { NextPage } from "next";
import { AppProps } from "next/app";

import Head from "next/head";
import "antd/dist/antd.css";

import wrapper from "../store/configureStore";

const App: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Node Bird</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(App);
