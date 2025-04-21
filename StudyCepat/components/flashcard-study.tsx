"use client"

import { useState } from "react"
import { Shuffle, RotateCcw, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { generateMoreFlashcards } from "@/actions/process-document"
import { useToast } from "@/hooks/use-toast"

interface Flashcard {
  id: string
  question: string
  answer: string
}

interface FlashcardStudyProps {
  documentId: string
  initialFlashcards: Flashcard[]
}

export function FlashcardStudy({ documentId, initialFlashcards }: FlashcardStudyProps) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(initialFlashcards)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const currentFlashcard = flashcards[currentIndex]

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowAnswer(false)
    }
  }

  const handleFlip = () => {
    setShowAnswer(!showAnswer)
  }

  const handleShuffle = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5)
    setFlashcards(shuffled)
    setCurrentIndex(0)
    setShowAnswer(false)
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setShowAnswer(false)
  }

  const handleGenerateMore = async () => {
    try {
      setIsLoading(true)
      const newFlashcards = await generateMoreFlashcards(documentId)
      setFlashcards(newFlashcards)
      toast({
        title: "New flash cards generated",
        description: `Added ${newFlashcards.length - flashcards.length} new flash cards`,
      })
    } catch (error) {
      toast({
        title: "Error generating flash cards",
        description: "There was an error generating more flash cards",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (flashcards.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground mb-4">No flash cards available for this document.</p>
        <Button onClick={handleGenerateMore} disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Flash Cards"}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Card {currentIndex + 1} of {flashcards.length}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleShuffle}>
            <Shuffle className="h-4 w-4 mr-1" />
            Shuffle
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
          <Button variant="outline" size="sm" onClick={handleGenerateMore} disabled={isLoading}>
            <Plus className="h-4 w-4 mr-1" />
            Generate More
          </Button>
        </div>
      </div>

      <Card
        className="min-h-[300px] flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-md"
        onClick={handleFlip}
      >
        <CardContent className="p-6 w-full h-full flex items-center justify-center">
          <div className="text-center max-w-lg">
            <p className="text-xl font-medium">{showAnswer ? currentFlashcard.answer : currentFlashcard.question}</p>
            <p className="text-sm text-muted-foreground mt-4">{showAnswer ? "Answer" : "Question"} (click to flip)</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button variant="outline" onClick={handleNext} disabled={currentIndex === flashcards.length - 1}>
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
