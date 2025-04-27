"use client"

import { useState } from "react"
import { Phone } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { IncomingCallsList } from "@/components/incoming-calls-list"
import { EmergencySummary } from "@/components/emergency-summary"
import { CommunicationPanel } from "@/components/communication-panel"

// Sample data - in a real app, this would come from an API
export const emergencies = [
  {
    id: "em-1",
    type: "Fire",
    location: "123 Main St, San Jose",
    status: "Critical",
    time: "2 mins ago",
    callerName: "John Smith",
    callerPhone: "555-123-4567",
    description: "Kitchen fire spreading to living room. Three occupants evacuated, one possibly still inside.",
    responders: ["Engine 12", "Ladder 5", "Ambulance 3"],
    recommendedResponders: 5,
    injured: 2,
    injured: 5,
    injured: 8,
    injured: 3,
    coordinates: { lat: 37.335, lng: -121.893 },
  },
  {
    id: "em-2",
    type: "Medical",
    location: "45 Park Ave, San Jose",
    status: "Urgent",
    time: "5 mins ago",
    callerName: "Mary Johnson",
    callerPhone: "555-987-6543",
    description: "Elderly male, 78, experiencing chest pain and difficulty breathing.",
    responders: ["Ambulance 7", "Paramedic 2"],
    recommendedResponders: 3,
    injured: 2,
    coordinates: { lat: 37.329, lng: -121.885 },
  },
  {
    id: "em-3",
    type: "Traffic Accident",
    location: "Highway 101, San Jose",
    status: "Active",
    time: "12 mins ago",
    callerName: "Highway Patrol",
    callerPhone: "555-789-0123",
    description: "Multi-vehicle collision, at least 3 vehicles involved. Possible injuries reported.",
    responders: ["Engine 8", "Ambulance 4", "Police Unit 15"],
    recommendedResponders: 6,
    injured: 2,
    coordinates: { lat: 37.345, lng: -121.915 },
  },
]

export function EmergencyDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedEmergency, setSelectedEmergency] = useState<string | null>(null)

  // Find the selected emergency details
  const selectedEmergencyDetails = selectedEmergency
    ? emergencies.find((e) => e.id === selectedEmergency)
    : emergencies[0]

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Incoming calls section */}
            <div className="lg:col-span-1">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Phone className="mr-2 h-5 w-5 text-red-600" />
                Incoming Emergencies
              </h2>
              <IncomingCallsList
                emergencies={emergencies}
                selectedEmergency={selectedEmergency}
                setSelectedEmergency={setSelectedEmergency}
              />
            </div>

            {/* Current emergency and communication section */}
            <div className="lg:col-span-2 space-y-6">
              <EmergencySummary emergency={selectedEmergencyDetails} />
              <CommunicationPanel emergency={selectedEmergencyDetails} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
