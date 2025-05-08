"use client"

import { useEffect, useRef } from "react"

interface TradingViewChartProps {
  symbol?: string
}

export function TradingViewChart({ symbol = "BINANCE:BTCUSDT" }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/tv.js"
    script.async = true
    script.onload = () => {
      if (typeof window.TradingView !== "undefined" && containerRef.current) {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: "60",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_chart",
        })
      }
    }
    document.head.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [symbol])

  return <div ref={containerRef} id="tradingview_chart" className="h-[500px] w-full" />
}

// Add TradingView to Window interface
declare global {
  interface Window {
    TradingView: any
  }
}
