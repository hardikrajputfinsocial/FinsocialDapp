import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function TradingPlatformPreview() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Platform</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Trading Interface</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Experience our advanced trading interface with all the tools you need
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-6xl py-8">
          <Card className="overflow-hidden border-primary/10">
            <CardContent className="p-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 pointer-events-none z-10" />
                <Image
                  src="/crypto-trading-platform.png"
                  width={1200}
                  height={600}
                  alt="Trading Platform Interface"
                  className="w-full h-auto object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
