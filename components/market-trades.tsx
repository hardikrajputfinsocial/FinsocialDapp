"use client"

import { useState, useEffect } from "react"

type Trade = {
  id: number
  price: string
  amount: string
  time: string
  type: "buy" | "sell"
}

export function MarketTrades() {
  const [trades, setTrades] = useState<Trade[]>([])

  useEffect(() => {
    // Simulate market trades
    const generateTrade = () => {
      const basePrice = 68245.32
      const priceChange = (Math.random() * 20 - 10).toFixed(2)
      const price = (basePrice + Number.parseFloat(priceChange)).toFixed(2)
      const amount = (Math.random() * 0.5).toFixed(4)
      const type = Math.random() > 0.5 ? "buy" : "sell"

      const date = new Date()
      const hours = date.getHours().toString().padStart(2, "0")
      const minutes = date.getMinutes().toString().padStart(2, "0")
      const seconds = date.getSeconds().toString().padStart(2, "0")
      const time = `${hours}:${minutes}:${seconds}`

      const newTrade: Trade = {
        id: Date.now(),
        price,
        amount,
        time,
        type,
      }

      setTrades((prev) => [newTrade, ...prev].slice(0, 20))
    }

    generateTrade()
    const interval = setInterval(generateTrade, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-xs">
      <div className="grid grid-cols-3 gap-2 font-medium text-muted-foreground mb-1">
        <div>Price (USDT)</div>
        <div className="text-right">Amount (BTC)</div>
        <div className="text-right">Time</div>
      </div>
      <div className="space-y-1">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className={`grid grid-cols-3 gap-2 hover:bg-muted/50 rounded px-1 py-0.5 ${
              trade.type === "buy" ? "text-green-500" : "text-red-500"
            }`}
          >
            <div>{trade.price}</div>
            <div className="text-right">{trade.amount}</div>
            <div className="text-right text-muted-foreground">{trade.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
