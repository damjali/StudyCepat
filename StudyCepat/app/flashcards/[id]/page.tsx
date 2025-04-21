import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { FlashcardStudy } from "@/components/flashcard-study"
import { getDocument, getFlashcards } from "@/actions/process-document"

interface FlashcardsPageProps {
  params: {
    id: string
  }
}

export default async function FlashcardsPage({ params }: FlashcardsPageProps) {
  const document = await getDocument(params.id)

  if (!document) {
    notFound()
  }

  const flashcards = await getFlashcards(params.id)

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="flex items-start gap-4 mb-6">
        <FileText className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">{document.name}</h1>
          <p className="text-muted-foreground">
            {flashcards.length} flash cards • Uploaded on {new Date(document.uploadedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Study Flash Cards</CardTitle>
            <CardDescription>Test your knowledge with active recall</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <FlashcardStudy documentId={params.id} initialFlashcards={flashcards} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
