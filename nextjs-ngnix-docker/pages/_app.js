import { useEffect } from "react";
import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
// ------- dashboard style start--------
import "@styles/pages/dashboard/dashboard-layout-style.scss";
import "@styles/pages/dashboard/dashboard-layout-style-responsive.scss";
// ------- dashboard style end --------
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import { Grid } from "antd";
import { Provider } from "react-redux";
import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const { useBreakpoint } = Grid;
let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => page);
  const screens = useBreakpoint();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    Router.events.on("routeChangeStart", () => {
      document.body.classList.add("loading-indicator");
      NProgress.start();
    });
    Router.events.on("routeChangeComplete", () => {
      document.body.classList.remove("loading-indicator");
      NProgress.done();
    });
    Router.events.on("routeChangeError", () => {
      document.body.classList.remove("loading-indicator");
      NProgress.done();
    });
  }, [router]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {getLayout(<Component {...pageProps} screens={screens} />)}
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
