"use client"

import React from 'react';
import { Toast, toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';

function Admin() {

  const router = useRouter();

  const handleSubmit = () => {
    const password = document.getElementById("pass").value; 

    if (password === "AdminModePassword") {
      toast.success("Access granted. Welcome to Admin Mode!");
      router.push('/pages/adminMode')
    } else {
      toast.error("Incorrect password.");
    }
  };

  return (
    <div>
      <p className="font-bold justify-center my-32 flex text-3xl">Admin Mode</p>
      
      <div className="flex justify-center">
        <label htmlFor="pass" className="mt-2">Enter Password: </label>
        <input
          type="password"
          id="pass"
          className="mr-5 text-black border-2 border-black p-2 ml-6"
        />
        <button
          onClick={handleSubmit}  
          className="bg-blue-500 text-white p-2 rounded-md px-4"
        >
          Submit
        </button>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default Admin;
