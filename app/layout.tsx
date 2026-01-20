import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore
import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import StoreProvider from "@/app/StoreProvider";
import { getDataFromToken } from "@/lib/auth";
import RenderSnackbar from "@/components/ui/RenderSnackbar";
import AuthNotifier from "@/components/utility/AuthNotifier";
import Footer from "@/components/ui/Footer";

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
        className={`${geistSans.variable} ${geistMono.variable}
          antialiased flex flex-col min-h-screen
          bg-white dark:bg-gray-950 text-gray-900 dark:text-white
          transition-colors duration-200
        `}
      >
        <StoreProvider isAuth={isAuth}>
          <NavBar />
          <main className="grow">{children}</main>
          <AuthNotifier />
          <RenderSnackbar />
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
