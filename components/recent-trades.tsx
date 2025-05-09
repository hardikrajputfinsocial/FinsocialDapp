import React from 'react';

export function RecentTrades() {
  // Mock data for recent trades
  const trades = [
    { id: 1, price: '43,256.78', amount: '0.025', time: '15:42:23', type: 'buy' },
    { id: 2, price: '43,245.65', amount: '0.012', time: '15:42:15', type: 'sell' },
    { id: 3, price: '43,250.12', amount: '0.008', time: '15:42:08', type: 'buy' },
    { id: 4, price: '43,248.90', amount: '0.015', time: '15:41:55', type: 'sell' },
    { id: 5, price: '43,252.34', amount: '0.032', time: '15:41:42', type: 'buy' },
    { id: 6, price: '43,247.56', amount: '0.018', time: '15:41:30', type: 'sell' },
    { id: 7, price: '43,245.12', amount: '0.022', time: '15:41:18', type: 'sell' },
    { id: 8, price: '43,249.87', amount: '0.011', time: '15:41:05', type: 'buy' },
    { id: 9, price: '43,253.45', amount: '0.007', time: '15:40:52', type: 'buy' },
    { id: 10, price: '43,246.23', amount: '0.014', time: '15:40:40', type: 'sell' },
  ];

  return (
    <div className="h-[300px] overflow-auto">
      <div className="grid grid-cols-3 text-xs text-muted-foreground mb-2">
        <div>Price (USDT)</div>
        <div>Amount (BTC)</div>
        <div>Time</div>
      </div>
      <div className="space-y-1">
        {trades.map((trade) => (
          <div key={trade.id} className="grid grid-cols-3 text-sm">
            <div className={trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}>
              {trade.price}
            </div>
            <div>{trade.amount}</div>
            <div className="text-muted-foreground">{trade.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
