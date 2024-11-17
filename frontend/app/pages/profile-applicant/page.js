"use client";

import React, { useState, useEffect } from "react";
import { useUserContext } from "@/app/Contexts/userContext";
import Sidebar from "@/app/Components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const capitalizeName = name => {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

const Profile = () => {
    const [NewPassword, setNewPassword] = useState("");
    const [user, setUser] = useState(null);
    const { isLoggedIn } = useUserContext();

    function handleNewPassChange(e) {
        setNewPassword(e.target.value);
    }

    async function handleUpdatePasswordClick() {

        const response = await fetch("http://localhost:5000/applicant/updatePassword", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newPass: NewPassword }),

        })
        console.log(response);
        if (response.ok) {
            toast.success("Password Updated");
            setNewPassword("");
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            const getUserDetails = async () => {
                try {
                    const response = await fetch("http://localhost:5000/applicant/findOneApplicant", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUser(data);
                    }

                    
                } catch (error) {
                    console.error("Failed to fetch user details:", error);
                }
            };
            getUserDetails();
        }
    }, [isLoggedIn]);


    return (
        <div>
            <Sidebar />
            <div className="ml-64 pt-6">
                <p className="ml-8 mb-8 font-bold text-2xl">Profile</p>

                {user ? (
                    <>
                        <div className="bg-gray-900 p-4 pb-3 mx-8 rounded-md flex space-x-4">
                            <p className="w-32 font-semibold">Name</p>
                            <div className="w-[1px] h-6 bg-gray-400"></div>
                            <p>{capitalizeName(user.name)}</p>
                        </div>

                        <div className="bg-gray-900 p-4 mt-7 pb-3 mx-8 rounded-md flex space-x-4">
                            <p className="w-32 font-semibold">Username</p>
                            <div className="w-[1px] h-6 bg-gray-400"></div>
                            <p>{user.username}</p>
                        </div>

                        <div className="bg-gray-900 p-4 mt-7 pb-3 mx-8 rounded-md flex space-x-4">
                            <p className="w-32 font-semibold">Email</p>
                            <div className="w-[1px] h-6 bg-gray-400"></div>
                            <p>{user.email}</p>

                        </div>

                        <div className="bg-gray-900 p-4 mt-7 pb-3 mx-8 rounded-md flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Password</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            <input type="password" value={NewPassword} onChange={handleNewPassChange} className="rounded-md text-black bg-gray-200 pl-2" />
                            <button onClick={handleUpdatePasswordClick} className="bg-gray-800 rounded-md p-2 text-sm">
                                Update Password
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="ml-8 text-gray-400">Loading user details...</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Profile;
