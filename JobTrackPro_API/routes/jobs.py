from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import crud
import schemas

router = APIRouter(prefix="/jobs", tags=["Job Applications"])

@router.post("/", response_model=schemas.JobApplicationResponse)
def create_job(job_data: schemas.JobApplicationCreate, db: Session = Depends(get_db)):
    return crud.create_job_application(db, job_data)

@router.get("/", response_model=list[schemas.JobApplicationResponse])
def list_jobs(db: Session = Depends(get_db)):
    return crud.get_job_applications(db)

@router.get("/{job_id}", response_model=schemas.JobApplicationResponse)
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = crud.get_job_application(db, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.put("/{job_id}", response_model=schemas.JobApplicationResponse)
def update_job(job_id: int, job_data: schemas.JobApplicationUpdate, db: Session = Depends(get_db)):
    job = crud.update_job_application(db, job_id, job_data)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.delete("/{job_id}")
def delete_job(job_id: int, db: Session = Depends(get_db)):
    job = crud.delete_job_application(db, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return {"message": "Job deleted successfully"}
