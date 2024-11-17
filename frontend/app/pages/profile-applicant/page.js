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
    const [NewEmail, setNewEmail] = useState("");
    const [NewUsername, setNewUsername] = useState("");
    const [user, setUser] = useState(null);
    const { isLoggedIn } = useUserContext();
    const [ShowUpdateUsername, setShowUpdateUsername] = useState(false);
    const [ShowUpdateEmail, setShowUpdateEmail] = useState(false);


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

    async function handleUpdateEmailClick() {

        const response = await fetch("http://localhost:5000/applicant/updateEmail", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newEmail: NewEmail }),

        })
        console.log(response);
        if (response.ok) {
            toast.success("Email Updated");
            setNewEmail("");
            setShowUpdateEmail(false)
        }
    }

    async function handleUpdateUsernameClick() {

        const response = await fetch("http://localhost:5000/applicant/updateUsername", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newUsername : NewUsername }),

        })
        console.log(response);
        if (response.ok) {
            toast.success("Username Updated");
            setNewUsername("");
            setShowUpdateUsername(false);
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
    }, [isLoggedIn,ShowUpdateEmail,ShowUpdateUsername]);


    return (
        <div>
            <Sidebar />
            <div className="ml-64 pt-6">
                <p className="ml-8 mb-8 font-bold text-2xl">Profile</p>

                {user ? (
                    <>
                        <div className="bg-gray-900 p-4 pb-3 mx-8 rounded-md flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Name</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            <p className="mt-1">{capitalizeName(user.name)}</p>
                        </div>

                        <div className="bg-gray-900 p-4 mt-7 pb-3 mx-8 rounded-md flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Username</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateUsername && <p className="mt-1">{user.username}</p>}
                            {!ShowUpdateUsername && <button onClick={() => { setShowUpdateUsername(true) }} className="bg-gray-800 rounded-md p-2 text-sm">
                                Update Username
                            </button>}
                            {ShowUpdateUsername && <input type="text" value={NewUsername} onChange={(e) => setNewUsername(e.target.value)} className="rounded-md text-black bg-gray-200 pl-2" />}
                            {ShowUpdateUsername && <button onClick={handleUpdateUsernameClick} className="bg-gray-800 rounded-md p-2 text-sm">Update Username</button>}
                        </div>

                        <div className="bg-gray-900 p-4 mt-7 pb-3 mx-8 rounded-md flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Email</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            { !ShowUpdateEmail && <p className="mt-1">{user.email}</p>}
                            { !ShowUpdateEmail && <button onClick={()=>{setShowUpdateEmail(true)}} className="bg-gray-800 rounded-md p-2 text-sm">
                                Update Email
                            </button>}
                            {ShowUpdateEmail&&<input type="text" value={NewEmail} onChange={(e)=> {setNewEmail(e.target.value) }} className="rounded-md text-black bg-gray-200 pl-2" />}
                            {ShowUpdateEmail&&<button onClick={handleUpdateEmailClick} className="bg-gray-800 rounded-md p-2 text-sm">Update Email</button>}
                        </div>

                        <div className="bg-gray-900 p-4 mt-7 pb-3 mx-8 rounded-md flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Password</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            <input type="password" value={NewPassword} onChange={(e)=> {setNewPassword(e.target.value) }} className="rounded-md text-black bg-gray-200 pl-2" />
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
