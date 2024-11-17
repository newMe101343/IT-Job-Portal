import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./Components/Navbar";
import { UserProvider } from "./Contexts/userContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "TechHire",
  description: "IT Job Portal developed using NextJS , ExpressJS , MongoDB and Python .",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>

          <Navbar></Navbar>
        <main className="mt-16">
        {children}
        </main>
        </UserProvider>
      </body>
    </html>
  );
}
