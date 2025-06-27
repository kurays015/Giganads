import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/app/provider";
import { DashboardProvider } from "@/contexts/DashboardContext";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GigaNads",
  description: "NFT tool on Monad Testnet",
  creator: "Kurayss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased min-h-screen w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900`}
      >
        <Provider>
          <DashboardProvider>
            <Header />
            {children}
          </DashboardProvider>
        </Provider>
      </body>
    </html>
  );
}
