import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import ReactQueryProvider from "~/providers/react-query-provider";
import Navigation from "~/components/layout/navigation";
import { MSWComponent } from "~/components/msw-component";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coin Bot",
  description: "코인 트레이딩 봇",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MSWComponent>
          <ReactQueryProvider>
            <Navigation />
            {children}
            {modal}
          </ReactQueryProvider>
        </MSWComponent>
      </body>
    </html>
  );
}
