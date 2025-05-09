"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Bitcoin, BarChart2, DollarSign, Users, Repeat, Zap, Bot, Copy, Code } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/buy-crypto" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Buy Crypto</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Markets</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/markets/overview"
                  >
                    <BarChart2 className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">Market Overview</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Get a comprehensive view of all cryptocurrency markets with real-time data and analytics.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <Link href="/trade/BTC_USDT?type=spot" legacyBehavior passHref>
                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="flex items-center gap-2">
                      <Bitcoin className="h-4 w-4" />
                      <div className="text-sm font-medium leading-none">Spot Markets</div>
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      View all spot trading pairs and their current prices
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/markets/futures" legacyBehavior passHref>
                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <div className="text-sm font-medium leading-none">Futures Markets</div>
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Explore cryptocurrency futures contracts and derivatives
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/markets/new-listings" legacyBehavior passHref>
                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      <div className="text-sm font-medium leading-none">New Listings</div>
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Discover newly listed cryptocurrencies on our platform
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Trade</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-2 gap-2 p-4 md:w-[600px]">
              <div className="p-2">
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">Basic</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/trade/spot" legacyBehavior passHref>
                      <NavigationMenuLink className="flex items-center gap-2 rounded-md p-2 hover:bg-accent">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                          <Bitcoin className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Spot</div>
                          <div className="text-xs text-muted-foreground">
                            Buy and sell on the Spot market with advanced tools
                          </div>
                        </div>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/trade/margin" legacyBehavior passHref>
                      <NavigationMenuLink className="flex items-center gap-2 rounded-md p-2 hover:bg-accent">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                          <BarChart2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Margin</div>
                          <div className="text-xs text-muted-foreground">Increase your profits with leverage</div>
                        </div>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/trade/p2p" legacyBehavior passHref>
                      <NavigationMenuLink className="flex items-center gap-2 rounded-md p-2 hover:bg-accent">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">P2P</div>
                          <div className="text-xs text-muted-foreground">
                            Buy & sell cryptocurrencies using bank transfer and 800+ options
                          </div>
                        </div>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/trade/convert" legacyBehavior passHref>
                      <NavigationMenuLink className="flex items-center gap-2 rounded-md p-2 hover:bg-accent">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                          <Repeat className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Convert & Block Trade</div>
                          <div className="text-xs text-muted-foreground">The easiest way to trade at all sizes</div>
                        </div>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="p-2">
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">Advanced</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/trade/alpha" legacyBehavior passHref>
                      <NavigationMenuLink className="flex items-center gap-2 rounded-md p-2 hover:bg-accent">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                          <Zap className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Alpha</div>
                          <div className="text-xs text-muted-foreground">Quick access to Web3 via Alpha Trading</div>
                        </div>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/trade/bots" legacyBehavior passHref>
                      <NavigationMenuLink className="flex items-center gap-2 rounded-md p-2 hover:bg-accent">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Trading Bots</div>
                          <div className="text-xs text-muted-foreground">
                            Trade smarter with our various automated strategies
                          </div>
                        </div>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/trade/copy-trading" legacyBehavior passHref>
                      <NavigationMenuLink className="flex items-center gap-2 rounded-md p-2 hover:bg-accent">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                          <Copy className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Copy Trading</div>
                          <div className="text-xs text-muted-foreground">Follow the most popular traders</div>
                        </div>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/trade/api" legacyBehavior passHref>
                      <NavigationMenuLink className="flex items-center gap-2 rounded-md p-2 hover:bg-accent">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                          <Code className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">APIs</div>
                          <div className="text-xs text-muted-foreground">Unlimited opportunities with one key</div>
                        </div>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Futures</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4">
              <li>
                <Link href="/futures/usd-m" legacyBehavior passHref>
                  <NavigationMenuLink className="flex items-center gap-2 rounded-md p-2 hover:bg-accent">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                      <DollarSign className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">USD-M Futures</div>
                      <div className="text-xs text-muted-foreground">Contracts settled in USDT and USDC</div>
                    </div>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/futures/coin-m" legacyBehavior passHref>
                  <NavigationMenuLink className="flex items-center gap-2 rounded-md p-2 hover:bg-accent">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                      <Bitcoin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">COIN-M Futures</div>
                      <div className="text-xs text-muted-foreground">Contracts settled in cryptocurrency</div>
                    </div>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/futures/options" legacyBehavior passHref>
                  <NavigationMenuLink className="flex items-center gap-2 rounded-md p-2 hover:bg-accent">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                      <BarChart2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Options</div>
                      <div className="text-xs text-muted-foreground">
                        USDT Options with limited downside and affordable entry
                      </div>
                    </div>
                  </NavigationMenuLink>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Earn</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4">
              <li>
                <Link href="/earn/overview" legacyBehavior passHref>
                  <NavigationMenuLink className="flex items-center gap-2 rounded-md p-2 hover:bg-accent">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <circle cx="12" cy="8" r="6" />
                        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Overview</div>
                      <div className="text-xs text-muted-foreground">One-stop portal for all Earn products</div>
                    </div>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/earn/simple" legacyBehavior passHref>
                  <NavigationMenuLink className="flex items-center gap-2 rounded-md p-2 hover:bg-accent">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="m8 14 2.5-2.5c.83-.83 2.17-.83 3 0L16 14" />
                        <path d="m16 10-2.5 2.5c-.83.83-2.17.83-3 0L8 10" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Simple Earn</div>
                      <div className="text-xs text-muted-foreground">
                        Earn passive income on 300+ crypto assets with flexible and locked terms
                      </div>
                    </div>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/earn/advanced" legacyBehavior passHref>
                  <NavigationMenuLink className="flex items-center gap-2 rounded-md p-2 hover:bg-accent">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Advanced Earn</div>
                      <div className="text-xs text-muted-foreground">
                        Maximize your returns with our advanced yield investment products
                      </div>
                    </div>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/earn/loans" legacyBehavior passHref>
                  <NavigationMenuLink className="flex items-center gap-2 rounded-md p-2 hover:bg-accent">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Loans</div>
                      <div className="text-xs text-muted-foreground">
                        Access quick and easy loans with competitive rates
                      </div>
                    </div>
                  </NavigationMenuLink>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
