import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Filter, Search } from "lucide-react";

export default function P2PTradingPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">P2P Trading</h1>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Peer-to-Peer Exchange</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="buy">
            <TabsList className="mb-6 w-full">
              <TabsTrigger value="buy" className="flex-1">Buy Crypto</TabsTrigger>
              <TabsTrigger value="sell" className="flex-1">Sell Crypto</TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Select defaultValue="usdt">
                <SelectTrigger>
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btc">BTC</SelectItem>
                  <SelectItem value="eth">ETH</SelectItem>
                  <SelectItem value="usdt">USDT</SelectItem>
                  <SelectItem value="usdc">USDC</SelectItem>
                  <SelectItem value="bnb">BNB</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="usd">
                <SelectTrigger>
                  <SelectValue placeholder="Select fiat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                  <SelectItem value="gbp">GBP</SelectItem>
                  <SelectItem value="jpy">JPY</SelectItem>
                  <SelectItem value="cad">CAD</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All payment methods</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="venmo">Venmo</SelectItem>
                  <SelectItem value="cash">Cash in person</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="text" placeholder="Search traders" className="pl-8" />
              </div>
            </div>
            
            <TabsContent value="buy" className="m-0">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Advertiser</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Limit</TableHead>
                      <TableHead>Available</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">CryptoKing</div>
                        <div className="text-xs text-muted-foreground">98.5% completion | 245 trades</div>
                      </TableCell>
                      <TableCell>$1.02</TableCell>
                      <TableCell>$50 - $5,000</TableCell>
                      <TableCell>12,500 USDT</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge variant="outline" className="mr-1">Bank Transfer</Badge>
                          <Badge variant="outline">PayPal</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm">Buy</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">TetherTrader</div>
                        <div className="text-xs text-muted-foreground">99.2% completion | 567 trades</div>
                      </TableCell>
                      <TableCell>$1.01</TableCell>
                      <TableCell>$100 - $10,000</TableCell>
                      <TableCell>45,000 USDT</TableCell>
                      <TableCell>
                        <Badge variant="outline">Bank Transfer</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm">Buy</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">CoinMaster</div>
                        <div className="text-xs text-muted-foreground">97.8% completion | 189 trades</div>
                      </TableCell>
                      <TableCell>$1.03</TableCell>
                      <TableCell>$50 - $2,000</TableCell>
                      <TableCell>8,750 USDT</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge variant="outline" className="mr-1">Credit Card</Badge>
                          <Badge variant="outline">Venmo</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm">Buy</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">CryptoExchange</div>
                        <div className="text-xs text-muted-foreground">99.5% completion | 1,245 trades</div>
                      </TableCell>
                      <TableCell>$1.04</TableCell>
                      <TableCell>$200 - $20,000</TableCell>
                      <TableCell>125,000 USDT</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge variant="outline" className="mr-1">Bank Transfer</Badge>
                          <Badge variant="outline" className="mr-1">PayPal</Badge>
                          <Badge variant="outline">Cash</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm">Buy</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="sell" className="m-0">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Advertiser</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Limit</TableHead>
                      <TableHead>Available</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">USDTBuyer</div>
                        <div className="text-xs text-muted-foreground">98.7% completion | 321 trades</div>
                      </TableCell>
                      <TableCell>$0.99</TableCell>
                      <TableCell>$100 - $5,000</TableCell>
                      <TableCell>$25,000</TableCell>
                      <TableCell>
                        <Badge variant="outline">Bank Transfer</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm">Sell</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">StableCoinTrader</div>
                        <div className="text-xs text-muted-foreground">99.1% completion | 456 trades</div>
                      </TableCell>
                      <TableCell>$0.98</TableCell>
                      <TableCell>$50 - $3,000</TableCell>
                      <TableCell>$15,000</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge variant="outline" className="mr-1">PayPal</Badge>
                          <Badge variant="outline">Venmo</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm">Sell</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">CryptoCollector</div>
                        <div className="text-xs text-muted-foreground">97.5% completion | 178 trades</div>
                      </TableCell>
                      <TableCell>$0.97</TableCell>
                      <TableCell>$100 - $2,000</TableCell>
                      <TableCell>$8,000</TableCell>
                      <TableCell>
                        <Badge variant="outline">Cash</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm">Sell</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 p-4 border rounded-md bg-muted/50">
            <h3 className="font-medium mb-2">P2P Trading Tips</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Always check the trader's reputation and completion rate</li>
              <li>• Use the platform's escrow service for all transactions</li>
              <li>• Never share payment details outside the platform</li>
              <li>• Report suspicious activity immediately</li>
              <li>• Complete trades within the specified timeframe</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
