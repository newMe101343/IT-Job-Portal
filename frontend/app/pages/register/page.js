"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {

    const router = useRouter();

    const [formData, setFormData] = useState({
        accountType: '',
        Fname: '',
        Lname: '',
        Username: '',
        Email: '',
        Password: '',
        ConfPassword: ''
    });

    // To log accountType whenever it changes (or other state as needed)
    useEffect(() => {
        console.log(formData.accountType);
    }, [formData.accountType]);

    // Generic handle change function
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function onSubmit(e) {

        if(formData.ConfPassword==formData.Password){

            e.preventDefault(); // Prevent the default form submission behavior (page reload)
            
            
            
            if (formData.accountType === "") {
                alert("Choose Account type");
            } else if (formData.accountType === "applicant") {
                
                
                const data = {
                    name: `${formData.Fname} ${formData.Lname}`,
                    email: formData.Email,
                    password: formData.Password,
                };
    
            const response = await fetch("http://localhost:5000/applicant/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            
            console.log(response);
            
            if (response.ok) {
                alert("Added successfully");
                router.push('/')
            } else {
                alert("Error");
            }
        } 
        
        
        
        else {
            // HR route
            
        }
    }

    else{
        e.preventDefault();
        alert("Passwords dont match");
    }
}
    

    return (
        <div>
            <section className="bg-white dark:bg-gray-950">
                <div className="flex justify-center min-h-screen">
                    <div
                        className="hidden bg-cover lg:block lg:w-2/5"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')",
                        }}
                    />
                    <div className="mt-10 items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                        <div className="w-full">
                            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                                Sign Up Now for free
                            </h1>
                            <p className="mt-4 text-gray-500 dark:text-gray-400">
                                Set Up your Account
                            </p>
                            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">First Name</label>
                                    <input
                                        type="text"
                                        name="Fname"
                                        value={formData.Fname}
                                        onChange={handleChange}
                                        className="block w-10/12 h-12 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Last Name</label>
                                    <input
                                        type="text"
                                        name="Lname"
                                        value={formData.Lname}
                                        onChange={handleChange}
                                        className="block w-10/12 h-12 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Username</label>
                                    <input
                                        type="text"
                                        name="Username"
                                        value={formData.Username}
                                        onChange={handleChange}
                                        className="block w-10/12 h-12 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                                    <input
                                        type="email"
                                        name="Email"
                                        value={formData.Email}
                                        onChange={handleChange}
                                        className="block w-10/12 h-12 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                                    <input
                                        type="password"
                                        name="Password"
                                        value={formData.Password}
                                        onChange={handleChange}
                                        className="block w-10/12 h-12 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Confirm password</label>
                                    <input
                                        type="password"
                                        name="ConfPassword"
                                        value={formData.ConfPassword}
                                        onChange={handleChange}
                                        className="block w-10/12 h-12 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Account type</label>
                                    <select
                                        name="accountType"
                                        value={formData.accountType}
                                        onChange={handleChange}
                                        className="block w-10/12 h-12 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    >
                                        <option value="">Select Account Type</option>
                                        <option value="applicant">Applicant</option>
                                        <option value="recruiter">Recruiter</option>
                                    </select>
                                </div>

                                <button
                                    
                                    onClick={onSubmit}
                                    className="flex items-center mt-8 justify-between w-40  h-10  px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                >
                                    Sign Up
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-10 h-6 ml-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 12h14M12 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
