import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TradingViewChart } from '@/components/trading-view-chart';

export default function DerivativesPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Derivatives</h1>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Derivatives Trading</CardTitle>
          <CardDescription>
            Trade futures, perpetuals, and other derivative products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="perpetuals">
            <TabsList className="mb-6">
              <TabsTrigger value="perpetuals">Perpetuals</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly Futures</TabsTrigger>
              <TabsTrigger value="options">Options</TabsTrigger>
              <TabsTrigger value="leveraged">Leveraged Tokens</TabsTrigger>
            </TabsList>
            
            <TabsContent value="perpetuals" className="m-0">
              <div className="mb-6">
                <TradingViewChart symbol="BTCUSDT" height={400} />
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contract</TableHead>
                      <TableHead>Last Price</TableHead>
                      <TableHead>24h Change</TableHead>
                      <TableHead>Funding Rate</TableHead>
                      <TableHead>24h Volume</TableHead>
                      <TableHead>Open Interest</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">BTC/USDT</div>
                        <div className="text-xs text-muted-foreground">Bitcoin</div>
                      </TableCell>
                      <TableCell>$43,256.78</TableCell>
                      <TableCell className="text-green-500">+2.34%</TableCell>
                      <TableCell>0.01%</TableCell>
                      <TableCell>$1.2B</TableCell>
                      <TableCell>$2.5B</TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Trade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="trade">Trade</SelectItem>
                            <SelectItem value="chart">Chart</SelectItem>
                            <SelectItem value="details">Details</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">ETH/USDT</div>
                        <div className="text-xs text-muted-foreground">Ethereum</div>
                      </TableCell>
                      <TableCell>$2,845.32</TableCell>
                      <TableCell className="text-green-500">+1.87%</TableCell>
                      <TableCell>0.01%</TableCell>
                      <TableCell>$890M</TableCell>
                      <TableCell>$1.7B</TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Trade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="trade">Trade</SelectItem>
                            <SelectItem value="chart">Chart</SelectItem>
                            <SelectItem value="details">Details</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">SOL/USDT</div>
                        <div className="text-xs text-muted-foreground">Solana</div>
                      </TableCell>
                      <TableCell>$156.78</TableCell>
                      <TableCell className="text-red-500">-0.85%</TableCell>
                      <TableCell>0.01%</TableCell>
                      <TableCell>$345M</TableCell>
                      <TableCell>$780M</TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Trade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="trade">Trade</SelectItem>
                            <SelectItem value="chart">Chart</SelectItem>
                            <SelectItem value="details">Details</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">BNB/USDT</div>
                        <div className="text-xs text-muted-foreground">BNB</div>
                      </TableCell>
                      <TableCell>$578.23</TableCell>
                      <TableCell className="text-green-500">+0.54%</TableCell>
                      <TableCell>0.01%</TableCell>
                      <TableCell>$210M</TableCell>
                      <TableCell>$450M</TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Trade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="trade">Trade</SelectItem>
                            <SelectItem value="chart">Chart</SelectItem>
                            <SelectItem value="details">Details</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="quarterly" className="m-0">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contract</TableHead>
                      <TableHead>Last Price</TableHead>
                      <TableHead>24h Change</TableHead>
                      <TableHead>Mark Price</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead>24h Volume</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">BTC/USDT-0625</div>
                        <div className="text-xs text-muted-foreground">Bitcoin Quarterly</div>
                      </TableCell>
                      <TableCell>$43,456.78</TableCell>
                      <TableCell className="text-green-500">+2.45%</TableCell>
                      <TableCell>$43,256.78</TableCell>
                      <TableCell>Jun 25, 2025</TableCell>
                      <TableCell>$850M</TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Trade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="trade">Trade</SelectItem>
                            <SelectItem value="chart">Chart</SelectItem>
                            <SelectItem value="details">Details</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">ETH/USDT-0625</div>
                        <div className="text-xs text-muted-foreground">Ethereum Quarterly</div>
                      </TableCell>
                      <TableCell>$2,895.32</TableCell>
                      <TableCell className="text-green-500">+2.12%</TableCell>
                      <TableCell>$2,845.32</TableCell>
                      <TableCell>Jun 25, 2025</TableCell>
                      <TableCell>$560M</TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Trade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="trade">Trade</SelectItem>
                            <SelectItem value="chart">Chart</SelectItem>
                            <SelectItem value="details">Details</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="options" className="m-0">
              <div className="text-center py-8 text-muted-foreground">
                Please visit the Options section for detailed options trading
              </div>
            </TabsContent>
            
            <TabsContent value="leveraged" className="m-0">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Token</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>24h Change</TableHead>
                      <TableHead>NAV</TableHead>
                      <TableHead>Leverage</TableHead>
                      <TableHead>24h Volume</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">BTC3L</div>
                        <div className="text-xs text-muted-foreground">3x Long Bitcoin</div>
                      </TableCell>
                      <TableCell>$12.45</TableCell>
                      <TableCell className="text-green-500">+7.12%</TableCell>
                      <TableCell>$12.38</TableCell>
                      <TableCell><Badge>3x Long</Badge></TableCell>
                      <TableCell>$45M</TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Trade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="trade">Trade</SelectItem>
                            <SelectItem value="chart">Chart</SelectItem>
                            <SelectItem value="details">Details</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">BTC3S</div>
                        <div className="text-xs text-muted-foreground">3x Short Bitcoin</div>
                      </TableCell>
                      <TableCell>$8.76</TableCell>
                      <TableCell className="text-red-500">-6.89%</TableCell>
                      <TableCell>$8.72</TableCell>
                      <TableCell><Badge variant="destructive">3x Short</Badge></TableCell>
                      <TableCell>$32M</TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Trade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="trade">Trade</SelectItem>
                            <SelectItem value="chart">Chart</SelectItem>
                            <SelectItem value="details">Details</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
