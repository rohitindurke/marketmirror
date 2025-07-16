"use client"
import Link from "next/link"
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
  YAxis,
} from "recharts"
import MobileTopNavbar from "@/components/MobileTopNavbar"
import MobileBottomNavbar from "@/components/MobileBottomNavbar"

const coins = [
  "BTC", "ETH", "BNB", "SOL",
  "XRP", "DOGE", "ADA", "DOT",
  "AVAX", "LINK", "DOT", "TAO",
]

export default function Page() {
  const [prices, setPrices] = useState<{ [key: string]: number }>({})
  const [prevPrices, setPrevPrices] = useState<{ [key: string]: number }>({})
  const [chartData, setChartData] = useState<{ [key: string]: any[] }>({})

  // Fetch 12-hour line data (5-min interval)
  const fetchChartData = async (symbol: string) => {
    try {
      const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=5m&limit=144`)
      const data = await res.json()
      return data.map((d: any) => ({
        time: new Date(d[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        value: parseFloat(d[4]), // close price
      }))
    } catch (error) {
      console.error(`Error fetching 12hr chart for ${symbol}`, error)
      return []
    }
  }

  // Main useEffect to fetch prices & charts
  useEffect(() => {
    const fetchPricesAndCharts = async () => {
      try {
        const res = await fetch("https://api.binance.com/api/v3/ticker/price")
        const allData = await res.json()

        const updatedPrices: { [key: string]: number } = {}
        const updatedCharts: { [key: string]: any[] } = {}

        await Promise.all(coins.map(async (coin) => {
          const symbol = `${coin}USDT`
          const found = allData.find((item: any) => item.symbol === symbol)
          if (found) {
            updatedPrices[symbol] = parseFloat(found.price)
          }

          const chart = await fetchChartData(symbol)
          updatedCharts[symbol] = chart
        }))

        setPrevPrices(prices)
        setPrices(updatedPrices)
        setChartData(updatedCharts)
      } catch (err) {
        console.error("Error fetching price or chart data", err)
      }
    }

    fetchPricesAndCharts()
    const interval = setInterval(fetchPricesAndCharts, 3000)
    return () => clearInterval(interval)
  }, [prices])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
      <MobileTopNavbar />
      <div className="pt-16 pb-20 px-4">
        <div className="flex flex-1 flex-col gap-4 p-4">
          {
          coins.map((coin, index) => {
            const symbol = `${coin}USDT`
            const price = prices[symbol]
            const prev = prevPrices[symbol]
            const chart = chartData[symbol] || []

            const isUp = price > prev
            const isDown = price < prev

            return (
              <div
                key={index}
                className="flex items-center justify-between bg-muted/100 p-4 rounded-lg shadow-sm"
              >
                {/* Coin name */}
                <Link href={`crypto/${symbol}`}>
                  <div className="text-base font-medium hover:underline cursor-pointer">
                    {coin}/USDT
                      </div>
                </Link>
                {/* Line Graph */}
                <div className="w-32 h-10">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chart} margin={{ top: 5, bottom: 5 }}>
                    <YAxis domain={["auto", "auto"]} hide />
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

                {/* Live price & arrow */}
                <div
                  className={`text-sm font-semibold flex items-center gap-1 transition-all duration-500 ${
                    isUp ? "text-green-500" : isDown ? "text-red-500" : "text-muted-foreground"
                  }`}
                >
                  {price ? `$${price.toFixed(2)}` : "Loading..."}
                  {isUp && <span>🔺</span>}
                  {isDown && <span>🔻</span>}
                </div>
              </div>
            )
          })}
        </div>
        </div>
        <MobileBottomNavbar />
      </SidebarInset>
    </SidebarProvider>
  )
}
