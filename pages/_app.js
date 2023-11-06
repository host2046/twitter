import { Provider } from "react-redux";
import "../styles/globals.css";

import store from "../store";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </RecoilRoot>
  );
}

export default MyApp;
