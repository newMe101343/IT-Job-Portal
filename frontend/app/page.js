"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Components/Sidebar";
import { useUserContext } from "./Contexts/userContext";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { isLoggedIn, setIsLoggedIn } = useUserContext();
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {


    if (loading) {
      setLoading(false);
      return;
    }

    if (isLoggedIn) {
      const getUserDetails = async () => {
        try {
          let response, data;

          if (localStorage.getItem("accType") === "applicant") {
            response = await fetch("http://localhost:5000/applicant/findOneApplicant", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include", 
            });
            data = await response.json();
          } else if (localStorage.getItem("accType") === "recruiter") {
            response = await fetch("http://localhost:5000/HR/findOneHR", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            });
            data = await response.json();
          }

          if (response.ok) {
            setUser(data); // Save user details in state
          } else {
            console.error(data.message || "Error fetching user details");
          }
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        } finally {
          setLoading(false); // Set loading state to false after the request completes
        }
      };
      getUserDetails();
    } else {
      setLoading(false); // If not logged in, set loading to false
    }

    if (!isLoggedIn) {
      router.push("/pages/sign-in"); // Redirect if not logged in
    }
  }, [isLoggedIn, loading, router]);

  return (
    <div>
      {/* Only render the Sidebar and content if the user is logged in and not loading */}
      {!loading && isLoggedIn && (
        <>
          <Sidebar />

          <ToastContainer theme="dark"></ToastContainer>
          <div className="ml-64 pl-4 pt-4">
           
          </div>
        </>
      )}
    </div>
  );
}
