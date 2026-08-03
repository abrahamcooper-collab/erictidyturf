import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Erics Tidy Turf | Landscaping, Hardscaping & Landscaping/Lawn Maintenance New Orleans",
  description: "Erics Tidy Turf provides premium landscaping, hardscaping, landscape lighting, drainage, irrigation, grading, sod installation, artificial turf, and pavers in New Orleans and surrounding areas. Over 26 years of experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}

