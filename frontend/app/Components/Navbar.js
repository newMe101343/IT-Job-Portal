"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useUserContext } from '../Contexts/userContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useUserContext();  // Using the custom hook here


    return (
        <nav className="bg-slate-950 shadow dark:bg-black">
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

                    <a className='mr-6' target='_blank' href="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="#1DA1F2" d="M23.444 4.834c-.814.362-1.688.604-2.606.713a4.496 4.496 0 0 0 1.965-2.48 8.864 8.864 0 0 1-2.83 1.079 4.482 4.482 0 0 0-7.643 3.055c0 .35.04.694.116 1.023A12.724 12.724 0 0 1 1.64 3.161a4.488 4.488 0 0 0 1.388 5.98 4.448 4.448 0 0 1-2.032-.562v.058a4.495 4.495 0 0 0 3.59 4.403 4.524 4.524 0 0 1-1.182.157c-.289 0-.567-.028-.841-.082a4.495 4.495 0 0 0 4.204 3.126A8.998 8.998 0 0 1 0 18.636a12.745 12.745 0 0 0 6.858 2.006c8.232 0 12.772-6.823 12.772-12.772 0-.195-.005-.39-.014-.584A9.003 9.003 0 0 0 23.444 4.834z" />
                        </svg>
                    </a>


                    <a className='mr-10' target='_blank' href="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.801 8.207 11.387.6.111.823-.261.823-.581 0-.287-.01-1.048-.015-2.064-3.338.726-4.035-1.531-4.035-1.531-.546-1.389-1.334-1.762-1.334-1.762-1.089-.744.083-.729.083-.729 1.205.085 1.837 1.246 1.837 1.246 1.07 1.836 2.808 1.303 3.495.997.108-.776.419-1.303.762-1.603-2.664-.304-5.466-1.334-5.466-5.928 0-1.307.467-2.375 1.236-3.216-.124-.303-.535-.915.117-1.876 0 0 1.006-.322 3.298 1.222a11.534 11.534 0 0 1 3.003-.404c1.015 0 2.044.133 3.003.404 2.293-1.544 3.298-1.222 3.298-1.222.653.961.241 1.573.117 1.876.77.841 1.236 1.91 1.236 3.216 0 4.595-2.804 5.623-5.469 5.928.43.373.813 1.104.813 2.226 0 1.606-.015 2.898-.015 3.289 0 .323.222.695.832.58C20.563 21.801 24 17.303 24 12c0-6.627-5.373-12-12-12z" fill="#ffffff" />
                        </svg>
                    </a>


                    <div className={`ml-10 absolute inset-x-0 z-20 flex-1 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-black dark:bg-black lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lg:justify-around ${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'}`}>
                        <div className="flex flex-col font-semibold text-white dark:text-gray-300 lg:flex t lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
                            <Link href="/" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-7">Home</Link>
                            <Link href="/" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-7">About</Link>
                            <Link href="/" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-7">Dashboard</Link>
                            <Link href="/" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-7">Jobs</Link>
                            {!isLoggedIn && <Link href="/pages/sign-in" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-9">Log in</Link>}

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
