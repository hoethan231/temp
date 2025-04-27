import { MapPin, Users, Clock, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useDispatchStore } from "@/lib/dispatch-store"



const responderRequirements: Record<string, { Fire?: number; Medical?: number; Police?: number; Clinician?: number; Outreach?: number; CityServices?: number }> = {
  Fire: { Fire: 2, Medical: 1, Police: 1 },
  Medical: { Medical: 2, Police: 1 },
  Police: { Police: 2 },
  Collision: { Fire: 1, Medical: 2, Police: 1 },
  Hazard: { Fire: 3, Police: 1 },
  Other: { Police:1 }
};

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

interface EmergencySummaryProps {
  emergency: Emergency
}

export function EmergencySummary({ emergency }: EmergencySummaryProps) {
  return (
    <div className="border rounded-lg bg-card overflow-hidden">
      <div className="p-4 border-b bg-secondary">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
            Current Emergency: {emergency.type}
          </h2>
          <Badge
            variant="destructive"        // already gives you bg-red-600
            className="bg-red-600 !text-white dark:!text-white"
            style={{ color: undefined }} // ← kills the inline color
          >
            {emergency.status}
          </Badge>
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
            <p className="flex items-center mt-1">
              <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
              {emergency.location}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Time Reported</h3>
            <p className="flex items-center mt-1">
              <Clock className="h-4 w-4 text-muted-foreground mr-1" />
              {emergency.time}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
            <p className="mt-1 text-sm">{emergency.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Assigned Responders</h3>
            <div className="flex items-center mt-1">
              <Users className="h-4 w-4 text-muted-foreground mr-1" />
              <div className="flex flex-wrap gap-1 mt-1">
                {emergency.responders.map((responder) => (
                  <Badge key={responder} variant="outline">
                    {responder}
                  </Badge>
                ))}
              </div>
            </div>
            <p className="text-xs mt-2 text-muted-foreground">
              {emergency.responders.length}/{emergency.recommendedResponders || 3} recommended responders assigned
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t bg-secondary">
        <div className="flex justify-between">
          <Link
            href="/call-history"
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Call History
          </Link>
          
          <button
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            onClick={() => {
              if (!emergency) return;
              const newDetails = prompt('Edit emergency details:', emergency.description)
              if (newDetails && newDetails.trim().length > 0) {
                useDispatchStore.getState().updateEmergencyDescription(emergency.id, newDetails.trim())
                // For demo: mutate object locally
                emergency.description = newDetails.trim()
              }
            }}
          >
            Update Status
          </button>

           
        </div>
      </div>
    </div>
  )
}
