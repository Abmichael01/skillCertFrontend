import type { Metadata } from "next";
import { Inter as FontSans, Quicksand, Roboto_Serif, Nunito } from "next/font/google";
import "../_styles/globals.css";
import { cn } from "@/lib/utils";
import Navbar from "../_components/Navbar";
import ReactQueryProvider from "../ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const font = Nunito({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SkillCert",
  description: "take a test and earn a certificate",
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
          font.variable
        )}
      >
        
        <ReactQueryProvider>
          <Navbar />
          <div className="pt-24 pb-10 text-zinc-700">{children}</div>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
