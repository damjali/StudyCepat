"use client"

import type React from "react"
import { useState, useRef, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { Upload, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [article, setArticle] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleArticleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setArticle(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!file && !article.trim()) {
      alert("Please upload a PDF or enter an article to continue")
      return
    }

    // Simulate processing
    setIsProcessing(true)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          router.push("/flashcards")
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#1e293b]">Upload Your Note.</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Choose a file from your device or paste texts of articles to be summarised into flashcards.
      </p>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <Card className="card-glass">
          <CardContent className="p-0">
            <div
              className={`upload-dropzone ${isDragging ? "active" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {file ? (
                <div className="file-preview">
                  <div className="flex items-center gap-2">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                        stroke="#1e293b"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{file.name}</span>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveFile()
                      }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">Upload or drag .pdf notes</p>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf" className="hidden" />
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardContent className="p-0">
            <Textarea
              className="min-h-[300px] border-0 rounded-lg resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Paste an article..."
              value={article}
              onChange={handleArticleChange}
            />
          </CardContent>
        </Card>

        <div className="md:col-span-2 mt-6">
          <Button type="submit" className="w-full py-6 text-lg" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              "Generate Flashcards"
            )}
          </Button>
        </div>
      </form>

      {isProcessing && (
        <Alert className="fixed bottom-4 right-4 w-80 bg-white shadow-lg">
          <AlertDescription className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Processing notes...</span>
              <span className="text-xs text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
