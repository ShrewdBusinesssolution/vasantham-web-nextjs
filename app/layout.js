import "./globals.css";
import {Urbanist} from "next/font/google";
import Header from "./layout/header";
import Footer from "./layout/footer";


const urbanist = Urbanist({ Weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ['latin'] })

export const metadata = {
  title: "Vasantham",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={urbanist.className}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
