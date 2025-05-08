import { Users, BarChart3, Globe, Shield } from "lucide-react"

export function StatsSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 border-y bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-3xl font-bold">90M+</h3>
            <p className="text-sm text-muted-foreground">Registered Users</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-3xl font-bold">$24.8B</h3>
            <p className="text-sm text-muted-foreground">24h Trading Volume</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-3xl font-bold">180+</h3>
            <p className="text-sm text-muted-foreground">Countries Supported</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-3xl font-bold">$1B+</h3>
            <p className="text-sm text-muted-foreground">Insurance Fund</p>
          </div>
        </div>
      </div>
    </section>
  )
}
