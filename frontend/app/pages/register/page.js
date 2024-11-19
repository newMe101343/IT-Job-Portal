"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        accountType: '',
        Fname: '',
        Lname: '',
        Username: '',
        Email: '',
        Password: '',
        ConfPassword: '',
        profilePicture: null, // Ensure profilePicture is part of the formData state
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

    // Handle profile picture change
    function handleProfilePicChange(e) {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            profilePicture: file // Update state with the selected file
        }));
    }

    async function onSubmit(e) {
        e.preventDefault(); // Ensure the form doesn't reload

        if (formData.ConfPassword === formData.Password) {

            if (formData.accountType === "") {
                toast("Choose Account type");
            } else {

                const formDataToSend = new FormData();
                formDataToSend.append('name', `${formData.Fname} ${formData.Lname}`);
                formDataToSend.append('username', formData.Username);
                formDataToSend.append('email', formData.Email);
                formDataToSend.append('password', formData.Password);
                formDataToSend.append('profilePicture', formData.profilePicture); // Ensure profilePicture is appended

                const endpoint = formData.accountType === "applicant"
                    ? "http://localhost:5000/applicant/register"
                    : "http://localhost:5000/HR/register";

                const response = await fetch(endpoint, {
                    method: "POST",
                    body: formDataToSend,
                });

                if (response.ok) {
                    toast.success("Account Created Successfully");
                    setTimeout(() => {
                        router.push("/"); // Redirect after success
                    }, 3000);
                } else {
                    toast.error("Email Already Exists");
                }
            }

        } else {
            toast.error("Passwords don't match");
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
                            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                                {/* First Name */}
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
                                {/* Last Name */}
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
                                {/* Username */}
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
                                {/* Email */}
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
                                {/* Password */}
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
                                {/* Confirm Password */}
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
                                {/* Account Type */}
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Account type</label>
                                    <select
                                        name="accountType"
                                        value={formData.accountType}
                                        onChange={handleChange}  // Only use onChange
                                        className="block w-10/12 h-12 px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    >
                                        <option value="">Select account type</option>
                                        <option value="applicant">Applicant</option>
                                        <option value="HR">HR</option>
                                    </select>
                                </div>
                                {/* Profile Picture */}
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Profile Picture</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePicChange}
                                        className="block w-10/12 h-12 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-10/12 px-5 py-3 mt-8 text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
                                >
                                    Create Account
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </div>
    );
}
