'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  // const router = useRouter();
  return (
    <>
    {true ? <div className="w-[80vw] h-[600px] mx-auto flex justify-center items-center flex-col gap-5 overflow-hidden">
      <h1 className='text-3xl font-semibold text-left overflow-hidden'>Welcome to /dashboard</h1>
      <p>This admin dashboard can be used to manage blogs and Newslater</p>
      <ul className='flex flex-col gap-1'>
        <p className='text-center'>With the help of this dashboard, you can : </p>
        <div className='flex gap-2'>
        <li>Create Blog /</li>
        <li>Delete Blog /</li>
        <li>See all blogs /</li>
        <li>Delete & see newslater</li>
        </div>
      </ul>
    </div> :""}
    </>
  )
}
