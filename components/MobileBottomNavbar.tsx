"use client"

import { Home, Coins, LineChart, User,Calendar } from "lucide-react"
import Link from "next/link"

export default function MobileBottomNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background backdrop-blur border-t shadow md:hidden flex items-center justify-around h-14 px-4">
      <Link href="/" className="flex flex-col items-center text-xs">
        <Home className="w-5 h-5" />
        Home
      </Link>
      <Link href="/crypto" className="flex flex-col items-center text-xs">
        <Coins className="w-5 h-5" />
        Crypto
      </Link>
      <Link href="/indian" className="flex flex-col items-center text-xs">
        <LineChart className="w-5 h-5" />
        Indian
      </Link>
      <Link href="/mutual-fund" className="flex flex-col items-center text-xs">
        <Calendar className="w-5 h-5" />
        Mutual fund
      </Link>
      <Link href="/user" className="flex flex-col items-center text-xs">
        <User className="w-5 h-5" />
        Profile
      </Link>
      
    </nav>
  )
}
