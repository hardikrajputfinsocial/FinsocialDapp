import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TradingViewChart } from '@/components/trading-view-chart';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

export default function OptionsPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Options Trading</h1>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Options</CardTitle>
          <CardDescription>
            Trade cryptocurrency options with flexible strike prices and expiration dates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="btc">
            <TabsList className="mb-6">
              <TabsTrigger value="btc">BTC</TabsTrigger>
              <TabsTrigger value="eth">ETH</TabsTrigger>
              <TabsTrigger value="sol">SOL</TabsTrigger>
              <TabsTrigger value="bnb">BNB</TabsTrigger>
            </TabsList>
            
            <TabsContent value="btc" className="m-0">
              <div className="mb-6">
                <TradingViewChart symbol="BTCUSDT" height={400} />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Market Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Price:</span>
                        <span className="font-medium">$43,256.78</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">24h Change:</span>
                        <span className="font-medium text-green-500">+2.34%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">24h High:</span>
                        <span className="font-medium">$43,890.12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">24h Low:</span>
                        <span className="font-medium">$42,567.89</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">30-Day IV:</span>
                        <span className="font-medium">78.5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Options Chain</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 mb-4">
                      <Select defaultValue="0625">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Expiry Date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0528">May 28, 2025</SelectItem>
                          <SelectItem value="0625">Jun 25, 2025</SelectItem>
                          <SelectItem value="0730">Jul 30, 2025</SelectItem>
                          <SelectItem value="0924">Sep 24, 2025</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Strike Range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Strikes</SelectItem>
                          <SelectItem value="itm">In-the-money</SelectItem>
                          <SelectItem value="atm">Near-the-money</SelectItem>
                          <SelectItem value="otm">Out-of-the-money</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead colSpan={4} className="text-center border-r">Calls</TableHead>
                            <TableHead className="text-center">Strike</TableHead>
                            <TableHead colSpan={4} className="text-center border-l">Puts</TableHead>
                          </TableRow>
                          <TableRow>
                            <TableHead>Last</TableHead>
                            <TableHead>Bid</TableHead>
                            <TableHead>Ask</TableHead>
                            <TableHead className="border-r">IV</TableHead>
                            <TableHead className="text-center">Price</TableHead>
                            <TableHead className="border-l">IV</TableHead>
                            <TableHead>Bid</TableHead>
                            <TableHead>Ask</TableHead>
                            <TableHead>Last</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>$4,250</TableCell>
                            <TableCell>$4,200</TableCell>
                            <TableCell>$4,300</TableCell>
                            <TableCell className="border-r">85%</TableCell>
                            <TableCell className="text-center font-medium">$40,000</TableCell>
                            <TableCell className="border-l">65%</TableCell>
                            <TableCell>$950</TableCell>
                            <TableCell>$1,000</TableCell>
                            <TableCell>$975</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>$3,450</TableCell>
                            <TableCell>$3,400</TableCell>
                            <TableCell>$3,500</TableCell>
                            <TableCell className="border-r">82%</TableCell>
                            <TableCell className="text-center font-medium">$42,000</TableCell>
                            <TableCell className="border-l">70%</TableCell>
                            <TableCell>$1,150</TableCell>
                            <TableCell>$1,200</TableCell>
                            <TableCell>$1,175</TableCell>
                          </TableRow>
                          <TableRow className="bg-muted/30">
                            <TableCell>$2,650</TableCell>
                            <TableCell>$2,600</TableCell>
                            <TableCell>$2,700</TableCell>
                            <TableCell className="border-r">78%</TableCell>
                            <TableCell className="text-center font-medium">$44,000</TableCell>
                            <TableCell className="border-l">76%</TableCell>
                            <TableCell>$1,350</TableCell>
                            <TableCell>$1,400</TableCell>
                            <TableCell>$1,375</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>$1,850</TableCell>
                            <TableCell>$1,800</TableCell>
                            <TableCell>$1,900</TableCell>
                            <TableCell className="border-r">75%</TableCell>
                            <TableCell className="text-center font-medium">$46,000</TableCell>
                            <TableCell className="border-l">80%</TableCell>
                            <TableCell>$1,550</TableCell>
                            <TableCell>$1,600</TableCell>
                            <TableCell>$1,575</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>$1,050</TableCell>
                            <TableCell>$1,000</TableCell>
                            <TableCell>$1,100</TableCell>
                            <TableCell className="border-r">72%</TableCell>
                            <TableCell className="text-center font-medium">$48,000</TableCell>
                            <TableCell className="border-l">85%</TableCell>
                            <TableCell>$1,750</TableCell>
                            <TableCell>$1,800</TableCell>
                            <TableCell>$1,775</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Trade Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Tabs defaultValue="buy">
                        <TabsList className="w-full mb-4">
                          <TabsTrigger value="buy" className="flex-1">Buy</TabsTrigger>
                          <TabsTrigger value="sell" className="flex-1">Sell</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="buy" className="m-0 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Option Type</label>
                              <Select defaultValue="call">
                                <SelectTrigger>
                                  <SelectValue placeholder="Option Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="call">Call</SelectItem>
                                  <SelectItem value="put">Put</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Expiry Date</label>
                              <Select defaultValue="0625">
                                <SelectTrigger>
                                  <SelectValue placeholder="Expiry Date" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="0528">May 28, 2025</SelectItem>
                                  <SelectItem value="0625">Jun 25, 2025</SelectItem>
                                  <SelectItem value="0730">Jul 30, 2025</SelectItem>
                                  <SelectItem value="0924">Sep 24, 2025</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Strike Price</label>
                            <div className="flex items-center gap-2">
                              <Slider defaultValue={[44000]} min={30000} max={60000} step={1000} />
                              <span className="text-sm font-medium">$44,000</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Quantity</label>
                            <Input type="number" placeholder="1" />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Premium</label>
                            <div className="p-3 border rounded-md">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Price per contract:</span>
                                <span className="font-medium">$2,650</span>
                              </div>
                              <div className="flex justify-between mt-1">
                                <span className="text-muted-foreground">Total cost:</span>
                                <span className="font-medium">$2,650</span>
                              </div>
                            </div>
                          </div>
                          
                          <Button className="w-full">Buy Call Option</Button>
                        </TabsContent>
                        
                        <TabsContent value="sell" className="m-0">
                          <div className="text-center py-8 text-muted-foreground">
                            Select the Sell tab to write options
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Options Calculator</h3>
                      
                      <div className="p-4 border rounded-md space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Projected Price at Expiry</label>
                          <div className="flex items-center gap-2">
                            <Slider defaultValue={[45000]} min={30000} max={60000} step={1000} />
                            <span className="text-sm font-medium">$45,000</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Days to Expiry</label>
                          <div className="p-2 border rounded-md text-center font-medium">
                            47 days
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-muted rounded-md">
                            <div className="text-sm text-muted-foreground">Break-even Price</div>
                            <div className="font-medium">$46,650</div>
                          </div>
                          
                          <div className="p-3 bg-muted rounded-md">
                            <div className="text-sm text-muted-foreground">Max Profit</div>
                            <div className="font-medium">Unlimited</div>
                          </div>
                          
                          <div className="p-3 bg-muted rounded-md">
                            <div className="text-sm text-muted-foreground">Max Loss</div>
                            <div className="font-medium">$2,650</div>
                          </div>
                          
                          <div className="p-3 bg-muted rounded-md">
                            <div className="text-sm text-muted-foreground">Profit/Loss</div>
                            <div className="font-medium text-green-500">+$350</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium mb-2">Risk Analysis</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Delta:</span>
                            <span>0.65</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Gamma:</span>
                            <span>0.008</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Theta:</span>
                            <span>-45.32</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Vega:</span>
                            <span>75.5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="eth" className="m-0">
              <div className="text-center py-8 text-muted-foreground">
                Select the ETH tab to view Ethereum options
              </div>
            </TabsContent>
            
            <TabsContent value="sol" className="m-0">
              <div className="text-center py-8 text-muted-foreground">
                Select the SOL tab to view Solana options
              </div>
            </TabsContent>
            
            <TabsContent value="bnb" className="m-0">
              <div className="text-center py-8 text-muted-foreground">
                Select the BNB tab to view BNB options
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
