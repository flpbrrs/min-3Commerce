import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Create Next App"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="
        antialiased bg-emerald-500 h-screen
        flex flex-col
        xl:flex-row
      ">
        <nav className="p-4">
          <Image
            width={96}
            height={96}
            src="./3commerce_logo.svg"
            alt="3C E-Commerce"
          />
        </nav>
        <main className="
          bg-zinc-200 class flex-1 p-4
          rounded-tl-2xl rounded-bl-2xl
          overflow-y-auto shadow-2xl
        ">
          {children}
        </main>
      </body>
    </html>
  );
}
