"use client"

import { useState } from "react"
import { Info } from "lucide-react"

export function DarkOrderForm({ pair }: { pair: string }) {
  const [base, quote] = pair.split("/")
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy")
  const [orderType, setOrderType] = useState<"limit" | "market" | "stop">("limit")
  const [price, setPrice] = useState("68245.32")
  const [amount, setAmount] = useState("")
  const [sliderValue, setSliderValue] = useState(0)
  const [tpSlEnabled, setTpSlEnabled] = useState(false)

  return (
    <div className="bg-[#0a0e17] text-white rounded-lg p-4">
      <h3 className="text-lg font-medium mb-4">Order Form</h3>

      {/* Buy/Sell Tabs */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          className={`py-2 rounded-md font-medium ${
            activeTab === "buy" ? "bg-green-500 text-white" : "bg-[#1a1f2e] text-gray-400"
          }`}
          onClick={() => setActiveTab("buy")}
        >
          Buy
        </button>
        <button
          className={`py-2 rounded-md font-medium ${
            activeTab === "sell" ? "bg-red-500 text-white" : "bg-[#1a1f2e] text-gray-400"
          }`}
          onClick={() => setActiveTab("sell")}
        >
          Sell
        </button>
      </div>

      {/* Order Type */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-1 rounded-md text-sm ${
            orderType === "limit" ? "bg-blue-500 text-white" : "bg-[#1a1f2e] text-gray-400"
          }`}
          onClick={() => setOrderType("limit")}
        >
          Limit
        </button>
        <button
          className={`px-4 py-1 rounded-md text-sm ${
            orderType === "market" ? "bg-blue-500 text-white" : "bg-[#1a1f2e] text-gray-400"
          }`}
          onClick={() => setOrderType("market")}
        >
          Market
        </button>
        <button
          className={`px-4 py-1 rounded-md text-sm ${
            orderType === "stop" ? "bg-blue-500 text-white" : "bg-[#1a1f2e] text-gray-400"
          }`}
          onClick={() => setOrderType("stop")}
        >
          Stop
        </button>
      </div>

      {/* Price */}
      {orderType !== "market" && (
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <label className="text-sm">Price</label>
            <span className="text-sm text-gray-400">{quote}</span>
          </div>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-[#1a1f2e] border border-[#2a2f3e] rounded-md p-2 text-white"
          />
        </div>
      )}

      {/* Amount */}
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <label className="text-sm">Amount</label>
          <span className="text-sm text-gray-400">{base}</span>
        </div>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-[#1a1f2e] border border-[#2a2f3e] rounded-md p-2 text-white"
        />
      </div>

      {/* Total */}
      <div className="mb-4">
        <label className="text-sm block mb-1">Total</label>
        <div className="h-1 bg-[#1a1f2e] rounded-full mb-1">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${sliderValue}%` }}></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Available Balance */}
      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
        <span>Available: 12,345.67 {quote}</span>
        <span className="flex items-center">
          <Info className="h-3 w-3 mr-1" />
          Fee: 0.1%
        </span>
      </div>

      {/* TP/SL Checkbox - Added right before the Buy/Sell button */}
      <div className="flex items-center gap-2 mb-4 p-2 bg-[#1a1f2e] rounded-md border border-[#2a2f3e]">
        <input
          type="checkbox"
          id="tpsl"
          checked={tpSlEnabled}
          onChange={(e) => setTpSlEnabled(e.target.checked)}
          className="h-5 w-5 rounded border-gray-700 accent-blue-500"
        />
        <label htmlFor="tpsl" className="text-sm font-medium">
          TP/SL
        </label>
      </div>

      {/* TP/SL Panel */}
      {tpSlEnabled && (
        <div className="space-y-4 mb-4 bg-[#1a1f2e]/50 p-3 rounded-md border border-[#2a2f3e]">
          <div>
            <p className="text-sm mb-2">Take Profit</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="TP Limit"
                  className="w-full bg-[#1a1f2e] border border-[#2a2f3e] rounded-md p-2 text-white text-sm"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Offset"
                  className="w-full bg-[#1a1f2e] border border-[#2a2f3e] rounded-md p-2 text-white text-sm pr-8"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <span className="text-xs text-gray-400">%</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1 text-gray-400"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm mb-2">Stop Loss</p>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="SL Trigger"
                  className="w-full bg-[#1a1f2e] border border-[#2a2f3e] rounded-md p-2 text-white text-sm"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Offset"
                  className="w-full bg-[#1a1f2e] border border-[#2a2f3e] rounded-md p-2 text-white text-sm pr-8"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <span className="text-xs text-gray-400">%</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1 text-gray-400"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="SL Market"
                  className="w-full bg-[#1a1f2e] border border-[#2a2f3e] rounded-md p-2 text-white text-sm"
                />
              </div>
              <button className="bg-[#1a1f2e] border border-[#2a2f3e] rounded-md p-2 text-white text-sm">Market</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
            <div>Avbl</div>
            <div className="text-right">- USDT</div>
            <div>Max Buy</div>
            <div className="text-right">-- BTC</div>
          </div>
        </div>
      )}

      {/* Buy/Sell Button */}
      <button
        className={`w-full py-2 rounded-md font-medium ${
          activeTab === "buy" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
        } text-white`}
      >
        {activeTab === "buy" ? `Buy ${base}` : `Sell ${base}`}
      </button>
    </div>
  )
}
