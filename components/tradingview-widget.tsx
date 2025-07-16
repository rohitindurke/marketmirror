"use client"
import { useEffect, useRef } from "react"

// --- Typings for TradingView ---
interface TradingViewWidgetOptions {
  container_id: string
  symbol: string
  interval: string
  timezone: string
  theme: string
  style: string
  locale: string
  enable_publishing: boolean
  allow_symbol_change: boolean
  autosize: boolean
}

interface TradingViewGlobal {
  widget: (options: TradingViewWidgetOptions) => void
}

declare global {
  interface Window {
    TradingView: TradingViewGlobal
  }
}

// --- Component ---
export default function TradingViewWidget({ symbol }: { symbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/tv.js"
    script.async = true

    script.onload = () => {
      if (window.TradingView) {
        window.TradingView.widget({
          container_id: "tv-chart",
          symbol: `BINANCE:${symbol}`,
          interval: "30",
          timezone: "Asia/Kolkata",
          theme: "dark",
          style: "1",
          locale: "en",
          enable_publishing: false,
          allow_symbol_change: true,
          autosize: true,
        })
      }
    }
    

    if (containerRef.current) {
      containerRef.current.innerHTML = ""
      containerRef.current.appendChild(script)
    }
  }, [symbol])

  return (
    <div id="tv-chart" ref={containerRef} style={{ height: "500px", width: "100%" }} />
  )
}
