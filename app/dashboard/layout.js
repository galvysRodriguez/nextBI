"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import AppSidebar from "../components/layout/AppSidebar";
import MainContainer from "../components/layout/Main";
import { useEffect } from "react";
import { useAuthStore } from "../components/hooks/auth/useAuthStore";
import FloattingHelpButton from "../components/container/FloatingHelpButton";
import { TourProvider } from "@reactour/tour";
import { useTour } from "@reactour/tour";
import { OnboardingSteps as steps } from "../components/formula/create/OnborardingSteps";
import TourWrapper from "../components/utils/ToursWrapper";

function TourStarter() {
  const { setIsOpen } = useTour();

  useEffect(() => {
    const seenTour = localStorage.getItem("hasSeenTourFormulaEditor");

    if (!seenTour) {
      setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("hasSeenTourFormulaEditor", "true");
      }, 500);
    }
  }, [setIsOpen]);

  return null; // No renderiza nada
}


export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient()); // Evita re-creaciones

  const loadFromStorage = useAuthStore((state) => state.loadFromStorage);

  const { setIsOpen } = useTour(); 

  useEffect(() => {
    const seenTour = localStorage.getItem("hasSeenTourFormulaEditor");

    if (!seenTour) {
      setTimeout(() => {
        setIsOpen(true); 
      }, 500);
      localStorage.setItem("hasSeenTourFormulaEditor", "true");
    }
  }, [setIsOpen]);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col md:flex-row">
        <AppSidebar />
          <TourWrapper>
            <TourStarter/>
            <MainContainer>{children}</MainContainer>
          </TourWrapper>
        <FloattingHelpButton/>
      </div>
    </QueryClientProvider>
  );
}
