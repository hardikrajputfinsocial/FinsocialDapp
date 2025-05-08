import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// MarketTicker Component
function MarketTicker() {
  return (
    <div className="w-full overflow-hidden bg-background border-b py-2">
      <div className="flex animate-marquee whitespace-nowrap">
        {[
          { symbol: "BTC/USDT", price: "68,245.32", change: "1.86", isPositive: true },
          { symbol: "ETH/USDT", price: "3,456.78", change: "2.59", isPositive: true },
          { symbol: "BNB/USDT", price: "567.89", change: "2.13", isPositive: false },
          { symbol: "SOL/USDT", price: "145.67", change: "3.87", isPositive: true },
          { symbol: "XRP/USDT", price: "0.5678", change: "3.96", isPositive: false },
          { symbol: "ADA/USDT", price: "0.4567", change: "2.77", isPositive: true },
        ].map((market, index) => (
          <div key={index} className="mx-4 flex items-center">
            <span className="font-medium">{market.symbol}</span>
            <span className="ml-2">${market.price}</span>
            <span className={`ml-2 flex items-center ${market.isPositive ? "text-green-500" : "text-red-500"}`}>
              {market.isPositive ? "▲" : "▼"} {market.change}%
            </span>
          </div>
        ))}
        {/* Repeat for continuous scrolling effect */}
        {[
          { symbol: "BTC/USDT", price: "68,245.32", change: "1.86", isPositive: true },
          { symbol: "ETH/USDT", price: "3,456.78", change: "2.59", isPositive: true },
          { symbol: "BNB/USDT", price: "567.89", change: "2.13", isPositive: false },
          { symbol: "SOL/USDT", price: "145.67", change: "3.87", isPositive: true },
          { symbol: "XRP/USDT", price: "0.5678", change: "3.96", isPositive: false },
          { symbol: "ADA/USDT", price: "0.4567", change: "2.77", isPositive: true },
        ].map((market, index) => (
          <div key={`repeat-${index}`} className="mx-4 flex items-center">
            <span className="font-medium">{market.symbol}</span>
            <span className="ml-2">${market.price}</span>
            <span className={`ml-2 flex items-center ${market.isPositive ? "text-green-500" : "text-red-500"}`}>
              {market.isPositive ? "▲" : "▼"} {market.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// HeroSection Component
function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background via-background to-muted/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-flex bg-primary text-primary-foreground px-3 py-1 text-sm rounded-lg">
                Next-Gen Trading
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Trade Crypto with Confidence on Finsocial
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                The most trusted cryptocurrency trading platform with advanced tools for traders of all levels.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/markets">Explore Markets</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <span className="font-medium">24h Volume:</span>
                <span className="text-green-500 font-bold">$24.8B</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-medium">Users:</span>
                <span className="font-bold">90M+</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-medium">Countries:</span>
                <span className="font-bold">180+</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full h-[400px] lg:h-[500px] xl:h-[600px]">
              <div className="absolute inset-0 flex items-center justify-center rounded-lg shadow-2xl border border-border/40 bg-muted/10">
                <div className="text-center p-6">
                  <h3 className="text-xl font-bold mb-2">Trading Dashboard</h3>
                  <p className="text-muted-foreground">Advanced trading tools and real-time market data</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// StatsSection Component
function StatsSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 border-y bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <svg
                className="h-6 w-6 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-bold">90M+</h3>
            <p className="text-sm text-muted-foreground">Registered Users</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <svg
                className="h-6 w-6 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-bold">$24.8B</h3>
            <p className="text-sm text-muted-foreground">24h Trading Volume</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <svg
                className="h-6 w-6 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-bold">180+</h3>
            <p className="text-sm text-muted-foreground">Countries Supported</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <svg
                className="h-6 w-6 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-bold">$1B+</h3>
            <p className="text-sm text-muted-foreground">Insurance Fund</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main Home Page
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketTicker />
      <HeroSection />
      <StatsSection />

      <section className="container py-12 md:py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Trade with Confidence</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Experience the most advanced trading platform with powerful tools and features
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <div className="flex space-x-2">
              <Button asChild size="lg">
                <Link href="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/trade/spot">Try Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-12 md:py-24 lg:py-32">
        <div className="container flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Start Trading Today</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Join millions of traders worldwide and experience the power of our platform
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <Button asChild size="lg" className="w-full">
              <Link href="/register">
                Create Account <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
