import type { Metadata, Viewport } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { ProfileModal } from "@/components/layout/ProfileModal";
import { ToastContainer } from "@/components/common/Toast";

// Font Abstraction Setup via Google Fonts
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display-google",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ui-google",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-meta-google",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "ZENJI — NEO KAGE Streetwear",
    template: "%s | ZENJI NEO KAGE"
  },
  description: "Anime-inspired premium streetwear. Limited drops, heavy organic cottons, technical HUD detailing.",
  keywords: ["streetwear", "anime fashion", "neo kage", "limited drop", "heavyweight tee", "techwear"],
  authors: [{ name: "ZENJI Team" }]
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070707"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="hud-grid-bg">
        <AnnouncementBar />
        <Navbar />
        <MobileMenu />
        <CartDrawer />
        <ProfileModal />
        <main id="main-content">{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
