"use client";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
export default function Controls() {
  const { connect, disconnect, readyState, messages } = useVoice();

  const sendToParse = async (events: any[]) => {
    try {
      const resp = await fetch("https://09e0-50-217-174-18.ngrok-free.app/calls/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(events),
      });
      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`${resp.status} ${errText}`);
      }
      const parsed = await resp.json();
      console.log("✅ Parsed call saved:", parsed);
    } catch (e) {
      console.error("❌ Failed to send parse request:", e);
    }
  };

  const handleEndSession = async () => {
    try {
      await disconnect();
      await sendToParse(messages);
    } catch (e) {
      console.error("❌ Error in end-session flow:", e);
    }
  };

  if (readyState === VoiceReadyState.OPEN) {
    return (
      <button onClick={handleEndSession}>
        End Session
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        connect()
          .then(() => {
            console.log("ok");
          })
          .catch((e) => {
            console.log(e);
          });
      }}
    >
      Start Session
    </button>
  );
}