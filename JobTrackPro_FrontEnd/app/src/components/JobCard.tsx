"use client";

import React from "react";

interface JobProps {
  job: {
    id: number;
    company: string;
    role: string;
    status: string;
    notes?: string;
    applied_date: string;
  };
  onDelete: (id: number) => void;
}

const JobCard: React.FC<JobProps> = ({ job, onDelete }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{job.company}</h3>
      <p>{job.role}</p>
      <p>Status: <span className="font-semibold">{job.status}</span></p>
      <p className="text-sm text-gray-500">Applied on: {new Date(job.applied_date).toLocaleDateString()}</p>
      {job.notes && <p className="text-sm text-gray-600">Notes: {job.notes}</p>}
      <button onClick={() => onDelete(job.id)} className="mt-2 bg-red-500 text-white px-2 py-1 rounded">
        Delete
      </button>
    </div>
  );
};

export default JobCard;
