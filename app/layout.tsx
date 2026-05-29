import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import "./styles.css";
import "./pages.css";
import { CartProvider } from "./components/CartProvider";
import Navbar from "./components/Navbar";
import SiteFooter from "./components/SiteFooter";
import CartDrawer from "./components/CartDrawer";

export const metadata: Metadata = {
  title: "The Archive — Football Heritage Collection",
  description:
    "Tienda de camisetas históricas de fútbol. Leyendas, finales eternas y drops icónicos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
