import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import ScrollAnimations from "./components/ScrollAnimations";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Renad International Trading — Connecting Global Brands with GCC Markets",
  description:
    "Renad International Trading FZCO is a UAE-based distribution partner bringing the world's leading consumer brands to retail networks across Saudi Arabia, the UAE, Qatar, Kuwait, Bahrain, and Oman.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-sans text-slate-700">
        <ScrollAnimations />
        {children}
      </body>
    </html>
  );
}
