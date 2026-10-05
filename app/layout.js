import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", weight: ["500", "700", "800"] });
const body = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "VESCO Downtown | Explore the bike piece by piece",
  description: "Scroll to take the VESCO Downtown mountain bike apart and see what every part does.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
