import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./Context/userContext";
import { LoaderProvider } from "./Context/loaderContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <LoaderProvider>
      <App />
    </LoaderProvider>
  </UserProvider>
);
