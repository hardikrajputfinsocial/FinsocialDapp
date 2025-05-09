"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, RefreshCw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import { ethers } from "ethers";

interface ConnectWalletProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function ConnectWallet({ 
  variant = "outline", 
  size = "default",
  className = "" 
}: ConnectWalletProps) {
  const [address, setAddress] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [showAddressInput, setShowAddressInput] = useState<boolean>(false);
  
  // Use our wallet balance hook
  const { 
    isConnected, 
    walletAddress, 
    balances, 
    isLoading, 
    fetchBalances 
  } = useWalletBalance();

  // Check if MetaMask is available
  const isMetaMaskAvailable = typeof window !== 'undefined' && window.ethereum;

  // Update local address state when wallet hook address changes
  useEffect(() => {
    if (walletAddress) {
      setAddress(walletAddress);
    }
  }, [walletAddress]);

  const connectMetaMask = async () => {
    if (!isMetaMaskAvailable) {
      toast.error("MetaMask is not installed");
      setShowAddressInput(true);
      return;
    }

    try {
      setIsConnecting(true);
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];
      
      setAddress(userAddress);
      localStorage.setItem("walletAddress", userAddress);
      localStorage.setItem("walletType", "metamask");
      
      // Fetch real balances
      await fetchBalances(userAddress);
      
      toast.success("Wallet connected successfully");
      setDialogOpen(false);
    } catch (error) {
      console.error("Error connecting to MetaMask", error);
      toast.error("Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const connectManually = () => {
    if (!address || !address.startsWith("0x") || address.length !== 42) {
      toast.error("Please enter a valid Ethereum address");
      return;
    }

    localStorage.setItem("walletAddress", address);
    localStorage.setItem("walletType", "manual");
    
    // Fetch real balances
    fetchBalances(address);
    
    toast.success("Wallet connected successfully");
    setDialogOpen(false);
  };

  const disconnectWallet = () => {
    setAddress("");
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("walletType");
    toast.info("Wallet disconnected");
    
    // Force page reload to reset all wallet state
    window.location.reload();
  };

  const refreshBalance = () => {
    if (!isConnected || !address) {
      toast.error("No wallet connected");
      return;
    }
    
    fetchBalances(address);
    toast.success("Refreshing wallet balances");
  };

  const formatAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  // Wallet button for the header
  if (isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size} className={className}>
            <Wallet className="mr-2 h-4 w-4" />
            {formatAddress(address)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="p-2 font-medium text-sm">
            <div className="mb-2 font-semibold">Wallet Balances</div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span>ETH:</span>
                <span>{parseFloat(balances.eth).toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>BTC:</span>
                <span>{parseFloat(balances.btc).toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>USDT:</span>
                <span>{parseFloat(balances.usdt).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>USDC:</span>
                <span>{parseFloat(balances.usdc).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <DropdownMenuItem onClick={refreshBalance} disabled={isLoading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            {isLoading ? "Refreshing..." : "Refresh Balances"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={disconnectWallet}>
            Disconnect Wallet
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <Button 
            onClick={connectMetaMask} 
            disabled={isConnecting}
            className="w-full"
          >
            {isConnecting ? "Connecting..." : "Connect with MetaMask"}
          </Button>
          
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 flex-shrink text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <div className="space-y-2">
            <Input
              placeholder="Enter wallet address (0x...)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button 
              onClick={connectManually} 
              variant="outline" 
              className="w-full"
            >
              Connect Manually
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
