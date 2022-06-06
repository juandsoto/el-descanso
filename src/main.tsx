import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./context/auth";
import Theme from "./Theme";
import { ReservaProvider } from "./context/reserva";
import { AppProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme>
      <AuthProvider>
        <AppProvider>
          <ReservaProvider>
            <App />
          </ReservaProvider>
        </AppProvider>
      </AuthProvider>
    </Theme>
  </React.StrictMode>
);
