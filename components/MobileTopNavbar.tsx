"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"

export default function MobileTopNavbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-background/60 border-b border-border md:hidden">
      <div className="flex items-center justify-between px-4 h-14">
        <SidebarTrigger />
        <h1 className="text-lg font-bold text-primary text-center flex-1">MarketMirror</h1>
        <div className="w-7" /> {/* Keeps balance if SidebarTrigger is on the left */}
      </div>
    </header>
  )
}
