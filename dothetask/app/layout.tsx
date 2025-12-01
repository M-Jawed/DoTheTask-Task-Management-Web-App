import type { Metadata } from "next";
import SideNav from "./components/SideNav";
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
      <body className="flex items-center gap-5">
        <SideNav />
        {children}
      </body>
    </html>
  );
}
