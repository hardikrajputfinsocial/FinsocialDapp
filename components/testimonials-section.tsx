import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of satisfied traders who have chosen our platform
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-background/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col justify-between h-full space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                  </div>
                  <p className="text-muted-foreground">
                    "The trading platform is incredibly intuitive and the charts are top-notch. I've been able to
                    significantly improve my trading strategy."
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">AT</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Alex Thompson</p>
                    <p className="text-sm text-muted-foreground">Day Trader</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col justify-between h-full space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                  </div>
                  <p className="text-muted-foreground">
                    "I've tried many platforms, but this one stands out for its security and ease of use. The mobile app
                    is fantastic for trading on the go."
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Investor</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col justify-between h-full space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                  </div>
                  <p className="text-muted-foreground">
                    "The copy trading feature has been a game-changer for me. I've learned so much by following
                    experienced traders while making profits."
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">MC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Michael Chen</p>
                    <p className="text-sm text-muted-foreground">Beginner Trader</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
