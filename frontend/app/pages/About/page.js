import React from 'react'
import AboutCard from '@/app/Components/AboutCard'
import AboutDevs from '@/app/Components/AboutDevs'

 function About() {
  return (
    <div className='mt-4 bg-slate-100 dark:bg-gray-900 text-black dark:text-white'>
      <AboutCard></AboutCard>
      <h1 className="text-2xl mt- text-center font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">About the Developers</h1>
      <br />
      <br />
      <br />
      <AboutDevs></AboutDevs>
    </div>
  )
}

export default About;