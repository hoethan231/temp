# Welcome to Rapid Emergency Response System (RERS)

## Problem:
When emergencies happen, 911 centers often get lots of calls about the same incident. This creates duplicate reports, which can slow down emergency response. Dispatchers and officers must sort through repeated information, making it harder to see what’s really happening and respond quickly.

## Our Solution:
RERS (Rapid Emergency Response Summarizer) is built to help government emergency teams by automatically handling and sorting incoming calls. Here’s how it works:

**Automatic Call Processing**: RERS uses AI to transcribe and understand calls as they come in.

**Duplicate Detection**: The system checks for calls about the same event (using location, time, and details) and combines them.

**Summarized Reports**: Instead of showing every single call, RERS gives emergency officers a clear summary with the most important details relative to current events, & locations of medical support.

**Faster, Smarter Response**: With less clutter and better information, dispatchers and first responders can act faster and avoid wasting resources.

## Why It’s Tailored for Government:

RERS is designed for use by public agencies. It’s secure, can be integrated into existing systems, and helps teams work together more efficiently. It supports centralized management, automated workflows, and detailed reporting-features that government emergency services need.

## Technology Stack

### Backend:
* Python FastAPI: For building a fast, reliable API.
* Hume AI & OpenAI: For call transcription and AI-powered analysis.
* MongoDB Atlas: To store call data securely in the cloud.
* Twilio: To handle phone calls and connect with the system.

### Frontend: 
* Next.js & React: For a fast, interactive web interface.
* TypeScript: For safer, more reliable code.
* Tailwind CSS: For clean, responsive design.

## Challenges we ran into

Complex backend development, and environment issues delayed development, costing us our sleep. :( 
Some parts of our entire application stack were hosted on cloud, and some were on local machine for development, complicating integration for development purposes requiring workarounds. 

## What we learned

Integration of the entire stack, and utilizing AI in our development process to reduce development time by significant amount. 

## Summary: 
RERS helps emergency teams by cutting down on duplicate calls and giving them a clear, helpful summary of what’s happening-so they can respond faster and more effectively.