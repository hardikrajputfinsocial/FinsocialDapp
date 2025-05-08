"use client"

import { useState, useEffect, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { ArrowUp } from "lucide-react"

// TradingViewChart Component for Futures
function TradingViewChart({ symbol = "BINANCE:BTCUSDTPERP" }) {
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
          container_id: "futures_tradingview_chart",
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

  return <div ref={containerRef} id="futures_tradingview_chart" className="h-[500px] w-full" />
}

// OrderBook Component for Futures
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

// MarketTrades Component for Futures
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

// OpenOrders Component for Futures
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

// Main USD-M Futures Page
export default function USDMFuturesPage() {
  const [orderType, setOrderType] = useState("limit")
  const [buyAmount, setBuyAmount] = useState("")
  const [sellAmount, setSellAmount] = useState("")
  const [buyPrice, setBuyPrice] = useState("68245.32")
  const [sellPrice, setSellPrice] = useState("68245.32")
  const [buySliderValue, setBuySliderValue] = useState([0])
  const [sellSliderValue, setSellSliderValue] = useState([0])
  const [leverage, setLeverage] = useState("10")

  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold">BTC/USDT Perpetual</h1>
              <Badge>USDT-M</Badge>
              <span className="text-2xl font-bold text-green-500">68,245.32</span>
              <span className="text-sm text-green-500">+1.86%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                1m
              </Button>
              <Button variant="outline" size="sm">
                5m
              </Button>
              <Button variant="outline" size="sm">
                15m
              </Button>
              <Button variant="outline" size="sm">
                1h
              </Button>
              <Button variant="outline" size="sm">
                4h
              </Button>
              <Button variant="outline" size="sm">
                1d
              </Button>
              <Button variant="outline" size="sm">
                1w
              </Button>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden mb-4">
            <TradingViewChart />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">No open positions</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Open Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <OpenOrders />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Futures Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label className="text-sm">Leverage</label>
                <div className="flex items-center space-x-2 mt-2">
                  <Input type="text" value={leverage} onChange={(e) => setLeverage(e.target.value)} className="w-20" />
                  <span>×</span>
                  <Slider
                    value={[Number.parseInt(leverage)]}
                    max={125}
                    step={1}
                    onValueChange={(value) => setLeverage(value[0].toString())}
                    className="flex-1"
                  />
                </div>
              </div>
              <Tabs defaultValue="buy">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="buy" className="text-green-500">
                    Long
                  </TabsTrigger>
                  <TabsTrigger value="sell" className="text-red-500">
                    Short
                  </TabsTrigger>
                </TabsList>
                <div className="mb-4">
                  <div className="flex space-x-2 mb-4">
                    <Button
                      variant={orderType === "limit" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setOrderType("limit")}
                    >
                      Limit
                    </Button>
                    <Button
                      variant={orderType === "market" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setOrderType("market")}
                    >
                      Market
                    </Button>
                    <Button
                      variant={orderType === "stop" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setOrderType("stop")}
                    >
                      Stop
                    </Button>
                  </div>
                </div>
                <TabsContent value="buy">
                  <div className="space-y-4">
                    {orderType !== "market" && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm">Price</label>
                          <span className="text-sm text-muted-foreground">USDT</span>
                        </div>
                        <Input type="text" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} />
                      </div>
                    )}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm">Size</label>
                        <span className="text-sm text-muted-foreground">BTC</span>
                      </div>
                      <Input type="text" value={buyAmount} onChange={(e) => setBuyAmount(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Total</label>
                      <Slider value={buySliderValue} max={100} step={1} onValueChange={setBuySliderValue} />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0%</span>
                        <span>25%</span>
                        <span>50%</span>
                        <span>75%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <Button className="w-full bg-green-500 hover:bg-green-600">Buy / Long</Button>
                  </div>
                </TabsContent>
                <TabsContent value="sell">
                  <div className="space-y-4">
                    {orderType !== "market" && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm">Price</label>
                          <span className="text-sm text-muted-foreground">USDT</span>
                        </div>
                        <Input type="text" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} />
                      </div>
                    )}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm">Size</label>
                        <span className="text-sm text-muted-foreground">BTC</span>
                      </div>
                      <Input type="text" value={sellAmount} onChange={(e) => setSellAmount(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Total</label>
                      <Slider value={sellSliderValue} max={100} step={1} onValueChange={setSellSliderValue} />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0%</span>
                        <span>25%</span>
                        <span>50%</span>
                        <span>75%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <Button className="w-full bg-red-500 hover:bg-red-600">Sell / Short</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Order Book</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderBook />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Market Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <MarketTrades />
            </CardContent>
          </Card>
        </div>
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
