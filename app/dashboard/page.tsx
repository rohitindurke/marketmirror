"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

const coins = [
  "BTC", "ETH", "BNB", "SOL",
  "XRP", "DOGE", "ADA", "DOT",
  "AVAX", "LINK", "MATIC", "LTC",
]

export default function Page() {
  const [prices, setPrices] = useState<{ [key: string]: number }>({})
  const [prevPrices, setPrevPrices] = useState<{ [key: string]: number }>({})
  const [chartData, setChartData] = useState<{ [key: string]: any[] }>({})

  // Fetch 1-minute candlestick data for a symbol
  const fetchChartData = async (symbol: string) => {
    try {
      const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1m&limit=10`)
      const data = await res.json()
      return data.map((d: any) => ({
        name: new Date(d[0]).toLocaleTimeString(),
        value: parseFloat(d[4]), // close price
      }))
    } catch (error) {
      console.error(`Error fetching chart for ${symbol}`, error)
      return []
    }
  }

  useEffect(() => {
    const fetchPricesAndCharts = async () => {
      try {
        const response = await fetch("https://api.binance.com/api/v3/ticker/price")
        const allData = await response.json()

        const updatedPrices: { [key: string]: number } = {}
        const updatedCharts: { [key: string]: any[] } = {}

        await Promise.all(coins.map(async (coin) => {
          const symbol = `${coin}USDT`
          const priceData = allData.find((item: any) => item.symbol === symbol)
          if (priceData) {
            updatedPrices[symbol] = parseFloat(priceData.price)
          }

          const chart = await fetchChartData(symbol)
          updatedCharts[symbol] = chart
        }))

        setPrevPrices(prices)
        setPrices(updatedPrices)
        setChartData(updatedCharts)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchPricesAndCharts()
    const interval = setInterval(fetchPricesAndCharts, 3000) // Every 3 seconds

    return () => clearInterval(interval)
  }, [prices])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {coins.map((coin, index) => {
            const symbol = `${coin}USDT`
            const price = prices[symbol]
            const prevPrice = prevPrices[symbol]
            const chart = chartData[symbol]

            const isUp = price > prevPrice
            const isDown = price < prevPrice

            return (
              <div
                key={index}
                className="flex items-center justify-between bg-muted/100 p-4 rounded-lg shadow-sm"
              >
                {/* Coin Name */}
                <div className="text-base font-medium">{coin}/USDT</div>

                {/* Real Mini Graph */}
                <div className="w-32 h-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chart || []}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#4ade80"
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                      <Tooltip
                        wrapperStyle={{ fontSize: 10 }}
                        contentStyle={{ backgroundColor: "#1a1a1a", border: "none" }}
                        labelStyle={{ color: "#aaa" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Price + Arrow */}
                <div
                  className={`text-sm font-semibold flex items-center gap-1 transition-all duration-500 ${
                    isUp ? "text-green-500" : isDown ? "text-red-500" : "text-muted-foreground"
                  }`}
                >
                  ${price?.toFixed(2) ?? "Loading..."}
                  {isUp && <span>🔺</span>}
                  {isDown && <span>🔻</span>}
                </div>
              </div>
            )
          })}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
