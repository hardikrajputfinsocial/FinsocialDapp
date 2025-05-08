"use client"

import { Button } from "@/components/ui/button"

export function TradeHistory() {
  return (
    <div className="text-sm">
      <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
        <p className="mb-2">No trade history</p>
        <Button variant="outline" size="sm">
          View All Trades
        </Button>
      </div>
    </div>
  )
}
