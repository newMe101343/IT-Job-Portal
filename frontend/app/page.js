"use client"
import { useState, useEffect } from "react";

export default function Home() {
  const [message, setMessage] = useState(""); // Store the message in state

  useEffect(() => {
    // Fetch data only after the component has mounted
    async function getData() {
      try {
        const response = await fetch("http://localhost:5000");
        const data = await response.json(); // Parse the response to JSON
        setMessage(data.message); // Access the 'message' property directly
        console.log(data); // Log the full data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData(); // Call the async function to fetch data
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <div>
      <p>this is the message: - {message}</p>
    </div>
  );
}
