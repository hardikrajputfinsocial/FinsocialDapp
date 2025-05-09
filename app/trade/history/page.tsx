import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, DownloadIcon, FilterIcon } from "lucide-react";

export default function TradeHistoryPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Trade History</h1>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Your Trading History</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="spot">Spot</TabsTrigger>
              <TabsTrigger value="margin">Margin</TabsTrigger>
              <TabsTrigger value="futures">Futures</TabsTrigger>
              <TabsTrigger value="convert">Convert</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <Select defaultValue="7d">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24 hours</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <FilterIcon className="h-4 w-4 text-muted-foreground" />
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select pair" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All pairs</SelectItem>
                    <SelectItem value="btcusdt">BTC/USDT</SelectItem>
                    <SelectItem value="ethusdt">ETH/USDT</SelectItem>
                    <SelectItem value="solusdt">SOL/USDT</SelectItem>
                    <SelectItem value="bnbusdt">BNB/USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Input placeholder="Search by Order ID or Pair" />
              </div>
              
              <Button variant="outline" size="icon">
                <DownloadIcon className="h-4 w-4" />
              </Button>
            </div>
            
            <TabsContent value="all" className="m-0">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Pair</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Side</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>May 9, 2025 14:32</TableCell>
                      <TableCell>BTC/USDT</TableCell>
                      <TableCell>Spot</TableCell>
                      <TableCell className="text-green-500">Buy</TableCell>
                      <TableCell>$43,256.78</TableCell>
                      <TableCell>0.05 BTC</TableCell>
                      <TableCell>$2,162.84</TableCell>
                      <TableCell><Badge variant="outline">Completed</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>May 8, 2025 10:15</TableCell>
                      <TableCell>ETH/USDT</TableCell>
                      <TableCell>Margin</TableCell>
                      <TableCell className="text-red-500">Sell</TableCell>
                      <TableCell>$2,845.32</TableCell>
                      <TableCell>1.2 ETH</TableCell>
                      <TableCell>$3,414.38</TableCell>
                      <TableCell><Badge variant="outline">Completed</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>May 7, 2025 22:45</TableCell>
                      <TableCell>SOL/USDT</TableCell>
                      <TableCell>Futures</TableCell>
                      <TableCell className="text-green-500">Buy</TableCell>
                      <TableCell>$156.78</TableCell>
                      <TableCell>25 SOL</TableCell>
                      <TableCell>$3,919.50</TableCell>
                      <TableCell><Badge variant="outline">Completed</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>May 7, 2025 16:20</TableCell>
                      <TableCell>BTC/USDT</TableCell>
                      <TableCell>Spot</TableCell>
                      <TableCell className="text-red-500">Sell</TableCell>
                      <TableCell>$43,125.45</TableCell>
                      <TableCell>0.1 BTC</TableCell>
                      <TableCell>$4,312.55</TableCell>
                      <TableCell><Badge variant="outline">Completed</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>May 6, 2025 09:12</TableCell>
                      <TableCell>BNB/USDT</TableCell>
                      <TableCell>Convert</TableCell>
                      <TableCell className="text-green-500">Buy</TableCell>
                      <TableCell>$578.23</TableCell>
                      <TableCell>10 BNB</TableCell>
                      <TableCell>$5,782.30</TableCell>
                      <TableCell><Badge variant="outline">Completed</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing 5 of 124 entries
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="spot" className="m-0">
              {/* Similar table structure for spot trades */}
              <div className="text-center py-8 text-muted-foreground">
                Select the Spot tab to view your spot trading history
              </div>
            </TabsContent>
            
            <TabsContent value="margin" className="m-0">
              {/* Similar table structure for margin trades */}
              <div className="text-center py-8 text-muted-foreground">
                Select the Margin tab to view your margin trading history
              </div>
            </TabsContent>
            
            <TabsContent value="futures" className="m-0">
              {/* Similar table structure for futures trades */}
              <div className="text-center py-8 text-muted-foreground">
                Select the Futures tab to view your futures trading history
              </div>
            </TabsContent>
            
            <TabsContent value="convert" className="m-0">
              {/* Similar table structure for conversions */}
              <div className="text-center py-8 text-muted-foreground">
                Select the Convert tab to view your conversion history
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
