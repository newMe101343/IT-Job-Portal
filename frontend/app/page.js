"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Components/Sidebar";
import { useUserContext } from "./Contexts/userContext";
export default function Home() {
  
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useUserContext();

  useEffect(() => {
    if(!isLoggedIn){
      router.push("/pages/sign-in");
    }
  }, [])


  return (
    <div>
      <Sidebar></Sidebar>
      <p> THIS IS HOME PAGE</p>
    </div>
  );
}
