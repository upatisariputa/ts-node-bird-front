import Head from "next/head";
import "antd/dist/antd.css";
import wrapper from "../store/configureStore";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Node Bird</title>
      </Head>
      <div>Common Menu</div>
      <Component />
    </>
  );
};

export default wrapper.withRedux(App);
