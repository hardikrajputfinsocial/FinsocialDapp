"use client"

import { useState, useEffect } from "react"
import { ArrowDown, Info, RefreshCw, Clock, ChevronDown, Search, TrendingUp, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import styles from "./convert.module.css"

export default function ConvertPage() {
  const [fromCurrency, setFromCurrency] = useState("USDT")
  const [toCurrency, setToCurrency] = useState("BTC")
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [rate, setRate] = useState(0.0000146)
  const [activeTab, setActiveTab] = useState("convert")
  const [showHistory, setShowHistory] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCurrencyCategory, setActiveCurrencyCategory] = useState("all")

  // Update to amount when from amount changes
  useEffect(() => {
    if (fromAmount) {
      const calculatedAmount = Number.parseFloat(fromAmount) * rate
      setToAmount(calculatedAmount.toFixed(8))
    } else {
      setToAmount("")
    }
  }, [fromAmount, rate])

  // Swap currencies
  const handleSwap = () => {
    const tempCurrency = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(tempCurrency)
    setRate(1 / rate)

    if (fromAmount) {
      const calculatedAmount = Number.parseFloat(fromAmount) * (1 / rate)
      setToAmount(calculatedAmount.toFixed(8))
    }
  }

  // Currency categories
  const categories = [
    { id: "all", name: "All" },
    { id: "popular", name: "Popular" },
    { id: "stablecoins", name: "Stablecoins" },
    { id: "defi", name: "DeFi" },
    { id: "trending", name: "Trending" },
  ]

  // Currency options with additional metadata and image URLs
  const currencies = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      category: ["popular", "trending"],
      price: 68245.32,
      change: 1.86,
      volume: "High",
      imageUrl: "/crypto-icons/btc.png",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      category: ["popular", "defi"],
      price: 3456.78,
      change: 2.59,
      volume: "High",
      imageUrl: "/crypto-icons/eth.png",
    },
    {
      symbol: "XRP",
      name: "XRP",
      category: ["popular"],
      price: 0.5678,
      change: -3.96,
      volume: "Medium",
      imageUrl: "/crypto-icons/xrp.png",
    },
    {
      symbol: "BUSD",
      name: "BUSD",
      category: ["stablecoins"],
      price: 1.0,
      change: 0.01,
      volume: "Medium",
      imageUrl: "/crypto-icons/busd.png",
    },
    {
      symbol: "EUR",
      name: "Euro",
      category: ["fiat"],
      price: 1.08,
      change: 0.05,
      volume: "Medium",
      imageUrl: "/crypto-icons/eur.png",
    },
    {
      symbol: "BNB",
      name: "BNB",
      category: ["popular"],
      price: 567.89,
      change: -2.13,
      volume: "High",
      imageUrl: "/crypto-icons/bnb.png",
    },
    {
      symbol: "USDC",
      name: "USDC",
      category: ["stablecoins"],
      price: 1.0,
      change: 0.0,
      volume: "High",
      imageUrl: "/crypto-icons/usdc.png",
    },
    {
      symbol: "USDT",
      name: "TetherUS",
      category: ["stablecoins"],
      price: 1.0,
      change: 0.0,
      volume: "High",
      imageUrl: "/crypto-icons/usdt.png",
    },
    {
      symbol: "LTC",
      name: "Litecoin",
      category: [],
      price: 78.45,
      change: 1.23,
      volume: "Medium",
      imageUrl: "/crypto-icons/ltc.png",
    },
    {
      symbol: "SOL",
      name: "Solana",
      category: ["popular", "trending"],
      price: 145.67,
      change: 3.87,
      volume: "High",
      imageUrl: "/crypto-icons/sol.png",
    },
    {
      symbol: "DOGE",
      name: "Dogecoin",
      category: ["popular"],
      price: 0.1234,
      change: -1.45,
      volume: "Medium",
      imageUrl: "/crypto-icons/doge.png",
    },
    {
      symbol: "TRX",
      name: "TRON",
      category: [],
      price: 0.1234,
      change: 0.87,
      volume: "Medium",
      imageUrl: "/crypto-icons/trx.png",
    },
    {
      symbol: "MATIC",
      name: "Polygon",
      category: ["defi"],
      price: 0.789,
      change: 2.34,
      volume: "Medium",
      imageUrl: "/crypto-icons/matic.png",
    },
    {
      symbol: "ADA",
      name: "Cardano",
      category: ["popular"],
      price: 0.4567,
      change: 2.77,
      volume: "Medium",
      imageUrl: "/crypto-icons/ada.png",
    },
    {
      symbol: "SHIB",
      name: "SHIBA INU",
      category: ["popular"],
      price: 0.00001234,
      change: -2.56,
      volume: "Medium",
      imageUrl: "/crypto-icons/shib.png",
    },
    {
      symbol: "WBTC",
      name: "Wrapped Bitcoin",
      category: ["defi"],
      price: 68245.32,
      change: 1.86,
      volume: "Medium",
      imageUrl: "/crypto-icons/wbtc.png",
    },
    {
      symbol: "TUSD",
      name: "TrueUSD",
      category: ["stablecoins"],
      price: 1.0,
      change: 0.01,
      volume: "Low",
      imageUrl: "/crypto-icons/tusd.png",
    },
    {
      symbol: "XLM",
      name: "Stellar Lumens",
      category: [],
      price: 0.1234,
      change: 1.23,
      volume: "Low",
      imageUrl: "/crypto-icons/xlm.png",
    },
    {
      symbol: "BCH",
      name: "Bitcoin Cash",
      category: [],
      price: 345.67,
      change: 1.45,
      volume: "Medium",
      imageUrl: "/crypto-icons/bch.png",
    },
    {
      symbol: "PEPE",
      name: "Pepe",
      category: ["trending"],
      price: 0.0000123,
      change: 5.67,
      volume: "Medium",
      imageUrl: "/crypto-icons/pepe.png",
    },
    {
      symbol: "ARB",
      name: "Arbitrum",
      category: ["defi", "trending"],
      price: 1.23,
      change: 3.45,
      volume: "Medium",
      imageUrl: "/crypto-icons/arb.png",
    },
    {
      symbol: "LINK",
      name: "ChainLink",
      category: ["defi"],
      price: 12.34,
      change: 2.34,
      volume: "Medium",
      imageUrl: "/crypto-icons/link.png",
    },
    {
      symbol: "DOT",
      name: "Polkadot",
      category: [],
      price: 6.78,
      change: 1.23,
      volume: "Medium",
      imageUrl: "/crypto-icons/dot.png",
    },
    {
      symbol: "AUCTION",
      name: "Auction",
      category: ["defi"],
      price: 2.34,
      change: -1.23,
      volume: "Low",
      imageUrl: "/crypto-icons/auction.png",
    },
    {
      symbol: "AVAX",
      name: "Avalanche",
      category: ["defi", "trending"],
      price: 34.56,
      change: 4.56,
      volume: "Medium",
      imageUrl: "/crypto-icons/avax.png",
    },
    {
      symbol: "COMP",
      name: "Compound",
      category: ["defi"],
      price: 56.78,
      change: 2.34,
      volume: "Low",
      imageUrl: "/crypto-icons/comp.png",
    },
    {
      symbol: "LUNC",
      name: "Terra Classic",
      category: [],
      price: 0.0001234,
      change: -1.23,
      volume: "Low",
      imageUrl: "/crypto-icons/lunc.png",
    },
    {
      symbol: "GALA",
      name: "Gala",
      category: [],
      price: 0.0234,
      change: 3.45,
      volume: "Low",
      imageUrl: "/crypto-icons/gala.png",
    },
    {
      symbol: "INJ",
      name: "Injective",
      category: ["defi", "trending"],
      price: 23.45,
      change: 5.67,
      volume: "Medium",
      imageUrl: "/crypto-icons/inj.png",
    },
    {
      symbol: "FTM",
      name: "Fantom",
      category: ["defi"],
      price: 0.5678,
      change: 2.34,
      volume: "Medium",
      imageUrl: "/crypto-icons/ftm.png",
    },
    {
      symbol: "BRL",
      name: "Brazilian Real",
      category: ["fiat"],
      price: 0.1789,
      change: -0.12,
      volume: "Low",
      imageUrl: "/crypto-icons/brl.png",
    },
    {
      symbol: "ARKM",
      name: "Arkham",
      category: ["trending"],
      price: 1.23,
      change: 7.89,
      volume: "Medium",
      imageUrl: "/crypto-icons/arkm.png",
    },
    {
      symbol: "OP",
      name: "Optimism",
      category: ["defi"],
      price: 2.34,
      change: 3.45,
      volume: "Medium",
      imageUrl: "/crypto-icons/op.png",
    },
    {
      symbol: "ATOM",
      name: "Cosmos",
      category: [],
      price: 8.9,
      change: 1.23,
      volume: "Medium",
      imageUrl: "/crypto-icons/atom.png",
    },
    {
      symbol: "YGG",
      name: "Yield Guild Games",
      category: [],
      price: 0.2345,
      change: -2.34,
      volume: "Low",
      imageUrl: "/crypto-icons/ygg.png",
    },
    {
      symbol: "ALGO",
      name: "Algorand",
      category: [],
      price: 0.1234,
      change: 1.23,
      volume: "Low",
      imageUrl: "/crypto-icons/algo.png",
    },
    {
      symbol: "HBAR",
      name: "Hedera Hashgraph",
      category: [],
      price: 0.0678,
      change: 2.34,
      volume: "Low",
      imageUrl: "/crypto-icons/hbar.png",
    },
    {
      symbol: "APE",
      name: "ApeCoin",
      category: ["trending"],
      price: 1.23,
      change: -1.23,
      volume: "Medium",
      imageUrl: "/crypto-icons/ape.png",
    },
    {
      symbol: "AGIX",
      name: "SingularityNET Token",
      category: ["trending"],
      price: 0.4567,
      change: 8.9,
      volume: "Medium",
      imageUrl: "/crypto-icons/agix.png",
    },
    {
      symbol: "GOLD",
      name: "Adventure Gold",
      category: [],
      price: 0.8901,
      change: 1.23,
      volume: "Low",
      imageUrl: "/crypto-icons/gold.png",
    },
    {
      symbol: "CFX",
      name: "Conflux Network",
      category: [],
      price: 0.1234,
      change: 2.34,
      volume: "Low",
      imageUrl: "/crypto-icons/cfx.png",
    },
    {
      symbol: "1INCH",
      name: "1inch",
      category: ["defi"],
      price: 0.4567,
      change: 1.23,
      volume: "Low",
      imageUrl: "/crypto-icons/1inch.png",
    },
    {
      symbol: "AMP",
      name: "AMP",
      category: [],
      price: 0.0023,
      change: -1.23,
      volume: "Low",
      imageUrl: "/crypto-icons/amp.png",
    },
    {
      symbol: "APT",
      name: "Aptos",
      category: ["trending"],
      price: 8.9,
      change: 3.45,
      volume: "Medium",
      imageUrl: "/crypto-icons/apt.png",
    },
    {
      symbol: "XVG",
      name: "Verge",
      category: [],
      price: 0.0045,
      change: -2.34,
      volume: "Low",
      imageUrl: "/crypto-icons/xvg.png",
    },
    {
      symbol: "VET",
      name: "VeChain",
      category: [],
      price: 0.0234,
      change: 1.23,
      volume: "Low",
      imageUrl: "/crypto-icons/vet.png",
    },
    {
      symbol: "FIL",
      name: "Filecoin",
      category: [],
      price: 4.56,
      change: 2.34,
      volume: "Medium",
      imageUrl: "/crypto-icons/fil.png",
    },
  ]

  // Filter currencies based on search and category
  const filteredCurrencies = currencies.filter((currency) => {
    const matchesSearch =
      currency.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCurrencyCategory === "all" || currency.category.includes(activeCurrencyCategory)

    return matchesSearch && matchesCategory
  })

  // Get recently used currencies (for demo, just using the top 5 popular ones)
  const recentlyUsed = currencies.filter((currency) => currency.category.includes("popular")).slice(0, 5)

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Convert</h1>
          <p className={styles.pageDescription}>Convert crypto instantly with zero fees</p>
        </div>
        <Button variant="outline" className={styles.historyButton} onClick={() => setShowHistory(!showHistory)}>
          <Clock className="h-4 w-4 mr-2" />
          Order History
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        <Card className={styles.darkCard}>
          <CardContent className={styles.cardContent}>
            <Tabs defaultValue="convert" className="mb-6" onValueChange={(value) => setActiveTab(value)}>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="convert">Convert</TabsTrigger>
                <TabsTrigger value="block-trade">Block Trade</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* From Currency */}
            <div className={styles.inputContainer}>
              <div className={styles.inputLabel}>
                <label className={styles.labelText}>From</label>
                <span className={styles.availableBalance}>Available: 12,345.67 {fromCurrency}</span>
              </div>
              <div className={styles.inputWrapper}>
                <div className="flex-1">
                  <input
                    type="text"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    placeholder="0.00"
                    className={styles.input}
                  />
                </div>
                <div className="flex items-center">
                  <Button variant="ghost" className="font-medium flex items-center gap-1">
                    {fromCurrency}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className={styles.swapButton}>
              <Button variant="ghost" size="icon" className={styles.swapIconButton} onClick={handleSwap}>
                <ArrowDown className="h-5 w-5" />
              </Button>
            </div>

            {/* To Currency */}
            <div className={styles.inputContainer}>
              <div className={styles.inputLabel}>
                <label className={styles.labelText}>To</label>
                <span className={styles.availableBalance}>Available: 0.1234 {toCurrency}</span>
              </div>
              <div className={styles.inputWrapper}>
                <div className="flex-1">
                  <input type="text" value={toAmount} readOnly placeholder="0.00" className={styles.input} />
                </div>
                <div className="flex items-center">
                  <Button variant="ghost" className="font-medium flex items-center gap-1">
                    {toCurrency}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Exchange Rate */}
            <div className={styles.exchangeRateContainer}>
              <div className="flex items-center">
                <span className="text-sm">Exchange Rate</span>
                <Info className="h-4 w-4 ml-1 text-muted-foreground" />
              </div>
              <div className="flex items-center">
                <span className="text-sm">
                  1 {fromCurrency} ≈ {rate.toFixed(8)} {toCurrency}
                </span>
                <Button variant="ghost" size="icon" className="ml-1 h-6 w-6">
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Block Trade Info (only shown when block trade tab is active) */}
            {activeTab === "block-trade" && (
              <div className={styles.blockTradeInfo}>
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-400 font-medium">Block Trade</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      For trades larger than 10,000 USDT. Get a quote with locked-in price for 15 seconds.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Convert Button */}
            <Button className={styles.convertButton}>{activeTab === "convert" ? "Convert" : "Get Quote"}</Button>

            {/* Terms */}
            <p className={styles.termsText}>
              By proceeding, you agree to the{" "}
              <a href="#" className={styles.termsLink}>
                Terms of Use
              </a>
            </p>
          </CardContent>
        </Card>

        {/* Clear separator between convert and currencies sections */}
        

        <div className={styles.currenciesSection}>
          <div className={styles.currenciesHeader}>
            <div>
              <h3 className={styles.currencyTitle}>Convert {fromCurrency} to other currencies</h3>
              <p className={styles.currencySubtitle}>Select a cryptocurrency to convert to</p>
            </div>

            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <Input
                type="text"
                placeholder="Search currencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className={styles.categoryTabs}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryTab} ${activeCurrencyCategory === category.id ? styles.activeCategoryTab : ""}`}
                onClick={() => setActiveCurrencyCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Recently Used Section */}
          {searchQuery === "" && activeCurrencyCategory === "all" && (
            <div className={styles.recentlyUsedSection}>
              <div className={styles.sectionTitle}>
                <Clock className="h-4 w-4 mr-1" />
                <span>Recently Used</span>
              </div>
              <div className={styles.recentlyUsedGrid}>
                {recentlyUsed.map((currency, index) => (
                  <button
                    key={`recent-${index}`}
                    className={`${styles.currencyCard} ${currency.symbol === toCurrency ? styles.selectedCurrency : ""}`}
                    onClick={() => setToCurrency(currency.symbol)}
                  >
                    <div className={styles.currencyCardHeader}>
                      <div className={styles.currencyIconContainer}>
                        <div className={styles.currencyIcon}>
                          <Image
                            src={currency.imageUrl || "/placeholder.svg"}
                            alt={currency.symbol}
                            width={40}
                            height={40}
                            className={styles.cryptoImage}
                          />
                        </div>
                      </div>
                      <div className={styles.currencyInfo}>
                        <div className={styles.currencySymbolName}>
                          <span className={styles.currencySymbolText}>{currency.symbol}</span>
                          {currency.category.includes("trending") && <TrendingUp className={styles.trendingIcon} />}
                        </div>
                        <span className={styles.currencyNameText}>{currency.name}</span>
                      </div>
                    </div>
                    <div className={styles.currencyCardFooter}>
                      <span className={styles.currencyPrice}>${currency.price.toLocaleString()}</span>
                      <span
                        className={`${styles.currencyChange} ${currency.change >= 0 ? styles.positiveChange : styles.negativeChange}`}
                      >
                        {currency.change >= 0 ? "+" : ""}
                        {currency.change}%
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* All Currencies Grid */}
          <div className={styles.currencyGridContainer}>
            {activeCurrencyCategory === "all" && searchQuery === "" && (
              <div className={styles.sectionTitle}>
                <Star className="h-4 w-4 mr-1" />
                <span>All Currencies</span>
              </div>
            )}

            <div className={styles.currencyGrid}>
              {filteredCurrencies.map((currency, index) => (
                <button
                  key={index}
                  className={`${styles.currencyCard} ${currency.symbol === toCurrency ? styles.selectedCurrency : ""}`}
                  onClick={() => setToCurrency(currency.symbol)}
                >
                  <div className={styles.currencyCardHeader}>
                    <div className={styles.currencyIconContainer}>
                      <div className={styles.currencyIcon}>
                        <Image
                          src={currency.imageUrl || "/placeholder.svg"}
                          alt={currency.symbol}
                          width={40}
                          height={40}
                          className={styles.cryptoImage}
                        />
                      </div>
                    </div>
                    <div className={styles.currencyInfo}>
                      <div className={styles.currencySymbolName}>
                        <span className={styles.currencySymbolText}>{currency.symbol}</span>
                        {currency.category.includes("trending") && <TrendingUp className={styles.trendingIcon} />}
                      </div>
                      <span className={styles.currencyNameText}>{currency.name}</span>
                    </div>
                  </div>
                  <div className={styles.currencyCardFooter}>
                    <span className={styles.currencyPrice}>${currency.price.toLocaleString()}</span>
                    <span
                      className={`${styles.currencyChange} ${currency.change >= 0 ? styles.positiveChange : styles.negativeChange}`}
                    >
                      {currency.change >= 0 ? "+" : ""}
                      {currency.change}%
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Order History (conditionally rendered) */}
      {showHistory && (
        <Card className={styles.historyCard}>
          <CardContent className={styles.cardContent}>
            <h3 className={styles.historyTitle}>Order History</h3>
            <div className="overflow-x-auto">
              <table className={styles.historyTable}>
                <thead>
                  <tr className={styles.historyTableHeader}>
                    <th className={styles.historyTableHeaderCell}>Date</th>
                    <th className={styles.historyTableHeaderCell}>Pair</th>
                    <th className={styles.historyTableHeaderCell}>Type</th>
                    <th className={styles.historyTableHeaderCell}>Amount</th>
                    <th className={styles.historyTableHeaderCell}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles.historyTableRow}>
                    <td className={styles.historyTableCell}>2023-05-05 14:32</td>
                    <td className={styles.historyTableCell}>BTC/USDT</td>
                    <td className={styles.historyTableCell}>Convert</td>
                    <td className={styles.historyTableCell}>0.12345 BTC</td>
                    <td className={styles.historyTableCell}>
                      <Badge variant="outline" className={styles.statusBadge}>
                        Completed
                      </Badge>
                    </td>
                  </tr>
                  <tr className={styles.historyTableRow}>
                    <td className={styles.historyTableCell}>2023-05-04 09:15</td>
                    <td className={styles.historyTableCell}>ETH/USDT</td>
                    <td className={styles.historyTableCell}>Block Trade</td>
                    <td className={styles.historyTableCell}>15.5 ETH</td>
                    <td className={styles.historyTableCell}>
                      <Badge variant="outline" className={styles.statusBadge}>
                        Completed
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
