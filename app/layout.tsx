import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import "./styles.css";
import "./pages.css";
import { CartProvider } from "./components/CartProvider";
import Navbar from "./components/Navbar";
import SiteFooter from "./components/SiteFooter";
import CartDrawer from "./components/CartDrawer";
import Toast from "./components/Toast";

export const metadata: Metadata = {
  title: "The Archive — Football Heritage Collection",
  description:
    "Online store of historic football jerseys. Legends, eternal finals and iconic drops.",
  openGraph: {
    title: "The Archive — Football Heritage Collection",
    description:
      "Online store of historic football jerseys. Legends, eternal finals and iconic drops.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <SiteFooter />
          <CartDrawer />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
