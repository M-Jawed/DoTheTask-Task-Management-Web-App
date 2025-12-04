import type { Metadata } from "next";
import SideNav from "./components/SideNav";
import Header from "./components/Header";
import BoardContextProvider from "./components/BoardContextProvider";

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
      <body className=" flex flex-col items-center w-full">
        <BoardContextProvider>
        <Header />
        <div className="flex items-center gap-5 w-full">
          <SideNav />
          {children}
        </div>
        </BoardContextProvider>
      </body>
    </html>
  );
}
