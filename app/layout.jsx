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
        <header className="p-2 bg-gray-1000">

          <div className="navbar bg-black flex justify-between">
            <Link href="/startUp"><img src="/TRVG_Logo_noBG.png" className="btn h-20 ml-5 bg-black hover:bg-black outline-none border-transparent hover:border-transparent" /></Link>

            <div className="mx-5 text-lg">
              <Link href="/main" className="ml-5"><p>Zvana Iestatīšana</p></Link>
              <Link href="/template-builder" className="ml-5"><p>Trafaretu Izveidotājs</p></Link>
              <Link href="/buj" className="mx-5"><p>Palīdzība</p></Link>
            </div>

          </div>

        </header>
        <main className="p-5">{children}</main>
      </body>
    </html>
  );
}
