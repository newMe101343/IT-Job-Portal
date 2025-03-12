"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/Components/Sidebar";
import ApplicableJobCard from "@/app/Components/ApplicableJobCard";
import { FaFrown } from "react-icons/fa";
import Link from "next/link";

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
          <div className="flex flex-col p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5h6M9 12h6M9 19h6M4 5l1 15m15-15l-1 15"
                />
              </svg>
              <strong className="text-3xl font-extrabold text-gray-100 ml-4">No Eligible Jobs Found</strong>
              <FaFrown className="mt-1 text-3xl text-gray-400 ml-4" />
            </div>
            <p className="text-lg text-gray-300 mt-2">
              Unfortunately, it looks like you do not meet all the requirements for any eligible jobs at the moment. Here are some suggestions to help you become a more competitive candidate:
            </p>
            <ul className="list-disc ml-8 mt-4 text-gray-300">
              <li className="mt-2">Enhance your tech stack by learning new technologies and frameworks.</li>
              <li className="mt-2">Consider gaining skills in high-demand areas such as cloud computing, machine learning, and DevOps.</li>
              <li className="mt-2">Update your experience and qualifications to better align with job descriptions.</li>
            </ul>
            <p className="mt-4 text-sm text-gray-400">
              These steps can open up more opportunities on our platform and increase your chances of landing your next job!
            </p>



            <div className="mt-6">
              <Link href="/pages/profile-applicant" className="inline-block text-lg text-blue-500 hover:underline">
                Update your profile and skills here.
              </Link>
            </div>
          </div>

        )}
      </div>
    </div>
  );
}

export default Jobs;
