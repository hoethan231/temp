"use client"

import { useState } from "react"
import { Clock, MessageSquare } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { emergencies } from "@/components/emergency-dashboard"

interface CallRecord {
  id: string
  emergencyId: string
  callerName: string
  callerPhone: string
  timestamp: string
  location: string
  conversation: {
    speaker: "caller" | "dispatcher"
    text: string
    time: string
  }[]
}

export default function CallHistoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Sample call history data - in a real app, this would come from an API
  const callHistory: CallRecord[] = [
    {
      id: "call-1",
      emergencyId: "em-1",
      callerName: "John Smith",
      callerPhone: "555-123-4567",
      timestamp: "Today, 10:23 AM",
      location: "123 Main St, Apartment 4B",
      conversation: [
        { speaker: "dispatcher", text: "911, what's your emergency?", time: "10:23:05 AM" },
        { speaker: "caller", text: "There's a fire in my kitchen! It's spreading fast!", time: "10:23:12 AM" },
        { speaker: "dispatcher", text: "What's your location?", time: "10:23:15 AM" },
        { speaker: "caller", text: "123 Main Street, Apartment 4B", time: "10:23:22 AM" },
        { speaker: "dispatcher", text: "Is everyone out of the apartment?", time: "10:23:27 AM" },
        {
          speaker: "caller",
          text: "My wife and child are out, but my neighbor might still be inside!",
          time: "10:23:35 AM",
        },
        { speaker: "dispatcher", text: "We're dispatching fire units now. Stay on the line.", time: "10:23:42 AM" },
      ],
    },
    {
      id: "call-2",
      emergencyId: "em-2",
      callerName: "Mary Johnson",
      callerPhone: "555-987-6543",
      timestamp: "Today, 10:20 AM",
      location: "45 Park Ave",
      conversation: [
        { speaker: "dispatcher", text: "911, what's your emergency?", time: "10:20:01 AM" },
        {
          speaker: "caller",
          text: "My father is having chest pains. He's 78 and can't breathe properly.",
          time: "10:20:10 AM",
        },
        { speaker: "dispatcher", text: "What's your location?", time: "10:20:15 AM" },
        { speaker: "caller", text: "45 Park Avenue", time: "10:20:20 AM" },
        { speaker: "dispatcher", text: "Is he conscious?", time: "10:20:25 AM" },
        { speaker: "caller", text: "Yes, but he's in a lot of pain.", time: "10:20:32 AM" },
        {
          speaker: "dispatcher",
          text: "We're sending an ambulance. Has he had heart problems before?",
          time: "10:20:40 AM",
        },
        { speaker: "caller", text: "Yes, he had a heart attack last year.", time: "10:20:48 AM" },
      ],
    },
    {
      id: "call-3",
      emergencyId: "em-3",
      callerName: "Highway Patrol",
      callerPhone: "555-789-0123",
      timestamp: "Today, 10:13 AM",
      location: "Highway 101, Mile Marker 23",
      conversation: [
        { speaker: "dispatcher", text: "911, what's your emergency?", time: "10:13:05 AM" },
        {
          speaker: "caller",
          text: "This is Officer Rodriguez with Highway Patrol. We have a multi-vehicle collision on Highway 101 at mile marker 23.",
          time: "10:13:15 AM",
        },
        { speaker: "dispatcher", text: "How many vehicles are involved?", time: "10:13:22 AM" },
        {
          speaker: "caller",
          text: "At least three. One is overturned. We need fire and ambulance units.",
          time: "10:13:30 AM",
        },
        { speaker: "dispatcher", text: "Any injuries reported?", time: "10:13:35 AM" },
        {
          speaker: "caller",
          text: "Yes, several people appear to be injured. At least one person is trapped in a vehicle.",
          time: "10:13:45 AM",
        },
        { speaker: "dispatcher", text: "We're dispatching units now. Is the highway blocked?", time: "10:13:52 AM" },
        {
          speaker: "caller",
          text: "Yes, all northbound lanes are blocked. We're diverting traffic.",
          time: "10:14:00 AM",
        },
      ],
    },
  ]

  // Group calls by emergency
  const callsByEmergency = emergencies
    .map((emergency) => {
      const calls = callHistory.filter((call) => call.emergencyId === emergency.id)
      return {
        emergency,
        calls,
      }
    })
    .filter((group) => group.calls.length > 0)

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <h1 className="text-2xl font-bold mb-6 flex items-center">
            <Clock className="mr-2 h-6 w-6" />
            Call History
          </h1>

          <div className="space-y-6">
            {callsByEmergency.map(({ emergency, calls }) => (
              <div key={emergency.id} className="border rounded-lg bg-card overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={emergency.id} className="border-0">
                    <AccordionTrigger className="px-4 py-3 hover:bg-secondary/50">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <Badge
                            className={`mr-3 ${
                              emergency.status === "Critical"
                                ? "bg-red-500"
                                : emergency.status === "Urgent"
                                  ? "bg-orange-500"
                                  : "bg-blue-500"
                            }`}
                          >
                            {emergency.status}
                          </Badge>
                          <div>
                            <h2 className="text-lg font-semibold text-left">{emergency.type}</h2>
                            <p className="text-sm text-muted-foreground text-left">{emergency.location}</p>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{emergency.time}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4">
                        {calls.map((call) => (
                          <div key={call.id} className="border rounded-lg bg-secondary/30">
                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value={call.id} className="border-0">
                                <AccordionTrigger className="px-4 py-3 hover:bg-secondary">
                                  <div className="flex items-center justify-between w-full">
                                    <div>
                                      <h3 className="font-medium text-left">{call.callerName}</h3>
                                      <p className="text-sm text-muted-foreground text-left">{call.callerPhone}</p>
                                    </div>
                                    <span className="text-sm text-muted-foreground">{call.timestamp}</span>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-4">
                                  <div className="space-y-3 mt-2">
                                    <h4 className="text-sm font-medium flex items-center">
                                      <MessageSquare className="h-4 w-4 mr-1" />
                                      Call Transcript
                                    </h4>
                                    <div className="space-y-2">
                                      {call.conversation.map((message, index) => (
                                        <div
                                          key={index}
                                          className={`flex ${
                                            message.speaker === "dispatcher" ? "justify-end" : "justify-start"
                                          }`}
                                        >
                                          <div
                                            className={`max-w-[80%] p-2 rounded-lg ${
                                              message.speaker === "dispatcher"
                                                ? "bg-blue-900 text-white"
                                                : "bg-secondary"
                                            }`}
                                          >
                                            <p className="text-sm">{message.text}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{message.time}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
