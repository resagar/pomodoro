import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import Menu from "./components/menu/menu";
import { sessionCookies } from "@/lib/utils";
import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pomodoro App",
  description: "app pomodoro, productivity and health",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { session } = await sessionCookies(cookies());
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col justify-between items-center`}
      >
        <Menu session={session} />
        <div className="container">{children}</div>
        <footer> Footer</footer>
        <Toaster />
      </body>
    </html>
  );
}
