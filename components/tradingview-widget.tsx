"use client"
import { useEffect, useRef } from "react"

declare global {
  interface Window {
    TradingView?: {
      widget: (options: Record<string, unknown>) => void
    }
  }
}

export default function TradingViewWidget({ symbol }: { symbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadWidget = () => {
      if (window.TradingView && containerRef.current) {
        containerRef.current.innerHTML = ""

        const theme =
          document.documentElement.className === "dark" ? "dark" : "light"

        window.TradingView.widget({
          container_id: "tv-chart",
          symbol: `BINANCE:${symbol}`,
          interval: "30",
          timezone: "Asia/Kolkata",
          theme: theme,
          style: "1",
          locale: "en",
          enable_publishing: false,
          allow_symbol_change: true,
          autosize: true,
        })
      }
    }

    if (!window.TradingView) {
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/tv.js"
      script.async = true
      script.onload = loadWidget
      document.head.appendChild(script)
    } else {
      loadWidget()
    }
  }, [symbol])

  return (
    <div id="tv-chart" ref={containerRef} style={{ height: "500px", width: "100%" }} />
  )
}
