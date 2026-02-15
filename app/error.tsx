"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("App error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-foreground">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-7 w-7 text-destructive" />
      </div>
      <h1 className="text-xl font-semibold">Algo deu errado</h1>
      <p className="max-w-sm text-center text-sm text-muted-foreground">
        O aplicativo encontrou um erro. Tente recarregar a pagina.
      </p>
      <Button onClick={reset}>Recarregar pagina</Button>
    </div>
  )
}
