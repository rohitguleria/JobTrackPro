from fastapi import FastAPI
from database import engine, Base
from routes import jobs
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app (MUST be before adding middleware)
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for testing)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Include job application routes
app.include_router(jobs.router)

@app.get("/")
def home():
    return {"message": "Job Application Tracker API is running!"}
