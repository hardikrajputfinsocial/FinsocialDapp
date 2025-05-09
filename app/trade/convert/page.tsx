"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownIcon, RefreshCwIcon, Wallet } from "lucide-react";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import { toast } from "sonner";

export default function ConvertPage() {
  const { isConnected, balances, isLoading, fetchBalances, getExchangeRate, calculateConversion } = useWalletBalance();
  const [fromCoin, setFromCoin] = useState<string>("btc");
  const [toCoin, setToCoin] = useState<string>("eth");
  const [amount, setAmount] = useState<string>("");
  const [convertedAmount, setConvertedAmount] = useState<string>("");
  
  // Refresh balances
  const handleRefreshBalance = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    fetchBalances(localStorage.getItem("walletAddress") || "");
    toast.success("Balances refreshed");
  };
  
  // Update exchange rate and converted amount when inputs change
  useEffect(() => {
    if (amount && !isNaN(parseFloat(amount))) {
      const converted = calculateConversion(fromCoin, toCoin, parseFloat(amount));
      setConvertedAmount(converted.toFixed(6));
    } else {
      setConvertedAmount("");
    }
  }, [fromCoin, toCoin, amount, calculateConversion]);
  
  // Handle from coin change
  const handleFromCoinChange = (value: string) => {
    setFromCoin(value);
    // Reset amount if changing coin
    setAmount("");
    setConvertedAmount("");
  };
  
  // Handle to coin change
  const handleToCoinChange = (value: string) => {
    setToCoin(value);
    // Recalculate converted amount
    if (amount && !isNaN(parseFloat(amount))) {
      const converted = calculateConversion(fromCoin, value, parseFloat(amount));
      setConvertedAmount(converted.toFixed(6));
    }
  };
  
  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    
    if (value && !isNaN(parseFloat(value))) {
      const converted = calculateConversion(fromCoin, toCoin, parseFloat(value));
      setConvertedAmount(converted.toFixed(6));
    } else {
      setConvertedAmount("");
    }
  };
  
  // Handle conversion
  const handleConvert = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    const availableBalance = parseFloat(balances[fromCoin]);
    if (parseFloat(amount) > availableBalance) {
      toast.error(`Insufficient ${fromCoin.toUpperCase()} balance`);
      return;
    }
    
    // In a real app, this would call a smart contract or API
    toast.success(`Successfully converted ${amount} ${fromCoin.toUpperCase()} to ${convertedAmount} ${toCoin.toUpperCase()}`);
  };
  
  // Get coin name for display
  const getCoinName = (coin: string): string => {
    const names: {[key: string]: string} = {
      btc: "Bitcoin",
      eth: "Ethereum",
      usdt: "Tether",
      usdc: "USD Coin",
      bnb: "BNB",
      sol: "Solana"
    };
    return names[coin] || coin.toUpperCase();
  };
  
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Convert</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Convert Crypto</CardTitle>
          <CardDescription>
            Instantly convert between cryptocurrencies with zero fees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From</label>
                  <div className="flex gap-2">
                    <Select value={fromCoin} onValueChange={handleFromCoinChange}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select coin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                        <SelectItem value="usdt">Tether (USDT)</SelectItem>
                        <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                        <SelectItem value="bnb">BNB</SelectItem>
                        <SelectItem value="sol">Solana (SOL)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      className="flex-1" 
                      value={amount}
                      onChange={handleAmountChange}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {isConnected ? (
                        <span>Available: {balances[fromCoin]} {fromCoin.toUpperCase()}</span>
                      ) : (
                        <span className="flex items-center">
                          <Wallet className="h-3 w-3 mr-1" /> Connect wallet to see balance
                        </span>
                      )}
                    </div>
                    {isConnected && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 px-2 text-xs" 
                        onClick={handleRefreshBalance}
                        disabled={isLoading}
                      >
                        <RefreshCwIcon className="h-3 w-3 mr-1" />
                        Refresh
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowDownIcon className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <div className="flex gap-2">
                    <Select value={toCoin} onValueChange={handleToCoinChange}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select coin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                        <SelectItem value="usdt">Tether (USDT)</SelectItem>
                        <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                        <SelectItem value="bnb">BNB</SelectItem>
                        <SelectItem value="sol">Solana (SOL)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      className="flex-1" 
                      value={convertedAmount}
                      readOnly 
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {isConnected && (
                      <span>Balance: {balances[toCoin]} {toCoin.toUpperCase()}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-3 rounded-md">
                <div className="flex justify-between text-sm">
                  <span>Exchange Rate</span>
                  <div className="flex items-center gap-1">
                    <span>1 {fromCoin.toUpperCase()} ≈ {getExchangeRate(fromCoin, toCoin).toFixed(6)} {toCoin.toUpperCase()}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4"
                      onClick={handleRefreshBalance}
                      disabled={isLoading}
                    >
                      <RefreshCwIcon className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={handleConvert}
              disabled={!isConnected || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0}
            >
              {isConnected ? 'Convert Now' : 'Connect Wallet to Convert'}
            </Button>
            
            <div className="text-sm text-muted-foreground">
              <p>Zero fees. Conversion is based on current market rates.</p>
              <p>Minimum conversion amount: 0.0001 {fromCoin.toUpperCase()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
