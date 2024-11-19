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
        const response = await fetch("http://localhost:5000/applicant/updateBachelors", {
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
        const response = await fetch("http://localhost:5000/applicant/updateMasters", {
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
            const response = await fetch("http://localhost:5000/applicant/addSkill", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ newSkill: NewSkill }),
            });
            if (response.ok) {
                toast.success("Skill Added");
                setNewSkill("");
                setShowAddSkill(false);
            }
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
    }, [isLoggedIn, ShowUpdateMasters, ShowUpdateEmail, ShowAddSkill, ShowUpdateExperience, ShowUpdateGitHub, ShowUpdateLeetcode, ShowUpdateLinkedIn, ShowUpdateStackOverflow, ShowUpdateTwitter, ShowUpdateUsername, ShowUpdateBachelors]);

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

                        <p className="m-8 mt-10 font-bold text-2xl">Socials</p>

                        {/* GitHub */}
                        <div className="bg-gray-200 dark:bg-gray-900 p-4  pb-3 mx-8 rounded-t-md flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">GitHub</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateGitHub && <p className="mt-1">{user.GitHub || "No GitHub linked"}</p>}
                            {ShowUpdateGitHub && <input type="text" value={NewGitHub} onChange={(e) => { setNewGitHub(e.target.value) }} className="rounded-md text-black  bg-white dark:bg-slate-300 pl-2" />}
                            {ShowUpdateGitHub && <button onClick={handleUpdateGitHubClick} className="bg-gray-400 dark:bg-gray-800  rounded-md p-2 text-sm">Update</button>}
                        </div>

                        {/* Leetcode */}
                        <div className="bg-gray-200 dark:bg-gray-900 p-4  pb-3 mx-8  flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Leetcode</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateLeetcode && <p className="mt-1">{user.LeetCode || "No Leetcode linked"}</p>}
                            {ShowUpdateLeetcode && <input type="text" value={NewLeetcode} onChange={(e) => { setNewLeetcode(e.target.value) }} className="rounded-md text-black  bg-white dark:bg-slate-300 pl-2" />}
                            {ShowUpdateLeetcode && <button onClick={handleUpdateLeetcodeClick} className="bg-gray-400 dark:bg-gray-800  rounded-md p-2 text-sm">Update </button>}
                        </div>

                        {/* LinkedIn */}
                        <div className="bg-gray-200 dark:bg-gray-900 p-4  pb-3 mx-8  flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">LinkedIn</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateLinkedIn && <p className="mt-1">{user.LinkedIn || "No LinkedIn linked"}</p>}
                            {ShowUpdateLinkedIn && <input type="text" value={NewLinkedIn} onChange={(e) => { setNewLinkedIn(e.target.value) }} className="rounded-md text-black bg-gray-200 pl-2" />}
                            {ShowUpdateLinkedIn && <button onClick={handleUpdateLinkedInClick} className="bg-gray-400 dark:bg-gray-800  rounded-md p-2 text-sm">Update </button>}
                        </div>

                        {/* Stack Overflow */}
                        <div className="bg-gray-200 dark:bg-gray-900 p-4  pb-3 mx-8  flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Stack Overflow</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateStackOverflow && <p className="mt-1">{user.StackOverflow || "No Stack Overflow linked"}</p>}

                            {ShowUpdateStackOverflow && (
                                <input
                                    type="text"
                                    value={NewStackOverflow}
                                    onChange={(e) => { setNewStackOverflow(e.target.value); }}
                                    className="rounded-md text-black  bg-white dark:bg-slate-300 pl-2"
                                />
                            )}
                            {ShowUpdateStackOverflow && (
                                <button
                                    onClick={handleUpdateStackOverflowClick}
                                    className="bg-gray-400 dark:bg-gray-800  rounded-md p-2 text-sm"
                                >
                                    Update
                                </button>
                            )}
                        </div>

                        {/* Twitter */}
                        <div className="bg-gray-200 dark:bg-gray-900 p-4  pb-3 mx-8 rounded-b-md flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Twitter</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateTwitter && <p className="mt-1">{user.Twitter || "No Twitter linked"}</p>}

                            {ShowUpdateTwitter && (
                                <input
                                    type="text"
                                    value={NewTwitter}
                                    onChange={(e) => { setNewTwitter(e.target.value); }}
                                    className="rounded-md text-black  bg-white dark:bg-slate-300 pl-2"
                                />
                            )}
                            {ShowUpdateTwitter && (
                                <button
                                    onClick={handleUpdateTwitterClick}
                                    className="bg-gray-400 dark:bg-gray-800  rounded-md p-2 text-sm"
                                >
                                    Update
                                </button>
                            )}
                        </div>

                        {//buttons
                        }

                        <div className="ml-8 mt-8">


                            <button
                                onClick={() => { setShowUpdateGitHub(true); }}
                                className="px-6 ml-3 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                            >
                                Update GitHub
                            </button>

                            <button
                                onClick={() => { setShowUpdateLeetcode(true); }}
                                className="px-6 ml-3 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                            >
                                Update Leetcode
                            </button>

                            <button
                                onClick={() => { setShowUpdateLinkedIn(true); }}
                                className="px-6 py-2 ml-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                            >
                                Update LinkedIn
                            </button>

                            <button
                                onClick={() => { setShowUpdateStackOverflow(true); }}
                                className="px-6 py-2 ml-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                            >
                                Update Stack Overflow
                            </button>

                            <button
                                onClick={() => { setShowUpdateTwitter(true); }}
                                className="px-6 py-2 ml-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                            >
                                Update Twitter
                            </button>


                        </div>

                        <p className="m-8 mt-10 font-bold text-2xl">Technicals</p>

                        <div className="bg-gray-200 dark:bg-gray-900 p-4 mt-7 pb-3 mx-8 rounded-md flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Experience</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            {!ShowUpdateExperience && (
                                <p className="mt-1">{user.experience || ""}</p>
                            )}
                            {!ShowUpdateExperience && (
                                <button
                                    onClick={() => {
                                        setShowUpdateExperience(true);
                                    }}
                                    className="bg-gray-400 dark:bg-gray-800 rounded-md p-2 text-sm"
                                >
                                    Update Experience
                                </button>
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
                                    className="bg-gray-400 dark:bg-gray-800 rounded-md p-2 text-sm"
                                >
                                    Update Experience
                                </button>
                            )}
                        </div>


                        <div className="bg-gray-200 dark:bg-gray-900 p-4 pb-3 mx-8 rounded-md mt-6 flex space-x-4">
                            <p className="w-34 mt-1 font-semibold">UG Qualifications</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            <p className="mt-1">{user.bachelors}</p>
                            {!ShowUpdateBachelors && (
                                <button
                                    onClick={() => setShowUpdateBachelors(true)}
                                    className="bg-gray-400 dark:bg-gray-800 rounded-md p-2 text-sm"
                                >
                                    Update Experience
                                </button>
                            )}
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
                                    className="bg-gray-400 dark:bg-gray-800 rounded-md p-2 text-sm"
                                >
                                    Update Bachelors
                                </button>
                            )}

                        </div>

                        <div className="bg-gray-200 dark:bg-gray-900 p-4 pb-3 mx-8 rounded-md mt-6 flex space-x-4">
                            <p className="w-34 mt-1 font-semibold">PG Qualifications</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            <p className="mt-1">{user.masters}</p>
                            {!ShowUpdateMasters && (
                                <button
                                    onClick={() => setShowUpdateMasters(true)}
                                    className="bg-gray-400 dark:bg-gray-800 rounded-md p-2 text-sm"
                                >
                                    Update Experience
                                </button>
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
                                    className="bg-gray-400 dark:bg-gray-800 rounded-md p-2 text-sm"
                                >
                                    Update Masters
                                </button>
                            )}


                        </div>

                        <div className="bg-gray-200 dark:bg-gray-900 p-4 pb-3 mx-8 rounded-md mt-6 mb-6 flex space-x-4">
                            <p className="w-32 mt-1 font-semibold">Tech Stack</p>
                            <div className="w-[1px] h-9 bg-gray-400"></div>
                            <p className="mt-1">{user.techStack?.join(', ')}</p>

                            {ShowAddSkill && (
                                <select>
                                    <option value="" disabled>Select a Skill</option>
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="Java">Java</option>
                                    <option value="Python">Python</option>
                                    <option value="C">C</option>
                                    <option value="C++">C++</option>
                                    <option value="C#">C#</option>
                                    <option value="PHP">PHP</option>
                                    <option value="Ruby">Ruby</option>
                                    <option value="Go">Go</option>
                                    <option value="Swift">Swift</option>
                                    <option value="Kotlin">Kotlin</option>
                                    <option value="Rust">Rust</option>
                                    <option value="TypeScript">TypeScript</option>
                                    <option value="Ruby on Rails">Ruby on Rails</option>
                                    <option value="SQL">SQL</option>
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


                        <button onClick={() => setShowPopup(true)} className="border-2 mt-2 p-2 ml-10 rounded-md dark:bg-black border-red-700 text-red-600 mb-10 hover:bg-red-700 hover:text-white">Delete Account</button>

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
