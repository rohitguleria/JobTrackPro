from sqlalchemy.orm import Session
from models import JobApplication
from schemas import JobApplicationCreate, JobApplicationUpdate

# Create a new job application
def create_job_application(db: Session, job_data: JobApplicationCreate):
    job = JobApplication(**job_data.dict())
    db.add(job)
    db.commit()
    db.refresh(job)
    return job

# Get all job applications
def get_job_applications(db: Session):
    return db.query(JobApplication).all()

# Get a single job application by ID
def get_job_application(db: Session, job_id: int):
    return db.query(JobApplication).filter(JobApplication.id == job_id).first()

# Update a job application
def update_job_application(db: Session, job_id: int, job_data: JobApplicationUpdate):
    job = db.query(JobApplication).filter(JobApplication.id == job_id).first()
    if job:
        for key, value in job_data.dict(exclude_unset=True).items():
            setattr(job, key, value)
        db.commit()
        db.refresh(job)
    return job

# Delete a job application
def delete_job_application(db: Session, job_id: int):
    job = db.query(JobApplication).filter(JobApplication.id == job_id).first()
    if job:
        db.delete(job)
        db.commit()
    return job
