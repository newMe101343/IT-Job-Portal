"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/Components/Sidebar";
import ApplicableJobCard from "@/app/Components/ApplicableJobCard";

function Jobs() {
  const [jobs, setJobs] = useState([]); // State to hold the fetched jobs

  // Fetch jobs from the backend when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/job/getEligibleJobs", {
          credentials: "include" 
        });
        if (response.ok) {
          const data = await response.json();  
          setJobs(data.eligibleJobs); 
          console.log(data.eligibleJobs);
          
        } else {
          console.error("Failed to fetch jobs:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error); 
      }
    };

    fetchJobs(); 
  }, []); 

  return (
    <div>
      <Sidebar />
        <div className="ml-64 p-3">
          {/* Check if there are jobs to display */}
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <ApplicableJobCard
                company={job.hrId.company}
                company_category={job.hrId.company_category}
                key={job._id} 
                id={job._id} 
                title={job.title}
                description={job.description}
                requirements={job.requirements}
                techStack={job.techStack}
                requiredExperience={job.requiredExperience}
              />
            ))
          ) : (
            <p>No eligible jobs found!</p>
          )}
        </div>
    </div>
  );
}

export default Jobs;
