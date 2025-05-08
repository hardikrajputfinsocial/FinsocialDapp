import { BarChart3, Shield, Smartphone, Zap, Globe, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function FeatureSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Finsocial</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We offer a comprehensive suite of tools and features to help you trade with confidence
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-background/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all">
            <CardContent className="flex flex-col items-center space-y-2 p-6">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Advanced Charts</h3>
              <p className="text-center text-muted-foreground">
                Professional-grade charting tools with multiple indicators and drawing tools
              </p>
            </CardContent>
          </Card>
          <Card className="bg-background/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all">
            <CardContent className="flex flex-col items-center space-y-2 p-6">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Secure Storage</h3>
              <p className="text-center text-muted-foreground">
                Industry-leading security measures to keep your assets safe
              </p>
            </CardContent>
          </Card>
          <Card className="bg-background/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all">
            <CardContent className="flex flex-col items-center space-y-2 p-6">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Fast Execution</h3>
              <p className="text-center text-muted-foreground">Lightning-fast trade execution with minimal slippage</p>
            </CardContent>
          </Card>
          <Card className="bg-background/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all">
            <CardContent className="flex flex-col items-center space-y-2 p-6">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Mobile Trading</h3>
              <p className="text-center text-muted-foreground">Trade on the go with our powerful mobile applications</p>
            </CardContent>
          </Card>
          <Card className="bg-background/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all">
            <CardContent className="flex flex-col items-center space-y-2 p-6">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Global Access</h3>
              <p className="text-center text-muted-foreground">
                Available in over 180 countries with multi-language support
              </p>
            </CardContent>
          </Card>
          <Card className="bg-background/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all">
            <CardContent className="flex flex-col items-center space-y-2 p-6">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Copy Trading</h3>
              <p className="text-center text-muted-foreground">
                Follow and automatically copy the trades of successful traders
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
