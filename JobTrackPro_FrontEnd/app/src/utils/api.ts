import axios from "axios";

const API_URL = "http://127.0.0.1:8000/jobs";

// Fetch all jobs
export const fetchJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a new job (renamed from createJob to addJob)
export const addJob = async (job: { company: string; role: string; status?: string; notes?: string }) => {
  const response = await axios.post(API_URL, job);
  return response.data;
};

// Update an existing job
export const updateJob = async (id: number, job: { company: string; role: string; status?: string; notes?: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, job);
  return response.data;
};

// Delete a job
export const deleteJob = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
