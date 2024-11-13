import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function SignIn() {
  return (
    <div>
      <div className="bg-white dark:bg-slate-950">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)'
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">Blog.</h2>
                <p className="max-w-xl mt-3 text-gray-300">
                  Welcome to Blog — where every voice finds its stage. Share your stories, insights, and passions with a vibrant community of readers and writers. Seamlessly blend creativity with simplicity, and let your words make an impact.
                </p>
              </div>
            </div>
          </div>

          <div className="flex mt-16 w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">




                <div className="h-8"> {/* Fixed height to prevent shifting */}
                  <p className="text-black text-3xl font-bold font-serif  dark:text-white">TechHire</p>
                </div>

                <br />

              </div>

              <div >
                <form>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      id="email"

                      placeholder="example@example.com"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                    </div>

                    <input
                      type="password"
                      name="password"
                      id="password"

                      placeholder="Your Password"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"

                    >
                      Sign in
                    </button>
                  </div>

                  <div className="mt-6 mx-auto flex space-x-4">
                    <button
                      type="button"
                      className="w-2/5 px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      Sign in
                    </button>

                    <button
                      type="button"
                      className="w-2/5 px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      Sign in
                    </button>
                  </div>

                  



                </form>

                <p className="mt-6 text-sm text-center text-gray-400">Don’t have an account yet? <Link href="../Pages/SignUp" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
