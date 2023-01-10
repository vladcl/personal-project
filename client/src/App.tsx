import React from "react";
import { config } from "./configs/config";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const { baseUrl } = config;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={baseUrl}>
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
