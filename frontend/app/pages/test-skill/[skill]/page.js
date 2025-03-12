"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

function TestSkill() {

  const router = useRouter();
  const { skill } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute timer
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    if (!skill) return;

    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/skill/${skill}/questions`);
        const data = await response.json();

        if (data.questions) {
          setQuestions(data.questions);
        } else {
          toast.error("Failed to fetch questions.");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast.error("An error occurred while fetching questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [skill]); 

  useEffect(() => {

    const timer = setInterval(() => {
      if (timeLeft > 0 && isTimerRunning) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        clearInterval(timer);
        handleSubmitQuiz(); 
      }
    }, 1000);

    return () => clearInterval(timer); 
  }, [timeLeft, isTimerRunning]); 


  const handleAnswerChange = (index, answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [index]: answer,
    }));
  };

  const handleSubmitQuiz = async () => {
    let correctAnswersCount = 0;

    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswersCount++;
      }
    });

    if (correctAnswersCount >= 3) {
      const response = await fetch("http://localhost:5000/applicant/addSkill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ newSkill: skill }),
      });

      if (response.ok) {
        toast.success(`Quiz Passed! ${skill} added to your tech stack.`);
        setTimeout(() => {
          router.push("/pages/profile-applicant");
        }, 2000);
      } else {
        toast.error("Failed to add skill. Please try again.");
      }
    } else {
      toast.error("Quiz failed! You need at least 3 correct answers.");
      setTimeout(() => {
        router.push("/pages/profile-applicant");
      }, 2000);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ml-64 mr-64 p-2">
      <h2 className="text-2xl font-extrabold mb-4 text-gray-900 dark:text-gray-100 text-center">
        Quiz for {skill}
      </h2>

      {/* Timer */}
      <div className="text-center mb-4">
        <h3 className="text-xl">Time Left: {timeLeft} seconds</h3>
      </div>

      {questions.map((question, index) => (
        <div key={index} className="mb-6 w p-4 border-2 border-gray-300 rounded-lg shadow-md bg-slate-300 dark:bg-slate-900 dark:border-0">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{question.questionText}</p>
          <div className="space-y-4">
            {question.options.map((option, i) => (
              <div key={i} className="flex items-center">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={selectedAnswers[index] === option}
                  onChange={() => handleAnswerChange(index, option)}
                  className="mr-2"
                />
                <label className="text-gray-600 dark:text-gray-400">{option}</label>
              </div>
            ))}
          </div>
        </div>
      ))}


      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmitQuiz}
          className="px-4 py-2 font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit Quiz
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default TestSkill;
