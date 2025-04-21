import Link from "next/link"
import { FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] text-center">
      <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Not Found</h1>
      <p className="text-muted-foreground mb-6">The document or flash cards you're looking for don't exist.</p>
      <Link href="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  )
}
