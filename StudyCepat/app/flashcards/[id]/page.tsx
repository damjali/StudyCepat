"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Logo } from "@/components/logo"

// Sample flashcard data
const flashcards = [
  {
    question: "What is the time complexity of Merge Sort?",
    answer: "Time complexity of Merge Sort is O(n log n).",
  },
  {
    question: "What is the time complexity of Quick Sort in worst case?",
    answer: "O(n²) in the worst case.",
  },
  {
    question: "What is the time complexity of Binary Search?",
    answer: "O(log n)",
  },
  {
    question: "What data structure uses LIFO principle?",
    answer: "Stack",
  },
  {
    question: "What data structure uses FIFO principle?",
    answer: "Queue",
  },
  // Add more flashcards to reach 25 total
  // ...
]

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const totalFlashcards = flashcards.length
  const router = useRouter()

  const handleNext = () => {
    if (currentIndex < totalFlashcards - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="fixed bottom-6 left-6">
        <Logo />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-center text-navy-900 mb-10">Your flashcard is ready!</h1>

        <div className="w-full max-w-2xl">
          <Card className="bg-gray-300 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="rounded-full bg-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <div
                className={`flashcard relative w-full h-64 mx-4 cursor-pointer ${isFlipped ? "flipped" : ""}`}
                onClick={handleFlip}
              >
                <div className="flashcard-front bg-white rounded-lg p-6 flex items-center justify-center">
                  <div className="text-center text-xl">{flashcards[currentIndex].question}</div>
                </div>
                <div className="flashcard-back bg-white rounded-lg p-6 flex items-center justify-center">
                  <div className="text-center text-xl">{flashcards[currentIndex].answer}</div>
                </div>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={currentIndex === totalFlashcards - 1}
                className="rounded-full bg-white"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            <div className="text-center">
              {currentIndex + 1}/{totalFlashcards}
            </div>
          </Card>

          <div className="mt-8 text-center">
            <Button
              onClick={() => router.push("/upload")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2"
            >
              Create new flashcards
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
