"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowDown, Info, Clock, ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import styles from "./block-trade.module.css"

export default function BlockTradePage() {
  const router = useRouter()
  const [fromCurrency, setFromCurrency] = useState("USDT")
  const [toCurrency, setToCurrency] = useState("BTC")
  const [fromAmount, setFromAmount] = useState("")
  const [quoteReceived, setQuoteReceived] = useState(false)
  const [quoteExpiry, setQuoteExpiry] = useState(15)
  const [quoteRate, setQuoteRate] = useState(0.0000146)
  const [quoteAmount, setQuoteAmount] = useState("0.00")

  // Redirect to convert page with block trade tab active
  const goToConvert = () => {
    router.push("/pages/trade/convert?tab=block-trade")
  }

  // Get quote for block trade
  const getQuote = () => {
    if (Number.parseFloat(fromAmount) >= 10000) {
      const calculatedAmount = Number.parseFloat(fromAmount) * quoteRate
      setQuoteAmount(calculatedAmount.toFixed(8))
      setQuoteReceived(true)

      // Start countdown
      const interval = setInterval(() => {
        setQuoteExpiry((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            setQuoteReceived(false)
            return 15
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  // Swap currencies
  const handleSwap = () => {
    const tempCurrency = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(tempCurrency)
    setQuoteReceived(false)
    setQuoteExpiry(15)
  }

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Block Trade</h1>
          <p className={styles.pageDescription}>Execute large trades with locked-in prices</p>
        </div>
        <Button variant="outline" className={styles.convertButton} onClick={goToConvert}>
          <Clock className="h-4 w-4 mr-2" />
          Convert
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className={styles.darkCard}>
            <CardContent className={styles.cardContent}>
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

              {/* From Currency */}
              <div className={styles.inputContainer}>
                <div className={styles.inputLabel}>
                  <label className={styles.labelText}>From</label>
                  <span className={styles.availableBalance}>Available: 50,000.00 {fromCurrency}</span>
                </div>
                <div className={styles.inputWrapper}>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={fromAmount}
                      onChange={(e) => {
                        setFromAmount(e.target.value)
                        setQuoteReceived(false)
                      }}
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
                {Number.parseFloat(fromAmount) > 0 && Number.parseFloat(fromAmount) < 10000 && (
                  <p className={styles.errorMessage}>Minimum amount for block trade is 10,000 USDT</p>
                )}
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
                    <input
                      type="text"
                      value={quoteReceived ? quoteAmount : ""}
                      readOnly
                      placeholder="0.00"
                      className={styles.input}
                    />
                  </div>
                  <div className="flex items-center">
                    <Button variant="ghost" className="font-medium flex items-center gap-1">
                      {toCurrency}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quote Information */}
              {quoteReceived ? (
                <div className={styles.quoteContainer}>
                  <div className={styles.quoteRow}>
                    <span className="text-sm">Quote Expires In</span>
                    <Badge variant="outline" className={styles.expiryBadge}>
                      {quoteExpiry}s
                    </Badge>
                  </div>
                  <div className={styles.quoteRow}>
                    <span className="text-sm">Rate</span>
                    <span className="text-sm">
                      1 {fromCurrency} = {quoteRate.toFixed(8)} {toCurrency}
                    </span>
                  </div>
                </div>
              ) : (
                <div className={styles.quoteContainer}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Quote</span>
                    <span className="text-sm text-muted-foreground">Not requested yet</span>
                  </div>
                </div>
              )}

              {/* Action Button */}
              {quoteReceived ? (
                <Button className={styles.actionButton}>Confirm Trade</Button>
              ) : (
                <Button
                  className={styles.actionButton}
                  onClick={getQuote}
                  disabled={!fromAmount || Number.parseFloat(fromAmount) < 10000}
                >
                  Get Quote
                </Button>
              )}

              {/* Terms */}
              <p className={styles.termsText}>
                By proceeding, you agree to the{" "}
                <a href="#" className={styles.termsLink}>
                  Terms of Use
                </a>
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className={styles.darkCard}>
            <CardContent className={styles.cardContent}>
              <h3 className={styles.featureTitle}>About Block Trade</h3>
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <Badge variant="outline" className={styles.featureBadge}>
                    1
                  </Badge>
                  <span className={styles.featureText}>Execute large trades with minimal slippage</span>
                </li>
                <li className={styles.featureItem}>
                  <Badge variant="outline" className={styles.featureBadge}>
                    2
                  </Badge>
                  <span className={styles.featureText}>Locked-in price for 15 seconds</span>
                </li>
                <li className={styles.featureItem}>
                  <Badge variant="outline" className={styles.featureBadge}>
                    3
                  </Badge>
                  <span className={styles.featureText}>Minimum trade size: 10,000 USDT</span>
                </li>
                <li className={styles.featureItem}>
                  <Badge variant="outline" className={styles.featureBadge}>
                    4
                  </Badge>
                  <span className={styles.featureText}>Competitive rates for institutional volumes</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
