"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import AppSidebar from "../components/layout/AppSidebar";
import MainContainer from "../components/layout/Main";

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient()); // Evita re-creaciones

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col md:flex-row">
        <AppSidebar />
        <MainContainer>{children}</MainContainer>
      </div>
    </QueryClientProvider>
  );
}
