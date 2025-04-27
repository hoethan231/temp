"use client"
import { useVoice } from "@humeai/voice-react"
import { useEffect, useRef } from "react"
import { User, Bot } from "lucide-react"
import { Mic } from "lucide-react"


export default function Messages() {
 const { messages } = useVoice()
 const messagesEndRef = useRef<HTMLDivElement>(null)


 // Auto-scroll to bottom when new messages arrive
 useEffect(() => {
   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
 }, [messages])


 return (
   <div className="space-y-4">
     {messages.length === 0 && (
       <div className="text-center py-8">
         <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 mb-4">
           <Mic className="h-8 w-8 text-blue-600 dark:text-blue-400" />
         </div>
         <p className="text-lg font-medium">Start a conversation</p>
         <p className="text-muted-foreground mt-2">
           Click the "Start Session" button below to begin talking with the AI assistant.
         </p>
       </div>
     )}


     {messages.map((msg, index) => {
       if (msg.type === "user_message" || msg.type === "assistant_message") {
         const isUser = msg.message.role === "user"


         return (
           <div key={msg.type + index} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
             <div className={`flex max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
               <div
                 className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                   isUser ? "bg-blue-100 dark:bg-blue-900/30 ml-2" : "bg-gray-100 dark:bg-gray-800 mr-2"
                 }`}
               >
                 {isUser ? (
                   <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                 ) : (
                   <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                 )}
               </div>


               <div
                 className={`rounded-2xl px-4 py-2 ${
                   isUser
                     ? "bg-blue-600 text-white rounded-tr-none"
                     : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none"
                 }`}
               >
                 <p>{msg.message.content}</p>
               </div>
             </div>
           </div>
         )
       }
       return null
     })}
     <div ref={messagesEndRef} />
   </div>
 )
}
