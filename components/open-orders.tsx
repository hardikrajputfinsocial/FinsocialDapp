"use client"

import { Button } from "@/components/ui/button"

export function OpenOrders() {
  return (
    <div className="text-sm">
      <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
        <p className="mb-2">No open orders</p>
        <Button variant="outline" size="sm">
          View Order History
        </Button>
      </div>
    </div>
  )
}
