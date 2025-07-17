"use client"
import { useEffect, useState } from "react"
import MobileTopNavbar from "@/components/MobileTopNavbar"
import MobileBottomNavbar from "@/components/MobileBottomNavbar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

type MF = { code: string; name: string; nav: string; date: string }

const fundList = [
    { code: "118550", name: "Parag Parikh Flexi Cap Fund" },
    { code: "147354", name: "Nippon India Nifty IT Index Fund" },
    { code: "147471", name: "UTI Nifty 50 Index Fund" },
  ]
  

export default function MutualFundList() {
  const [funds, setFunds] = useState<MF[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all(
          fundList.map(async (f) => {
            const res = await fetch(`https://api.mfapi.in/mf/${f.code}`)
            const d = await res.json()
  
            const latest = d.data?.[0] || {}
  
            return {
              code: f.code,
              name: f.name,
              nav: latest.nav,
              date: latest.date,
            }
          })
        )
  
        setFunds(results) // Assuming you have setFunds defined
      } catch (err) {
        console.error("Failed to fetch:", err)
      }
    }
  
    fetchData()
  }, [])
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <MobileTopNavbar />
        <div className="pad">
      {funds.map((f) => (
        <div key={f.code} className="p-3 border mb-2 rounded">
          <strong>{f.name}</strong>
          <div>NAV: ₹{f.nav}</div>
          <div>Date: {f.date}</div>
        </div>
      ))}
    </div>
    <MobileBottomNavbar />
      </SidebarInset>
    </SidebarProvider>
  )
}
