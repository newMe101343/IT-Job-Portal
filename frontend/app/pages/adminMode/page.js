"use client"

import React from 'react'
import { Toast, toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';

function AdminMode() {

  useEffect(() => {
    toast.success("Admin Mode Activated")
  }, [])
  

  return (
    <div>
      <p>This is Admin Mode</p>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default AdminMode
