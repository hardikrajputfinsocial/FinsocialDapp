"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowUp, Star, Info, Search, Maximize2, Grid, HelpCircle, Calculator } from "lucide-react"
import styles from "./margin.module.css"

import { MarginCalculator } from "@/components/margin-calculator"

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
          interval: "15",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#131722",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_chart",
          hide_side_toolbar: false,
          studies: ["RSI@tv-basicstudies", "MAExp@tv-basicstudies"],
          disabled_features: ["header_symbol_search"],
          enabled_features: ["use_localstorage_for_settings"],
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
  const [precision, setPrecision] = useState(2)
  const [view, setView] = useState<"default" | "buy" | "sell">("default")

  useEffect(() => {
    // Simulate order book data
    const generateOrderBook = () => {
      const basePrice = 102744.33
      const newAsks: { price: string; amount: string; total: string }[] = []
      const newBids: { price: string; amount: string; total: string }[] = []

      let askTotal = 0
      for (let i = 0; i < 15; i++) {
        const price = (basePrice + i * 5 + Math.random() * 2).toFixed(2)
        const amount = (Math.random() * 0.5).toFixed(5)
        askTotal += Number.parseFloat(amount)
        newAsks.push({
          price,
          amount,
          total: askTotal.toFixed(5),
        })
      }

      let bidTotal = 0
      for (let i = 0; i < 15; i++) {
        const price = (basePrice - i * 5 - Math.random() * 2).toFixed(2)
        const amount = (Math.random() * 0.5).toFixed(5)
        bidTotal += Number.parseFloat(amount)
        newBids.push({
          price,
          amount,
          total: bidTotal.toFixed(5),
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
    <div className={styles.orderBook}>
      <div className={styles.orderBookHeader}>
        <div className={styles.orderBookTitle}>Order Book</div>
        <div className={styles.orderBookControls}>
          <button className={styles.orderBookControl} onClick={() => setPrecision((prev) => Math.min(prev + 1, 4))}>
            +
          </button>
          <button className={styles.orderBookControl} onClick={() => setPrecision((prev) => Math.max(prev - 1, 0))}>
            -
          </button>
          <button
            className={`${styles.orderBookViewControl} ${view === "default" ? styles.active : ""}`}
            onClick={() => setView("default")}
          >
            <div className={styles.orderBookViewIcon}>
              <div className={styles.orderBookViewIconSell}></div>
              <div className={styles.orderBookViewIconBuy}></div>
            </div>
          </button>
          <button
            className={`${styles.orderBookViewControl} ${view === "sell" ? styles.active : ""}`}
            onClick={() => setView("sell")}
          >
            <div className={styles.orderBookViewIcon}>
              <div className={styles.orderBookViewIconSell}></div>
            </div>
          </button>
          <button
            className={`${styles.orderBookViewControl} ${view === "buy" ? styles.active : ""}`}
            onClick={() => setView("buy")}
          >
            <div className={styles.orderBookViewIcon}>
              <div className={styles.orderBookViewIconBuy}></div>
            </div>
          </button>
        </div>
      </div>
      <div className={styles.orderBookColumns}>
        <div>Price(USDT)</div>
        <div>Amount(BTC)</div>
        <div>Total</div>
      </div>
      {(view === "default" || view === "sell") && (
        <div className={styles.orderBookAsks}>
          {asks.map((ask, index) => (
            <div key={`ask-${index}`} className={styles.orderBookRow}>
              <div className={styles.orderBookPrice}>
                <span className={styles.orderBookPriceText}>{Number(ask.price).toFixed(precision)}</span>
              </div>
              <div className={styles.orderBookAmount}>{ask.amount}</div>
              <div className={styles.orderBookTotal}>{ask.total}</div>
              <div
                className={styles.orderBookDepthVisualization}
                style={{
                  width: `${Math.min(Number(ask.total) * 100, 100)}%`,
                  background: "rgba(234, 84, 85, 0.2)",
                }}
              ></div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.orderBookLastPrice}>
        <div className={styles.orderBookLastPriceValue}>102,744.33</div>
        <div className={styles.orderBookLastPriceChange}>
          <ArrowUp className="h-3 w-3 mr-1" />
          <span>$1,234.56 +1.21%</span>
        </div>
      </div>

      {(view === "default" || view === "buy") && (
        <div className={styles.orderBookBids}>
          {bids.map((bid, index) => (
            <div key={`bid-${index}`} className={styles.orderBookRow}>
              <div className={styles.orderBookPrice}>
                <span className={styles.orderBookPriceText}>{Number(bid.price).toFixed(precision)}</span>
              </div>
              <div className={styles.orderBookAmount}>{bid.amount}</div>
              <div className={styles.orderBookTotal}>{bid.total}</div>
              <div
                className={styles.orderBookDepthVisualization}
                style={{
                  width: `${Math.min(Number(bid.total) * 100, 100)}%`,
                  background: "rgba(40, 199, 111, 0.2)",
                }}
              ></div>
            </div>
          ))}
        </div>
      )}
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
      const basePrice = 102744.33
      const priceChange = (Math.random() * 20 - 10).toFixed(2)
      const price = (basePrice + Number.parseFloat(priceChange)).toFixed(2)
      const amount = (Math.random() * 0.5).toFixed(5)
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

      setTrades((prev) => [newTrade, ...prev].slice(0, 30))
    }

    generateTrade()
    const interval = setInterval(generateTrade, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.marketTrades}>
      <div className={styles.marketTradesHeader}>
        <div className={styles.marketTradesTitle}>Market Trades</div>
      </div>
      <div className={styles.marketTradesColumns}>
        <div>Price(USDT)</div>
        <div>Amount(BTC)</div>
        <div>Time</div>
      </div>
      <div className={styles.marketTradesList}>
        {trades.map((trade) => (
          <div
            key={trade.id}
            className={`${styles.marketTradesRow} ${
              trade.type === "buy" ? styles.marketTradesBuy : styles.marketTradesSell
            }`}
          >
            <div className={styles.marketTradesPrice}>{trade.price}</div>
            <div className={styles.marketTradesAmount}>{trade.amount}</div>
            <div className={styles.marketTradesTime}>{trade.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// TradingPairs Component
function TradingPairs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [pairs, setPairs] = useState([
    { symbol: "BTC/USDT", price: "102,744.33", change: "+1.21%", isPositive: true, isFavorite: true },
    { symbol: "ETH/USDT", price: "3,212.66", change: "+0.89%", isPositive: true, isFavorite: true },
    { symbol: "BNB/USDT", price: "624.42", change: "-0.31%", isPositive: false, isFavorite: true },
    { symbol: "SOL/USDT", price: "169.19", change: "+7.51%", isPositive: true, isFavorite: false },
    { symbol: "XRP/USDT", price: "0.6135", change: "+4.9%", isPositive: true, isFavorite: false },
    { symbol: "ADA/USDT", price: "0.5215", change: "+10.81%", isPositive: true, isFavorite: false },
    { symbol: "DOGE/USDT", price: "0.1402", change: "+13.83%", isPositive: true, isFavorite: false },
    { symbol: "SHIB/USDT", price: "0.00002656", change: "+12.32%", isPositive: true, isFavorite: false },
    { symbol: "TRX/USDT", price: "0.1339", change: "+1.45%", isPositive: true, isFavorite: false },
    { symbol: "DOT/USDT", price: "8.427", change: "+13.79%", isPositive: true, isFavorite: false },
    { symbol: "MATIC/USDT", price: "0.9279", change: "+8.99%", isPositive: true, isFavorite: false },
    { symbol: "LTC/USDT", price: "83.29", change: "+2.88%", isPositive: true, isFavorite: false },
    { symbol: "AVAX/USDT", price: "35.29", change: "+25.06%", isPositive: true, isFavorite: false },
    { symbol: "LINK/USDT", price: "16.47", change: "+13.81%", isPositive: true, isFavorite: false },
  ])

  const filteredPairs = pairs.filter((pair) => pair.symbol.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className={styles.tradingPairs}>
      <div className={styles.tradingPairsHeader}>
        <div className={styles.tradingPairsSearch}>
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.tradingPairsSearchInput}
          />
        </div>
      </div>
      <div className={styles.tradingPairsColumns}>
        <div>Pair</div>
        <div>Last Price</div>
        <div>24h Change</div>
      </div>
      <div className={styles.tradingPairsList}>
        {filteredPairs.map((pair, index) => (
          <Link
            href={`/pages/trade/margin?pair=${pair.symbol.replace("/", "_")}`}
            key={index}
            className={styles.tradingPairsRow}
          >
            <div className={styles.tradingPairsSymbol}>
              <Star
                className={`h-4 w-4 mr-1 ${pair.isFavorite ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
              />
              {pair.symbol}
            </div>
            <div className={styles.tradingPairsPrice}>{pair.price}</div>
            <div className={`${styles.tradingPairsChange} ${pair.isPositive ? styles.positive : styles.negative}`}>
              {pair.change}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// MarginOrderForm Component
function MarginOrderForm() {
  const [orderType, setOrderType] = useState<"limit" | "market" | "stopLimit">("limit")
  const [marginType, setMarginType] = useState<"cross" | "isolated">("cross")
  const [buyPrice, setBuyPrice] = useState("102744.33")
  const [sellPrice, setSellPrice] = useState("102744.33")
  const [buyAmount, setBuyAmount] = useState("")
  const [sellAmount, setSellAmount] = useState("")
  const [buyTotal, setBuyTotal] = useState("")
  const [sellTotal, setSellTotal] = useState("")
  const [buySliderValue, setBuySliderValue] = useState(0)
  const [sellSliderValue, setSellSliderValue] = useState(0)
  const [buyTpSlEnabled, setBuyTpSlEnabled] = useState(false)
  const [sellTpSlEnabled, setSellTpSlEnabled] = useState(false)

  // Calculate total when price or amount changes
  useEffect(() => {
    if (buyPrice && buyAmount) {
      const total = (Number.parseFloat(buyPrice) * Number.parseFloat(buyAmount)).toFixed(2)
      setBuyTotal(total)
    } else {
      setBuyTotal("")
    }

    if (sellPrice && sellAmount) {
      const total = (Number.parseFloat(sellPrice) * Number.parseFloat(sellAmount)).toFixed(2)
      setSellTotal(total)
    } else {
      setSellTotal("")
    }
  }, [buyPrice, buyAmount, sellPrice, sellAmount])

  return (
    <div className={styles.marginOrderForm}>
      <div className={styles.marginTypeSelector}>
        <Tabs
          defaultValue="cross"
          value={marginType}
          onValueChange={(value) => setMarginType(value as "cross" | "isolated")}
        >
          <TabsList className={styles.marginTypeTabs}>
            <TabsTrigger value="spot" className={styles.marginTypeTab}>
              Spot
            </TabsTrigger>
            <TabsTrigger value="cross" className={styles.marginTypeTab}>
              Cross
            </TabsTrigger>
            <TabsTrigger value="isolated" className={styles.marginTypeTab}>
              Isolated
            </TabsTrigger>
            <TabsTrigger value="grid" className={styles.marginTypeTab}>
              Grid
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className={styles.orderTypeSelector}>
        <Tabs
          defaultValue="limit"
          value={orderType}
          onValueChange={(value) => setOrderType(value as "limit" | "market" | "stopLimit")}
        >
          <TabsList className={styles.orderTypeTabs}>
            <TabsTrigger value="limit" className={styles.orderTypeTab}>
              Limit
            </TabsTrigger>
            <TabsTrigger value="market" className={styles.orderTypeTab}>
              Market
            </TabsTrigger>
            <TabsTrigger value="stopLimit" className={styles.orderTypeTab}>
              Stop Limit
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className={styles.infoButton}>
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Learn more about order types</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className={styles.orderFormGrid}>
        {/* Buy Form */}
        <div className={styles.buyForm}>
          <div className={styles.formHeader}>
            <div className={styles.formTitle}>Normal</div>
            <div className={styles.formOptions}>
              <span>Borrow</span>
              <span>Repay</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className={styles.infoButton}>
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Learn more about margin trading</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className={styles.formInputGroup}>
            <label className={styles.formLabel}>Price</label>
            <div className={styles.formInputWithCurrency}>
              <Input
                type="text"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                className={styles.formInput}
                disabled={orderType === "market"}
              />
              <div className={styles.formCurrency}>USDT</div>
            </div>
          </div>

          <div className={styles.formInputGroup}>
            <label className={styles.formLabel}>Amount</label>
            <div className={styles.formInputWithCurrency}>
              <Input
                type="text"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                className={styles.formInput}
              />
              <div className={styles.formCurrency}>BTC</div>
            </div>
          </div>

          <div className={styles.sliderContainer}>
            <input
              type="range"
              min="0"
              max="100"
              value={buySliderValue}
              onChange={(e) => setBuySliderValue(Number.parseInt(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderMarkers}>
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          <div className={styles.formInputGroup}>
            <div className={styles.formBalance}>
              <span>Avbl</span>
              <span>- USDT</span>
            </div>
          </div>

          <div className={styles.tpslCheckbox}>
            <Checkbox
              id="buy-tpsl"
              checked={buyTpSlEnabled}
              onCheckedChange={(checked) => setBuyTpSlEnabled(checked === true)}
            />
            <label htmlFor="buy-tpsl" className={styles.tpslLabel}>
              TP/SL
            </label>
          </div>

          {buyTpSlEnabled && (
            <div className={styles.tpslContainer}>
              <div className={styles.tpslSection}>
                <div className={styles.tpslTitle}>Take Profit</div>
                <div className={styles.tpslInputGroup}>
                  <Input type="text" placeholder="Trigger Price" className={styles.tpslInput} />
                  <div className={styles.tpslInputWithSuffix}>
                    <Input type="text" placeholder="Offset" className={styles.tpslInput} />
                    <div className={styles.tpslSuffix}>%</div>
                  </div>
                </div>
              </div>

              <div className={styles.tpslSection}>
                <div className={styles.tpslTitle}>Stop Loss</div>
                <div className={styles.tpslInputGroup}>
                  <Input type="text" placeholder="Trigger Price" className={styles.tpslInput} />
                  <div className={styles.tpslInputWithSuffix}>
                    <Input type="text" placeholder="Offset" className={styles.tpslInput} />
                    <div className={styles.tpslSuffix}>%</div>
                  </div>
                </div>
                <div className={styles.tpslInputGroup}>
                  <Input type="text" placeholder="Limit Price" className={styles.tpslInput} />
                  <Button variant="outline" className={styles.marketButton}>
                    Market
                  </Button>
                </div>
              </div>
            </div>
          )}

          <Button className={styles.buyButton}>Buy BTC</Button>
        </div>

        {/* Sell Form */}
        <div className={styles.sellForm}>
          <div className={styles.formHeader}>
            <div className={styles.formTitle}>Normal</div>
            <div className={styles.formOptions}>
              <span>Borrow</span>
              <span>Repay</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className={styles.infoButton}>
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Learn more about margin trading</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className={styles.formInputGroup}>
            <label className={styles.formLabel}>Price</label>
            <div className={styles.formInputWithCurrency}>
              <Input
                type="text"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                className={styles.formInput}
                disabled={orderType === "market"}
              />
              <div className={styles.formCurrency}>USDT</div>
            </div>
          </div>

          <div className={styles.formInputGroup}>
            <label className={styles.formLabel}>Amount</label>
            <div className={styles.formInputWithCurrency}>
              <Input
                type="text"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
                className={styles.formInput}
              />
              <div className={styles.formCurrency}>BTC</div>
            </div>
          </div>

          <div className={styles.sliderContainer}>
            <input
              type="range"
              min="0"
              max="100"
              value={sellSliderValue}
              onChange={(e) => setSellSliderValue(Number.parseInt(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderMarkers}>
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          <div className={styles.formInputGroup}>
            <div className={styles.formBalance}>
              <span>Avbl</span>
              <span>- BTC</span>
            </div>
          </div>

          <div className={styles.tpslCheckbox}>
            <Checkbox
              id="sell-tpsl"
              checked={sellTpSlEnabled}
              onCheckedChange={(checked) => setSellTpSlEnabled(checked === true)}
            />
            <label htmlFor="sell-tpsl" className={styles.tpslLabel}>
              TP/SL
            </label>
          </div>

          {sellTpSlEnabled && (
            <div className={styles.tpslContainer}>
              <div className={styles.tpslSection}>
                <div className={styles.tpslTitle}>Take Profit</div>
                <div className={styles.tpslInputGroup}>
                  <Input type="text" placeholder="Trigger Price" className={styles.tpslInput} />
                  <div className={styles.tpslInputWithSuffix}>
                    <Input type="text" placeholder="Offset" className={styles.tpslInput} />
                    <div className={styles.tpslSuffix}>%</div>
                  </div>
                </div>
              </div>

              <div className={styles.tpslSection}>
                <div className={styles.tpslTitle}>Stop Loss</div>
                <div className={styles.tpslInputGroup}>
                  <Input type="text" placeholder="Trigger Price" className={styles.tpslInput} />
                  <div className={styles.tpslInputWithSuffix}>
                    <Input type="text" placeholder="Offset" className={styles.tpslInput} />
                    <div className={styles.tpslSuffix}>%</div>
                  </div>
                </div>
                <div className={styles.tpslInputGroup}>
                  <Input type="text" placeholder="Limit Price" className={styles.tpslInput} />
                  <Button variant="outline" className={styles.marketButton}>
                    Market
                  </Button>
                </div>
              </div>
            </div>
          )}

          <Button className={styles.sellButton}>Sell BTC</Button>
        </div>
      </div>
    </div>
  )
}

// OpenOrders Component
function OpenOrders() {
  return (
    <div className={styles.openOrders}>
      <div className={styles.openOrdersHeader}>
        <div className={styles.openOrdersTitle}>Open Orders</div>
        <div className={styles.openOrdersActions}>
          <Button variant="ghost" size="sm" className={styles.openOrdersAction}>
            Cancel All
          </Button>
        </div>
      </div>
      <div className={styles.openOrdersEmpty}>
        <div className={styles.openOrdersEmptyText}>No open orders</div>
      </div>
    </div>
  )
}

// OrderHistory Component
function OrderHistory() {
  return (
    <div className={styles.orderHistory}>
      <div className={styles.orderHistoryHeader}>
        <div className={styles.orderHistoryTitle}>Order History</div>
        <div className={styles.orderHistoryActions}>
          <Button variant="ghost" size="sm" className={styles.orderHistoryAction}>
            Hide Other Pairs
          </Button>
        </div>
      </div>
      <div className={styles.orderHistoryEmpty}>
        <div className={styles.orderHistoryEmptyText}>No order history</div>
      </div>
    </div>
  )
}

// TradeHistory Component
function TradeHistory() {
  return (
    <div className={styles.tradeHistory}>
      <div className={styles.tradeHistoryHeader}>
        <div className={styles.tradeHistoryTitle}>Trade History</div>
      </div>
      <div className={styles.tradeHistoryEmpty}>
        <div className={styles.tradeHistoryEmptyText}>No trade history</div>
      </div>
    </div>
  )
}

// MarginTradingSteps Component
function MarginTradingSteps() {
  const [showCalculator, setShowCalculator] = useState(false)

  return (
    <div className={styles.marginTradingSteps}>
      <div className={styles.marginTradingStepsItem}>
        <div className={styles.marginTradingStepsNumber}>1</div>
        <div className={styles.marginTradingStepsText}>Transfer Collateral</div>
      </div>
      <div className={styles.marginTradingStepsSeparator}></div>
      <div className={styles.marginTradingStepsItem}>
        <div className={styles.marginTradingStepsNumber}>2</div>
        <div className={styles.marginTradingStepsText}>Borrow/Trade</div>
      </div>
      <div className={styles.marginTradingStepsSeparator}></div>
      <div className={styles.marginTradingStepsItem}>
        <div className={styles.marginTradingStepsNumber}>3</div>
        <div className={styles.marginTradingStepsText}>Repay/Trade</div>
      </div>
      <div className={styles.marginTradingStepsTutorial}>
        <Info className="h-4 w-4 mr-1" />
        <span>Margin Tutorial</span>
      </div>
      <div className={styles.marginTradingStepsCalculator} onClick={() => setShowCalculator(true)}>
        <Calculator className="h-4 w-4 mr-1" />
        <span>Calculator</span>
      </div>
      {showCalculator && <MarginCalculator onClose={() => setShowCalculator(false)} />}
    </div>
  )
}

// MarginCalculator Component
// function MarginCalculator({ onClose }: { onClose: () => void }) {
//   return (
//     <div className={styles.marginCalculatorOverlay}>
//       <div className={styles.marginCalculator}>
//         <div className={styles.marginCalculatorHeader}>
//           <div className={styles.marginCalculatorTitle}>Margin Calculator</div>
//           <Button variant="ghost" size="icon" onClick={onClose}>
//             X
//           </Button>
//         </div>
//         <div className={styles.marginCalculatorContent}>
//           {/* Add calculator content here */}
//           <p>Calculator content goes here.</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// Main Margin Trading Page
export default function MarginTradingPage() {
  const searchParams = useSearchParams()
  const pair = searchParams.get("pair") || "BTC_USDT"
  const formattedPair = pair.replace("_", "/")
  const [base, quote] = formattedPair.split("/")

  const [activeTab, setActiveTab] = useState("chart")

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.pairInfo}>
          <h1 className={styles.pairTitle}>{formattedPair}</h1>
          <Badge variant="outline" className={styles.pairBadge}>
            cross
          </Badge>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className={styles.starButton}>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove from favorites</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className={styles.pairStats}>
          <div className={styles.pairPrice}>
            <div className={styles.pairPriceValue}>102,744.33</div>
            <div className={styles.pairPriceUsd}>≈ $102,744.33</div>
          </div>
          <div className={styles.pairChange}>
            <div className={styles.pairChangeValue}>
              <span className={styles.pairChangePercent}>+1.21%</span>
              <span className={styles.pairChangeAmount}>+1,234.56</span>
            </div>
            <div className={styles.pairChangePeriod}>24h Change</div>
          </div>
          <div className={styles.pairStat}>
            <div className={styles.pairStatValue}>102,744.33</div>
            <div className={styles.pairStatLabel}>24h High</div>
          </div>
          <div className={styles.pairStat}>
            <div className={styles.pairStatValue}>98,723.25</div>
            <div className={styles.pairStatLabel}>24h Low</div>
          </div>
          <div className={styles.pairStat}>
            <div className={styles.pairStatValue}>31,129.91</div>
            <div className={styles.pairStatLabel}>24h Volume(BTC)</div>
          </div>
          <div className={styles.pairStat}>
            <div className={styles.pairStatValue}>3,150,855,699.63</div>
            <div className={styles.pairStatLabel}>24h Volume(USDT)</div>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.leftSidebar}>
          <TradingPairs />
        </div>

        <div className={styles.centerContent}>
          <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTabs}>
                <button
                  className={`${styles.chartTab} ${activeTab === "chart" ? styles.active : ""}`}
                  onClick={() => setActiveTab("chart")}
                >
                  Chart
                </button>
                <button
                  className={`${styles.chartTab} ${activeTab === "info" ? styles.active : ""}`}
                  onClick={() => setActiveTab("info")}
                >
                  Info
                </button>
                <button
                  className={`${styles.chartTab} ${activeTab === "tradingData" ? styles.active : ""}`}
                  onClick={() => setActiveTab("tradingData")}
                >
                  Trading Data
                </button>
                <button
                  className={`${styles.chartTab} ${activeTab === "square" ? styles.active : ""}`}
                  onClick={() => setActiveTab("square")}
                >
                  Square
                </button>
              </div>
              <div className={styles.chartControls}>
                <Button variant="ghost" size="sm" className={styles.chartControl}>
                  <Maximize2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className={styles.chartControl}>
                  <Grid className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <TradingViewChart symbol={`BINANCE:${pair.replace("_", "")}`} />
          </div>

          <MarginTradingSteps />

          <div className={styles.ordersContainer}>
            <Tabs defaultValue="openOrders">
              <TabsList className={styles.ordersTabs}>
                <TabsTrigger value="openOrders" className={styles.ordersTab}>
                  Open Orders
                </TabsTrigger>
                <TabsTrigger value="orderHistory" className={styles.ordersTab}>
                  Order History
                </TabsTrigger>
                <TabsTrigger value="tradeHistory" className={styles.ordersTab}>
                  Trade History
                </TabsTrigger>
                <TabsTrigger value="funds" className={styles.ordersTab}>
                  Funds
                </TabsTrigger>
              </TabsList>
              <TabsContent value="openOrders">
                <OpenOrders />
              </TabsContent>
              <TabsContent value="orderHistory">
                <OrderHistory />
              </TabsContent>
              <TabsContent value="tradeHistory">
                <TradeHistory />
              </TabsContent>
              <TabsContent value="funds">
                <div className={styles.fundsEmpty}>
                  <div className={styles.fundsEmptyText}>No funds data available</div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className={styles.rightSidebar}>
          <div className={styles.orderBookContainer}>
            <OrderBook />
          </div>
          <div className={styles.marketTradesContainer}>
            <MarketTrades />
          </div>
        </div>
      </div>

      <div className={styles.bottomContent}>
        <MarginOrderForm />
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
