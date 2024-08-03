"use client";
import { Menu,X,Linkedin,Instagram,Github } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menu,setMenu] = useState(false);
  function toggleMenu(){
    console.log("before --> ",menu);
    setMenu(!menu);
    console.log("after --> ",menu);
  }
  return (
    <div className="w-[100%]  flex items-center justify-center border border-b-[1px] border-slate-400 py-3 transition-all duration-300 z-40 bg-white">
      <div className="w-[80%] flex items-center justify-between mx-auto">
         {/* Logo */}
         <div className='md:w-[20%] w-[35%]'>
         <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                XeroDay
              </span>
         </div>
         {/* Navlinks */}
         <ul className="w-[80%] flex justify-end items-center gap-6">
          <Link href="/"><li className="responsive-nav">Home</li></Link>
          <Link href="/blogs"><li className="responsive-nav">Blogs</li></Link>
          <Link href="/contact"><li className="responsive-nav">Contact</li></Link>
          <Link href="/#newslater"><li className="pr-3 responsive-nav scroll-smooth">Newslater</li></Link>
          <Link href="/admin/dashboard"><li className="pr-3 responsive-nav text-red-300">Dashboard</li></Link>
          {/* Btn */}
          <div className="toggle flex gap-3">
            <button className="bg-slate-200 px-2 py-2 rounded-md cursor-pointer z-10 hamburger" onClick={toggleMenu}>
               {
                !menu ?   <Menu /> : <X/>
               }
                {/* <X /> */}
            </button>
          </div>
         </ul>
      </div>
      {
        menu? (
          <div className="w-[200px] h-[300px] bg-neutral-800 absolute top-14 z-50 right-[-1rem] rounded-2xl flex flex-col gap-2 justify-between py-4">
          <ul className='text-white text-2xl px-2 pt-4'>
            <li className='underline hover:text-slate-300 cursor-pointer'><Link href="/">Home</Link></li>
            <li className='underline hover:text-slate-300 cursor-pointer'><Link href="/blogs">Blogs</Link></li>
            <li className='underline hover:text-slate-300 cursor-pointer'><Link href="/contact">Contact</Link></li>
            <li className='underline hover:text-slate-300 cursor-pointer scroll-smooth'><Link href="/#newslater">Newlater</Link></li>
          </ul>
          <ul className='flex gap-3 px-2'>
            <Link href="https://www.linkedin.com/in/jatin-yadu-168225217/" className='bg-neutral-600 px-2 py-2 rounded-full transition-all duration-400 hover:bg-neutral-800'><Linkedin color="#ffffff" size={20}/></Link>
            <Link href="https://github.com/jatinthisside" className='bg-neutral-600 px-2 py-2 rounded-full transition-all duration-400 hover:bg-neutral-800'><Github color="#ffffff" size={20}/></Link>
            <Link href="#" className='bg-neutral-600 px-2 py-2 rounded-full transition-all duration-400 hover:bg-neutral-800'><Instagram color="#ffffff"  size={20}/></Link>
          </ul>
       </div>
        ) : ""
      }
      
    </div>
  )
}
