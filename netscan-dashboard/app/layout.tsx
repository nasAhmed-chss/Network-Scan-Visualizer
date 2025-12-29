import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ScanProvider } from "@/lib/context/ScanContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NetScan - Network Visualizer",
  description: "Professional network scanning dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScanProvider>
          {children}
        </ScanProvider>
      </body>
    </html>
  );
}