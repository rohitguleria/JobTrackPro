from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class JobApplicationBase(BaseModel):
    company: str
    role: str
    status: Optional[str] = "Pending"
    notes: Optional[str] = None

class JobApplicationCreate(JobApplicationBase):
    pass

class JobApplicationUpdate(JobApplicationBase):
    pass

class JobApplicationResponse(JobApplicationBase):
    id: int
    applied_date: datetime

    class Config:
        from_attributes = True
