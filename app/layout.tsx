import type { Metadata } from "next";
import './globals.css';
import { Geist, Geist_Mono } from "next/font/google";
import ScrollToTop from "../components/ScrollToTop";
import GlobalLoader from "../components/GlobalLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "منارة الهدى",
  description: "منارة الهدى - منصة تعليمية متخصصة في القرآن الكريم والعلوم الشرعية",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalLoader />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
