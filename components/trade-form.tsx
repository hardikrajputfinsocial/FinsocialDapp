import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface TradeFormProps {
  type?: 'limit' | 'market' | 'stop' | 'futures' | 'futures-market' | 'futures-conditional' | 'margin' | 'margin-market' | 'margin-stop';
}

export function TradeForm({ type = 'limit' }: TradeFormProps) {
  const isBuyForm = true; // This would be controlled by state in a real app
  
  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Button 
          variant={isBuyForm ? "default" : "outline"} 
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          <ArrowUpIcon className="mr-2 h-4 w-4" />
          Buy
        </Button>
        <Button 
          variant={!isBuyForm ? "default" : "outline"} 
          className="flex-1 bg-red-600 hover:bg-red-700"
        >
          <ArrowDownIcon className="mr-2 h-4 w-4" />
          Sell
        </Button>
      </div>

      <div className="space-y-3">
        {(type === 'limit' || type === 'futures' || type === 'margin') && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Price</label>
            <div className="relative">
              <Input type="number" placeholder="0.00" />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-muted-foreground">
                USDT
              </div>
            </div>
          </div>
        )}

        {(type === 'stop' || type === 'futures-conditional' || type === 'margin-stop') && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Trigger Price</label>
            <div className="relative">
              <Input type="number" placeholder="0.00" />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-muted-foreground">
                USDT
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <div className="relative">
            <Input type="number" placeholder="0.00" />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-muted-foreground">
              BTC
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <button className="hover:text-primary">25%</button>
            <button className="hover:text-primary">50%</button>
            <button className="hover:text-primary">75%</button>
            <button className="hover:text-primary">100%</button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Total</label>
          <div className="relative">
            <Input type="number" placeholder="0.00" readOnly />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-muted-foreground">
              USDT
            </div>
          </div>
        </div>

        {type.includes('futures') && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Margin</span>
              <span>0.00 USDT</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fees</span>
              <span>0.00 USDT</span>
            </div>
          </div>
        )}

        <Button className={`w-full ${isBuyForm ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}>
          {isBuyForm ? 'Buy' : 'Sell'} BTC
        </Button>
      </div>
    </div>
  );
}
