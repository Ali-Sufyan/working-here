import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import ToastProvider from "./components/utilities/toaster.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import Auth0ReadyProvider from "@/components/utilities/Auth0ReadyProvider.tsx";

console.log("🔍 AUTH0 ENV", {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  redirectUri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      }}
      cacheLocation="localstorage"
      useRefreshTokens
    >
      <Auth0ReadyProvider>
        <Provider store={store}>
          <ToastProvider />
          <App />
        </Provider>
      </Auth0ReadyProvider>
    </Auth0Provider>
  </React.StrictMode>
);
