"use client";


import AddCompanyForm from '@/components/AddCompanyForm';

import BurgerMenu from '@/components/BurgerMenu';
import { useState } from 'react';

export default function AddDescription() {

  return (
    <div className="relative h-screen overflow-hidden">

      <div className='absolute top-4 z-50 text-4xl left-4'>
        <h1>HireLink</h1>
      </div>
     


      {/* bg image */}
      <img className="fixed inset-0 h-full w-full object-cover -z-50" src=".\Vector 1.png" alt="Background" />

      {/* Blur container */}
      <div className="fixed inset-0 z-20 backdrop-blur-[60px] bg-opacity-50"></div>

      <div className='fixed flex justify-center items-center h-screen w-screen z-20 bg-opacity-50'>

        <AddCompanyForm />

      </div>
    </div>
  );
}
