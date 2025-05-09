"use client";

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ethers } from 'ethers';

// Add type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Define a type for coin balances
type CoinBalances = {
  [key: string]: string;
};

// Token contract addresses on Ethereum mainnet
const TOKEN_ADDRESSES: { [key: string]: string } = {
  eth: 'native', // ETH is the native token
  usdt: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // Tether USD
  usdc: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USD Coin
  bnb: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52', // BNB on Ethereum
  sol: '0xD31a59c85aE9D8edEFeC411D448f90841571b89c', // Wrapped SOL on Ethereum
  btc: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'  // Wrapped BTC
};

// Hardcoded token decimals to avoid contract calls
const TOKEN_DECIMALS: { [key: string]: number } = {
  eth: 18,
  usdt: 6,
  usdc: 6,
  bnb: 18,
  sol: 9,
  btc: 8
};

// ABI for ERC20 token balanceOf function
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)'
];

// Exchange rates for demo purposes
const EXCHANGE_RATES: { [key: string]: { [key: string]: number } } = {
  btc: { eth: 15.23, usdt: 43250.78, usdc: 43245.65, bnb: 112.45, sol: 276.89 },
  eth: { btc: 0.0656, usdt: 2845.32, usdc: 2843.21, bnb: 7.38, sol: 18.21 },
  usdt: { btc: 0.000023, eth: 0.00035, usdc: 0.9998, bnb: 0.0026, sol: 0.0064 },
  usdc: { btc: 0.000023, eth: 0.00035, usdt: 1.0002, bnb: 0.0026, sol: 0.0064 },
  bnb: { btc: 0.0089, eth: 0.1355, usdt: 385.45, usdc: 385.12, sol: 2.47 },
  sol: { btc: 0.0036, eth: 0.0549, usdt: 156.23, usdc: 156.08, bnb: 0.405 }
};

export function useWalletBalance() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [balances, setBalances] = useState<CoinBalances>({
    btc: '0',
    eth: '0',
    usdt: '0',
    usdc: '0',
    bnb: '0',
    sol: '0'
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check if wallet is connected on mount
  useEffect(() => {
    const checkWalletConnection = () => {
      const savedAddress = localStorage.getItem('walletAddress');
      if (savedAddress) {
        setWalletAddress(savedAddress);
        setIsConnected(true);
        fetchBalances(savedAddress);
      }
    };

    checkWalletConnection();
  }, []);

  // Function to get a provider
  const getProvider = () => {
    // Check if MetaMask is available
    if (typeof window !== 'undefined' && window.ethereum) {
      return new ethers.providers.Web3Provider(window.ethereum);
    }
    
    // Fallback to Infura or other public provider
    return new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
  };

  // Format balance with proper decimals
  const formatBalance = (balance: ethers.BigNumber, decimals: number): string => {
    return ethers.utils.formatUnits(balance, decimals);
  };

  // Generate consistent mock balances based on wallet address
  const generateMockBalances = (address: string): CoinBalances => {
    // Use the wallet address to generate deterministic balances
    // This ensures the same address always shows the same balances
    const addressSum = address
      .toLowerCase()
      .split('')
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    
    const seed = addressSum / 1000;
    
    return {
      btc: (0.001 + (seed * 0.025) % 0.1).toFixed(4),
      eth: (0.1 + (seed * 0.5) % 2).toFixed(4),
      usdt: (100 + (seed * 50) % 500).toFixed(2),
      usdc: (100 + (seed * 45) % 500).toFixed(2),
      bnb: (0.5 + (seed * 0.75) % 5).toFixed(3),
      sol: (2 + (seed * 1.5) % 10).toFixed(2)
    };
  };
  
  // Fetch wallet balances - only fetch real ETH balance and use mock data for other tokens
  const fetchBalances = async (address: string) => {
    if (!address) return;
    
    setIsLoading(true);
    try {
      // Generate mock balances first as a base
      const mockBalances = generateMockBalances(address);
      let newBalances: CoinBalances = { ...mockBalances };
      
      // Only try to get real ETH balance from the blockchain
      try {
        const provider = getProvider();
        const ethBalance = await provider.getBalance(address);
        newBalances.eth = formatBalance(ethBalance, TOKEN_DECIMALS.eth);
        console.log('Successfully fetched real ETH balance:', newBalances.eth);
      } catch (err) {
        console.error('Error fetching ETH balance:', err);
        // Keep the mock ETH balance if there's an error
      }
      
      setBalances(newBalances);
      toast.success('Wallet balances updated');
    } catch (error) {
      console.error('Error in fetchBalances:', error);
      toast.error('Failed to fetch wallet balances');
      
      // Fall back to mock data if there's a critical error
      const mockBalances = generateMockBalances(address);
      setBalances(mockBalances);
    } finally {
      setIsLoading(false);
    }
  };

  // Get exchange rate between two coins
  const getExchangeRate = (fromCoin: string, toCoin: string): number => {
    if (fromCoin === toCoin) return 1;
    return EXCHANGE_RATES[fromCoin]?.[toCoin] || 0;
  };

  // Calculate conversion amount
  const calculateConversion = (fromCoin: string, toCoin: string, amount: number): number => {
    const rate = getExchangeRate(fromCoin, toCoin);
    return amount * rate;
  };

  return {
    isConnected,
    walletAddress,
    balances,
    isLoading,
    fetchBalances,
    getExchangeRate,
    calculateConversion
  };
}
