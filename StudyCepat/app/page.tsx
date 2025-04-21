import { Logo } from "@/components/logo"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex justify-center pt-8 pb-16">
          <Logo />
        </div>

        <div className="flex flex-col items-center justify-center space-y-8 text-center pt-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-navy-900">
            Turn Notes Into
            <br />
            Knowledge.
          </h1>

          <p className="text-xl text-gray-700 max-w-2xl">
            Upload your lecture notes and get simplified flashcards instantly.
          </p>

          <div className="pt-8">
            <Link href="/upload">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
