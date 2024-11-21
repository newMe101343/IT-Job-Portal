"use client"

import React, { useState, useEffect } from 'react';
import Sidebar from '@/app/Components/Sidebar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JobListingHR from '@/app/Components/JobListingHR';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Select from 'react-select';

function JobsListing() {
  const [NewTitle, setNewTitle] = useState("");
  const [NewDescription, setNewDescription] = useState("");
  const [NewRequirements, setNewRequirements] = useState("");
  const [NewTechStack, setNewTechStack] = useState([]);
  const [NewExperience, setNewExperience] = useState("");
  const [ShowAddSkillDiv, setShowAddSkillDiv] = useState(false);
  const [jobListings, setJobListings] = useState([]);

  // Fetch jobs listed by HR
  async function fetchJobsByHR() {
    try {
      const response = await fetch('http://localhost:5000/job/getJobsByHR', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const jobs = await response.json();
        console.log(jobs);
        setJobListings(jobs); // Set job listings
      } else {
        toast.error("Failed to fetch job listings");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching job listings");
    }
  }

  // Fetch job listings when the component loads
  useEffect(() => {
    fetchJobsByHR();
  }, [ShowAddSkillDiv]);

  // Handle new job creation
  async function handleCreateJobClick() {
    const response = await fetch('http://localhost:5000/job/createJobPost', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title: NewTitle,
        description: NewDescription,
        requirements: NewRequirements,
        techStack: NewTechStack.map(skill => skill.value), // Get selected skills as array
        requiredExperience: NewExperience,
      })
    });
    if (response.ok) {
      toast.success("Job Listing Added");
      setShowAddSkillDiv(false);
      setNewDescription("");
      setNewExperience("");
      setNewRequirements("");
      setNewTechStack([]);
      setNewTitle("");
      fetchJobsByHR(); // Refresh job listings after adding a new job
    } else {
      toast.error("Failed to create job listing");
    }
  }

  const techStackOptions = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Java', label: 'Java' },
    { value: 'Python', label: 'Python' },
    { value: 'C', label: 'C' },
    { value: 'C++', label: 'C++' },
    { value: 'C#', label: 'C#' },
    { value: 'PHP', label: 'PHP' },
    { value: 'Ruby', label: 'Ruby' },
    { value: 'Go', label: 'Go' },
    { value: 'Swift', label: 'Swift' },
    { value: 'Kotlin', label: 'Kotlin' },
    { value: 'Rust', label: 'Rust' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'Ruby on Rails', label: 'Ruby on Rails' },
    { value: 'SQL', label: 'SQL' }
  ];

  return (
    <div>
      <Sidebar></Sidebar>
      <div className='ml-64 p-4'>
        <p className='font-bold text-xl'>Your Listings</p>

        <hr className='mt-2' />

        {jobListings.length > 0 &&
          <div className='rounded-md bg-gray-200 mt-4 mb-8 dark:bg-gray-900 p-2'>
            {jobListings.map((job) => <JobListingHR setJobListings={setJobListings} key={job._id} id={job._id} title={job.title} description={job.description} requirements={job.requirements}
              techStack={job.techStack} requiredExperience={job.requiredExperience}></JobListingHR>
            )}
          </div>}

        {/* Add skill input block */}
        {ShowAddSkillDiv && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-2xl w-full">
              {/* Close Button */}
              <button
                onClick={() => setShowAddSkillDiv(false)}
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-2xl"
              >
                &times;
              </button>
              <h2 className="text-2xl font-extrabold mb-4 text-gray-900 dark:text-gray-100 text-center">
                Add Job Listing
              </h2>

              {/* Job Title */}
              <div className="mb-5">
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="title">
                  Job Title
                </label>
                <input
                  value={NewTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  id="title"
                  type="text"
                  placeholder="Enter job title"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                />
              </div>

              {/* Description */}
              <div className="mb-5">
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  value={NewDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  id="description"
                  placeholder="Enter job description"
                  required
                  className="w-full px-4 py-2 h-20 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                ></textarea>
              </div>

              {/* Requirements */}
              <div className="mb-5">
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="requirements">
                  Requirements
                </label>
                <select
                  name="course"
                  value={NewRequirements}
                  onChange={(e) => { setNewRequirements(e.target.value); }}
                  className="block w-10/12 h-12 px-5 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  <option value="">Select a Course</option>
                  <option value="B.Tech in Computer Science and Engineering">B.Tech in Computer Science and Engineering</option>
                  <option value="B.Tech in Information Technology">B.Tech in Information Technology</option>
                  <option value="B.Tech in Electronics and Communication Engineering">B.Tech in Electronics and Communication Engineering</option>
                  <option value="B.Tech in Electrical and Electronics Engineering">B.Tech in Electrical and Electronics Engineering</option>
                  <option value="B.Tech in Mechanical Engineering">B.Tech in Mechanical Engineering</option>
                  <option value="B.Tech in Civil Engineering">B.Tech in Civil Engineering</option>
                  <option value="B.Tech in Aerospace Engineering">B.Tech in Aerospace Engineering</option>
                  <option value="B.Tech in Chemical Engineering">B.Tech in Chemical Engineering</option>
                  <option value="B.Tech in Biotechnology">B.Tech in Biotechnology</option>
                  <option value="B.Tech in Artificial Intelligence">B.Tech in Artificial Intelligence</option>
                  <option value="B.Tech in Machine Learning">B.Tech in Machine Learning</option>
                  <option value="B.Tech in Data Science and Analytics">B.Tech in Data Science and Analytics</option>
                  <option value="B.Tech in Cybersecurity">B.Tech in Cybersecurity</option>
                  <option value="B.Tech in Internet of Things">B.Tech in Internet of Things</option>
                  <option value="B.Tech in Blockchain Technology">B.Tech in Blockchain Technology</option>
                  <option value="B.Tech in Robotics and Automation">B.Tech in Robotics and Automation</option>
                  <option value="B.Sc in Computer Science">B.Sc in Computer Science</option>
                  <option value="B.Sc in Information Technology">B.Sc in Information Technology</option>
                  <option value="B.Sc in Data Science">B.Sc in Data Science</option>
                  <option value="Bachelor of Computer Applications (BCA)">Bachelor of Computer Applications (BCA)</option>
                  <option value="B.Des in UI/UX Design">B.Des in UI/UX Design</option>
                  <option value="B.Des in Game Design">B.Des in Game Design</option>
                  <option value="B.Tech in Marine Engineering">B.Tech in Marine Engineering</option>
                  <option value="B.Tech in Petroleum Engineering">B.Tech in Petroleum Engineering</option>
                  <option value="B.Tech in Mining Engineering">B.Tech in Mining Engineering</option>
                  <option value="B.Tech in Biomedical Engineering">B.Tech in Biomedical Engineering</option>
                  <option value="B.Tech in Food Technology">B.Tech in Food Technology</option>
                  <option value="B.Tech in Textile Technology">B.Tech in Textile Technology</option>
                  <option value="B.Tech in Smart Infrastructure and Urban Planning">B.Tech in Smart Infrastructure and Urban Planning</option>
                  <option value="B.Tech in Cloud Computing">B.Tech in Cloud Computing</option>
                  <option value="B.Tech in Quantum Computing">B.Tech in Quantum Computing</option>
                </select>
              </div>

              {/* Tech Stack */}
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="techStack">
                Tech Stack
              </label>
              <Select
                isMulti
                options={techStackOptions}
                value={NewTechStack}
                onChange={setNewTechStack}
                className="bg-gray-200 dark:bg-gray-900 text-black pb-3 rounded-md mt-2 mb-6"
                placeholder="Select Skills"
              />

              {/* Required Experience */}
              <div className="mb-5">
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="requiredExperience">
                  Required Experience (in years)
                </label>
                <input
                  value={NewExperience}
                  onChange={(e) => setNewExperience(e.target.value)}
                  id="requiredExperience"
                  type="text"
                  placeholder="Enter required experience"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={handleCreateJobClick}
                className="px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Submit
                <FaCheckCircle className='ml-2 inline-block'></FaCheckCircle>
              </button>

              {/* Cancel Button */}
              <button
                onClick={() => {
                  setShowAddSkillDiv(false);
                  setNewDescription("");
                  setNewExperience("");
                  setNewRequirements("");
                  setNewTechStack([]);
                  setNewTitle("");
                }}
                className="px-4 py-2 ml-4 text-lg font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Cancel
                <FaTimesCircle className='ml-2 inline-block'></FaTimesCircle>
              </button>
            </div>
          </div>
        )}
        {/* Add Job Button */}
        {!ShowAddSkillDiv && (
          <button
            onClick={() => setShowAddSkillDiv(true)}
            className="mt-6 flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          >
            <svg
              className="w-5 h-5 mx-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
            </svg>
            <span className="mx-1">Add Job Listing</span>
          </button>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default JobsListing;
