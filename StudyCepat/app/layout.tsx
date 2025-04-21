import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Logo from "@/components/logo"
import BackgroundAnimation from "@/components/cursor-effect"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StudyCepat - Turn Notes Into Knowledge",
  description: "Upload your lecture notes and get simplified flashcards instantly.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <BackgroundAnimation />
        <div className="relative z-10">
          <header className="container mx-auto px-4 py-8 flex justify-center">
            <Logo />
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
