import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
<<<<<<< HEAD
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./contexts/AppContext";

const queryClient = new QueryClient({
  defualtOptions: {
    queries: {
      retry: 0,
    },
  },
});
=======
import Night from "./components/night";
>>>>>>> main

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </QueryClientProvider>
=======
    <App />
    <Night />
>>>>>>> main
  </React.StrictMode>
);
