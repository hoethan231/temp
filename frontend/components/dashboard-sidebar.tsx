"use client"

import { X, Phone, Users, Clock, LogOut, Map, BedDouble } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

interface DashboardSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function DashboardSidebar({ open, setOpen }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div
      className={`fixed inset-0 z-20 transform transition-transform duration-200 lg:transform-none lg:relative lg:inset-auto lg:flex lg:w-64 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        className="absolute inset-0 bg-gray-600 bg-opacity-75 lg:hidden"
        onClick={() => setOpen(false)}
      ></div>

      <div className="relative flex h-full flex-col overflow-y-auto border-r bg-midnight-500 dark:bg-slate-800 pb-4 text-white">
        {/* ────────── Header ────────── */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-midnight-400 dark:border-slate-700">
          <Link href="/" className="flex items-center">
            <Image
              src="/seal.png"
              alt="RERS Seal"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <span className="ml-2 text-lg font-semibold">RERS</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-midnight-400 dark:hover:bg-slate-700"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        {/* ────────── Main nav ────────── */}
        <div className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            <Link
              href="/"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/"
                  ? "bg-midnight-400 dark:bg-slate-700 text-white"
                  : "text-gray-300 hover:bg-midnight-400 dark:hover:bg-slate-700 hover:text-white"
              }`}
            >
              <Phone className="mr-3 h-5 w-5" />
              <span>Current Emergencies</span>
            </Link>

            <Link
              href="/emergency-map"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/emergency-map"
                  ? "bg-midnight-400 dark:bg-slate-700 text-white"
                  : "text-gray-300 hover:bg-midnight-400 dark:hover:bg-slate-700 hover:text-white"
              }`}
            >
              <Map className="mr-3 h-5 w-5" />
              <span>Emergency Map</span>
            </Link>

            <Link
              href="/responder-teams"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/responder-teams"
                  ? "bg-midnight-400 dark:bg-slate-700 text-white"
                  : "text-gray-300 hover:bg-midnight-400 dark:hover:bg-slate-700 hover:text-white"
              }`}
            >
              <Users className="mr-3 h-5 w-5" />
              <span>Responder Teams</span>
            </Link>

            <Link
              href="/call-history"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/call-history"
                  ? "bg-midnight-400 dark:bg-slate-700 text-white"
                  : "text-gray-300 hover:bg-midnight-400 dark:hover:bg-slate-700 hover:text-white"
              }`}
            >
              <Clock className="mr-3 h-5 w-5" />
              <span>Call History</span>
            </Link>

            {/* ────────── Hospital Capacity ────────── */}
            <Link
              href="/hospital-capacity"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname.startsWith("/hospital-capacity")
                  ? "bg-midnight-400 dark:bg-slate-700 text-white"
                  : "text-gray-300 hover:bg-midnight-400 dark:hover:bg-slate-700 hover:text-white"
              }`}
            >
              <BedDouble className="mr-3 h-5 w-5" />
              <span>Hospital Capacity</span>
            </Link>

          </nav>
        </div>

        {/* ────────── Footer ────────── */}
        <div className="border-t border-midnight-400 dark:border-slate-700 px-3 py-4">
          <nav className="space-y-1">
            <div className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300">
              <ThemeToggle />
            </div>
            <Link
              href="/login"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-midnight-400 dark:hover:bg-slate-700 hover:text-white"
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Sign out</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
