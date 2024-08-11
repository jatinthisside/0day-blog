'use client'
import React, { useEffect, useState } from 'react'
import RecentPost from '@/components/blog/RecentPost'
import axios from 'axios';

export default function Page() {
  const [loader,setLoader] = useState(false);
  const [blogs,setBlogs] = useState([{
    image:"",
    title:"",
    content:"",
    category:"",
    _id:""
  }]);
  const [menu,setMenu] = useState('All')
  const fetchBlogs=async()=>{
    setLoader(true);
    const result = await axios.get('/api/blog');
    setBlogs(result.data.blogs);
    setLoader(false);
  }
  useEffect(()=>{
      fetchBlogs();
  },[])
  return (
    <>
      {
        !loader ? (
          <section className='w-[100vw] min-h-[92vh] flex justify-center overflow-hidden'>
      {/* Outer div for filter and conatiner */}
      <div className='md:w-[80vw] w-[90%] h-[100%] flex flex-col gap-1 items-center pt-5 overflow-hidden mb-2'>
          <ul className='flex gap-3 flex-wrap md:h-[8%] h-[15%] justify-center'>
            <li className='text-base bg-neutral-800 rounded-md cursor-pointer hover:bg-neutral-700 transition-all duration-300 hover:text-orange-50 text-white w-[80px] flex justify-center items-center h-[30px]' onClick={(e)=>setMenu('All')}>All</li>
            <li className='text-base bg-neutral-800 rounded-md cursor-pointer hover:bg-neutral-700 transition-all duration-300 hover:text-orange-50 text-white w-[80px] flex justify-center items-center h-[30px]' onClick={(e)=>setMenu('Css')}>Css</li>
            <li className='text-base bg-neutral-800 rounded-md cursor-pointer hover:bg-neutral-700 transition-all duration-300 hover:text-orange-50 text-white w-[80px] flex justify-center items-center h-[30px]' onClick={(e)=>setMenu('Startup')}>Startup</li>
            <li className='text-base bg-neutral-800 rounded-md cursor-pointer hover:bg-neutral-700 transition-all duration-300 hover:text-orange-50 text-white w-[80px] flex justify-center items-center h-[30px]' onClick={(e)=>setMenu('Javascript')}>Javascript</li>
            <li className='text-base bg-neutral-800 rounded-md cursor-pointer hover:bg-neutral-700 transition-all duration-300 hover:text-orange-50 text-white w-[80px] flex justify-center items-center h-[30px]' onClick={(e)=>setMenu('Devops')}>DevOps</li>
            <li className='text-base bg-neutral-800 rounded-md cursor-pointer hover:bg-neutral-700 transition-all duration-300 hover:text-orange-50 text-white w-[80px] flex justify-center items-center h-[30px]' onClick={(e)=>setMenu('Webdev')}>WebDev</li>
          </ul>
          {/* Content container */}
          <div className='w-full h-auto flex-wrap mt-3 overflow-x-scroll flex gap-6 py-4 px-8 no-scrollbar'>
             {
                blogs.length > 0 && blogs.filter((item)=>menu==="All"?true:item.category===menu).map((blog)=>{
                    return <RecentPost
                    id={blog._id}
                    key={blog._id}
                    img={blog.image}
                    author="Jatin Kumar"
                    date="1 Jan 2024"
                    title={blog.title}
                    desc={blog.content}
                    tags={blog.category}
                    customecss="flex-grow min-w-[150px]"
                  />
                 })
             }
          </div>
          {/* Content container */}
      </div>
       {/* Outer div for filter and conatiner */}
    </section>
        ) : <div className="w-[100vw] h-[92vh] flex justify-center items-center"><span className='loader'></span></div>
      }
    </>
  )
}
