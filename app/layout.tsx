import type { Metadata } from "next";
import { inter } from "@/fonts";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: "MenuFacil",
  description: "Digital Menu SaaS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
