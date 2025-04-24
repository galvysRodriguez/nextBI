import { Montserrat } from "next/font/google";
import "./globals.css";
import { LOGO_AFTIM } from "./components/utils/const";
import { ToastContainerModal } from "./components/utils/ToastContainer";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // Incluye todos los pesos
  variable: '--font-montserrat', // Variable CSS para la fuente
});

export const metadata = {
  title: "Inteligencia de negocios AFTIM",
  description: "Inteligencia de negocios AFTIM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Inteligencia de negocios AFTIM</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="This is a basic layout for a Next.js application" />
        <meta name="author" content="Your Name" />
        <meta name="keywords" content="Next.js, React, Layout, Basic" />
        <link rel="icon" href={LOGO_AFTIM} />
      </head>
      <body
        className={montserrat.variable}
      >
        {children}
        <ToastContainerModal/>
      </body>
    </html>
  );
}
