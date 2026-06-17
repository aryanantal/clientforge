import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageLoaderWrapper from "./components/PageLoaderWrapper";

const geistSans = Geist({
variable: "--font-geist-sans",
subsets: ["latin"],
});

const geistMono = Geist_Mono({
variable: "--font-geist-mono",
subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aryan Antal — Frontend Engineer · Next.js & HubSpot CMS",
  description:
    "Frontend Engineer specializing in Next.js, React, HubSpot CMS, and Core Web Vitals. Production apps and enterprise HubSpot builds.",
  keywords: ["Aryan Antal", "Frontend Engineer", "Next.js", "HubSpot CMS", "Web Performance"],
  icons: {
    icon: "/Favicon.png",
  },
};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
  <html
    lang="en"
    className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
  >
    <body className="min-h-full flex flex-col">
      <Header />
        <main className="flex-1">
        <PageLoaderWrapper>{children}</PageLoaderWrapper>
        </main>       
      <Footer />
    </body>
  </html>
);
}
