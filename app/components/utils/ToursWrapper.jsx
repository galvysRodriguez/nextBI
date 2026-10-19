"use client";
import { TourProvider } from "@reactour/tour";

export default function TourWrapper({ children }) {
  return (
    <TourProvider
      steps={[]}
      showNavigation={true}
      showBadge={false}
      disableInteraction={true}
      styles={{
        maskWrapper: (base) => ({
          ...base,
          zIndex: 9999,
        }),
        popover: (base) => ({
          ...base,
          backgroundColor: "#f9f9f9",
          borderRadius: "12px",
          padding: "20px",
          paddingRight: "40px", 
          maxWidth: "400px",
          color: "#333",
          fontSize: "16px",
          fontFamily: "Arial, sans-serif",
        }),
        badge: (base) => ({
          ...base,
          backgroundColor: "#085494",
          color: "white",
        }),
        close: (base) => ({
          ...base,
          color: "#085494",
        }),
        dot: (base, state) => ({
          ...base,
          backgroundColor: state.current ? "#085494" : "#ccc",
        }),
      }}
    >
      {children}
    </TourProvider>
  );
}
