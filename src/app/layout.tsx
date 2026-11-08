import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Domek",
  description: "Znajdź swój domek na weekend i na dłużej",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}
      </body>
    </html>
  );
}
