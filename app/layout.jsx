import Link from "next/link";
import localFont from "next/font/local";
import "./globals.css";

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
        <header className="p-5 bg-gray-1000">
          <nav className="flex gap-5">
            <Link href="/main">Main Page</Link>
            <Link href="/template-builder">Template Builder</Link>
          </nav>
        </header>
        <main className="p-5">{children}</main>
      </body>
    </html>
  );
}
