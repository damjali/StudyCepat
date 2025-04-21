import { FileUpload } from "@/components/file-upload"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Toaster, toast } from 'sonner'

export default function Home() {
  return (
    <div className="container mx-auto py-10">
          
      <h1 className="text-4xl font-bold mb-6 text-center">Lecture Note Flash Cards</h1>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Upload your lecture notes as PDF files and generate flash cards to test your knowledge using active recall
        techniques.
      </p>

      <div className="grid gap-8 max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Upload Lecture Notes</CardTitle>
            <CardDescription>Upload your PDF lecture notes to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload />
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}
