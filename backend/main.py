import uvicorn
from fastapi import FastAPI
from routes import emergency, call, hume
from hume_utilities import config_client
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(emergency.emergency_router)
app.include_router(call.call_router)
# app.include_router(hume.hume_router)

# Config Hume Agent
# config_client()

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
