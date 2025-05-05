import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Food Persona Quiz",
  description: "Discover your food personality type!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body className={`${poppins.variable} font-sans`}>{children}</body>
    </html>
  );
}
