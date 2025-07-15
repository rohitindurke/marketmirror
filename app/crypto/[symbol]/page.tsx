"use client"

import { useParams } from "next/navigation"
import dynamic from "next/dynamic"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

const TradingViewWidget = dynamic(() => import("@/components/tradingview-widget"), { ssr: false })

export default function CoinPage() {
  const { symbol } = useParams()
  const coinSymbol = (symbol as string).toUpperCase()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">{coinSymbol} Chart</h1>
          <TradingViewWidget symbol={coinSymbol} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
