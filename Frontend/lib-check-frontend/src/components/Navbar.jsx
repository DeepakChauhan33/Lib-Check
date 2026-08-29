import React from 'react'


// LUcide Icons
import { CircleUserRound } from "lucide-react";

const Navbar = () => {
  return (
    <header className=' border-b border-slate-200 p-4 bg-blue-100'>
      <div className='mx-auto w-full h-12 flex items-center justify-between px-4 sm:px-6 lg:px-8'>

        {/* LOGO */}
        <div>

        </div>



        {/* User Profile */}
        <div>
          <CircleUserRound />
        </div>

      </div>
    </header>
  )
}

export default Navbar
