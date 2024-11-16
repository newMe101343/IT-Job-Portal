"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Components/Sidebar";
import { useUserContext } from "./Contexts/userContext";

export default function Home() {

  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useUserContext();
  const [loading, setLoading] = useState(true);  // Track loading state

  useEffect(() => {
    // Wait until the login state is loaded before checking
    if (loading) {
      setLoading(false);
      return;
    }

    // Check if the user is logged in
    if (!isLoggedIn) {
      // If not logged in, redirect to the sign-in page
      router.push("/pages/sign-in");
    }
  }, [isLoggedIn, loading, router]); // Dependencies include loading to ensure the effect runs after loading state changes.

  return (
    <div>
      {/* Only render the Sidebar and content if the user is logged in and not loading */}
      {!loading && isLoggedIn && (
        <>
          <Sidebar />
          <p>THIS IS HOME PAGE</p>
        </>
      )}
    </div>
  );
}
