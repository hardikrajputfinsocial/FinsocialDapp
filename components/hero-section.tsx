import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background via-background to-muted/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge className="inline-flex bg-primary text-primary-foreground" variant="secondary">
                Next-Gen Trading
              </Badge>
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
              <Image
                src="/crypto-trading-dashboard.png"
                fill
                alt="Trading Platform Dashboard"
                className="object-contain rounded-lg shadow-2xl border border-border/40"
                priority
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
