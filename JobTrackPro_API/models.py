from sqlalchemy import Column, Integer, String, DateTime
from database import Base
import datetime

class JobApplication(Base):
    __tablename__ = "job_applications"

    id = Column(Integer, primary_key=True, index=True)
    company = Column(String(255), nullable=False)
    role = Column(String(255), nullable=False)
    status = Column(String(50), default="Pending")
    applied_date = Column(DateTime, default=datetime.datetime.utcnow)
    notes = Column(String(500), nullable=True)
