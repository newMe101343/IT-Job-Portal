"use client";

import React, { useState, useEffect } from "react";
import { useUserContext } from "@/app/Contexts/userContext";
import Sidebar from "@/app/Components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const capitalizeName = (name) => {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

const Profile = () => {
    const [NewPassword, setNewPassword] = useState("");
    const [NewEmail, setNewEmail] = useState("");
    const [NewUsername, setNewUsername] = useState("");
    const [NewGitHub, setNewGitHub] = useState("");
    const [NewLeetcode, setNewLeetcode] = useState("");
    const [NewLinkedIn, setNewLinkedIn] = useState("");
    const [NewStackOverflow, setNewStackOverflow] = useState("");
    const [NewTwitter, setNewTwitter] = useState("");

    const [user, setUser] = useState(null);
    const { isLoggedIn } = useUserContext();

    const [ShowUpdateUsername, setShowUpdateUsername] = useState(false);
    const [ShowUpdateEmail, setShowUpdateEmail] = useState(false);
    const [ShowUpdateGitHub, setShowUpdateGitHub] = useState(false);
    const [ShowUpdateLeetcode, setShowUpdateLeetcode] = useState(false);
    const [ShowUpdateLinkedIn, setShowUpdateLinkedIn] = useState(false);
    const [ShowUpdateStackOverflow, setShowUpdateStackOverflow] = useState(false);
    const [ShowUpdateTwitter, setShowUpdateTwitter] = useState(false);

    // Stack Overflow Update Function
    async function handleUpdateStackOverflowClick() {
        try {
            const response = await fetch("http://localhost:5000/applicant/updateStackOverflow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ newStackOverflow: NewStackOverflow }),
            });
            if (response.ok) {
                toast.success("Stack Overflow Updated");
                setNewStackOverflow("");
                setShowUpdateStackOverflow(false);
            } else {
                toast.error("Failed to update Stack Overflow");
            }
        } catch (error) {
            console.error("Error updating Stack Overflow:", error);
            toast.error("An error occurred while updating Stack Overflow");
        }
    }

    // Twitter Update Function
    async function handleUpdateTwitterClick() {
        try {
            const response = await fetch("http://localhost:5000/applicant/updateTwitter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ newTwitter: NewTwitter }),
            });
            if (response.ok) {
                toast.success("Twitter Updated");
                setNewTwitter("");
                setShowUpdateTwitter(false);
            } else {
                toast.error("Failed to update Twitter");
            }
        } catch (error) {
            console.error("Error updating Twitter:", error);
            toast.error("An error occurred while updating Twitter");
        }
    }



    async function handleUpdatePasswordClick() {
        const response = await fetch("http://localhost:5000/applicant/updatePassword", {
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
        const response = await fetch("http://localhost:5000/applicant/updateEmail", {
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
        const response = await fetch("http://localhost:5000/applicant/updateUsername", {
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

    async function handleUpdateGitHubClick() {
        const response = await fetch("http://localhost:5000/applicant/updateGitHub", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newGitHub: NewGitHub }),
        });
        if (response.ok) {
            toast.success("GitHub Updated");
            setNewGitHub("");
            setShowUpdateGitHub(false);
        }
    }

    async function handleUpdateLeetcodeClick() {
        const response = await fetch("http://localhost:5000/applicant/updateLeetcode", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newLeetcode: NewLeetcode }),
        });
        if (response.ok) {
            toast.success("Leetcode Updated");
            setNewLeetcode("");
            setShowUpdateLeetcode(false);
        }
    }

    async function handleUpdateLinkedInClick() {
        const response = await fetch("http://localhost:5000/applicant/updateLinkedIn", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newLinkedIn: NewLinkedIn }),
        });
        if (response.ok) {
            toast.success("LinkedIn Updated");
            setNewLinkedIn("");
            setShowUpdateLinkedIn(false);
        }
    }

    async function handleUpdateStackOverflowClick() {
        const response = await fetch("http://localhost:5000/applicant/updateStackOverflow", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newStackOverflow: NewStackOverflow }),
        });
        if (response.ok) {
            toast.success("StackOverflow Updated");
            setNewStackOverflow("");
            setShowUpdateStackOverflow(false);
        }
    }

    async function handleUpdateTwitterClick() {
        const response = await fetch("http://localhost:5000/applicant/updateTwitter", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newTwitter: NewTwitter }),
        });
        if (response.ok) {
            toast.success("Twitter Updated");
            setNewTwitter("");
            setShowUpdateTwitter(false);
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
    }, [isLoggedIn, ShowUpdateEmail, ShowUpdateGitHub, ShowUpdateLeetcode, ShowUpdateLinkedIn, ShowUpdateStackOverflow, ShowUpdateTwitter, ShowUpdateUsername]);

    return (
        <div>
            <Sidebar />
            <div className="ml-64 pt-6">
                <p className="ml-8 mb-8 font-bold text-2xl">Account Information</p>

                {user ? (
                    <>
                        <div className="bg-gray-900 p-4 pb-3 mx-8 rounded-md flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Name</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            <p className="mt-1">{capitalizeName(user.name)}</p>
                        </div>

                        {/* Username */}
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

                        {/* Email */}
                        <div className="bg-gray-900 p-4 mt-7 pb-3 mx-8 rounded-md flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Email</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateEmail && <p className="mt-1">{user.email}</p>}
                            {!ShowUpdateEmail && <button onClick={() => { setShowUpdateEmail(true) }} className="bg-gray-800 rounded-md p-2 text-sm">
                                Update Email
                            </button>}
                            {ShowUpdateEmail && <input type="text" value={NewEmail} onChange={(e) => { setNewEmail(e.target.value) }} className="rounded-md text-black bg-gray-200 pl-2" />}
                            {ShowUpdateEmail && <button onClick={handleUpdateEmailClick} className="bg-gray-800 rounded-md p-2 text-sm">Update Email</button>}
                        </div>

                        {/*Password */}
                        <div className="bg-gray-900 p-4 mt-7 pb-3 mx-8 rounded-md flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Password</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            <input type="password" value={NewPassword} onChange={(e) => { setNewPassword(e.target.value) }} className="rounded-md text-black bg-gray-200 pl-2" />
                            <button onClick={handleUpdatePasswordClick} className="bg-gray-800 rounded-md p-2 text-sm">
                                Update Password
                            </button>
                        </div>

                        <p className="m-8 mt-10 font-bold text-2xl">Socials</p>

                        {/* GitHub */}
                        <div className="bg-gray-900 p-4 mt-7 pb-3 mx-8 rounded-md flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">GitHub</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateGitHub && <p className="mt-1">{user.GitHub || "No GitHub linked"}</p>}
                            {!ShowUpdateGitHub && <button onClick={() => { setShowUpdateGitHub(true) }} className="bg-gray-800 rounded-md p-2 text-sm">
                                Update GitHub
                            </button>}
                            {ShowUpdateGitHub && <input type="text" value={NewGitHub} onChange={(e) => { setNewGitHub(e.target.value) }} className="rounded-md text-black bg-gray-200 pl-2" />}
                            {ShowUpdateGitHub && <button onClick={handleUpdateGitHubClick} className="bg-gray-800 rounded-md p-2 text-sm">Update GitHub</button>}
                        </div>

                        {/* Leetcode */}
                        <div className="bg-gray-900 p-4 mt-7 pb-3 mx-8 rounded-md flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Leetcode</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateLeetcode && <p className="mt-1">{user.LeetCode || "No Leetcode linked"}</p>}
                            {!ShowUpdateLeetcode && <button onClick={() => { setShowUpdateLeetcode(true) }} className="bg-gray-800 rounded-md p-2 text-sm">
                                Update Leetcode
                            </button>}
                            {ShowUpdateLeetcode && <input type="text" value={NewLeetcode} onChange={(e) => { setNewLeetcode(e.target.value) }} className="rounded-md text-black bg-gray-200 pl-2" />}
                            {ShowUpdateLeetcode && <button onClick={handleUpdateLeetcodeClick} className="bg-gray-800 rounded-md p-2 text-sm">Update Leetcode</button>}
                        </div>

                        {/* LinkedIn */}
                        <div className="bg-gray-900 p-4 mt-7 pb-3 mx-8 rounded-md flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">LinkedIn</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateLinkedIn && <p className="mt-1">{user.LinkedIn || "No LinkedIn linked"}</p>}
                            {!ShowUpdateLinkedIn && <button onClick={() => { setShowUpdateLinkedIn(true) }} className="bg-gray-800 rounded-md p-2 text-sm">
                                Update LinkedIn
                            </button>}
                            {ShowUpdateLinkedIn && <input type="text" value={NewLinkedIn} onChange={(e) => { setNewLinkedIn(e.target.value) }} className="rounded-md text-black bg-gray-200 pl-2" />}
                            {ShowUpdateLinkedIn && <button onClick={handleUpdateLinkedInClick} className="bg-gray-800 rounded-md p-2 text-sm">Update LinkedIn</button>}
                        </div>

                        {/* Stack Overflow */}
                        <div className="bg-gray-900 p-4 mt-7 pb-3 mx-8 rounded-md flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Stack Overflow</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateStackOverflow && <p className="mt-1">{user.StackOverflow || "No Stack Overflow linked"}</p>}
                            {!ShowUpdateStackOverflow && (
                                <button
                                    onClick={() => { setShowUpdateStackOverflow(true); }}
                                    className="bg-gray-800 rounded-md p-2 text-sm"
                                >
                                    Update Stack Overflow
                                </button>
                            )}
                            {ShowUpdateStackOverflow && (
                                <input
                                    type="text"
                                    value={NewStackOverflow}
                                    onChange={(e) => { setNewStackOverflow(e.target.value); }}
                                    className="rounded-md text-black bg-gray-200 pl-2"
                                />
                            )}
                            {ShowUpdateStackOverflow && (
                                <button
                                    onClick={handleUpdateStackOverflowClick}
                                    className="bg-gray-800 rounded-md p-2 text-sm"
                                >
                                    Update Stack Overflow
                                </button>
                            )}
                        </div>

                        {/* Twitter */}
                        <div className="bg-gray-900 p-4 mt-7 pb-3 mx-8 rounded-md flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Twitter</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateTwitter && <p className="mt-1">{user.Twitter || "No Twitter linked"}</p>}
                            {!ShowUpdateTwitter && (
                                <button
                                    onClick={() => { setShowUpdateTwitter(true); }}
                                    className="bg-gray-800 rounded-md p-2 text-sm"
                                >
                                    Update Twitter
                                </button>
                            )}
                            {ShowUpdateTwitter && (
                                <input
                                    type="text"
                                    value={NewTwitter}
                                    onChange={(e) => { setNewTwitter(e.target.value); }}
                                    className="rounded-md text-black bg-gray-200 pl-2"
                                />
                            )}
                            {ShowUpdateTwitter && (
                                <button
                                    onClick={handleUpdateTwitterClick}
                                    className="bg-gray-800 rounded-md p-2 text-sm"
                                >
                                    Update Twitter
                                </button>
                            )}
                        </div>

                        <p className="m-8 mt-10 font-bold text-2xl">Technicals</p>

                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Profile;
