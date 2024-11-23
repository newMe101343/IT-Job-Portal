"use client"

import React, { useState } from 'react';
import { FaTools, FaGraduationCap, FaCodeBranch, FaClipboard, FaInfoCircle, FaBuilding, FaListAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function AppliedJobCard({ id, company, company_category, title, description, requirements, techStack, requiredExperience }) {

  async function checkStatus() {
    try {
      const response = await fetch(`http://localhost:5000/job/checkJobStatus/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include"
      });

      if (response.ok) {
        const data = await response.json();
        toast(`Status: ${data.status}`);
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error checking status:", error);
      toast.error("Failed to check status. Please try again.");
    }
  }


  return (
    <div className="p-6 bg-white  dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out mb-4">
      <div className="flex items-center mb-4">
        <FaClipboard className="mr-2 text-blue-600 text-2xl" />
        <h3 className="font-bold text-3xl text-gray-900 dark:text-white">{title}</h3>
      </div>
      <hr className='mb-2' />
      <div className="flex items-center mb-4">
        <FaInfoCircle className="mr-2 text-yellow-500 text-2xl" />
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
        <FaTools className="mr-2 text-blue-500" />
        <span><strong>Requirements:</strong> {requirements}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
        <FaCodeBranch className="mr-2 text-green-500" />
        <span><strong>Tech Stack:</strong> {techStack.join(", ")}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
        <FaGraduationCap className="mr-2 text-yellow-500" />
        <span><strong>Experience:</strong> {requiredExperience} years</span>
      </div>
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
        <FaBuilding className="mr-2 text-blue-500" />  {/* Use a building icon for the company */}
        <span><strong>Company:</strong> {company} </span>
      </div>

      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
        <FaListAlt className="mr-2 text-green-500" />  {/* Use a list icon for company category */}
        <span><strong>Company Category:</strong> {company_category} </span>
      </div>
      <div className="flex justify-end">
        <button
          onClick={checkStatus}
          className="px-4 py-2 bg-gray-900 border-blue-700 border-2 text-white rounded-md hover:text-white hover:bg-blue-700 transition duration-300"
        >
          Check Status
        </button>
      </div>
    </div>
  );
}
