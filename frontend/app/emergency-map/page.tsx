"use client"

import { useState, useEffect, useRef } from "react"
import mapboxgl from "@/app/utils/mapboxgl-worker";

import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
import {
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl
} from "mapbox-gl"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { emergencies } from "@/components/emergency-dashboard"
import { hospitals } from "@/components/hospital-data"

interface Responder {
  id: string
  name: string
  type: string
  status: "active" | "inactive"
  coordinates: { lat: number; lng: number }
}

const responders: Responder[] = [
  { id: "E5", name: "Engine 5", type: "Fire", status: "inactive", coordinates: { lat: 37.3382, lng: -121.8847 } },
  { id: "A12", name: "Ambulance 12", type: "Medical", status: "inactive", coordinates: { lat: 37.3421, lng: -121.8942 } },
  { id: "B2", name: "Battalion 2", type: "Fire", status: "inactive", coordinates: { lat: 37.3318, lng: -121.881 } },
]

// Token via env for security
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

export default function EmergencyMapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (map.current || !mapContainer.current) return

    /* ──────────── map init ──────────── */
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-121.8863, 37.3382],
      zoom: 11
    })

    map.current.addControl(new NavigationControl(), "top-left")
    map.current.addControl(new FullscreenControl(), "top-left")
    map.current.addControl(
      new GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true
      }),
      "top-left"
    )
    map.current.addControl(new ScaleControl({ maxWidth: 100, unit: "imperial" }))

    /* ──────────── helpers ──────────── */
    const emergencyIcon = (type: string) => {
      switch (type) {
        case "Fire": return "🔥"
        case "Medical": return "🚑"
        case "Police": return "🚓"
        case "Collision": return "💥"
        default: return "⚠️"
      }
    }

    const makePopup = (html: string) =>
      new mapboxgl.Popup({ 
        offset: 15, 
        closeButton: false,
        className: 'mapboxgl-popup-custom'
      }).setHTML(`
        <div style="
          color: black;
          font-family: system-ui, -apple-system, sans-serif;
          padding: 8px;
          max-width: 250px;
        ">
          ${html}
        </div>
      `)

    /* ─── emergency markers w/ popups ─── */
    emergencies.forEach(em => {
      const el = document.createElement("div")
      el.className = "map-marker"
      el.textContent = emergencyIcon(em.type)

      const popup = makePopup(`
        <div style="font-weight: 600; margin-bottom: 4px;">${em.type}</div>
        <div style="margin-bottom: 4px;">${em.location}</div>
        ${em.description ? `<div style="font-size: 0.9em; color: #666;">${em.description}</div>` : ''}
      `)

      new mapboxgl.Marker(el)
        .setLngLat([em.coordinates.lng, em.coordinates.lat])
        .setPopup(popup)
        .addTo(map.current!)

      el.addEventListener("mouseenter", () => popup.addTo(map.current!))
      el.addEventListener("mouseleave", () => popup.remove())
    })

    /* ─── responder markers w/ popups ─── */
    responders.forEach(r => {
      const el = document.createElement("div")
      el.className = "map-marker responder"
      el.textContent = "👤"

      const popup = makePopup(`
        <div style="font-weight: 600; margin-bottom: 4px;">${r.name}</div>
        <div style="margin-bottom: 2px;">Type: ${r.type}</div>
        <div style="color: ${r.status === 'active' ? '#22c55e' : '#ef4444'}">Status: ${r.status}</div>
      `)

      new mapboxgl.Marker(el)
        .setLngLat([r.coordinates.lng, r.coordinates.lat])
        .setPopup(popup)
        .addTo(map.current!)

      el.addEventListener("mouseenter", () => popup.addTo(map.current!))
      el.addEventListener("mouseleave", () => popup.remove())
    })

    /* ─── hospital markers w/ popups ─── */
    hospitals.forEach(h => {
      const el = document.createElement("div")
      el.className = "map-marker hospital"
      el.textContent = "➕"

      const popup = makePopup(`
        <div style="font-weight: 600; margin-bottom: 4px;">${h.name}</div>
        <div style="margin-bottom: 4px;">${h.address}</div>
        <div style="color: ${h.available > 0 ? '#22c55e' : '#ef4444'}">
          Available beds: ${h.available}/${h.capacity}
        </div>
      `)

      new mapboxgl.Marker(el)
        .setLngLat([h.coordinates.lng, h.coordinates.lat])
        .setPopup(popup)
        .addTo(map.current!)

      el.addEventListener("mouseenter", () => popup.addTo(map.current!))
      el.addEventListener("mouseleave", () => popup.remove())
    })
  }, [])

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 relative">
          <div ref={mapContainer} className="h-full w-full" />
        </main>
      </div>

      <style jsx global>{`
        .map-marker {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          font-size: 18px;
          border-radius: 50%;
          background: #ffffffcc;
          backdrop-filter: blur(4px);
          border: 1px solid #333;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
          cursor: pointer;
        }
        .map-marker.responder {
          background: #2563eb;
          color: #fff;
        }
        .map-marker.hospital {
          background: #e11d48;
          color: #fff;
        }
      `}</style>
    </div>
  )
}
