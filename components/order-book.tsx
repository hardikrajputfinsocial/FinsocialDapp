"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

type OrderBookEntry = {
  price: string
  amount: string
  total: string
}

export function OrderBook() {
  const [asks, setAsks] = useState<OrderBookEntry[]>([])
  const [bids, setBids] = useState<OrderBookEntry[]>([])

  useEffect(() => {
    // Simulate order book data
    const generateOrderBook = () => {
      const basePrice = 68245.32
      const newAsks: OrderBookEntry[] = []
      const newBids: OrderBookEntry[] = []

      let askTotal = 0
      for (let i = 0; i < 10; i++) {
        const price = (basePrice + i * 5 + Math.random() * 2).toFixed(2)
        const amount = (Math.random() * 0.5).toFixed(4)
        askTotal += Number.parseFloat(amount)
        newAsks.push({
          price,
          amount,
          total: askTotal.toFixed(4),
        })
      }

      let bidTotal = 0
      for (let i = 0; i < 10; i++) {
        const price = (basePrice - i * 5 - Math.random() * 2).toFixed(2)
        const amount = (Math.random() * 0.5).toFixed(4)
        bidTotal += Number.parseFloat(amount)
        newBids.push({
          price,
          amount,
          total: bidTotal.toFixed(4),
        })
      }

      setAsks(newAsks)
      setBids(newBids)
    }

    generateOrderBook()
    const interval = setInterval(generateOrderBook, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-xs">
      <div className="grid grid-cols-3 gap-2 font-medium text-muted-foreground mb-1">
        <div>Price (USDT)</div>
        <div className="text-right">Amount (BTC)</div>
        <div className="text-right">Total</div>
      </div>
      <div className="space-y-1">
        {asks.map((ask, index) => (
          <div
            key={`ask-${index}`}
            className="grid grid-cols-3 gap-2 text-red-500 hover:bg-muted/50 rounded px-1 py-0.5"
          >
            <div>{ask.price}</div>
            <div className="text-right">{ask.amount}</div>
            <div className="text-right">{ask.total}</div>
          </div>
        ))}
      </div>
      <div className="py-2 flex items-center justify-between text-lg font-bold">
        <span>68,245.32</span>
        <span className="text-green-500 flex items-center">
          <ArrowUp className="h-4 w-4 mr-1" />
          1.86%
        </span>
      </div>
      <div className="space-y-1">
        {bids.map((bid, index) => (
          <div
            key={`bid-${index}`}
            className="grid grid-cols-3 gap-2 text-green-500 hover:bg-muted/50 rounded px-1 py-0.5"
          >
            <div>{bid.price}</div>
            <div className="text-right">{bid.amount}</div>
            <div className="text-right">{bid.total}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
