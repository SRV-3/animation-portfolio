import SmoothScroller from "@/components/SmoothScroller";
import Navbar from "@/components/Navbar";
import "./globals.css";

import { Inter, JetBrains_Mono } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "PORTFOLIO",
  description: "My first animated portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <SmoothScroller>{children}</SmoothScroller>
      </body>
    </html>
  );
}
