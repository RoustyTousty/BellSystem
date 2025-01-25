"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header
      className="p-2 bg-neutral text-primary shadow-lg border-b-4 border-primary"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.02) 0px, rgba(0, 0, 0, 0.04) 10px, transparent 20px)",
      }}
    >
      <div className="navbar flex justify-between items-center">
        <Link href="/">
          <img
            src="/TRVG_Logo_noBG.png"
            className="h-20 ml-5 hover:opacity-90"
            alt="Logo"
          />
        </Link>

        <div className="mx-5 flex space-x-4">
          <Link href="/main">
            <button className="btn btn-primary text-neutral">Zvana Iestatīšana</button>
          </Link>
          <Link href="/template-builder">
            <button className="btn btn-primary text-neutral">Trafaretu Izveidotājs</button>
          </Link>
          <Link href="/buj">
            <button className="btn btn-primary text-neutral">Palīdzība</button>
          </Link>
        </div>
      </div>
    </header>
  );
}
