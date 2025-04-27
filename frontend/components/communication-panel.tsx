"use client"

import { useState } from "react"
import { MessageSquare, Send } from "lucide-react"
import { useDispatchStore } from "@/lib/dispatch-store"
import { hospitals } from "@/components/hospital-data"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

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
}

interface CommunicationPanelProps {
  emergency: Emergency
}

export function CommunicationPanel({ emergency }: CommunicationPanelProps) {
  
  const hospitalMap = useDispatchStore(state => state.emergencyHospitalMap)
  const selectedHospitalId = hospitalMap[emergency?.id ?? ""] || null
  const selectedHospital = hospitals.find(h => h.id === selectedHospitalId)

  const defaultMessage = emergency
    ? `[To: ${emergency.responders.join(", ")}] ${emergency.description}${selectedHospital ? " – Proceed to " + selectedHospital.name : ""}`
    : ""

  const [message, setMessage] = useState(defaultMessage)


  // Sample messages - in a real app, these would come from an API
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "System",
      content: `Emergency ${emergency.type} reported at ${emergency.location}`,
      time: "2 mins ago",
    },
    {
      id: "2",
      sender: "Dispatcher",
      content: "Engine 12 and Ambulance 3 dispatched to the scene.",
      time: "1 min ago",
    },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        sender: "Dispatcher",
        content: message,
        time: "Just now",
      }

      setMessages([...messages, newMessage])
      setMessage("")

      // In a real app, this would send the message to an API
      console.log("Sending message:", message)
    }
  }

  return (
    <div className="border rounded-lg bg-card overflow-hidden">
      <div className="p-4 border-b bg-secondary">
        <h2 className="text-lg font-semibold flex items-center">
          <MessageSquare className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
          Communication Updates
        </h2>
      </div>

      <div className="p-4 h-64 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">{msg.sender}</span>
              <span className="text-xs text-muted-foreground">{msg.time}</span>
            </div>
            <p className="text-sm bg-secondary p-2 rounded-lg">{msg.content}</p>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        
        <div className="mb-2 text-sm text-muted-foreground">
          <strong>To:</strong> {emergency?.responders.join(", ")}
          {selectedHospital && (
            <>
              {" • "}Proceed to <strong>{selectedHospital.name}</strong>
            </>
          )}
        </div>

          <div className="relative">
          <Textarea
            placeholder="Send an update to responders..."
            className="min-h-[80px] pr-12"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            size="icon"
            onClick={handleSendMessage}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
