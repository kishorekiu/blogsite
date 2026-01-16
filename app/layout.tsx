import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore
import "./globals.css";
import NavBar from "@/components/NavBar";
import StoreProvider from "@/app/StoreProvider";
import { getDataFromToken } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Blogs",
  description:
    "This is a blog site application built on NextJS App Router to share all developers experiences on their daily basis",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuth = await getDataFromToken();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider isAuth={isAuth}>
          <NavBar />
          <div className="mx-44">{children}</div>
        </StoreProvider>
      </body>
    </html>
  );
}
