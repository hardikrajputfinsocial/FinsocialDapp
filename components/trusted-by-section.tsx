export function TrustedBySection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-xl font-medium tracking-tight text-muted-foreground">Trusted By Industry Leaders</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            <div className="flex h-10 w-32 items-center justify-center grayscale transition-all hover:grayscale-0">
              <div className="text-2xl font-bold text-muted-foreground/70 hover:text-primary transition-colors">
                Coinbase
              </div>
            </div>
            <div className="flex h-10 w-32 items-center justify-center grayscale transition-all hover:grayscale-0">
              <div className="text-2xl font-bold text-muted-foreground/70 hover:text-primary transition-colors">
                Kraken
              </div>
            </div>
            <div className="flex h-10 w-32 items-center justify-center grayscale transition-all hover:grayscale-0">
              <div className="text-2xl font-bold text-muted-foreground/70 hover:text-primary transition-colors">
                Gemini
              </div>
            </div>
            <div className="flex h-10 w-32 items-center justify-center grayscale transition-all hover:grayscale-0">
              <div className="text-2xl font-bold text-muted-foreground/70 hover:text-primary transition-colors">
                Bitstamp
              </div>
            </div>
            <div className="flex h-10 w-32 items-center justify-center grayscale transition-all hover:grayscale-0">
              <div className="text-2xl font-bold text-muted-foreground/70 hover:text-primary transition-colors">
                Bitfinex
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
