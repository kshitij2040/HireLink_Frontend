"use client";

import { useState, useEffect } from 'react';
import JobCard from '@/components/JobCard';
import ToggleButtons from '@/components/ToggleButtons';
import BurgerMenu from '@/components/BurgerMenu';

export default function Home() {
  const [activeTab, setActiveTab] = useState('latest');
  const [jobData, setJobData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // For loading state

  // Fetch job data from the backend
  const fetchJobs = async () => {
    setIsLoading(true); // Set loading to true before fetching data
    try {
      console.log(`Fetching jobs for tab: ${activeTab}`); // Debug log
      const response = await fetch(
        activeTab === 'latest'
          ? 'https://hire-link-ten.vercel.app/latest-jobs'
          : 'https://hire-link-ten.vercel.app/all-jobs'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const data = await response.json();
      console.log("Fetched job data:", data); // Debug log
      setJobData(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false); // Set loading to false after fetch completes
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [activeTab]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* bg image - stays fixed */}
      <img className="fixed inset-0 h-full w-full object-cover -z-50" src=".\Vector 1.png" alt="Background" />

      {/* Blur container - stays fixed */}
      <div className="fixed inset-0 z-40 backdrop-blur-[60px] bg-opacity-50"></div>

      {/* Scrollable content */}
      <div className="relative z-50 h-full overflow-y-auto">
        <div className="absolute top-4 text-4xl left-4">
          <h1>HireLink</h1>
        </div>
        <div className="absolute top-6 right-10">
          <BurgerMenu /> 
        </div>

        {/* Toggle buttons */}
        <div className="flex justify-center items-center w-full absolute top-20">
          <ToggleButtons activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Job cards container */}
        <div className="flex flex-col items-center mt-36 space-y-4">
          {isLoading ? (
            <p>Loading jobs...</p>
          ) : (
            jobData.map((job) => (
              <JobCard
                key={job._id} // MongoDB provides _id
                title={job.title}
                description={job.description}
                link={job.link}
                
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
