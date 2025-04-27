"use client"


import ClientComponent from "@/components/ClientComponent"
import { fetchAccessToken } from "hume"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"


export default function Page() {
 const [accessToken, setAccessToken] = useState<string | null>(null)
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState<string | null>(null)


 async function getAccessToken() {
   try {
     const token = await fetchAccessToken({
       apiKey: String(process.env.NEXT_PUBLIC_HUME_API_KEY),
       secretKey: String(process.env.NEXT_PUBLIC_HUME_SECRET),
     })
     return token
   } catch (error) {
     console.error("Error getting access token:", error)
     setError("Failed to connect to Hume AI. Please try again later.")
     return null
   }
 }


 useEffect(() => {
   try {
     getAccessToken().then((token) => {
       if (token) {
         setAccessToken(token)
       }
       setLoading(false)
     })
   } catch (error) {
     console.error("Error getting access token:", error)
     setError("Failed to connect to Hume AI. Please try again later.")
     setLoading(false)
   }
 }, [])


 if (loading) {
   return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-background">
       <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
       <p className="text-lg font-medium">Connecting to Hume AI...</p>
     </div>
   )
 }


 if (error) {
   return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
       <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-md w-full text-center">
         <p className="text-red-800 dark:text-red-300 font-medium">{error}</p>
         <button
           onClick={() => window.location.reload()}
           className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
         >
           Retry
         </button>
       </div>
     </div>
   )
 }


 if (!accessToken) {
   return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-background">
       <p className="text-lg font-medium">Unable to authenticate with Hume AI.</p>
     </div>
   )
 }


 return (
   <div className="min-h-screen bg-background flex flex-col">
     <ClientComponent accessToken={accessToken} />
   </div>
 )
}
