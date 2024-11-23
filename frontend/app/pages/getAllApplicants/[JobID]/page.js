"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Extract the JobID
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Image from "next/image";
import Sidebar from "@/app/Components/Sidebar";
import { Toast, toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

function GetAllApplicants() {
  const { JobID } = useParams(); // Extract JobID from the slug
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState(null);

  const fetchApplicants = async () => {
    try {
      const response = await fetch(`http://localhost:5000/job/getAllAppliedApplicants/${JobID}`, {
        method: "GET",
        credentials: "include", // To include cookies
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch applicants.");
      }

      const data = await response.json();
      setApplicants(data.applicants || []);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {

    fetchApplicants();
  }, [JobID]);

  const handleStatusChange = async (applicantId, status) => {
    try {
      const action = status;
      const response = await fetch(
        `http://localhost:5000/job/approveOrRejectApplicant/${JobID}/applicants/${applicantId}/`,
        {
          method: "POST",
          credentials: "include", // To include cookies
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action }), // Pass the status in the request body
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update status.");
      }

      if (response.ok) {
        if (action == "approve") {
          toast.success("Applicant Approved")
        }
        else {
          toast("Applicant Rejected")
        }
        // Refetch applicants to update the UI
        await fetchApplicants();
      }

      // Update the UI after a successful status change
      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant._id === applicantId ? { ...applicant, status } : applicant
        )
      );
    } catch (err) {
      console.error("Error updating applicant status:", err.message);
    }
  };


  return (
    <>
      <Sidebar />
      <ToastContainer></ToastContainer>
      <div className="ml-64 p-3">
        {applicants.length > 0 ? (
          <div className="grid m-2 p-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applicants.map((applicant) => (
              <div
                key={applicant._id}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out w-full lg:w-[800px]"
              >
                <div className="flex items-center mb-4">
                  <Image
                    height={64}
                    width={64}
                    src={`https://res.cloudinary.com/ds2xdkx6f/image/upload/v1/${applicant.profilePicture}`}
                    alt={`${applicant.name}'s profile`}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{applicant.name}</h3>
                    <p className="text-sm text-gray-500">{applicant.email}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <strong>Experience:</strong> {applicant.experience || "N/A"} years
                </div>
                <div className="mb-3">
                  <strong>Tech Stack:</strong>{" "}
                  {applicant.techStack && applicant.techStack.length > 0
                    ? applicant.techStack.join(", ")
                    : "Not specified"}
                </div>
                <div className="mb-3">
                  <strong>Bachelor's:</strong> {applicant.bachelors || "N/A"}
                </div>
                <div className="mb-3">
                  <strong>Master's:</strong> {applicant.masters || "N/A"}
                </div>
                <div className="flex space-x-4">
                  {applicant.LinkedIn && (
                    <a
                      href={applicant.LinkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      <FaLinkedin size={30} />
                    </a>
                  )}
                  {applicant.GitHub && (
                    <a
                      href={applicant.GitHub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:underline"
                    >
                      <FaGithub size={30} />
                    </a>
                  )}
                  <button
                    className="px-4 py-2 bg-gray-900 border-green-400 border-2 text-green-400 rounded-md hover:text-white hover:bg-green-400 transition duration-300"
                    onClick={() => handleStatusChange(applicant._id, "approve")}
                  >
                    Approve
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-900 border-red-600 border-2 text-red-600 rounded-md hover:text-white hover:bg-red-600 transition duration-300"
                    onClick={() => handleStatusChange(applicant._id, "reject")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No applicants found for this job.</p>
        )}
      </div>
    </>
  );
}

export default GetAllApplicants;
