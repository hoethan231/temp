"use client";
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Message";
import Controls from "./Controls";

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  return (
    <VoiceProvider auth={{ type: "accessToken", value: accessToken }} configId="66231048-b3a4-49d3-baf3-8daaf0291ef0">
      <Messages />
      <Controls />
    </VoiceProvider>
  );
}