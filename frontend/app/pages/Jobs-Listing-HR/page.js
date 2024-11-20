"use client"

import React from 'react'
import { useState } from 'react';
import Sidebar from '@/app/Components/Sidebar'

function JobsListing() {

  const [NewTitle, setNewTitle] = useState("");
  const [NewDescription, setNewDescription] = useState("");
  const [NewRequirements, setNewRequirements] = useState("");
  const [NewTechStack, setNewTechStack] = useState("");
  const [NewExperience, setNewExperience] = useState("");

  const [ShowAddSkillDiv, setShowAddSkillDiv] = useState(false);

  async function handleAddJobListingClick() {
    console.log("job listing req frontend");

  }

  return (
    <div>
      <Sidebar></Sidebar>
      <div className='ml-64 p-4'>

        <p className='font-bold text-xl'>Your Listings</p>

        <div className='rounded-md bg-gray-200 mt-4 mb-8 dark:bg-gray-900 p-2'>
          Listings
        </div>

        {/*Add skill input block*/}
        {ShowAddSkillDiv && <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-3xl ">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100 text-center">
            Add Job Listing
          </h2>

          {/* Title */}
          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="title"
            >
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
          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              value={NewDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              id="description"
              placeholder="Enter job description"
              required
              className="w-full px-4 py-2 h-24 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
            ></textarea>
          </div>

          {/* Requirements */}
          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="requirements"
            >
              Requirements
            </label>
            <textarea
              value={NewRequirements}
              onChange={(e)=>setNewRequirements(e.target.value)}
              id="requirements"
              placeholder="Enter job requirements"
              required
              className="w-full px-4 py-2 h-24 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
            ></textarea>
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="techStack"
            >
              Tech Stack
            </label>
            <input
            value={NewTechStack}
             onChange={(e)=>setNewTechStack(e.target.value)}
              id="techStack"
              type="text"
              placeholder="Enter tech stack (comma-separated)"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
            />
          </div>

          {/* Required Experience */}
          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="requiredExperience"
            >
              Required Experience (in years)
            </label>
            <input
            value={NewExperience}
            onChange={(e)=>setNewExperience(e.target.value)}
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
            className=" px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit Job Listing
          </button>
        </div>
        }

        { /*Initial Click button*/}
        {!ShowAddSkillDiv && <button onClick={() => setShowAddSkillDiv(true)} className="mt-6 flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
          <svg
            className="w-5 h-5 mx-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
          </svg>
          <span className="mx-1">Add Job Listing</span>
        </button>}

      </div>
    </div>
  )
}

export default JobsListing
