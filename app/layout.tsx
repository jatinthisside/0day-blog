
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
// import Footer from "@/components/Footer";
// import {Providers} from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "0dayblog",
  description: "One stop solution for all your webDev related problems",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col min-h-[100vh] w-[100vw] relative">
        {/* <Providers> */}
           <Navbar/>
          <div>
            {children}
          </div>
           {/* <Footer/> */}
        {/* </Providers> */}
        </main>
      </body>
    </html>
  );
}
