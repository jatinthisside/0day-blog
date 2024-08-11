'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Page() {
  const [blogs,setBlogs]=useState([{
    _id:"",
    title:"",
    content:"",
    createdAt:"",
    image:""
  }]);
  const fetchBlogs=async()=>{
     const res = await axios.get('/api/blog');
    //  console.log(res.data.blogs);
     setBlogs(res.data.blogs);
  }
  useEffect(()=>{
    fetchBlogs();
  },[])
 
  const deleteHandler=async(id:any)=>{
     await axios.delete('/api/blog',{
       params:{id:id}
     })
     const newBlogs = await blogs.filter((blog)=>{
        return blog._id !== id;
     })
     setBlogs(newBlogs);
     alert("Blog deleted successfully!");
  }
  return (
    <>
        <div className="w-[90%] h-[650px] mx-auto relative top-[50%] translate-y-[-50%] scrollbar-hide">
          <div className="p-10 flex flex-col justify-center items-center gap-4 h-auto overflow-y-scroll scrollbar-hide">
            {/* Blogs */}
            { blogs.length > 0 ? blogs.map((blog:any) => (
              <div key={blog._id} className="w-[95%] min-h-[100px] bg-neutral-100 drop-shadow-md rounded-lg flex items-center justify-between pr-5">
                <div className="py-4 px-2 flex flex-col gap-2">
                  <p className="text-lg font-medium">{blog.title}</p>
                  <p className="text-sm text-gray-500">
                    {`${blog.content.slice(0,40)}....`}
                  </p>
                </div>
                <div>
                  <button className="text-lg bg-red-400 py-1 px-3 text-white rounded-full" onClick={()=>deleteHandler(blog._id)}>
                    X
                  </button>
                </div>
              </div>
              )): <h1 className="text-4xl font-semibold overflow-hidden">NO POST FOUND!</h1>
            } 
            {/* Blogs */}
          </div>
        </div>
    </>
  );
}
