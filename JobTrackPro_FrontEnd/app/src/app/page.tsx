"use client";

import { useEffect, useState } from "react";
import { fetchJobs, addJob, updateJob, deleteJob } from "../utils/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";


export default function JobTracker() {
  const [jobs, setJobs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [formData, setFormData] = useState({ company: "", role: "", status: "Applied" });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const data = await fetchJobs();
    setJobs(data);
  };

  const handleSubmit = async () => {
    if (editJob) {
      await updateJob(editJob.id, formData);
    } else {
      await addJob(formData);
    }
    setModalOpen(false);
    setEditJob(null);
    setFormData({ company: "", role: "", status: "Applied" });
    loadJobs();
  };

  const handleEdit = (job) => {
    setEditJob(job);
    setFormData(job);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteJob(id);
    loadJobs();
  };

  const chartData = jobs.reduce((acc, job) => {
    const existing = acc.find((item) => item.status === job.status);
    if (existing) existing.count++;
    else acc.push({ status: job.status, count: 1 });
    return acc;
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Job Application Tracker</h1>
      <Button onClick={() => setModalOpen(true)}>+ Add Job</Button>
      <div className="mt-6 grid gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 border rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{job.company}</h3>
              <p>{job.role}</p>
              <p>Status: <span className="font-semibold">{job.status}</span></p>
            </div>
            <div>
              <Button onClick={() => handleEdit(job)}>Edit</Button>
              <Button onClick={() => handleDelete(job.id)} className="ml-2 bg-red-500">Delete</Button>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mt-8">Application Status Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2 className="text-xl font-bold">{editJob ? "Edit Job" : "Add Job"}</h2>
          <Input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Company" />
          <Input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="Role" />
          <Button onClick={handleSubmit}>{editJob ? "Update" : "Add"}</Button>
        </Modal>
      )}
    </div>
  );
}
