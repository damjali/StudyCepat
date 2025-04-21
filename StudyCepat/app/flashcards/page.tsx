"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react"

// Define the flashcard type
interface Flashcard {
  question: string;
  answer: string;
}

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Load flashcards from URL parameters or localStorage
  useEffect(() => {
    const loadFlashcards = () => {
      // First try to get flashcards from URL query params
      try {
        const params = new URLSearchParams(window.location.search);
        const flashcardsParam = params.get('flashcards');
        
        if (flashcardsParam) {
          try {
            const parsedFlashcards = JSON.parse(flashcardsParam);
            if (Array.isArray(parsedFlashcards) && parsedFlashcards.length > 0) {
              setFlashcards(parsedFlashcards);
              setLoading(false);
              return;
            }
          } catch (error) {
            console.error("Failed to parse flashcards from URL:", error);
          }
        }
        
        // Fallback to localStorage if URL parsing fails
        const storedFlashcards = localStorage.getItem('flashcards');
        if (storedFlashcards) {
          try {
            const parsedFlashcards = JSON.parse(storedFlashcards);
            if (Array.isArray(parsedFlashcards) && parsedFlashcards.length > 0) {
              setFlashcards(parsedFlashcards);
              setLoading(false);
              return;
            }
          } catch (e) {
            console.error("Failed to parse flashcards from localStorage:", e);
          }
        }
        
        // If we get here, we couldn't load flashcards
        setLoading(false);
      } catch (error) {
        console.error("Error loading flashcards:", error);
        setLoading(false);
      }
    };

    loadFlashcards();
  }, []);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  }

  const handleStartOver = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <RotateCw className="h-8 w-8 animate-spin text-indigo-600" />
          <p className="mt-4 text-lg">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-center text-navy-900 mb-10">
          {flashcards.length > 0 ? "Your flashcards are ready!" : "No flashcards found"}
        </h1>

        <div className="w-full max-w-2xl">
          {flashcards.length > 0 ? (
            <>
              <Card className="bg-gray-50 p-6 shadow-lg">
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
                    className="relative w-full h-64 mx-4 cursor-pointer perspective-1000"
                    onClick={handleFlip}
                  >
                    <div 
                      className={`absolute w-full h-full transition-transform duration-500 preserve-3d ${
                        isFlipped ? "rotate-y-180" : ""
                      }`}
                    >
                      <div className="absolute w-full h-full bg-white rounded-lg p-6 flex items-center justify-center backface-hidden">
                        <div className="text-center text-xl">{flashcards[currentIndex].question}</div>
                      </div>
                      <div className="absolute w-full h-full bg-white rounded-lg p-6 flex items-center justify-center backface-hidden rotate-y-180">
                        <div className="text-center text-xl">{flashcards[currentIndex].answer}</div>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNext}
                    disabled={currentIndex === flashcards.length - 1}
                    className="rounded-full bg-white"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500 mb-2">Click card to flip</p>
                  <p>{currentIndex + 1}/{flashcards.length}</p>
                </div>
                
                {currentIndex === flashcards.length - 1 && (
                  <div className="mt-4 text-center">
                    <Button
                      variant="outline"
                      onClick={handleStartOver}
                      className="text-indigo-600 border-indigo-600"
                    >
                      <RotateCw className="h-4 w-4 mr-2" />
                      Start Over
                    </Button>
                  </div>
                )}
              </Card>

              <style jsx global>{`
                .perspective-1000 {
                  perspective: 1000px;
                }
                .preserve-3d {
                  transform-style: preserve-3d;
                }
                .backface-hidden {
                  backface-visibility: hidden;
                }
                .rotate-y-180 {
                  transform: rotateY(180deg);
                }
              `}</style>
            </>
          ) : (
            <Card className="bg-gray-50 p-6 shadow-lg">
              <div className="text-center py-12">
                <p className="text-lg mb-6">No flashcards available. Please upload a document first.</p>
                <Button 
                  onClick={() => router.push("/upload")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2"
                >
                  Create flashcards
                </Button>
              </div>
            </Card>
          )}

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