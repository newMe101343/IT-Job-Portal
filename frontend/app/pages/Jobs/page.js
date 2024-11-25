"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/Components/Sidebar";
import ApplicableJobCard from "@/app/Components/ApplicableJobCard";
import { FaFrown } from "react-icons/fa";

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
          <div className='flex flex-col '>
            <div className="flex items-center">
              <strong className="text-2xl inline float-left">No eligible jobs found!</strong>
              <FaFrown className=" mt-1 text-2xl ml-4 float-left" />
            </div>
            <p className="mt-4 dark:text-white">
              It looks like you may not meet all the requirements for eligible jobs. Here are a few suggestions:
            </p>
            <ul className="list-disc ml-6 dark:text-white">
              <li>Enhance your tech stack by learning new programming languages or tools.</li>
              <li>Consider adding more relevant skills such as cloud computing, machine learning, or modern frameworks.</li>
              <li>Update your experience and qualifications to match the job requirements.</li>
            </ul>
            <p className="mt-2 text-sm dark:text-white">
              These updates can help you become eligible for a wider range of job opportunities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;
