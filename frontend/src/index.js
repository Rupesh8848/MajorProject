import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./Context/userContext";
import { LoaderProvider } from "./Context/loaderContext";
import { TableProvider } from "./Context/tableDataContext";
import { ModalProvider } from "./Context/modalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <LoaderProvider>
      <TableProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </TableProvider>
    </LoaderProvider>
  </UserProvider>
);
