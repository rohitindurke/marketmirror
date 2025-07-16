"use client"

import { Home, Coins, LineChart, User,Calendar } from "lucide-react"

export default function MobileBottomNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background backdrop-blur border-t shadow md:hidden flex items-center justify-around h-14 px-4">
      <a href="/" className="flex flex-col items-center text-xs">
        <Home className="w-5 h-5" />
        Home
      </a>
      <a href="/crypto" className="flex flex-col items-center text-xs">
        <Coins className="w-5 h-5" />
        Crypto
      </a>
      <a href="/indian" className="flex flex-col items-center text-xs">
        <LineChart className="w-5 h-5" />
        Indian
      </a>
      <a href="/mutual-fund" className="flex flex-col items-center text-xs">
        <Calendar className="w-5 h-5" />
        Mutual fund
      </a>
      <a href="/user" className="flex flex-col items-center text-xs">
        <User className="w-5 h-5" />
        Profile
      </a>
      
    </nav>
  )
}
