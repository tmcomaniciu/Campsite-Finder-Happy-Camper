import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./contexts/AppContext";
import { SearchContextProvider } from "./contexts/SearchContext";
import { ThemeProvider } from "@material-tailwind/react";

const queryClient = new QueryClient({
  defualtOptions: {
    queries: {
      retry: 0,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <SearchContextProvider>
        {/* <AppContextProvider> */}
        <App />
        {/* </AppContextProvider> */}
      </SearchContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);