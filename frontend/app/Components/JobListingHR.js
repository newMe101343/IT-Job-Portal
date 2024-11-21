// JobListingHR.js
import React, { useState } from 'react';
import { FaTools, FaGraduationCap, FaCodeBranch, FaClipboard, FaInfoCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function JobListingHR({ id, title, description, requirements, techStack, requiredExperience, setJobListings }) {

  const [ShowPopup, setShowPopup] = useState(false);

  async function deleteJobPost() {
    try {
      const response = await fetch(`http://localhost:5000/job/deleteJobPost/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (response.ok) {
        toast.success('Job listing deleted successfully');
        // Remove the deleted job from the local state
        setJobListings(prevJobs => prevJobs.filter(job => job._id !== id)); 
        setShowPopup(false);
      } else {
        const errorData = await response.json();
        toast.warning(`Failed to delete job listing: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.warning('Failed to delete job listing');
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out mb-1">
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
      <div className="flex justify-end">
        <button
          onClick={() => setShowPopup(true)}
          className="px-4 py-2 bg-gray-900 border-red-700 border-2 text-red-500 rounded-md hover:text-white hover:bg-red-700 transition duration-300"
        >
          Delete
        </button>
      </div>

      {ShowPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold text-gray-800">Are you sure you want to delete this job?</h2>
            <p className="text-gray-600 mt-2">This action cannot be undone.</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={deleteJobPost}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
