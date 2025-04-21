"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner'

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
    } else {
      toast.error("Invalid file type: Please upload a PDF file")
      e.target.value = ""
    }
  }

  const handleUpload = async () => {
    if (!file) return

    try {
      setIsUploading(true)

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("http://127.0.0.1:8000/summarize", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Upload failed:", errorData);
        toast.error(`Upload failed: There was an error uploading your document: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      console.log("Success:", data);
      toast.success("Document uploaded successfully: Your document has been sent for summarization.");

      // Assuming the backend returns an ID or some identifier
      // that you want to use for navigation. Adjust accordingly.
      if (data && data.documentId) {
        router.push(`/summary/${data.documentId}`);
      } else {
        // Optionally handle cases where no ID is returned
        console.warn("No document ID received from the backend.");
      }

    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed: There was an error uploading your document");
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="pdf-upload">Upload PDF</Label>
        <div className="flex items-center gap-3">
          <Input id="pdf-upload" type="file" accept=".pdf" onChange={handleFileChange} disabled={isUploading} />
        </div>
      </div>

      {file && (
        <div className="flex items-center gap-2 text-sm">
          <FileText className="h-4 w-4" />
          <span>{file.name}</span>
        </div>
      )}

      <Button onClick={handleUpload} disabled={!file || isUploading} className="w-full sm:w-auto">
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload and Summarize
          </>
        )}
      </Button>
    </div>
  )
}