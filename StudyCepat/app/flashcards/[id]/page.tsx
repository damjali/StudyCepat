"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Sample flashcards data
const sampleFlashcards = [
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
    question: "What is the space complexity of BFS?",
    answer: "O(V) where V is the number of vertices.",
  },
  {
    question: "What is the time complexity of Dijkstra's algorithm?",
    answer: "O(V²) without min-priority queue and O((V+E)logV) with min-priority queue.",
  },
]

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const totalCards = sampleFlashcards.length

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext()
      } else if (e.key === "ArrowLeft") {
        handlePrevious()
      } else if (e.key === " " || e.key === "Enter") {
        toggleFlip()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentIndex, isFlipped])

  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
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

  const toggleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-[#1e293b]">Flashcard ready!</h1>

      <div className="flashcard-container">
        <div className="flashcard-wrapper">
          <div className={`flashcard ${isFlipped ? "flipped" : ""}`} onClick={toggleFlip}>
            <div className="flashcard-front">{sampleFlashcards[currentIndex].question}</div>
            <div className="flashcard-back">{sampleFlashcards[currentIndex].answer}</div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="bg-white"
          >
            <ChevronLeft className={currentIndex === 0 ? "text-gray-300" : "text-gray-700"} />
            <span className="sr-only">Previous card</span>
          </Button>

          <div className="text-sm text-gray-600">
            {currentIndex + 1}/{totalCards}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex === totalCards - 1}
            className="bg-white"
          >
            <ChevronRight className={currentIndex === totalCards - 1 ? "text-gray-300" : "text-gray-700"} />
            <span className="sr-only">Next card</span>
          </Button>
        </div>
      </div>

      <div className="mt-12">
        <Button asChild className="px-8 py-6">
          <Link href="/upload">Create more flashcards</Link>
        </Button>
      </div>

      <p className="text-sm text-gray-500 mt-12">Made with love by Team Paling Seronok</p>
    </div>
  )
}
