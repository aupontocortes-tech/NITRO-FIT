"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Dashboard error:", error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] items-center justify-center p-6">
      <Card className="border-border bg-card w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Algo deu errado</h2>
          <p className="text-sm text-muted-foreground">
            O dashboard nao carregou. Pode ser instabilidade da rede ou do servidor. Tente de novo.
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={reset} variant="default">
            Tentar novamente
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
