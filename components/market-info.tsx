import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface MarketInfoProps {
  price: string;
  change: string;
  high: string;
  low: string;
  volume: string;
  additional?: Array<{
    label: string;
    value: string;
  }>;
}

export function MarketInfo({ price, change, high, low, volume, additional }: MarketInfoProps) {
  const isPositive = !change.startsWith('-');
  
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <div className="text-2xl font-bold">${price}</div>
        <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? (
            <ArrowUpIcon className="mr-1 h-4 w-4" />
          ) : (
            <ArrowDownIcon className="mr-1 h-4 w-4" />
          )}
          {change}%
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="text-sm text-muted-foreground">24h High</div>
          <div className="font-medium">${high}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">24h Low</div>
          <div className="font-medium">${low}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">24h Volume</div>
          <div className="font-medium">${volume}</div>
        </div>
      </div>
      
      {additional && additional.length > 0 && (
        <div className="border-t pt-3 mt-3">
          {additional.map((item, index) => (
            <div key={index} className="flex justify-between py-1">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
