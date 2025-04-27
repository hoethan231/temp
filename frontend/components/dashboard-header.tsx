"use client"

import { useState } from "react"
import { Menu, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardHeaderProps {
  setSidebarOpen: (open: boolean) => void
}

export function DashboardHeader({ setSidebarOpen }: DashboardHeaderProps) {
  const [notificationCount, setNotificationCount] = useState(3)

  const clearNotifications = () => {
    setNotificationCount(0)
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      <div className="flex-1">
        <h1 className="text-lg font-semibold">Emergency Response Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600"></span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notificationCount > 0 ? (
              <>
                <DropdownMenuItem>New emergency reported: Fire at 123 Main St</DropdownMenuItem>
                <DropdownMenuItem>Ambulance 7 has arrived at the scene</DropdownMenuItem>
                <DropdownMenuItem>Engine 12 is en route to Highway 101 accident</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearNotifications}>Mark all as read</DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem>No new notifications</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-sm font-medium">ER</span>
          </div>
          <span className="text-sm font-medium md:block hidden">Dispatcher</span>
        </div>
      </div>
    </header>
  )
}
