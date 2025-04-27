"use client"
import { useVoice, VoiceReadyState } from "@humeai/voice-react"
import { useState } from "react"
import { Mic, MicOff, Loader2 } from "lucide-react"


export default function Controls() {
 const { connect, disconnect, readyState, messages } = useVoice()
 const [isProcessing, setIsProcessing] = useState(false)


 const sendToParse = async (events: any[]) => {
   try {
     const resp = await fetch("https://09e0-50-217-174-18.ngrok-free.app/calls/parse", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(events),
     })
     if (!resp.ok) {
       const errText = await resp.text()
       throw new Error(`${resp.status} ${errText}`)
     }
     const parsed = await resp.json()
     console.log("✅ Parsed call saved:", parsed)
   } catch (e) {
     console.error("❌ Failed to send parse request:", e)
   }
 }


 const handleEndSession = async () => {
   try {
     setIsProcessing(true)
     await disconnect()
     await sendToParse(messages)
   } catch (e) {
     console.error("❌ Error in end-session flow:", e)
   } finally {
     setIsProcessing(false)
   }
 }


 const handleStartSession = async () => {
   try {
     setIsProcessing(true)
     await connect()
     console.log("Connection established")
   } catch (e) {
     console.error("Connection failed:", e)
   } finally {
     setIsProcessing(false)
   }
 }


 if (isProcessing) {
   return (
     <button
       disabled
       className="w-full bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 py-3 rounded-lg flex items-center justify-center"
     >
       <Loader2 className="h-5 w-5 mr-2 animate-spin" />
       {readyState === VoiceReadyState.OPEN ? "Ending session..." : "Starting session..."}
     </button>
   )
 }


 if (readyState === VoiceReadyState.OPEN) {
   return (
     <button
       onClick={handleEndSession}
       className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center transition-colors"
     >
       <MicOff className="h-5 w-5 mr-2" />
       End Session
     </button>
   )
 }


 return (
   <button
     onClick={handleStartSession}
     className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center transition-colors"
   >
     <Mic className="h-5 w-5 mr-2" />
     Start Session
   </button>
 )
}
