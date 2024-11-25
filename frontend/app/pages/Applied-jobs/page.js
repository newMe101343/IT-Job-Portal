"use client"

import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/Components/Sidebar';
import AppliedJobCard from './../../Components/AppliedJobsCard';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function AppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/job/getJobsAppliedByApplicant', {
          method: 'GET',
          credentials: 'include', 
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch applied jobs');
        }
  
        // Check if the response body is empty
        const data = await response.json().catch(() => []); // Fallback to empty array if JSON parsing fails
  
        // If data is an array but empty, don't throw an error
        if (Array.isArray(data) && data.length === 0) {
          setAppliedJobs([]); // Handle empty response
        } else {
          setAppliedJobs(data.jobs || []); // Handle non-empty response
        }
  
      } catch (err) {
        console.error(err.message);
      }
    };
  
    fetchAppliedJobs();
  }, []);
  

  return (
    <div>
      <Sidebar />
      <div className='ml-64 p-3'>
        { (
          appliedJobs && appliedJobs.length > 0 ? (
            appliedJobs.map((job) => (
              <AppliedJobCard
                key={job._id}
                id={job._id}
                company={job.hrId?.company || 'Unknown'} 
                company_category={job.hrId?.company_category|| 'N/A'}
                title={job.title}
                description={job.description}
                requirements={job.requirements}
                techStack={job.techStack}
                requiredExperience={job.requiredExperience}
              />
            ))
          ) : (
            <div>No Jobs applied for.</div>
          )
        )}
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default AppliedJobs;
