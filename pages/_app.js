import "@/styles/globals.css";
import store from "@/utils/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  let persistor = persistStore(store);
  return (
    <>
    <Head>
      <title>KCConnect</title>
    </Head>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navbar/>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}
