"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUserContext } from '../Contexts/userContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useUserContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        setIsLoading(false);
    }, [setIsLoggedIn]);

    if (isLoading) return null;

    return (
        <nav className="bg-slate-950 shadow dark:bg-black fixed top-0 left-0 right-0 z-50">
            <div className="container px-6 py-4 mx-auto">
                <div className="lg:flex lg:items-center">
                    <div className="flex items-center justify-between mr-10">
                        <p className='font-extrabold text-2xl text-white'>
                            TechHire
                        </p>
                    </div>

                    {/* Social Icons */}
                    <a href="https://www.reddit.com/user/ResidentCountry3831/" className='ml-40 mr-6' target='blank'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.656 9.128 8.438 9.876.617.115.842-.27.842-.6v-2.091c-3.438.747-4.166-1.658-4.166-1.658-.562-1.428-1.375-1.81-1.375-1.81-1.124-.769.085-.753.085-.753 1.243.088 1.897 1.276 1.897 1.276 1.104 1.905 2.897 1.355 3.6 1.035.112-.801.432-1.355.78-1.664-2.742-.312-5.616-1.371-5.616-6.102 0-1.348.48-2.448 1.27-3.31-.128-.311-.55-1.562.124-3.25 0 0 1.03-.33 3.374 1.26a11.546 11.546 0 0 1 6.156 0c2.343-1.59 3.372-1.26 3.372-1.26.676 1.688.256 2.939.126 3.25.793.862 1.27 1.962 1.27 3.31 0 4.746-2.88 5.785-5.63 6.09.443.378.838 1.125.838 2.27v3.353c0 .333.225.72.85.6C20.345 21.126 22 16.99 22 12z" fill="#FF4500" />
                        </svg>
                    </a>

                    <a className='mr-6' target='_blank' href="https://www.linkedin.com/in/arshal-agarwal-4b534b295/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="#0077B5" d="M19 0H5C3.346 0 2 1.346 2 3v18c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3V3c0-1.654-1.346-3-3-3zm-11 18v-8h2v8H8zm1-9h-.001c-1.104 0-2-.897-2-2 0-1.104.897-2 2-2s2 .897 2 2c0 1.104-.896 2-2 2zm10 9h-2v-4.5c0-1.195-.646-1.794-1.676-1.794-.877 0-1.324.644-1.324 1.307V18h-2v-8h2v1.08c.624-.964 1.786-1.504 2.83-1.5 1.998 0 3.494 1.285 3.494 3.467V18z" />
                        </svg>
                    </a>



                    <a className='mr-10' target='_blank' href="https://github.com/Arshal-Agarwal/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.801 8.207 11.387.6.111.823-.261.823-.581 0-.287-.01-1.048-.015-2.064-3.338.726-4.035-1.531-4.035-1.531-.546-1.389-1.334-1.762-1.334-1.762-1.089-.744.083-.729.083-.729 1.205.085 1.837 1.246 1.837 1.246 1.07 1.836 2.808 1.303 3.495.997.108-.776.419-1.303.762-1.603-2.664-.304-5.466-1.334-5.466-5.928 0-1.307.467-2.375 1.236-3.216-.124-.303-.535-.915.117-1.876 0 0 1.006-.322 3.298 1.222a11.534 11.534 0 0 1 3.003-.404c1.015 0 2.044.133 3.003.404 2.293-1.544 3.298-1.222 3.298-1.222.653.961.241 1.573.117 1.876.77.841 1.236 1.91 1.236 3.216 0 4.595-2.804 5.623-5.469 5.928.43.373.813 1.104.813 2.226 0 1.606-.015 2.898-.015 3.289 0 .323.222.695.832.58C20.563 21.801 24 17.303 24 12c0-6.627-5.373-12-12-12z" fill="#ffffff" />
                        </svg>
                    </a>
                    {/* More social links here */}

                    <div className={`ml-10 absolute inset-x-0 z-20 flex-1 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-black dark:bg-black lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lg:justify-around ${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'}`}>
                        <div className="flex flex-col font-semibold text-white dark:text-gray-300 lg:flex t lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
                            <Link href="/" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-7">Home</Link>
                            <Link href="/" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-7">About</Link>
                            <Link href="/" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-7">Dashboard</Link>
                            <Link href="/" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-7">Contact Us</Link>

                            {/* Conditionally render login/logout links based on 'isLoggedIn' */}
                            {!isLoggedIn &&
                                <Link href="/pages/sign-in" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-9">Log in</Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
