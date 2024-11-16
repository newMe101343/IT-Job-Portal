"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useUserContext } from '../Contexts/userContext';

function Sidebar() {
    const { isLoggedIn, setIsLoggedIn } = useUserContext();
    const [user, setUser] = useState(null);  // State to store user data
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For handling errors

    const router = useRouter();

    // Fetch user details
    async function getUserDetails() {

        //for Applicant
        try {
            const response = await fetch('http://localhost:5000/applicant/findOneApplicant', {
                method: 'POST', // Assuming you're using POST method
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies with the request
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data); // Save user details in state
            } else {
                setError(data.message || 'Error fetching user details');
            }
        } catch (error) {
            console.error('Failed to fetch user details:', error);
            setError('Failed to fetch user details');
        } finally {
            setLoading(false); // Set loading state to false after the request completes
        }

        //for HR
        try {
            const response = await fetch('http://localhost:5000/HR/findOneHR', {
                method: 'POST', // Assuming you're using POST method
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies with the request
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data); // Save user details in state
            } else {
                setError(data.message || 'Error fetching user details');
            }
        } catch (error) {
            console.error('Failed to fetch user details:', error);
            setError('Failed to fetch user details');
        } finally {
            setLoading(false); // Set loading state to false after the request completes
        }
    }




    // Log out function
    async function logOutClick() {
        try {
            await fetch("http://localhost:5000/applicant/logout", {
                method: 'POST',
                credentials: 'include',
            });

            await fetch("http://localhost:5000/HR/logout", {
                method: 'POST',
                credentials: 'include',
            });

            setIsLoggedIn(false);
            localStorage.removeItem('accessToken');  // Clear access token from local storage
            router.push("/pages/sign-in");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            getUserDetails();  // Fetch user details when the user is logged in
        } else {
            setLoading(false);  // Set loading to false if user is not logged in
        }
    }, [isLoggedIn]);

    return (
        <div className='inline-block fixed border-r-2 border-neutral-100 clear-both dark:border-black'>
            <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-gray-200 border-r rtl:border-r-0 rtl:border-l dark:bg-gray-950 dark:border-gray-700">
                <div className="flex flex-col justify-between flex-1 ">
                    <nav>

                        <Image
                            className="sm:w-32 sm:h-32 rounded-xl ml-10"
                            src="/logo.png"
                            alt="Logo"
                            width={1024}
                            height={1024}
                        />

                        {/* Display username if available */}
                        <div className="flex items-center text-2xl font-extrabold px py-2 mt-2 black transition-colors duration-300 transform rounded-lg dark:text-gray-400">
                            <span className="mx-auto font-2xl">{loading ? 'Loading...' : user?.username}</span>
                        </div>

                        {/* Display email if available */}
                        <div className="flex items-center py-2 text-black transition-colors duration-300 transform rounded-lg dark:text-gray-400">
                            <span className="mx-auto font-2xl">{loading ? 'Loading...' : user?.email}</span>
                        </div>

                        

                        <hr className='mt-2 ' />

                        <Link className="flex items-center px-4 py-2 mt-5 text-black transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="/">
                            <span className="mx-4 font-medium">Dashboard</span>
                        </Link>

                        <Link className="flex items-center px-4 py-2 mt-5 text-black transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="/">
                            <span className="mx-4 font-medium">Jobs</span>
                        </Link>

                        <button className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <span className="mx-4 font-medium">Profile</span>
                        </button>

                        <Link href="/" className="flex items-center px-4 py-2 mt-5 text-black transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <span className="mx-4 font-medium">Settings</span>
                        </Link>

                        <button onClick={logOutClick} className="flex items-center px-4 py-2 mt-5 text-black transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <span className="mx-4 font-medium">Log Out</span>
                        </button>
                    </nav>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar
