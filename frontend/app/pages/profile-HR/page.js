"use client";

import React, { useState, useEffect } from "react";
import { useUserContext } from "@/app/Contexts/userContext";
import Sidebar from "@/app/Components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const capitalizeName = (name) => {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

const ProfileHR = () => {

    const router = useRouter();

    const [NewPassword, setNewPassword] = useState("");
    const [NewEmail, setNewEmail] = useState("");
    const [NewUsername, setNewUsername] = useState("");
    const [NewCompany, setNewCompany] = useState("");
    const [NewWebsite, setNewWebsite] = useState("");
    const [NewCompanyCategory, setNewCompanyCategory] = useState("");



    const [user, setUser] = useState(null);
    const { isLoggedIn, setIsLoggedIn } = useUserContext();
    const [ShowPopup, setShowPopup] = useState(false);

    const [ShowUpdateUsername, setShowUpdateUsername] = useState(false);
    const [ShowUpdateEmail, setShowUpdateEmail] = useState(false);
    const [ShowUpdateCompany, setShowUpdateCompany] = useState(false);
    const [ShowUpdateWebsite, setShowUpdateWebsite] = useState(false);
    const [ShowUpdateCompanyCategory, setShowUpdateCompanyCategory] = useState(false);


    async function handleUpdatePasswordClick() {
        const response = await fetch("http://localhost:5000/HR/updatePassword", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newPass: NewPassword }),
        });
        if (response.ok) {
            toast.success("Password Updated");
            setNewPassword("");
        }
    }

    async function handleUpdateEmailClick() {
        const response = await fetch("http://localhost:5000/HR/updateEmail", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newEmail: NewEmail }),
        });
        if (response.ok) {
            toast.success("Email Updated");
            setNewEmail("");
            setShowUpdateEmail(false);
        }
    }

    async function handleUpdateUsernameClick() {
        const response = await fetch("http://localhost:5000/HR/updateUsername", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newUsername: NewUsername }),
        });
        if (response.ok) {
            toast.success("Username Updated");
            setNewUsername("");
            setShowUpdateUsername(false);
        }
    }

    async function handleUpdateCompanyClick() {
        const response = await fetch("http://localhost:5000/HR/updateCompany", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newCompany: NewCompany }),
        });
        if (response.ok) {
            toast.success("Company Updated");
            setNewCompany("");
            setShowUpdateCompany(false);
        }
    }

    async function handleUpdateCompanyCategoryClick() {
        const response = await fetch("http://localhost:5000/HR/updateCompanyCategory", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newCompanyCategory: NewCompanyCategory }),
        });
        if (response.ok) {
            toast.success("Company Category Updated");
            setNewCompanyCategory("");
            setShowUpdateCompanyCategory(false);
        }
    }

    async function handleUpdateWebsiteClick() {
        const response = await fetch("http://localhost:5000/HR/updateCompanyWebsite", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newCompanyWebsite: NewWebsite }),
        });
        if (response.ok) {
            toast.success("Company Website Updated");
            setNewWebsite("");
            setShowUpdateWebsite(false);
        }
    }

    async function handleDeleteAccountClick() {
        const response = await fetch("http://localhost:5000/HR/deleteAccount", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        if (response.ok) {
            setIsLoggedIn(false);
            localStorage.removeItem('isLoggedIn')
            localStorage.removeItem('accType')
            setTimeout(() => {
                toast.success("Account Deleted");
            }, 100);
            router.push("/pages/sign-in")

        }
    }


    useEffect(() => {
        if (isLoggedIn) {
            const getUserDetails = async () => {
                try {
                    const response = await fetch("http://localhost:5000/HR/findOneHR", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUser(data);
                        console.log(await data);

                    }
                } catch (error) {
                    console.error("Failed to fetch user details:", error);
                }
            };
            getUserDetails();
        }
    }, [isLoggedIn, ShowUpdateEmail, ShowUpdateUsername, ShowUpdateCompany, ShowUpdateCompanyCategory, ShowUpdateWebsite]);

    return (
        <div>
            <Sidebar />
            <div className="ml-64 pt-6">
                <p className="ml-8 mb-8 font-bold text-2xl">Account Information</p>

                {user ? (
                    <>

                        <div className="bg-gray-200 dark:bg-gray-900 p-4 pb-3 mx-8 rounded-t-md flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Name</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            <p className="mt-1">{capitalizeName(user.name)}</p>
                        </div>

                        {/* Username */}
                        <div className="bg-gray-200 dark:bg-gray-900 p-4  pb-3 mx-8  flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Username</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateUsername && <p className="mt-1">{user.username}</p>}
                            {ShowUpdateUsername && <input type="text" value={NewUsername} onChange={(e) => setNewUsername(e.target.value)} className="rounded-md text-black bg-white dark:bg-slate-300 pl-2" />}
                            {ShowUpdateUsername && <button onClick={handleUpdateUsernameClick} className="bg-gray-400 dark:bg-gray-800  rounded-md p-2 text-sm">Update</button>}
                        </div>

                        {/* Email */}
                        <div className="bg-gray-200 dark:bg-gray-900 p-4  pb-3 mx-8  flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Email</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateEmail && <p className="mt-1">{user.email}</p>}

                            {ShowUpdateEmail && <input type="text" value={NewEmail} onChange={(e) => { setNewEmail(e.target.value) }} className="rounded-md text-black bg-white dark:bg-slate-300 pl-2" />}
                            {ShowUpdateEmail && <button onClick={handleUpdateEmailClick} className="bg-gray-400 dark:bg-gray-800  rounded-md p-2 text-sm">Update</button>}
                        </div>

                        {/*Password */}
                        <div className="bg-gray-200 dark:bg-gray-900 p-4  pb-3 mx-8 rounded-b-md  flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Password</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            <input type="password" value={NewPassword} onChange={(e) => { setNewPassword(e.target.value) }} className="rounded-md text-black  bg-white dark:bg-slate-300 pl-2" />
                            <button onClick={handleUpdatePasswordClick} className="bg-gray-400 dark:bg-gray-800  rounded-md p-2 text-sm">
                                Update
                            </button>


                        </div>

                        <div className="mt-8 ml-8">


                            <button
                                onClick={() => { setShowUpdateUsername(true); }}
                                className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                            >
                                Update Username
                            </button>

                            <button
                                onClick={() => { setShowUpdateEmail(true); }}
                                className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 mr-4 ml-4"
                            >
                                Update Email
                            </button>


                        </div>

                        <div className="bg-gray-200 dark:bg-gray-900 p-4 pb-3 mt-8 mx-8 rounded-t-md flex space-x-4 ">
                            <p className="w-32 mt-1 font-semibold">Company</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateCompany && <p className="mt-1">{user.company}</p>}
                            {ShowUpdateCompany && <input type="text" value={NewCompany} onChange={(e) => setNewCompany(e.target.value)} className="rounded-md text-black bg-white dark:bg-slate-300 pl-2" />}
                            {ShowUpdateCompany && <button onClick={handleUpdateCompanyClick} className="bg-gray-400 dark:bg-gray-800  rounded-md p-2 text-sm">Update</button>}
                        </div>
                        
                        <div className="bg-gray-200 dark:bg-gray-900 p-4 pb-3 mx-8  flex space-x-4 ">
                            <p className="w-32 mt-1 font-semibold">Website</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateWebsite && <p className="mt-1">{user.companyWebsite}</p>}
                            {ShowUpdateWebsite && <input type="text" value={NewWebsite} onChange={(e) => setNewWebsite(e.target.value)} className="rounded-md text-black bg-white dark:bg-slate-300 pl-2" />}
                            {ShowUpdateWebsite && <button onClick={handleUpdateWebsiteClick} className="bg-gray-400 dark:bg-gray-800  rounded-md p-2 text-sm">Update</button>}
                        </div>

                        <div className="bg-gray-200 dark:bg-gray-900 p-4 pb-3 mx-8 flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Category</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateCompanyCategory && <p className="mt-1">{user.company_category}</p>}
                            {ShowUpdateCompanyCategory && (
                                <>
                                    <select
                                        value={NewCompanyCategory}
                                        onChange={(e) => setNewCompanyCategory(e.target.value)}
                                        className="rounded-md text-black bg-white dark:bg-slate-300 pl-2"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Software Development">Software Development</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Cybersecurity">Cybersecurity</option>
                                        <option value="Cloud Computing">Cloud Computing</option>
                                        <option value="AI and Machine Learning">AI and Machine Learning</option>
                                        <option value="IT Support">IT Support</option>
                                        <option value="DevOps">DevOps</option>
                                        <option value="UI/UX Design">UI/UX Design</option>
                                        <option value="Product Management">Product Management</option>
                                    </select>
                                    <button
                                        onClick={handleUpdateCompanyCategoryClick}
                                        className="bg-gray-400 dark:bg-gray-800 rounded-md p-2 text-sm"
                                    >
                                        Update
                                    </button>
                                </>
                            )}
                        </div>


                        <div className="bg-gray-200 dark:bg-gray-900 p-4 pb-3 mx-8 rounded-b-md flex space-x-4 ">

                        </div>

                        <div className="mt-8 ml-8">


                            <button
                                onClick={() => { setShowUpdateCompany(true); }}
                                className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                            >
                                Update Company
                            </button>

                            <button
                                onClick={() => { setShowUpdateCompanyCategory(true); }}
                                className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 mr-4 ml-4"
                            >
                                Update Category
                            </button>


                            <button
                                onClick={() => { setShowUpdateWebsite(true); }}
                                className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                            >
                                Update Website
                            </button>
                        </div>








                        <button onClick={() => setShowPopup(true)} className="border-2 mt-8 p-2 ml-8 rounded-md dark:bg-gray-950 border-red-700 text-red-600 mb-10 hover:bg-red-700 hover:text-white">Delete Account</button>

                        {ShowPopup && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Are you sure you want to delete your account?
                                </h2>
                                <p className="text-gray-600 mt-2">
                                    This action cannot be undone.
                                </p>
                                <div className="flex justify-end space-x-4 mt-4">
                                    {/* Cancel Button */}
                                    <button
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                        onClick={() => setShowPopup(false)}
                                    >
                                        Cancel
                                    </button>
                                    {/* Delete Button */}
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        onClick={handleDeleteAccountClick}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>}

                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default ProfileHR;
