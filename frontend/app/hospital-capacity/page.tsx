"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { hospitals, Hospital } from "@/components/hospital-data"
import { emergencies } from "@/components/emergency-dashboard"

import { BedDouble } from "lucide-react"
import { useDispatchStore } from "@/lib/dispatch-store"
import { Button } from "@/components/ui/button"

/* ─────────────────────────────────────────────────── */
/* Haversine helper – returns distance in miles */
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const R_km = 6371
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distanceKm = R_km * c
  return distanceKm * 0.621371
}
/* ─────────────────────────────────────────────────── */

export default function HospitalCapacityPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const searchParams = useSearchParams()
  const setSelectedHospital = useDispatchStore(state => state.setSelectedHospital)
  const router = useRouter()

  const emergencyId = searchParams.get("emergency")
  const needed = Number(searchParams.get("needed") ?? 0)

  const incident = emergencyId
    ? emergencies.find((e) => e.id === emergencyId)
    : null

  const sorted: Hospital[] = [...hospitals]

  if (incident) {
    sorted.sort((a, b) => {
      const canA = a.available >= needed
      const canB = b.available >= needed
      if (canA !== canB) return canB ? 1 : -1

      const distA = haversineDistance(
        a.coordinates.lat,
        a.coordinates.lng,
        incident.coordinates.lat,
        incident.coordinates.lng
      )
      const distB = haversineDistance(
        b.coordinates.lat,
        b.coordinates.lng,
        incident.coordinates.lat,
        incident.coordinates.lng
      )
      if (distA !== distB) return distA - distB

      return b.available - a.available
    })
  } else {
    sorted.sort((a, b) => b.available - a.available)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <h1 className="text-2xl font-semibold mb-4 flex items-center">
            <BedDouble className="mr-2" />
            Hospital Capacity
          </h1>

          {emergencyId && (
            <p className="text-sm text-muted-foreground mb-4">
              Showing nearest hospitals for emergency{" "}
              <span className="font-medium">{emergencyId}</span> – needs at least {needed} beds
            </p>
          )}

          <div className="space-y-4">
            {sorted.map((h) => {
              const distanceMiles = incident
                ? haversineDistance(
                    h.coordinates.lat,
                    h.coordinates.lng,
                    incident.coordinates.lat,
                    incident.coordinates.lng
                  )
                : null

              return (
                <div
                  key={h.id}
                  className="border rounded-lg p-4 flex justify-between items-center bg-secondary"
                >
                  <div>
                    <h2 className="text-lg font-semibold">{h.name}</h2>
                    <p className="text-sm">{h.address}</p>

                    {distanceMiles !== null && (
                      <p className="text-xs text-muted-foreground">
                        {distanceMiles.toFixed(1)} mi from incident
                      </p>
                    )}

                    {emergencyId && (
                      <Button
                        variant="default"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          setSelectedHospital(emergencyId as string, h.id)
                          router.push("/")
                        }}
                      >
                        Select
                      </Button>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="font-mono">
                      {h.available} / {h.capacity} beds available
                    </p>

                    {!emergencyId && (
                      <Link
                        href="/emergency-map"
                        className="text-blue-500 text-sm"
                      >
                        View on Map
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6">
            <Link
              href={
                emergencyId
                  ? `/responder-teams?emergency=${emergencyId}`
                  : "/responder-teams"
              }
            >
              <Button variant="outline">Back to Responders</Button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
