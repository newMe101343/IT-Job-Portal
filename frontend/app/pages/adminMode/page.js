"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/app/Components/Sidebar";

function AdminMode() {
  const [showAddSkillDiv, setShowAddSkillDiv] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [question, setQuestion] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = value;
    setQuestion((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  const handleSubmit = async () => {
    if (skillName.trim() === "" || question.questionText.trim() === "") {
      toast.error("Skill name and question text cannot be empty.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/skill/addQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skillName, question }),
      });

      if (response.ok) {
        toast.success(`${skillName} question added successfully.`);
        setSkillName("");
        setQuestion({
          questionText: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        });
        setShowAddSkillDiv(false);
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Failed to add question. Please try again.");
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="ml-64 p-2">
        <p>This is Admin Mode</p>
        <button
          onClick={() => setShowAddSkillDiv(true)}
          className="mt-6 flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        >
          <svg
            className="w-5 h-5 mx-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
          </svg>
          <span className="mx-1">Add Question</span>
        </button>

        {showAddSkillDiv && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-2xl w-full relative">
              <button
                onClick={() => setShowAddSkillDiv(false)}
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-2xl"
              >
                &times;
              </button>
              <h2 className="text-2xl font-extrabold mb-4 text-gray-900 dark:text-gray-100 text-center">
                Add New Skill and Question
              </h2>

              <div className="mb-5">
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skill Name
                </label>
                <select
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                >
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

              </div>

              <div className="mb-5">
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Question Text
                </label>
                <input
                  type="text"
                  name="questionText"
                  value={question.questionText}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                  placeholder="Enter question text"
                />
              </div>

              <div className="mb-5">
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Options
                </label>
                {question.options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                    placeholder={`Option ${index + 1}`}
                  />
                ))}
              </div>

              <div className="mb-5">
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Correct Answer
                </label>
                <input
                  type="text"
                  name="correctAnswer"
                  value={question.correctAnswer}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                  placeholder="Enter correct answer"
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowAddSkillDiv(false)}
                  className="ml-4 px-4 py-2 font-medium text-white bg-red-600 rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default AdminMode;
