import { Provider } from "react-redux";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import store from "../store";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
