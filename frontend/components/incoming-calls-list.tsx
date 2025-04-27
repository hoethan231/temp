"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Phone, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Emergency {
  id: string
  type: string
  location: string
  status: string
  time: string
  callerName: string
  callerPhone: string
  description: string
  responders: string[]
  recommendedResponders?: number
}

interface IncomingCallsListProps {
  emergencies: Emergency[]
  selectedEmergency: string | null
  setSelectedEmergency: (id: string) => void
}

export function IncomingCallsList({ emergencies, selectedEmergency, setSelectedEmergency }: IncomingCallsListProps) {
  const router = useRouter()

  const handleDispatch = (emergencyId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    // Navigate to responder teams page with the emergency ID
    router.push(`/responder-teams?emergency=${emergencyId}`)
  }

  return (
    <div className="space-y-3">
      {emergencies.map((emergency) => (
        <div
          key={emergency.id}
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            selectedEmergency === emergency.id
              ? "border-red-500 bg-red-50 dark:bg-red-900/20"
              : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
          } bg-card`}
          onClick={() => setSelectedEmergency(emergency.id)}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              {emergency.status === "Critical" ? (
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              ) : (
                <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
              )}
              <h3 className="font-medium">{emergency.type}</h3>
            </div>
            <Badge
              className={`${
                emergency.status === "Critical"
                  ? "bg-red-500"
                  : emergency.status === "Urgent"
                    ? "bg-orange-500"
                    : "bg-blue-500"
              } text-white dark:text-white`}
            >
              {emergency.status}
            </Badge>
          </div>

          <div className="text-sm text-muted-foreground mb-2">
            <p className="truncate">{emergency.location}</p>
            <p className="mt-1">{emergency.time}</p>
          </div>

          <div className="flex justify-between mt-3">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={(e) => {
                e.stopPropagation()
                router.push(`/call-history?emergency=${emergency.id}`)
              }}
            >
              Call History
            </Button>
            <Button
              variant="default"
              size="sm"
              className="text-xs bg-red-600 hover:bg-red-700 text-white dark:text-white"
              onClick={(e) => handleDispatch(emergency.id, e)}
            >
              Dispatch
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
