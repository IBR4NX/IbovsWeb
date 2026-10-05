import App from "./app/App.tsx";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { store } from "./lib/store.ts";
import "./lib/i18n.ts";
import "./index.css";
// import { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";

// import "../assets/fonts/fonts.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store} >
    <HelmetProvider>
      <App />
    </HelmetProvider>
     </Provider>
// </StrictMode>
);
