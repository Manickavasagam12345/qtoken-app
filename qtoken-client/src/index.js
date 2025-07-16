import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AppThemeProvider from "./themes/ThemeProvider"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AppThemeProvider> {/* ✅ wrap with theme provider */}
      <App />
    </AppThemeProvider>
  </BrowserRouter>
);
