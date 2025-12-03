import type { Metadata } from "next";
import SideNav from "./components/SideNav";
import Header from "./components/Header";

import "./globals.css";

export const metadata: Metadata = {
  title: "DoTheTask",
  description: "Task management web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center gap-5">
        <Header />
        {children}
      </body>
    </html>
  );
}
