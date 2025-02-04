from fastapi import FastAPI
from contextlib import asynccontextmanager
from starlette.middleware.cors import CORSMiddleware
from scheduler import scheduler
from router import router

@asynccontextmanager
async def lifespan(app):
    scheduler.start()
    yield

app = FastAPI(lifespan=lifespan)

origins = [
    "http://127.0.0.1:8080",
    "http://127.0.0.1:5173",
    "http://localhost:8080",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
