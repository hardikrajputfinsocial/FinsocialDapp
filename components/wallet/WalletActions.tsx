"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// In a real app, these would be actual hooks connecting to your contract
const useContract = () => {
  return {
    contract: {},
    isReady: true
  };
};

const useDeposit = () => {
  return {
    depositBalance: async (userAddress: string, tokenAddress: string, amount: string) => {
      // Mock implementation
      console.log("Depositing", amount, "to", userAddress);
      return new Promise<void>(resolve => setTimeout(resolve, 1000));
    }
  };
};

const useWithdraw = () => {
  return {
    withdrawBalance: async (tokenAddress: string, amount: string) => {
      // Mock implementation
      console.log("Withdrawing", amount);
      return new Promise<void>(resolve => setTimeout(resolve, 1000));
    }
  };
};

const useDeductBalance = () => {
  return {
    deductBalance: async (userAddress: string, tokenAddress: string, amount: string) => {
      // Mock implementation
      console.log("Deducting", amount, "from", userAddress);
      return new Promise<void>(resolve => setTimeout(resolve, 1000));
    }
  };
};

const useGetWalletBalance = () => {
  return {
    getWalletBalance: async (userAddress: string, tokenAddress: string) => {
      // Mock implementation
      console.log("Getting balance for", userAddress);
      return (Math.random() * 10).toFixed(4);
    }
  };
};

export function WalletActions() {
  const { contract, isReady } = useContract();

  const { depositBalance } = useDeposit();
  const { withdrawBalance } = useWithdraw();
  const { deductBalance } = useDeductBalance();
  const { getWalletBalance } = useGetWalletBalance();

  const [userAddress, setUserAddress] = useState<string>("");
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeposit = async () => {
    if (!isReady) {
      toast.error("Contract is not ready yet.");
      return;
    }
    
    if (!userAddress || !tokenAddress || !amount) {
      toast.error("Please fill all fields");
      return;
    }
    
    try {
      setIsLoading(true);
      await depositBalance(userAddress, tokenAddress, amount);
      toast.success("Deposit successful");
    } catch (error) {
      console.error("Deposit error:", error);
      toast.error("Deposit failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!isReady) {
      toast.error("Contract is not ready yet.");
      return;
    }
    
    if (!tokenAddress || !amount) {
      toast.error("Please fill all fields");
      return;
    }
    
    try {
      setIsLoading(true);
      await withdrawBalance(tokenAddress, amount);
      toast.success("Withdrawal successful");
    } catch (error) {
      console.error("Withdrawal error:", error);
      toast.error("Withdrawal failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeduct = async () => {
    if (!isReady) {
      toast.error("Contract is not ready yet.");
      return;
    }
    
    if (!userAddress || !tokenAddress || !amount) {
      toast.error("Please fill all fields");
      return;
    }
    
    try {
      setIsLoading(true);
      await deductBalance(userAddress, tokenAddress, amount);
      toast.success("Balance deducted successfully");
    } catch (error) {
      console.error("Deduction error:", error);
      toast.error("Deduction failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckBalance = async () => {
    if (!isReady) {
      toast.error("Contract is not ready yet.");
      return;
    }
    
    if (!userAddress || !tokenAddress) {
      toast.error("Please provide user and token addresses");
      return;
    }
    
    try {
      setIsLoading(true);
      const bal = await getWalletBalance(userAddress, tokenAddress);
      setBalance(bal.toString());
      toast.success("Balance retrieved");
    } catch (error) {
      console.error("Balance check error:", error);
      toast.error("Failed to check balance");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isReady) {
    return (
      <div className="text-center p-10 text-muted-foreground text-lg">
        Loading contract...
      </div>
    );
  }

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Wallet Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="User Address (0x...)"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Token Address (0x...)"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Amount (in Wei)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {balance !== null && (
          <div className="p-4 bg-muted rounded-md">
            <p className="font-medium">Current Balance: {balance}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleDeposit}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Deposit
          </Button>
          <Button
            onClick={handleWithdraw}
            disabled={isLoading}
            variant="destructive"
          >
            Withdraw
          </Button>
          <Button
            onClick={handleDeduct}
            disabled={isLoading}
            variant="outline"
          >
            Deduct
          </Button>
          <Button
            onClick={handleCheckBalance}
            disabled={isLoading}
            variant="secondary"
          >
            Check Balance
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
