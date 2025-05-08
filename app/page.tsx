import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { MarketTicker } from "@/components/market-ticker"
import { FeatureSection } from "@/components/feature-section"
import { TradingPlatformPreview } from "@/components/trading-platform-preview"
import { MobileAppSection } from "@/components/mobile-app-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FaqSection } from "@/components/faq-section"
import { Button } from "@/components/ui/button"
import { StatsSection } from "@/components/stats-section"
import { TrustedBySection } from "@/components/trusted-by-section"
import { redirect } from "next/navigation"

// Redirect from root to home page
export default function RootPage() {
  redirect("/pages/home")
  return null
}

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketTicker />

      <HeroSection />

      <StatsSection />

      <TrustedBySection />

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

      <TradingPlatformPreview />

      <FeatureSection />

      <MobileAppSection />

      <TestimonialsSection />

      <FaqSection />

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
