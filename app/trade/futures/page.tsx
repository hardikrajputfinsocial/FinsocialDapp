import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TradingViewChart } from '@/components/trading-view-chart';
import { OrderBook } from '@/components/order-book';
import { TradeForm } from '@/components/trade-form';
import { MarketInfo } from '@/components/market-info';
import { RecentTrades } from '@/components/recent-trades';
import { OpenOrders } from '@/components/open-orders';
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

export default function FuturesTradingPage() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">Futures Trading</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>BTC/USDT Perpetual</CardTitle>
                  <CardDescription>Bitcoin to Tether Futures</CardDescription>
                </div>
                <Badge>125x</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <TradingViewChart symbol="BTCUSDT" />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Market Info</CardTitle>
            </CardHeader>
            <CardContent>
              <MarketInfo 
                price="43,256.78" 
                change="+2.34%" 
                high="43,890.12" 
                low="42,567.89" 
                volume="1.2B"
                additional={[
                  { label: "Funding Rate", value: "0.01%" },
                  { label: "Next Funding", value: "8h 24m" },
                  { label: "Open Interest", value: "$1.8B" }
                ]}
              />
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle>Futures Trade</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="limit">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="limit">Limit</TabsTrigger>
                  <TabsTrigger value="market">Market</TabsTrigger>
                  <TabsTrigger value="conditional">Conditional</TabsTrigger>
                </TabsList>
                <TabsContent value="limit">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Leverage</label>
                    <div className="flex items-center gap-2">
                      <Slider defaultValue={[10]} max={125} step={1} />
                      <span className="text-sm font-medium">10x</span>
                    </div>
                  </div>
                  <TradeForm type="futures" />
                </TabsContent>
                <TabsContent value="market">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Leverage</label>
                    <div className="flex items-center gap-2">
                      <Slider defaultValue={[10]} max={125} step={1} />
                      <span className="text-sm font-medium">10x</span>
                    </div>
                  </div>
                  <TradeForm type="futures-market" />
                </TabsContent>
                <TabsContent value="conditional">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Leverage</label>
                    <div className="flex items-center gap-2">
                      <Slider defaultValue={[10]} max={125} step={1} />
                      <span className="text-sm font-medium">10x</span>
                    </div>
                  </div>
                  <TradeForm type="futures-conditional" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Order Book</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderBook />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recent Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentTrades />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <OpenOrders type="futures" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
