import React from 'react'
import Navbar from '../components/Navbar';

const MainLayout = ({children}) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}

export default MainLayout;
