
import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import "./styles.css";

export const metadata: Metadata = {
  title: "The Archive — Football Heritage Collection",
  description: "A curated collection of football's most iconic jerseys. History, preserved.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
