"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, Star, Clock, Settings, Info } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import styles from "./spot.module.css"

function TradingViewChart({ symbol = "BINANCE:BTCUSDT" }) {
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

// OrderBook Component
function OrderBook() {
  const [asks, setAsks] = useState<{ price: string; amount: string; total: string }[]>([])
  const [bids, setBids] = useState<{ price: string; amount: string; total: string }[]>([])

  useEffect(() => {
    // Simulate order book data
    const generateOrderBook = () => {
      const basePrice = 68245.32
      const newAsks: { price: string; amount: string; total: string }[] = []
      const newBids: { price: string; amount: string; total: string }[] = []

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

// MarketTrades Component
function MarketTrades() {
  type Trade = {
    id: number
    price: string
    amount: string
    time: string
    type: "buy" | "sell"
  }

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

// OpenOrders Component
function OpenOrders() {
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

// TradeHistory Component
function TradeHistory() {
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

// Simple Dark Order Form Component
function SimpleDarkOrderForm() {
  const [tpSlEnabled, setTpSlEnabled] = useState(false)

  return (
    <div className={styles.darkOrderForm}>
      <h3 className={styles.formTitle}>Order Form</h3>

      {/* Buy/Sell Tabs */}
      <div className={styles.tabsContainer}>
        <button className={`${styles.tabButton} ${styles.activeTab}`}>Buy</button>
        <button className={styles.tabButton}>Sell</button>
      </div>

      {/* Order Type */}
      <div className={styles.orderTypeContainer}>
        <button className={`${styles.orderTypeButton} ${styles.activeOrderType}`}>Limit</button>
        <button className={styles.orderTypeButton}>Market</button>
        <button className={styles.orderTypeButton}>Stop</button>
      </div>

      {/* Price */}
      <div className={styles.inputContainer}>
        <div className={styles.inputLabel}>
          <label className={styles.labelText}>Price</label>
          <span className={styles.currencyText}>USDT</span>
        </div>
        <input type="text" value="68245.32" readOnly className={styles.input} />
      </div>

      {/* Amount */}
      <div className={styles.inputContainer}>
        <div className={styles.inputLabel}>
          <label className={styles.labelText}>Amount</label>
          <span className={styles.currencyText}>BTC</span>
        </div>
        <input type="text" className={styles.input} />
      </div>

      {/* Total */}
      <div className={styles.inputContainer}>
        <label className={`${styles.labelText} ${styles.blockLabel}`}>Total</label>
        <div className={styles.sliderTrack}>
          <div className={styles.sliderFill} style={{ width: "0%" }}></div>
        </div>
        <div className={styles.sliderMarkers}>
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Available Balance */}
      <div className={styles.balanceContainer}>
        <span>Available: 12,345.67 USDT</span>
        <span className={styles.feeInfo}>
          <Info className="h-3 w-3 mr-1" />
          Fee: 0.1%
        </span>
      </div>

      {/* TP/SL Checkbox - VERY VISIBLE */}
      <div className={styles.tpslContainer}>
        <input
          type="checkbox"
          id="tpsl"
          checked={tpSlEnabled}
          onChange={(e) => setTpSlEnabled(e.target.checked)}
          className={styles.tpslCheckbox}
        />
        <label htmlFor="tpsl" className={styles.tpslLabel}>
          TP/SL
        </label>
      </div>

      {/* TP/SL Panel */}
      {tpSlEnabled && (
        <div className={styles.tpslPanel}>
          <div>
            <p className={styles.panelTitle}>Take Profit</p>
            <div className={styles.panelGrid}>
              <div className={styles.panelGridCol2}>
                <input type="text" placeholder="TP Limit" className={styles.panelInput} />
              </div>
              <div className={styles.offsetContainer}>
                <input type="text" placeholder="Offset" className={styles.panelInput} />
                <div className={styles.offsetSuffix}>
                  <span>%</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1 text-gray-400"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className={styles.panelTitle}>Stop Loss</p>
            <div className={`${styles.panelGrid} ${styles.marginBottom}`}>
              <div className={styles.panelGridCol2}>
                <input type="text" placeholder="SL Trigger" className={styles.panelInput} />
              </div>
              <div className={styles.offsetContainer}>
                <input type="text" placeholder="Offset" className={styles.panelInput} />
                <div className={styles.offsetSuffix}>
                  <span>%</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1 text-gray-400"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>
            <div className={styles.panelGrid}>
              <div className={styles.panelGridCol2}>
                <input type="text" placeholder="SL Market" className={styles.panelInput} />
              </div>
              <button className={styles.marketButton}>Market</button>
            </div>
          </div>
          <div className={styles.availableGrid}>
            <div>Avbl</div>
            <div className="text-right">- USDT</div>
            <div>Max Buy</div>
            <div className="text-right">-- BTC</div>
          </div>
        </div>
      )}

      {/* Buy/Sell Button */}
      <button className={styles.actionButton}>Buy BTC</button>
    </div>
  )
}

// Main Spot Trading Page
export default function SpotTradingPage() {
  const searchParams = useSearchParams()
  const pair = searchParams.get("pair") || "BTC/USDT"

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.pageHeader}>
        <div className={styles.headerInfo}>
          <div className={styles.pairInfo}>
            <h1 className={styles.pairTitle}>{pair}</h1>
            <Badge variant="outline" className={styles.pairBadge}>
              spot
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className={styles.starButton}>
                    <Star className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to favorites</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className={styles.pairStats}>
            <span>Vol: 24,532 {pair.split("/")[0]}</span>
            <span>•</span>
            <span>24h: $1.68B</span>
          </div>
        </div>
        <div className={styles.priceInfo}>
          <div className={styles.currentPrice}>
            <span className={styles.priceValue}>68,245.32</span>
            <span className={styles.priceChange}>
              <ArrowUp className="h-4 w-4 mr-1" />
              1.86%
            </span>
          </div>
          <div className={styles.equivalentPrice}>≈ €62,345.78</div>
        </div>
      </div>
      <Card className={styles.chartCard}>
        <CardContent className={styles.chartContent}>
          <div className={styles.chartControls}>
            <div className={styles.timeControls}>
              <Button variant="ghost" size="sm">
                <Clock className="h-4 w-4 mr-1" />
                1D
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button variant="ghost" size="sm">
                1m
              </Button>
              <Button variant="ghost" size="sm">
                5m
              </Button>
              <Button variant="ghost" size="sm" className="bg-muted">
                15m
              </Button>
              <Button variant="ghost" size="sm">
                1h
              </Button>
              <Button variant="ghost" size="sm">
                4h
              </Button>
              <Button variant="ghost" size="sm">
                1d
              </Button>
            </div>
            <div className={styles.chartSettings}>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <TradingViewChart symbol={`BINANCE:${pair.replace("/", "")}`} />
        </CardContent>
      </Card>
      <div className={styles.ordersGrid}>
        <Card className={styles.orderCard}>
          <CardHeader className={styles.orderCardHeader}>
            <CardTitle className={styles.orderCardTitle}>
              Open Orders
              <Badge variant="outline" className={styles.countBadge}>
                0
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <OpenOrders />
          </CardContent>
        </Card>
        <Card className={styles.orderCard}>
          <CardHeader className={styles.orderCardHeader}>
            <CardTitle className={styles.orderCardTitle}>
              Trade History
              <Badge variant="outline" className={styles.countBadge}>
                0
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TradeHistory />
          </CardContent>
        </Card>
      </div>
      <div className={styles.sidebarGrid}>
        <SimpleDarkOrderForm />
        <Card className={styles.orderCard}>
          <CardHeader className={styles.orderCardHeader}>
            <CardTitle className={styles.orderCardTitle}>Order Book</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderBook />
          </CardContent>
        </Card>
        <Card className={styles.orderCard}>
          <CardHeader className={styles.orderCardHeader}>
            <CardTitle className={styles.orderCardTitle}>Market Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <MarketTrades />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Add TradingView to Window interface
declare global {
  interface Window {
    TradingView: any
  }
}
