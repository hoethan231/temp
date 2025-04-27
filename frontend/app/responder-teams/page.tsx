"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Users, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { emergencies } from "@/components/emergency-dashboard"

interface Responder {
  id: string
  name: string
  type: string
  status: "active" | "inactive"
  assignedTo?: string
}

export default function ResponderTeamsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [responders, setResponders] = useState<Responder[]>([
    { id: "r1", name: "Engine 12", type: "Fire", status: "active", assignedTo: "em-1" },
    { id: "r2", name: "Ladder 5", type: "Fire", status: "active", assignedTo: "em-1" },
    { id: "r3", name: "Ambulance 3", type: "Medical", status: "active", assignedTo: "em-1" },
    { id: "r4", name: "Ambulance 7", type: "Medical", status: "active", assignedTo: "em-2" },
    { id: "r5", name: "Paramedic 2", type: "Medical", status: "active", assignedTo: "em-2" },
    { id: "r6", name: "Engine 8", type: "Fire", status: "active", assignedTo: "em-3" },
    { id: "r7", name: "Ambulance 4", type: "Medical", status: "active", assignedTo: "em-3" },
    { id: "r8", name: "Police Unit 15", type: "Police", status: "active", assignedTo: "em-3" },
    { id: "r9", name: "Engine 5", type: "Fire", status: "inactive" },
    { id: "r10", name: "Ambulance 9", type: "Medical", status: "inactive" },
    { id: "r11", name: "Police Unit 7", type: "Police", status: "inactive" },
    { id: "r12", name: "Ladder 3", type: "Fire", status: "inactive" },
  ])

  const searchParams = useSearchParams()
  const emergencyId = searchParams.get("emergency")

  const selectedEmergency = emergencyId ? emergencies.find((e) => e.id === emergencyId) : null

  const inactiveResponders = responders.filter((r) => r.status === "inactive")
  const activeResponders = responders.filter((r) => r.status === "active")

  const handleActivate = (responderId: string, emergencyId?: string) => {
    setResponders((prev) =>
      prev.map((r) => (r.id === responderId ? { ...r, status: "active", assignedTo: emergencyId } : r)),
    )
  }

  const getAssignedResponderCount = (emergencyId: string) => {
    return responders.filter((r) => r.assignedTo === emergencyId).length
  }

  const getEmergencyById = (id?: string) => {
    if (!id) return null
    return emergencies.find((e) => e.id === id)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {selectedEmergency && (
            <div className="mb-6 p-4 border rounded-lg bg-secondary">
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
                Dispatching for: {selectedEmergency.type} at {selectedEmergency.location}
              </h2>
              <p className="text-sm text-muted-foreground mb-2">{selectedEmergency.description}</p>
              <div className="flex items-center">
                <Badge className="mr-2 bg-blue-600">
                  {getAssignedResponderCount(selectedEmergency.id)}/{selectedEmergency.recommendedResponders || 3}{" "}
                  Responders
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {selectedEmergency.recommendedResponders
                    ? `${selectedEmergency.recommendedResponders} responders recommended for this emergency`
                    : "3 responders recommended for this emergency"}
                </span>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="mr-2 h-5 w-5 text-yellow-500" />
                Inactive Responders
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inactiveResponders.map((responder) => (
                  <div key={responder.id} className="border rounded-lg p-4 bg-card">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{responder.name}</h3>
                      <Badge variant="outline">{responder.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Status: Inactive</p>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => handleActivate(responder.id, emergencyId || undefined)}
                    >
                      Activate {emergencyId ? `for ${selectedEmergency?.type}` : ""}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                Active Responders
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeResponders.map((responder) => {
                  const assignedEmergency = getEmergencyById(responder.assignedTo)

                  return (
                    <div key={responder.id} className="border rounded-lg p-4 bg-card">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{responder.name}</h3>
                        <Badge variant="outline">{responder.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Status: Active</p>
                      {assignedEmergency ? (
                        <div className="p-2 bg-secondary rounded-md">
                          <p className="text-sm font-medium">Assigned to:</p>
                          <p className="text-sm">
                            {assignedEmergency.type} at {assignedEmergency.location}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {assignedEmergency.status} • {assignedEmergency.time}
                          </p>
                        </div>
                      ) : (
                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleActivate(responder.id, emergencyId || undefined)}
                          disabled={!emergencyId}
                        >
                          {emergencyId ? `Assign to ${selectedEmergency?.type}` : "Available"}
                        </Button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
            {emergencyId && responders.some(r => r.assignedTo === emergencyId) && (

              <div className="mt-6">

                <Link href={`/hospital-capacity?emergency=${emergencyId}&needed=${selectedEmergency?.injured || 0}`}>

                  <Button>View Hospital Capacity</Button>

                </Link>

              </div>

            )}

        </main>
      </div>
    </div>
  )
}
