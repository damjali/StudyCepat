"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { X, FileText, Upload } from "lucide-react"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  const handleGenerateFlashcards = () => {
    if (!file) return

    setIsProcessing(true)

    // Simulate processing with progress updates
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          router.push("/flashcards")
        }, 500)
      }
    }, 150)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center text-navy-900 mb-6">Upload Your Note</h1>

        <Card className="bg-white shadow-md">
          <div
            className={`relative h-80 border-2 border-dashed rounded-md m-4 flex flex-col items-center justify-center cursor-pointer ${
              isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            {file ? (
              <div className="flex flex-col items-center">
                <div className="relative">
                  <FileText className="w-20 h-20 text-gray-700" />
                  <button
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveFile()
                    }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-2 text-gray-700">{file.name}</p>
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-500 mb-2" />
                <p className="text-gray-500">Upload or drag .pdf notes</p>
                <input id="file-upload" type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
              </>
            )}
          </div>
        </Card>

        <Button
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-6"
          disabled={!file || isProcessing}
          onClick={handleGenerateFlashcards}
        >
          Generate Flashcards
        </Button>

        {isProcessing && (
          <Card className="mt-4 p-4 bg-gray-100">
            <p className="text-center text-gray-700 mb-2">Processing notes...</p>
            <Progress value={progress} className="h-2" />
          </Card>
        )}
      </div>
    </main>
  )
}
