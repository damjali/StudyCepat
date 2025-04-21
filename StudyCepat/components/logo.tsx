"use client";

import { ArrowUp } from "lucide-react"
import { useRouter } from 'next/navigation';

export function Logo() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <button onClick={handleLogoClick} className="flex items-center gap-2 text-navy-900">
      <img src="/logo.png" alt="Logo" className="w-24 h-24 object-contain rounded-md" />
    </button>
  );
}
