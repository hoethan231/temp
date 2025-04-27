"use client"
import { VoiceProvider } from "@humeai/voice-react"
import Messages from "./Message"
import Controls from "./Controls"
import { Phone } from "lucide-react"

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string
}) {
  return (
    <VoiceProvider auth={{ type: "accessToken", value: accessToken }} configId="66231048-b3a4-49d3-baf3-8daaf0291ef0">
      <div className="flex flex-col h-screen max-h-screen">
        <header className="bg-card border-b p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h1 className="text-lg font-semibold">Hume AI Assistant</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Voice Ready</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 pb-24">
          <Messages />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
          <Controls />
        </div>
      </div>
    </VoiceProvider>
  )
}