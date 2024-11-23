import "./globals.css";
import { Urbanist } from "next/font/google";
import AuthProvider from "./utility/context/context-api";
import SessionWrapper from "./utility/SessionWrapper";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import Loader from "./utility/components/loader";



const urbanist = Urbanist({ Weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ['latin'] })

export const metadata = {
  title: "Vasantham",
  description: "Generated by create next app",
};


export default function RootLayout({ children }) {

  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={urbanist.className}>
          <NextTopLoader height={6} color="#008DF1" showSpinner={true} />
          <AuthProvider>
            {children}
            <Toaster richColors />
            <Loader />
          </AuthProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
