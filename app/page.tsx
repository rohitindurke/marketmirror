"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import MobileTopNavbar from "@/components/MobileTopNavbar"
import MobileBottomNavbar from "@/components/MobileBottomNavbar"



export default function Page() {

  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
    <MobileTopNavbar />
    <div className="indian">
      Teeere nam kiya hai sab
      kindly<br></br> Just check only crypto page not more than that cuz is under construction u bitch 
    </div>
    <MobileBottomNavbar />
    </SidebarInset>
    </SidebarProvider>
  )
}
