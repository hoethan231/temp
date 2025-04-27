"use client"

import ClientComponent from "@/components/ClientComponent";
import { fetchAccessToken } from "hume";
import { useState, useEffect } from "react";

export default function Page() {

  const [accessToken, setAccessToken] = useState<string | null>(null);
  async function getAccessToken() {
    try {
      const token = await fetchAccessToken({
        apiKey: String(process.env.NEXT_PUBLIC_HUME_API_KEY),
        secretKey: String(process.env.NEXT_PUBLIC_HUME_SECRET),
      });
      return token;
    } catch (error) {
      console.error('Error getting access token:', error);
    }
  };

  useEffect(() => {
    try {
        getAccessToken().then((token) => {
          if (token) {
            setAccessToken(token);
          }
        });
      } catch (error) {
        console.error('Error getting access token:', error);
      }
  }, []);
  if(!accessToken) {
    return <div>Loading...</div>;
  }
  return <ClientComponent accessToken={accessToken} />;
}