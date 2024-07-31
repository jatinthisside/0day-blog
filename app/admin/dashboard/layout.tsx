import React from 'react'
import Navbar from '@/components/Navbar/Navbar';
import Link from 'next/link';

export default function layout({children}:any) {
  return (
    <div className="w-[100vw] min-h-[92vh] bg-neutral-800 flex gap-1 pt-1 relative">
        <div className='w-[20%] h-[91vh] bg-blue-400 py-10 flex flex-col gap-3'>
            <h2 className="text-white font-semibold text-2xl px-6">/Dashboard/🏋🏼</h2>
            {/* sidebar */}
            <ul className="flex flex-col gap-10 h-auto pl-14 absolute left-9 top-[7rem] z-10">
                <Link href="/admin/dashboard/addPost" className='w-[230px] h-[45px] flex px-2 rounded font-medium items-center bg-white border-2 border-slate-600 hover:scale-95 z-20 transition-all duration-500'>
                    <li>Add Post</li>
                </Link>
                <Link href="/admin/dashboard/allPost" className='w-[230px] h-[45px] flex px-2 rounded font-medium items-center bg-white border-2 border-slate-600 hover:scale-95 z-20 transition-all duration-500'>
                    <li>All Posts</li>
                </Link>
                <Link href="/admin/dashboard/newslater" className='w-[230px] h-[45px] flex px-2 rounded font-medium items-center bg-white border-2 border-slate-600 hover:scale-95 z-20 transition-all duration-500'>
                    <li>Newslater</li>
                </Link>
            </ul>
        </div>
        <div className='w-[80%] bg-white h-[91vh]'>
            {children}
        </div>
    </div>
  )
}
