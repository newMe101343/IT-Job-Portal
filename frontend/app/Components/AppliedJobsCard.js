"use client";

import React, { useEffect, useState } from "react";
import {
  FaTools,
  FaGraduationCap,
  FaCodeBranch,
  FaClipboard,
  FaInfoCircle,
  FaBuilding,
  FaListAlt,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppliedJobCard({
  id,
  company,
  company_category,
  title,
  description,
  requirements,
  techStack,
  requiredExperience,
}) {
  const [jobStatus, setJobStatus] = useState("Loading...");

  // Fetch job status on component mount
  useEffect(() => {
    async function fetchJobStatus() {
      try {
        const response = await fetch(`http://localhost:5000/job/checkJobStatus/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setJobStatus(data.status || "Not available");
        } else {
          const errorData = await response.json();
          setJobStatus(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error checking status:", error);
        setJobStatus("Failed to fetch status.");
      }
    }

    fetchJobStatus();
  }, [id]);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out mb-4">
      <div className="flex items-center mb-4">
        <FaClipboard className="mr-2 text-blue-600 text-2xl" />
        <h3 className="font-bold text-3xl text-gray-900 dark:text-white">{title}</h3>
      </div>
      <hr className="mb-2" />
      <div className="flex items-center mb-4">
        <FaInfoCircle className="mr-2 text-yellow-500 text-2xl" />
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
        <FaTools className="mr-2 text-blue-500" />
        <span>
          <strong>Requirements:</strong> {requirements}
        </span>
      </div>
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
        <FaCodeBranch className="mr-2 text-green-500" />
        <span>
          <strong>Tech Stack:</strong> {techStack.join(", ")}
        </span>
      </div>
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
        <FaGraduationCap className="mr-2 text-yellow-500" />
        <span>
          <strong>Experience:</strong> {requiredExperience} years
        </span>
      </div>
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
        <FaBuilding className="mr-2 text-blue-500" />
        <span>
          <strong>Company:</strong> {company}
        </span>
      </div>

      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
        <FaListAlt className="mr-2 text-green-500" />
        <span>
          <strong>Company Category:</strong> {company_category}
        </span>
      </div>
      <div className="flex  justify-end">
        <div className="inline-block bg-gray-300 dark:bg-gray-700 text-right border-2 p-2">
          <strong>Status:</strong>
          <span className="ml-2">{jobStatus}</span>
        </div>
      </div>



    </div>
  );
}
