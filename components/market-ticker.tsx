"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"

type MarketData = {
  symbol: string
  price: string
  change: string
  changePercent: string
  isPositive: boolean
}

export function MarketTicker() {
  const [markets, setMarkets] = useState<MarketData[]>([
    {
      symbol: "BTC/USDT",
      price: "68,245.32",
      change: "1,245.67",
      changePercent: "1.86",
      isPositive: true,
    },
    {
      symbol: "ETH/USDT",
      price: "3,456.78",
      change: "87.45",
      changePercent: "2.59",
      isPositive: true,
    },
    {
      symbol: "BNB/USDT",
      price: "567.89",
      change: "-12.34",
      changePercent: "2.13",
      isPositive: false,
    },
    {
      symbol: "SOL/USDT",
      price: "145.67",
      change: "5.43",
      changePercent: "3.87",
      isPositive: true,
    },
    {
      symbol: "XRP/USDT",
      price: "0.5678",
      change: "-0.0234",
      changePercent: "3.96",
      isPositive: false,
    },
    {
      symbol: "ADA/USDT",
      price: "0.4567",
      change: "0.0123",
      changePercent: "2.77",
      isPositive: true,
    },
  ])

  return (
    <div className="w-full overflow-hidden bg-background border-b py-2">
      <div className="flex animate-marquee whitespace-nowrap">
        {markets.map((market, index) => (
          <div key={index} className="mx-4 flex items-center">
            <span className="font-medium">{market.symbol}</span>
            <span className="ml-2">${market.price}</span>
            <span className={`ml-2 flex items-center ${market.isPositive ? "text-green-500" : "text-red-500"}`}>
              {market.isPositive ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
              {market.changePercent}%
            </span>
          </div>
        ))}
        {markets.map((market, index) => (
          <div key={`repeat-${index}`} className="mx-4 flex items-center">
            <span className="font-medium">{market.symbol}</span>
            <span className="ml-2">${market.price}</span>
            <span className={`ml-2 flex items-center ${market.isPositive ? "text-green-500" : "text-red-500"}`}>
              {market.isPositive ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
              {market.changePercent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
