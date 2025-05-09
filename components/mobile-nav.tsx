"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              FS
            </div>
            <span className="font-bold">Finsocial</span>
          </Link>
        </div>
        <div className="flex flex-col gap-4 px-2 py-4">
          <Link href="/buy-crypto" className="px-4 py-2 text-sm font-medium" onClick={() => setOpen(false)}>
            Buy Crypto
          </Link>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="markets">
              <AccordionTrigger className="px-4 py-2 text-sm font-medium">Markets</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-4">
                  <Link href="/markets/overview" className="px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                    Market Overview
                  </Link>
                  <Link
                    href="/trade/BTC_USDT?type=spot"
                    className="px-4 py-2 text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Spot Markets
                  </Link>
                  <Link href="/markets/futures" className="px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                    Futures Markets
                  </Link>
                  <Link href="/markets/new-listings" className="px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                    New Listings
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="trade">
              <AccordionTrigger className="px-4 py-2 text-sm font-medium">Trade</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-4">
                  <div className="px-4 py-2 text-xs font-medium text-muted-foreground">Basic</div>
                  <Link href="/trade/spot" className="px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                    Spot
                  </Link>
                  <Link href="/trade/margin" className="px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                    Margin
                  </Link>
                  <Link href="/trade/p2p" className="px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                    P2P
                  </Link>
                  <Link href="/trade/convert" className="px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                    Convert & Block Trade
                  </Link>
                  <div className="px-4 py-2 text-xs font-medium text-muted-foreground">Advanced</div>
                  <Link href="/trade/alpha" className="px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                    Alpha
                  </Link>
                  <Link href="/trade/bots" className="px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                    Trading Bots
                  </Link>
                  <Link href="/trade/copy-trading" className="px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                    Copy Trading
                  </Link>
                  <Link href="/trade/api" className="px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                    APIs
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="futures">
              <AccordionTrigger className="px-4 py-2 text-sm font-medium">Futures</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-4">
                  <Link href="/futures/usd-m" className="px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                    USD-M Futures
                  </Link>
                  <Link href="/futures/coin-m" className="px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                    COIN-M Futures
                  </Link>
                  <Link href="/futures/options" className="px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                    Options
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="earn">
              <AccordionTrigger className="px-4 py-2 text-sm font-medium">Earn</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-4">
                  <Link href="/earn/overview" className="px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                    Overview
                  </Link>
                  <Link href="/earn/simple" className="px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                    Simple Earn
                  </Link>
                  <Link href="/earn/advanced" className="px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                    Advanced Earn
                  </Link>
                  <Link href="/earn/loans" className="px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                    Loans
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  )
}
