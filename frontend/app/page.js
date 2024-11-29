"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Components/Sidebar";
import { useUserContext } from "./Contexts/userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { isLoggedIn, setIsLoggedIn } = useUserContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === "A") {
        router.push("/pages/admin"); 
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [router]);

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
            response = await fetch(
              "http://localhost:5000/applicant/findOneApplicant",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
              }
            );
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
            setUser(data);
          } else {
            console.error(data.message || "Error fetching user details");
          }
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        } finally {
          setLoading(false);
        }
      };
      getUserDetails();
    } else {
      setLoading(false);
    }

    if (!isLoggedIn) {
      router.push("/pages/sign-in");
    }
  }, [isLoggedIn, loading, router]);

  return (
    <div>
      {!loading && isLoggedIn && (
        <>
          <Sidebar />

          <ToastContainer theme="dark"></ToastContainer>
          <div className="ml-64 pl-4 pt-4">
            <p>HOME</p>
          </div>
        </>
      )}
    </div>
  );
}
