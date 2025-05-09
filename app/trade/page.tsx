import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TradingViewChart } from '@/components/trading-view-chart';
import { OrderBook } from '@/components/order-book';
import { TradeForm } from '@/components/trade-form';
import { MarketInfo } from '@/components/market-info';
import { RecentTrades } from '@/components/recent-trades';
import { OpenOrders } from '@/components/open-orders';

export default function TradePage() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">Trade</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>BTC/USDT</CardTitle>
              <CardDescription>Bitcoin to Tether</CardDescription>
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
              />
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle>Trade</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="limit">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="limit">Limit</TabsTrigger>
                  <TabsTrigger value="market">Market</TabsTrigger>
                  <TabsTrigger value="stop">Stop</TabsTrigger>
                </TabsList>
                <TabsContent value="limit">
                  <TradeForm type="limit" />
                </TabsContent>
                <TabsContent value="market">
                  <TradeForm type="market" />
                </TabsContent>
                <TabsContent value="stop">
                  <TradeForm type="stop" />
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
              <CardTitle>Open Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <OpenOrders />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
