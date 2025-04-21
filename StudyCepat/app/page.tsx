import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[80vh] text-center w-full">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-[#1e293b]">
          Turn Notes Into
          <br />
          Knowledge.
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Upload your lecture notes and get simplified flashcards instantly.
        </p>
        <Button asChild size="lg" className="px-8 py-6 text-lg">
          <Link href="/upload">Get Started</Link>
        </Button>
      </section>

      {/* Why Flashcards Section */}
      <section className="w-full py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1e293b]">Why flashcards?</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Flashcards are a great way to study because they help you remember things better. When you look at a
                question and try to answer it from memory, your brain works harder—and that helps you learn faster.
              </p>
              <div className="pt-4">
                <Button asChild size="lg" className="px-8 py-6 text-lg">
                  <Link href="/upload">Get Started</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <Image
                  src="/images/robot-mascot.png"
                  alt="Flashcard Robot Mascot"
                  width={400}
                  height={400}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#1e293b]">
            How StudyCepat helps you learn
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-indigo-600"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1e293b]">Upload Your Notes</h3>
              <p className="text-gray-600">
                Simply upload your PDF notes or paste text directly. Our system processes your content instantly.
              </p>
            </div>
            <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-indigo-600"
                >
                  <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                  <path d="M12 8v-2" />
                  <path d="M12 18v-2" />
                  <path d="M16 12h2" />
                  <path d="M6 12h2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1e293b]">AI-Powered Processing</h3>
              <p className="text-gray-600">
                Our advanced AI extracts key concepts and creates perfectly balanced question-answer pairs.
              </p>
            </div>
            <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-indigo-600"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M7 7h10" />
                  <path d="M7 12h10" />
                  <path d="M7 17h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1e293b]">Study with Flashcards</h3>
              <p className="text-gray-600">
                Review your personalized flashcards with our interactive interface designed for effective learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-8 md:p-12 shadow-sm text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1e293b]">
              Ready to transform your study habits?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already using StudyCepat to study smarter, not harder.
            </p>
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link href="/upload">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center">
        <p className="text-sm text-gray-500">Made with love by Team Paling Seronok</p>
      </footer>
    </div>
  )
}
