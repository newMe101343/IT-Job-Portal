"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useUserContext } from '../Contexts/userContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useUserContext();  // Using the custom hook here

    async function logOutClick() {

        
        const response = fetch("http://localhost:5000/applicant/logout",{
                method:'POST',
                credentials: 'include',
                
            });
       
            // console.log(await response.json());
        
        const response2 = fetch("http://localhost:5000/HR/logout",{
            method:'POST',
            credentials: 'include',

        });
        // console.log(await response.json());
        

        setIsLoggedIn(false);
        router.push("/pages/sign-in")
    }

    return (
        <nav className="bg-black shadow dark:bg-black">
            <div className="container px-6 py-4 mx-auto">
                <div className="lg:flex lg:items-center">
                    <div className="flex items-center justify-between mr-10">
                        <p className='font-extrabold text-2xl text-white'>
                            TechHire
                        </p>
                    </div>



                    <a href="" className='ml-40 mr-6' target='blank'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.656 9.128 8.438 9.876.617.115.842-.27.842-.6v-2.091c-3.438.747-4.166-1.658-4.166-1.658-.562-1.428-1.375-1.81-1.375-1.81-1.124-.769.085-.753.085-.753 1.243.088 1.897 1.276 1.897 1.276 1.104 1.905 2.897 1.355 3.6 1.035.112-.801.432-1.355.78-1.664-2.742-.312-5.616-1.371-5.616-6.102 0-1.348.48-2.448 1.27-3.31-.128-.311-.55-1.562.124-3.25 0 0 1.03-.33 3.374 1.26a11.546 11.546 0 0 1 6.156 0c2.343-1.59 3.372-1.26 3.372-1.26.676 1.688.256 2.939.126 3.25.793.862 1.27 1.962 1.27 3.31 0 4.746-2.88 5.785-5.63 6.09.443.378.838 1.125.838 2.27v3.353c0 .333.225.72.85.6C20.345 21.126 22 16.99 22 12z" fill="#FF4500" />
                        </svg>
                    </a>

                    <a className='mr-6' target='blank' href="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M7.5 2C4.46243 2 2 4.46243 2 7.5V16.5C2 19.5376 4.46243 22 7.5 22H16.5C19.5376 22 22 19.5376 22 16.5V7.5C22 4.46243 19.5376 2 16.5 2H7.5ZM16.5 0C20.6421 0 24 3.35786 24 7.5V16.5C24 20.6421 20.6421 24 16.5 24H7.5C3.35786 24 0 20.6421 0 16.5V7.5C0 3.35786 3.35786 0 7.5 0H16.5ZM12 6.5C8.96243 6.5 6.5 8.96243 6.5 12C6.5 15.0376 8.96243 17.5 12 17.5C15.0376 17.5 17.5 15.0376 17.5 12C17.5 8.96243 15.0376 6.5 12 6.5ZM12 4.5C16.1421 4.5 19.5 7.85786 19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5ZM18.5 5C18.5 5.82843 17.8284 6.5 17 6.5C16.1716 6.5 15.5 5.82843 15.5 5C15.5 4.17157 16.1716 3.5 17 3.5C17.8284 3.5 18.5 4.17157 18.5 5Z" fill="#E1306C" />
                        </svg>
                    </a>

                    <a className='mr-10' target='blank' href="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M23.444 4.834c-.814.362-1.688.604-2.606.713a4.496 4.496 0 0 0 1.965-2.48 8.864 8.864 0 0 1-2.83 1.079 4.482 4.482 0 0 0-7.643 3.055c0 .35.04.694.116 1.023A12.724 12.724 0 0 1 1.64 3.161a4.488 4.488 0 0 0 1.388 5.98 4.448 4.448 0 0 1-2.032-.562v.058a4.495 4.495 0 0 0 3.59 4.403 4.524 4.524 0 0 1-1.182.157c-.289 0-.567-.028-.841-.082a4.495 4.495 0 0 0 4.204 3.126A8.998 8.998 0 0 1 0 18.636a12.745 12.745 0 0 0 6.858 2.006c8.232 0 12.772-6.823 12.772-12.772 0-.195-.005-.39-.014-.584A9.003 9.003 0 0 0 23.444 4.834z" fill="#1DA1F2" />
                        </svg>
                    </a>

                    <div className={`ml-10 absolute inset-x-0 z-20 flex-1 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-black dark:bg-black lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lg:justify-around ${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'}`}>
                        <div className="flex flex-col font-semibold text-white dark:text-gray-300 lg:flex t lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
                            <Link href="/" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-7">Home</Link>
                            <Link href="/" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-7">About</Link>
                            <Link href="/" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-7">Dashboard</Link>
                            <Link href="/" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-7">Jobs</Link>
                            {!isLoggedIn && <Link href="/pages/sign-in" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-9">Log in</Link>}
                            {isLoggedIn && (
                                <button onClick={logOutClick}>
                                    <Link href="/" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-9">Log out</Link>
                                </button>
                            )}
                        </div>

                        <div className="flex justify-center mt-6 lg:flex lg:mt-0 lg:-mx-2">
                            {/* Social icons */}

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
