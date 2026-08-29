import React from 'react'


import MainLayout from '../layout/MainLayout';


const Login = () => {
  return (
    <MainLayout>
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Library Status
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Check the current condition of the library.
        </p>
      </div>
    </MainLayout>
  )
}

export default Login
