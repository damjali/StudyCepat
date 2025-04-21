import Link from "next/link"
import { ArrowUp } from "lucide-react"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-navy-900">
      <div className="flex items-center justify-center w-10 h-10 border-2 border-navy-900 rounded-md">
        <ArrowUp className="w-6 h-6 text-navy-900" />
      </div>
      <span className="text-xl font-bold text-navy-900">Note2Card</span>
    </Link>
  )
}
