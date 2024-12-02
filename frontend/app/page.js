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

  const phrases = ["Registered. Verified. Hired."];  
  const [displayText, setDisplayText] = useState(""); 
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0); 
  const [isErasing, setIsErasing] = useState(false); 
  const [charIndex, setCharIndex] = useState(0); 
  const [isTypingPaused, setIsTypingPaused] = useState(false); 


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

  useEffect(() => {
    if (isTypingPaused) {
      const pauseTimeout = setTimeout(() => setIsTypingPaused(false), 100); 
      return () => clearTimeout(pauseTimeout);
    }

    const timeout = setTimeout(() => {
      if (isErasing) {
        if (charIndex > 0) {
          setDisplayText((prev) => prev.slice(0, -1)); 
          setCharIndex((prev) => prev - 1); 
        } else {
          setIsErasing(false);
          setIsTypingPaused(true); 
          setDisplayText("");  
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);  
        }
      } else {
        if (charIndex < phrases[currentPhraseIndex].length) {
          setDisplayText((prev) => prev + phrases[currentPhraseIndex][charIndex]); 
          setCharIndex((prev) => prev + 1); 
        } else {
          setIsErasing(true); 
          setIsTypingPaused(true); 
        }
      }
    }, isErasing ? 200 : 200); 

    return () => clearTimeout(timeout);
  }, [charIndex, isErasing, currentPhraseIndex, isTypingPaused, phrases]);

  return (
    <div>
      {!loading && isLoggedIn && (
        <>
          <Sidebar />

          <ToastContainer theme="dark"></ToastContainer>

          <div className="ml-64 pl-4 pt-4">
            <div className="text-3xl h-16 font-serif text-center font-bold">
              <p>{displayText}</p>
            </div>
              <hr className=" "/>
              
            <div className="p-3"></div>

          </div>
        </>
      )}
    </div>
  );
}
