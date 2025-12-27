import type { Metadata } from "next";
import SideNav from "./components/SideNav";
import Header from "./components/Header";
import BoardContextProvider from "./components/BoardContextProvider";
import DarkModeProvider from "./components/DarkModeProvider";

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
      <body className="w-full">
        <DarkModeProvider>
          <BoardContextProvider>
            <div className="py-0 px-0 flex items-center w-full h-screen">
              <SideNav />
              {children}
            </div>
          </BoardContextProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
