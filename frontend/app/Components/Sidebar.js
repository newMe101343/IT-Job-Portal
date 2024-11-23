"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserContext } from "../Contexts/userContext";

function Sidebar() {
    const { isLoggedIn, setIsLoggedIn } = useUserContext();
    const [user, setUser] = useState(null); // State to store user data
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For handling errors
    const [isUserApplicant, setIsUserApplicant] = useState(false); // Track account type

    const router = useRouter();

    // Fetch account type from localStorage safely
    useEffect(() => {
        if (typeof window !== "undefined") {
            const accType = localStorage.getItem("accType");
            setIsUserApplicant(accType === "applicant");
        }
    }, []);

    // Fetch user details only when logged in
    useEffect(() => {
        if (isLoggedIn) {
            const getUserDetails = async () => {
                try {
                    let response, data;

                    if (localStorage.getItem("accType") === "applicant") {
                        // Fetch for Applicant
                        response = await fetch("http://localhost:5000/applicant/findOneApplicant", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            credentials: "include", // Include cookies
                        });
                    } else if (localStorage.getItem("accType") === "recruiter") {
                        // Fetch for Recruiter
                        response = await fetch("http://localhost:5000/HR/findOneHR", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            credentials: "include",
                        });
                    }

                    if (response) {
                        data = await response.json();
                        if (response.ok) {
                            setUser(data); // Save user details
                        } else {
                            setError(data.message || "Error fetching user details");
                        }
                    }
                } catch (error) {
                    console.error("Failed to fetch user details:", error);
                    setError("Failed to fetch user details");
                } finally {
                    setLoading(false); // Set loading state to false
                }
            };

            getUserDetails();
        } else {
            setLoading(false); // If not logged in, set loading to false
        }
    }, [isLoggedIn]);

    // Log out function
    const logOutClick = async () => {
        try {
            if (localStorage.getItem("accType") === "applicant") {
                await fetch("http://localhost:5000/applicant/logout", {
                    method: "POST",
                    credentials: "include",
                });
            } else if (localStorage.getItem("accType") === "recruiter") {
                await fetch("http://localhost:5000/HR/logout", {
                    method: "POST",
                    credentials: "include",
                });
            }

            setIsLoggedIn(false); // Update context
            localStorage.removeItem("accessToken"); // Clear localStorage
            localStorage.removeItem("accType");
            router.push("/pages/sign-in"); // Redirect to sign-in
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <div className="inline-block fixed border-r-2 border-neutral-100 dark:border-black dark:bg-gray-950 ">
            <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-gray-200 dark:text-white  border-r rtl:border-r-0 rtl:border-l dark:bg-gray-950 dark:border-gray-700">
                <div className="flex flex-col justify-between flex-1">
                    <nav>
                        <Image
                            className="sm:w-32 sm:h-32 rounded-xl ml-10"
                            src={
                                user?.profilePicture
                                    ? `https://res.cloudinary.com/ds2xdkx6f/image/upload/v1/${user.profilePicture}`
                                    : "/logo.png"
                            }
                            alt="Profile Picture"
                            width={1024}
                            height={1024}
                        />

                        <div className="flex items-center text-2xl font-extrabold py-2 mt-2 black transition-colors duration-300 transform rounded-lg dark:text-gray-400">
                            <span className="mx-auto">{loading ? "Loading..." : user?.username}</span>
                        </div>
                        <div className="flex items-center py-2 text-black transition-colors duration-300 transform rounded-lg dark:text-gray-400">
                            <span className="mx-auto">{loading ? "Loading..." : user?.email}</span>
                        </div>

                        <hr className="mt-2" />

                        {isUserApplicant&&
                        <Link
                            href="/pages/Jobs"
                            className="flex items-center px-4 py-2 mt-5 text-black transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-200"
                        >
                            <span className="mx-4 font-medium">Jobs</span>
                        </Link>}

                        {isUserApplicant && (
                            <Link
                                href="/"
                                className="flex items-center px-4 py-2 mt-5 text-black transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-200"
                            >
                                <span className="mx-4 font-medium">Applied Jobs</span>
                            </Link>
                        )}
                        {!isUserApplicant && (
                            <Link
                                href="/pages/profile-HR"
                                className="flex items-center px-4 py-2 mt-5 text-black transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-200"
                            >
                                <span className="mx-4 font-medium">Profile</span>
                            </Link>
                        )}

                        {!isUserApplicant && (
                            <Link
                                href="/pages/Jobs-Listing-HR"
                                className="flex items-center px-4 py-2 mt-5 text-black transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-200"
                            >
                                <span className="mx-4 font-medium">Job Listing</span>
                            </Link>
                        )}

                        {isUserApplicant && (
                            <Link
                                href="/pages/profile-applicant"
                                className="flex items-center px-4 py-2 mt-5 text-black transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-200"
                            >
                                <span className="mx-4 font-medium">Profile</span>
                            </Link>
                        )}


                        <Link
                            href="/pages/settings"
                            className="flex items-center px-4 py-2 mt-5 text-black transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-200"
                        >
                            <span className="mx-4 font-medium">Settings</span>
                        </Link>

                        <button
                            onClick={logOutClick}
                            className="flex items-center px-4 py-2 mt-5 text-black transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-200"
                        >
                            <span className="mx-4 font-medium">Log Out</span>
                        </button>
                    </nav>
                </div>
            </aside>
        </div>
    );
}

export default Sidebar;
