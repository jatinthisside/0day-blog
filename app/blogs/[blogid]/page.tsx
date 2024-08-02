'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Image from 'next/image'
import axios from 'axios';

export default function Page() {
  // const id = params.id;
  // console.log("Printing id -> ", id);
  const [blog,setBlog]=useState({
    image:"",
    title:"",
    content:""
  });
  const param = useParams()
  const fetchBlog=async()=>{
    console.log("Param -> ",param);
    const res = await axios.get(`/api/blog/${param.blogid}`)
    console.log(res);
    setBlog(res.data.blog);
  }
  useEffect(()=>{
    fetchBlog();
  },[])
  useEffect(()=>{
    console.log('Blog-> ',blog);
  },[blog])
  return (
    <section className="w-[100vw] h-[92vh] flex justify-center">
       <div className="w-[70%] h-full flex flex-col">
          {/* Thmbnail Image */}
          <div className="w-full h-[300px] bg-orange-200">
            <Image src={`/uploads/${blog?.image}`} alt="Thumbnail" width={500} height={200} objectFit='contain' className="w-full h-full"/>
          </div>
          {/* Thmbnail Image */}
          {/* Content */}
          <div className="w-full py-6" dangerouslySetInnerHTML={{__html:blog.content}} >

          </div>
          {/* Content */}
       </div>
    </section>
  )
}
