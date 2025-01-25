import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Import the Navbar component

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
  title: "TRVĢ Zvanu Sistēma",
  description: "Skolas zvanu sistēmas aplikācija",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="flex flex-col h-screen overflow-hidden">
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
