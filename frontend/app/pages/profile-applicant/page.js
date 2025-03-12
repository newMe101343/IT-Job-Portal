"use client";

import React, { useState, useEffect } from "react";
import { useUserContext } from "@/app/Contexts/userContext";
import Sidebar from "@/app/Components/Sidebar";
import { CloseButton, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const capitalizeName = (name) => {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

const Profile = () => {

    const router = useRouter();

    const [NewPassword, setNewPassword] = useState("");
    const [NewEmail, setNewEmail] = useState("");
    const [NewUsername, setNewUsername] = useState("");
    const [NewGitHub, setNewGitHub] = useState("");
    const [NewLeetcode, setNewLeetcode] = useState("");
    const [NewLinkedIn, setNewLinkedIn] = useState("");
    const [NewStackOverflow, setNewStackOverflow] = useState("");
    const [NewTwitter, setNewTwitter] = useState("");
    const [NewExperience, setNewExperience] = useState(0);
    const [NewBachelors, setNewBachelors] = useState("");
    const [NewMasters, setNewMasters] = useState("");
    const [NewSkill, setNewSkill] = useState("");
    const [NewOTP, setNewOTP] = useState("");
    const [Reload, setReload] = useState(false);



    const [user, setUser] = useState(null);
    const { isLoggedIn, setIsLoggedIn } = useUserContext();
    const [ShowPopup, setShowPopup] = useState(false);

    const [ShowUpdateUsername, setShowUpdateUsername] = useState(false);
    const [ShowUpdateEmail, setShowUpdateEmail] = useState(false);
    const [ShowUpdateGitHub, setShowUpdateGitHub] = useState(false);
    const [ShowUpdateLeetcode, setShowUpdateLeetcode] = useState(false);
    const [ShowUpdateLinkedIn, setShowUpdateLinkedIn] = useState(false);
    const [ShowUpdateStackOverflow, setShowUpdateStackOverflow] = useState(false);
    const [ShowUpdateTwitter, setShowUpdateTwitter] = useState(false);
    const [ShowUpdateExperience, setShowUpdateExperience] = useState(false);
    const [ShowUpdateBachelors, setShowUpdateBachelors] = useState(false);
    const [ShowUpdateMasters, setShowUpdateMasters] = useState(false);
    const [ShowUpdateAccStatus, setShowUpdateAccStatus] = useState(false);
    const [ShowAddSkill, setShowAddSkill] = useState(false);


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
        const response = await fetch("http://localhost:5000/applicant/updateDetails", {
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
        const response = await fetch("http://localhost:5000/applicant/updateDetails", {
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
        const response = await fetch("http://localhost:5000/applicant/updateDetails", {
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
        const response = await fetch("http://localhost:5000/applicant/updateDetails", {
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
        const response = await fetch("http://localhost:5000/applicant/updateDetails", {
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

    async function handleUpdateExperienceClick() {
        const response = await fetch("http://localhost:5000/applicant/updateExperience", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newExperience: NewExperience }),
        });
        if (response.ok) {
            toast.success("Work Experience Updated");
            setNewExperience("");
            setShowUpdateExperience(false);
        }
    }

    async function handleUpdateBachelorsClick() {
        const response = await fetch("http://localhost:5000/applicant/updateDetails", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newBachelors: NewBachelors }),
        });
        if (response.ok) {
            toast.success("Bachelors Updated");
            setNewBachelors("");
            setShowUpdateBachelors(false);
        }
    }

    async function handleUpdateMastersClick() {
        const response = await fetch("http://localhost:5000/applicant/updateDetails", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newMasters: NewMasters }),
        });
        if (response.ok) {
            toast.success("Masters Updated");
            setNewMasters("");
            setShowUpdateMasters(false);
        }
    }

    async function handleDeleteAccountClick() {
        const response = await fetch("http://localhost:5000/applicant/deleteAccount", {
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

    async function handleUpdateExperienceClick() {
        const response = await fetch("http://localhost:5000/applicant/updateExperience", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newExperience: NewExperience }),
        });
        if (response.ok) {
            toast.success("Work Experience Updated");
            setNewExperience("");
            setShowUpdateExperience(false);
        }
    }

    async function handleAddSkillClick() {

        if (NewSkill == "") {
            toast.warning("Skill cannot be a null value");
        }

        else {
            router.push(`/pages/test-skill/${NewSkill}`);
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
                        console.log(data);

                        setNewEmail(data.email || "");
                        setNewUsername(data.username || "");
                        setNewGitHub(data.GitHub || "");
                        setNewLeetcode(data.LeetCode || "");
                        setNewLinkedIn(data.LinkedIn || "");
                        setNewStackOverflow(data.StackOverflow || "");
                        setNewTwitter(data.Twitter || "");
                        setNewExperience(data.experience || 0);
                        setNewBachelors(data.bachelors || "");
                        setNewMasters(data.masters || "");
                        setNewSkill(data.techStack?.join(", ") || ""); 
                        setNewOTP(data.otp || "");
                        setReload(true); 
                    }

                } catch (error) {
                    console.error("Failed to fetch user details:", error);
                }
            };
            getUserDetails();
        }
    }, [isLoggedIn, ShowUpdateMasters, ShowUpdateEmail, ShowAddSkill, ShowUpdateExperience, ShowUpdateGitHub, ShowUpdateLeetcode, ShowUpdateLinkedIn, ShowUpdateStackOverflow, ShowUpdateTwitter, ShowUpdateUsername, ShowUpdateBachelors, Reload]);

    async function sendOtp() {
        setShowUpdateAccStatus(true);
        const response = await fetch('http://localhost:5000/applicant/sendOTP', {
            method: 'POST',
            credentials: "include"
        });
        console.log(response);
        if (response.ok) {
            toast.success(`OTP sent to ${user.email}`);
        }
        if (!response.ok) {
            toast.error("OTP not sent");
        }

    }

    async function verifyOtp() {
        setShowUpdateAccStatus(false)
        const response = await fetch('http://localhost:5000/applicant/verifyOTP', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                otp: NewOTP
            })
        });
        console.log(response);
        if (response.ok) {
            toast.success('Email Verified');
            setNewOTP("");
            setReload(true);
        }
        if (!response.ok) {
            toast.error('Incorrect OTP');
            setNewOTP("");
            setReload(true);
        }
    }

    return (
        <div>
            <Sidebar />
            <div className="ml-64 pt-2">
                {/* <p className="ml-8 mb-8 font-bold text-2xl">Account Information</p> */}

                {user ? (
                    <>
                        <hr />
                        <div className=" bg-gray-100 rounded-md dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-10 pb-16">
                            <div className="max-w-5xl mx-auto px-4">

                                <h1 className="text-3xl font-bold mb-8 text-center underline">Account Information</h1>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                                        <h2 className="text-lg font-semibold mb-2">Name</h2>
                                        <p>{capitalizeName(user.name)}</p>
                                    </div>

                                    {/* Username */}
                                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                                        <h2 className="text-lg font-semibold mb-2">Username</h2>
                                        {!ShowUpdateUsername ? (
                                            <div className="flex justify-between items-center">
                                                <p>{user.username}</p>
                                                <button
                                                    onClick={() => setShowUpdateUsername(true)}
                                                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex space-x-4">
                                                <input
                                                    type="text"
                                                    value={NewUsername}
                                                    onChange={(e) => setNewUsername(e.target.value)}
                                                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700"
                                                />
                                                <button
                                                    onClick={handleUpdateUsernameClick}
                                                    className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg"
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                                        <h2 className="text-lg font-semibold mb-2">Email</h2>
                                        {!ShowUpdateEmail ? (
                                            <div className="flex justify-between items-center">
                                                <p>{user.email}</p>
                                                <button
                                                    onClick={() => setShowUpdateEmail(true)}
                                                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex space-x-4">
                                                <input
                                                    type="text"
                                                    value={NewEmail}
                                                    onChange={(e) => setNewEmail(e.target.value)}
                                                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700"
                                                />
                                                <button
                                                    onClick={handleUpdateEmailClick}
                                                    className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg"
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                                        <h2 className="text-lg font-semibold mb-2">Password</h2>
                                        <div className="flex space-x-4">
                                            <input
                                                type="password"
                                                value={NewPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700"
                                            />
                                            <button
                                                onClick={handleUpdatePasswordClick}
                                                className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </div>

                                    {/* Account Status */}
                                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                                        <h2 className="text-lg font-semibold mb-2">Account Status</h2>
                                        {user.isVerified ? (
                                            <p className="text-green-600 dark:text-green-400 font-semibold">Verified</p>
                                        ) : (
                                            <div className="space-y-4">
                                                <p className="text-red-600 dark:text-red-400 font-semibold">Not Verified</p>
                                                {ShowUpdateAccStatus ? (
                                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96">
                                                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                                                            Enter OTP
                                                        </h2>
                                                        <div className="flex space-x-4">
                                                            <input
                                                                type="password"
                                                                placeholder="Enter OTP"
                                                                value={NewOTP}
                                                                onChange={(e) => setNewOTP(e.target.value)}
                                                                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700"
                                                            />
                                                            <button
                                                                onClick={verifyOtp}
                                                                className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg"
                                                            >
                                                                Submit
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => setShowUpdateAccStatus(false)}
                                                            className="mt-4 bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-lg"
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </div>
                                                ) : (
                                                    <button
                                                        onClick={sendOtp}
                                                        className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg"
                                                    >
                                                        Verify
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr />
                        <div className="bg-gray-100  dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-10 pb-16">
                            <div className="max-w-5xl mx-auto px-4">
                                <h1 className="text-3xl underline font-bold mb-8 text-center">Socials</h1>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* GitHub */}
                                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <h2 className="text-lg font-semibold mb-2">GitHub</h2>
                                                <p>{!ShowUpdateGitHub ? (user.GitHub || "No GitHub linked") : (
                                                    <input
                                                        type="text"
                                                        value={NewGitHub}
                                                        onChange={(e) => setNewGitHub(e.target.value)}
                                                        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700"
                                                    />
                                                )}</p>
                                            </div>
                                            <button
                                                onClick={ShowUpdateGitHub ? handleUpdateGitHubClick : () => setShowUpdateGitHub(true)}
                                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                            >
                                                {ShowUpdateGitHub ? "Update" : "Edit"}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Leetcode */}
                                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <h2 className="text-lg font-semibold mb-2">Leetcode</h2>
                                                <p>{!ShowUpdateLeetcode ? (user.LeetCode || "No Leetcode linked") : (
                                                    <input
                                                        type="text"
                                                        value={NewLeetcode}
                                                        onChange={(e) => setNewLeetcode(e.target.value)}
                                                        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700"
                                                    />
                                                )}</p>
                                            </div>
                                            <button
                                                onClick={ShowUpdateLeetcode ? handleUpdateLeetcodeClick : () => setShowUpdateLeetcode(true)}
                                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                            >
                                                {ShowUpdateLeetcode ? "Update" : "Edit"}
                                            </button>
                                        </div>
                                    </div>

                                    {/* LinkedIn */}
                                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <h2 className="text-lg font-semibold mb-2">LinkedIn</h2>
                                                <p>{!ShowUpdateLinkedIn ? (user.LinkedIn || "No LinkedIn linked") : (
                                                    <input
                                                        type="text"
                                                        value={NewLinkedIn}
                                                        onChange={(e) => setNewLinkedIn(e.target.value)}
                                                        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700"
                                                    />
                                                )}</p>
                                            </div>
                                            <button
                                                onClick={ShowUpdateLinkedIn ? handleUpdateLinkedInClick : () => setShowUpdateLinkedIn(true)}
                                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                            >
                                                {ShowUpdateLinkedIn ? "Update" : "Edit"}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Stack Overflow */}
                                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <h2 className="text-lg font-semibold mb-2">Stack Overflow</h2>
                                                <p>{!ShowUpdateStackOverflow ? (user.StackOverflow || "No Stack Overflow linked") : (
                                                    <input
                                                        type="text"
                                                        value={NewStackOverflow}
                                                        onChange={(e) => setNewStackOverflow(e.target.value)}
                                                        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700"
                                                    />
                                                )}</p>
                                            </div>
                                            <button
                                                onClick={ShowUpdateStackOverflow ? handleUpdateStackOverflowClick : () => setShowUpdateStackOverflow(true)}
                                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                            >
                                                {ShowUpdateStackOverflow ? "Update" : "Edit"}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Twitter */}
                                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <h2 className="text-lg font-semibold mb-2">Twitter</h2>
                                                <p>{!ShowUpdateTwitter ? (user.Twitter || "No Twitter linked") : (
                                                    <input
                                                        type="text"
                                                        value={NewTwitter}
                                                        onChange={(e) => setNewTwitter(e.target.value)}
                                                        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700"
                                                    />
                                                )}</p>
                                            </div>
                                            <button
                                                onClick={ShowUpdateTwitter ? handleUpdateTwitterClick : () => setShowUpdateTwitter(true)}
                                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                            >
                                                {ShowUpdateTwitter ? "Update" : "Edit"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <p className="m-8 mt-10 font-bold text-3xl underline text-center ">Technicals</p>

                        <div className="bg-gray-200 dark:bg-gray-900 p-4 mt-7 pb-3 mx-8 rounded-md flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Experience</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateExperience && (
                                <button className="" onClick={() => {
                                    setShowUpdateExperience(true);
                                }}>{user.experience || "Add"}</button>
                            )}

                            {ShowUpdateExperience && (
                                <input
                                    type="text"
                                    value={NewExperience}
                                    onChange={(e) => {
                                        setNewExperience(e.target.value);
                                    }}
                                    className="rounded-md text-black  bg-white dark:bg-slate-300 pl-2"
                                />
                            )}
                            {ShowUpdateExperience && (
                                <button
                                    onClick={handleUpdateExperienceClick}
                                    className="bg-green-500 dark:bg-green-600 rounded-md p-2 text-sm"
                                >
                                    Save
                                </button>
                            )}
                        </div>


                        <div className="bg-gray-200 dark:bg-gray-900 p-4 pb-3 mx-8 border-t-2  flex space-x-4">
                            <p className="w-34 mt-1 font-semibold">UG Qualifications</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            
                            {!ShowUpdateBachelors && <button onClick={() => setShowUpdateBachelors(true)} className="">{user.bachelors || "Add"}</button> }
                            {ShowUpdateBachelors && <div>
                                <select
                                    name="course"
                                    value={NewBachelors} // Add this state variable to manage selected course
                                    onChange={(e) => { setNewBachelors(e.target.value); }} // Define this function to handle changes
                                    className="block w-10/12 h-12 px-5 py-3  text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                >
                                    <option value="">Select a Course</option>
                                    <option value="B.Tech in Computer Science and Engineering">B.Tech in Computer Science and Engineering</option>
                                    <option value="B.Tech in Information Technology">B.Tech in Information Technology</option>
                                    <option value="B.Tech in Electronics and Communication Engineering">B.Tech in Electronics and Communication Engineering</option>
                                    <option value="B.Tech in Electrical and Electronics Engineering">B.Tech in Electrical and Electronics Engineering</option>
                                    <option value="B.Tech in Mechanical Engineering">B.Tech in Mechanical Engineering</option>
                                    <option value="B.Tech in Civil Engineering">B.Tech in Civil Engineering</option>
                                    <option value="B.Tech in Aerospace Engineering">B.Tech in Aerospace Engineering</option>
                                    <option value="B.Tech in Chemical Engineering">B.Tech in Chemical Engineering</option>
                                    <option value="B.Tech in Biotechnology">B.Tech in Biotechnology</option>
                                    <option value="B.Tech in Artificial Intelligence">B.Tech in Artificial Intelligence</option>
                                    <option value="B.Tech in Machine Learning">B.Tech in Machine Learning</option>
                                    <option value="B.Tech in Data Science and Analytics">B.Tech in Data Science and Analytics</option>
                                    <option value="B.Tech in Cybersecurity">B.Tech in Cybersecurity</option>
                                    <option value="B.Tech in Internet of Things">B.Tech in Internet of Things</option>
                                    <option value="B.Tech in Blockchain Technology">B.Tech in Blockchain Technology</option>
                                    <option value="B.Tech in Robotics and Automation">B.Tech in Robotics and Automation</option>
                                    <option value="B.Sc in Computer Science">B.Sc in Computer Science</option>
                                    <option value="B.Sc in Information Technology">B.Sc in Information Technology</option>
                                    <option value="B.Sc in Data Science">B.Sc in Data Science</option>
                                    <option value="Bachelor of Computer Applications (BCA)">Bachelor of Computer Applications (BCA)</option>
                                    <option value="B.Des in UI/UX Design">B.Des in UI/UX Design</option>
                                    <option value="B.Des in Game Design">B.Des in Game Design</option>
                                    <option value="B.Tech in Marine Engineering">B.Tech in Marine Engineering</option>
                                    <option value="B.Tech in Petroleum Engineering">B.Tech in Petroleum Engineering</option>
                                    <option value="B.Tech in Mining Engineering">B.Tech in Mining Engineering</option>
                                    <option value="B.Tech in Biomedical Engineering">B.Tech in Biomedical Engineering</option>
                                    <option value="B.Tech in Food Technology">B.Tech in Food Technology</option>
                                    <option value="B.Tech in Textile Technology">B.Tech in Textile Technology</option>
                                    <option value="B.Tech in Smart Infrastructure and Urban Planning">B.Tech in Smart Infrastructure and Urban Planning</option>
                                    <option value="B.Tech in Cloud Computing">B.Tech in Cloud Computing</option>
                                    <option value="B.Tech in Quantum Computing">B.Tech in Quantum Computing</option>

                                </select>
                            </div>}

                            {ShowUpdateBachelors && (
                                <button
                                    onClick={handleUpdateBachelorsClick}
                                    className="bg-green-500 dark:bg-green-600 rounded-md px-3 "
                                >
                                    Save Bachelors
                                </button>
                            )}

                        </div>

                        <div className="bg-gray-200 dark:bg-gray-900 p-4 pb-3 mx-8 border-t-2 flex space-x-4">
                            <p className="w-34 mt-1 font-semibold">PG Qualifications</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateMasters && (
                                <button className="" onClick={() => setShowUpdateMasters(true)}>{user.masters || "Add"}</button>
                            )}
                            {ShowUpdateMasters && (
                                <div>
                                    <select
                                        name="course"
                                        value={NewMasters} // Add this state variable to manage selected course
                                        onChange={(e) => { setNewMasters(e.target.value); }} // Define this function to handle changes
                                        className="block w-10/12 h-12 px-5 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    >
                                        <option value="">Select a Course</option>
                                        <option value="M.Tech in Computer Science and Engineering">M.Tech in Computer Science and Engineering</option>
                                        <option value="M.Tech in Information Technology">M.Tech in Information Technology</option>
                                        <option value="M.Tech in Electronics and Communication Engineering">M.Tech in Electronics and Communication Engineering</option>
                                        <option value="M.Tech in Electrical and Electronics Engineering">M.Tech in Electrical and Electronics Engineering</option>
                                        <option value="M.Tech in Mechanical Engineering">M.Tech in Mechanical Engineering</option>
                                        <option value="M.Tech in Civil Engineering">M.Tech in Civil Engineering</option>
                                        <option value="M.Tech in Aerospace Engineering">M.Tech in Aerospace Engineering</option>
                                        <option value="M.Tech in Chemical Engineering">M.Tech in Chemical Engineering</option>
                                        <option value="M.Tech in Biotechnology">M.Tech in Biotechnology</option>
                                        <option value="M.Tech in Artificial Intelligence">M.Tech in Artificial Intelligence</option>
                                        <option value="M.Tech in Machine Learning">M.Tech in Machine Learning</option>
                                        <option value="M.Tech in Data Science and Analytics">M.Tech in Data Science and Analytics</option>
                                        <option value="M.Tech in Cybersecurity">M.Tech in Cybersecurity</option>
                                        <option value="M.Tech in Internet of Things">M.Tech in Internet of Things</option>
                                        <option value="M.Tech in Blockchain Technology">M.Tech in Blockchain Technology</option>
                                        <option value="M.Tech in Robotics and Automation">M.Tech in Robotics and Automation</option>
                                        <option value="M.Sc in Computer Science">M.Sc in Computer Science</option>
                                        <option value="M.Sc in Information Technology">M.Sc in Information Technology</option>
                                        <option value="M.Sc in Data Science">M.Sc in Data Science</option>
                                        <option value="Master of Computer Applications (MCA)">Master of Computer Applications (MCA)</option>
                                        <option value="M.Des in UI/UX Design">M.Des in UI/UX Design</option>
                                        <option value="M.Des in Game Design">M.Des in Game Design</option>
                                        <option value="M.Tech in Marine Engineering">M.Tech in Marine Engineering</option>
                                        <option value="M.Tech in Petroleum Engineering">M.Tech in Petroleum Engineering</option>
                                        <option value="M.Tech in Mining Engineering">M.Tech in Mining Engineering</option>
                                        <option value="M.Tech in Biomedical Engineering">M.Tech in Biomedical Engineering</option>
                                        <option value="M.Tech in Food Technology">M.Tech in Food Technology</option>
                                        <option value="M.Tech in Textile Technology">M.Tech in Textile Technology</option>
                                        <option value="M.Tech in Smart Infrastructure and Urban Planning">M.Tech in Smart Infrastructure and Urban Planning</option>
                                        <option value="M.Tech in Cloud Computing">M.Tech in Cloud Computing</option>
                                        <option value="M.Tech in Quantum Computing">M.Tech in Quantum Computing</option>
                                        <option value="MBA in Information Technology">MBA in Information Technology</option>
                                        <option value="MBA in Business Analytics">MBA in Business Analytics</option>
                                        <option value="MBA in Data Science and Analytics">MBA in Data Science and Analytics</option>
                                        <option value="MBA in Artificial Intelligence and Machine Learning">MBA in Artificial Intelligence and Machine Learning</option>
                                        <option value="MBA in Digital Transformation">MBA in Digital Transformation</option>
                                        <option value="MBA in Cybersecurity Management">MBA in Cybersecurity Management</option>
                                        <option value="MBA in Blockchain Management">MBA in Blockchain Management</option>
                                        <option value="MBA in Operations and IT">MBA in Operations and IT</option>
                                        <option value="MBA in IT and Systems">MBA in IT and Systems</option>

                                    </select>
                                </div>
                            )}
                            {ShowUpdateMasters && (
                                <button
                                    onClick={handleUpdateMastersClick}
                                    className="bg-green-500 dark:bg-green-600 rounded-md px-3"
                                >
                                    Save Masters
                                </button>
                            )}


                        </div>

                        <div className="bg-gray-200 dark:bg-gray-900  p-4 pb-3 mx-8 rounded-b-md border-t-2 mb-6 flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Tech Stack</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            <p className="mt-1">{user.techStack?.join(', ')}</p>

                            {ShowAddSkill && (
                                <select className="text-black" onChange={(e) => setNewSkill(e.target.value)}>
                                    <option value="">Select a Skill</option>
                                    <option value="Angular">Angular</option>
                                    <option value="C">C</option>
                                    <option value="CPP">C++</option>
                                    <option value="CHASH">C#</option>
                                    <option value="Cassandra">Cassandra</option>
                                    <option value="CI/CD">CI/CD</option>
                                    <option value="Django">Django</option>
                                    <option value="Express.js">Express.js</option>
                                    <option value="Firebase">Firebase</option>
                                    <option value="Flask">Flask</option>
                                    <option value="Git">Git</option>
                                    <option value="GitHub">GitHub</option>
                                    <option value="Java">Java</option>
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="Jenkins">Jenkins</option>
                                    <option value="Kotlin">Kotlin</option>
                                    <option value="MongoDB">MongoDB</option>
                                    <option value="MySQL">MySQL</option>
                                    <option value="Next.js">Next.js</option>
                                    <option value="Node.js">Node.js</option>
                                    <option value="PHP">PHP</option>
                                    <option value="PostgreSQL">PostgreSQL</option>
                                    <option value="Python">Python</option>
                                    <option value="React Native">React Native</option>
                                    <option value="React.js">React.js</option>
                                    <option value="Redis">Redis</option>
                                    <option value="Rust">Rust</option>
                                    <option value="SQL">SQL</option>
                                    <option value="Tailwind CSS">Tailwind CSS</option>
                                    <option value="TypeScript">TypeScript</option>
                                    <option value="Vue.js">Vue.js</option>
                                </select>


                            )}

                            <button
                                onClick={() => {
                                    console.log();
                                    if (!ShowAddSkill) {
                                        setShowAddSkill(true);
                                    } else {
                                        handleAddSkillClick();
                                    }
                                }}
                                className="bg-gray-400 dark:bg-gray-800 rounded-md p-2 text-sm"
                            >
                                Add Skill
                            </button>
                        </div>


                        <button onClick={() => setShowPopup(true)} className="mt-2 p-2 ml-10  bg-red-500 text-white rounded hover:bg-red-600 mb-10">Delete Account</button>

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

export default Profile;
