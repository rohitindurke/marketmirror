"use client"

import { useParams } from "next/navigation"
import dynamic from "next/dynamic"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import MobileTopNavbar from "@/components/MobileTopNavbar"
import MobileBottomNavbar from "@/components/MobileBottomNavbar"



const TradingViewWidget = dynamic(() => import("@/components/tradingview-widget"), { ssr: false })

export default function CoinPage() {
  const { symbol } = useParams()
  const coinSymbol = (symbol as string).toUpperCase()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
      <MobileTopNavbar />

        <div className="pt-16 pb-20 px-4">
          <h1 className="text-2xl font-bold mb-4">{coinSymbol} Chart</h1>
          <TradingViewWidget symbol={coinSymbol} />
          <div className="flex flex-1 flex-col gap-4 p-4" style={{fontSize:'30px'}}>
            Also check related crypto's
          </div>
          
          <div className="flex flex-1 flex-col gap-4 p-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
            />
          ))}
        </div>
        </div>
        <MobileBottomNavbar />
      </SidebarInset>
    </SidebarProvider>
  )
}
