"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../../Contexts/userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
  const [AccType, setAccType] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useUserContext();
  const router = useRouter();
  const [Pass, setPass] = useState("");
  const [Email, setEmail] = useState("");

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePass = (e) => setPass(e.target.value);

  const onSubmit = async () => {
    if (Email === "") {
      toast("Enter Email");
      return;
    }

    if (Pass === "") {
      toast("Enter Password");
      return;
    }

    const data = { email: Email, password: Pass };
    let response;

    try {
      if (AccType === "applicant") {
        response = await fetch("http://localhost:5000/applicant/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        });
      } else if (AccType === "recruiter") {
        response = await fetch("http://localhost:5000/HR/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        });
      } else {
        toast.error("Please select account type.");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message); // Display backend error message
        return;
      }

      toast.success("Sign In Successful");

      setTimeout(() => {
        setIsLoggedIn(true); // Update context state to logged in
        localStorage.setItem('isLoggedIn', JSON.stringify(true)); // Sync with localStorage
        router.push("/"); // Redirect to homepage
      }, 2000);
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("An error occurred during sign-in");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  const handleAccTypeChange = (e) => setAccType(e.target.value);

  return (
    <div>
      <div className="bg-white dark:bg-slate-950">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)'
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">TechHire</h2>
                <p className="max-w-xl mt-3 text-gray-300">
                  Welcome to TechHire — the platform where talent meets opportunity.
                  Showcase your skills, connect with top IT recruiters, and explore exciting job opportunities. Whether you're a developer, designer, or tech enthusiast, find the perfect role that aligns with your expertise and passion.
                </p>
              </div>
            </div>
          </div>

          <div className="flex mt-16 w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <div className="h-8"> {/* Fixed height to prevent shifting */}
                  <p className="text-black text-3xl font-bold font-serif dark:text-white">TechHire</p>
                </div>
                <br />
              </div>

              <div>
                <form>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleChangeEmail}
                      value={Email}
                      placeholder="example@example.com"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                    </div>

                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={Pass}
                      onKeyDown={handleKeyPress}
                      onChange={handleChangePass}
                      placeholder="Your Password"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div>
                    <label className="block mb-4 mt-4  text-sm text-gray-600 dark:text-gray-200">Account type</label>
                    <select
                      name="accountType"
                      value={AccType}
                      onChange={handleAccTypeChange}
                      className="block w-10/12 h-12 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                      <option value="">Select Account Type</option>
                      <option value="applicant">Applicant</option>
                      <option value="recruiter">Recruiter</option>
                    </select>
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      onKeyDown={handleKeyPress}
                      onClick={onSubmit}
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      Sign in
                    </button>
                  </div>
                </form>

                <p className="mt-6 text-sm text-center text-gray-400">Don’t have an account yet? <Link href="../pages/register" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</Link></p>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
