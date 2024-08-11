'use client'
import Image from "next/image";
// import Link from "next/link";
import {ChevronDown,Dot} from 'lucide-react'
import Coding from '@/assets/coding.png';
import VS from '@/assets/vs.png';
import Html from '@/assets/html.png';
import Css from '@/assets/css.png';
import git from '@/assets/git.png';
// import fustrated from '@/assets/blog-header/fustrated.jpg';
import RecentPost from "@/components/blog/RecentPost";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "@/components/Footer";

export default function Home() {
 
  const [newslater,setNewslater] = useState("");
  const [recentBlogs,setRecentBlogs] = useState([{title:"",content:"",category:"",image:"",_id:""}]);
  const [randomBlogs,setRandomBlogs] = useState([{title:"",content:"",category:"",image:"",_id:""}]);
  const [loader,setLoader] = useState(true);
  const newslaterHandler=async(e:any)=>{
    e.preventDefault();
    console.log('Button Clicked!');
    // console.log(newslater);
    const formData = new FormData();
    formData.append('email',newslater);
    await axios.post('/api/newslater',formData);
    setNewslater("");
    alert("Newslater created successfully!");
  }

  const getBlogs=async()=>{
    setLoader(true);
    const result = await axios.get('/api/blog/getBlogs');
    // console.log(result.data);
    setRandomBlogs(result.data.randomBlogs);
    setRecentBlogs(result.data.recentBlogs);
    setLoader(false);
  }

  useEffect(()=>{
      console.log("Fetch Operation is going to perform>>>>");
      getBlogs();
  },[])

  useEffect(()=>{
     console.log("recentBlogs : ",recentBlogs);
     console.log("randomBlogs : ",randomBlogs);
  },[recentBlogs || randomBlogs])
  
  return (
    <>
    { !loader ?(
      <main className="w-screen min-h-screen">
      {/* Header */}
      <section className="gap-6 w-[80%] font-inter text-center md:h-screen h-[80vh] mx-auto flex flex-col justify-center items-center relative lg:bottom-10 md:py-0 sm:py-5">
        {/* imges */}
        <Image src={Coding} alt="img" className="md:w-[199px] w-[120px]" />
        <Image
          src={VS}
          alt="img"
          className="icons w-[50px] absolute right-[5%] bottom-[20%] transition-all scale-50 lg:flex hidden"
        />
        <Image
          src={Html}
          alt="img"
          className="icons w-[40px] absolute left-[10%] rotate lg:flex hidden"
        />
        <Image
          src={Css}
          alt="img"
          className="icons w-[40px] absolute bottom-[60%] right-[15%] rotate-12 lg:flex hidden"
        />
        <Image
          src={git}
          alt="img"
          className="icons w-[50px] absolute top-[20%] left-[25%] rotate-12 lg:flex hidden"
        />
        {/* imges */}
        <h2 className="md:text-[3rem] text-[2.3rem] font-bold overflow-hidden lg:w-[50%] sm:w-[80%] md:leading-[3.5rem] leading-[2.2rem]">
          Your Coding Journey Starts Here
        </h2>
        <p className="md:w-[65%] w-[79%]">
          Unlock your coding potential with expert tutorials, and insights. Join
          our community to stay ahead in the world of programming.
        </p>
        <button className="flex items-center py-2 gap-2 rounded-sm border-[2px] px-5 border-slate-700">
          Start Reading <ChevronDown />
        </button>
      </section>
      {/* Recent Blogs */}
      <section className="gap-6 w-[80%] font-inter text-center min-h-[48vh] mx-auto flex flex-col py-[3.5rem]">
        <div className="flex flex-col gap-[3px]">
          <h2 className="font-semibold text-2xl self-start">
            Recent blog posts
          </h2>
          <div className="w-5 bg-slate-400 h-[3px]"></div>
        </div>
        <div className="w-full gap-7  h-auto flex flex-wrap py-2">
          {
            recentBlogs.length > 0 && recentBlogs.map((blog)=>{
               return <RecentPost
               img={blog.image}
               id={blog._id}
               key={blog._id}
               author="Jatin Kumar"
               date="1 Jan 2024"
               title={blog.title}
               desc={blog.content}
               tags={blog.category}
               customecss="flex-grow"
             />
            })
          }
        </div>
      </section>
      {/* Top Blogs */}
      <section className=" gap-6 w-[80%] font-inter text-center min-h-[40vh] lg:h-auto sm:h-[40vh]  mx-auto flex flex-col md:py-0 sm:py-1 lg:mb-5 md:mb-0 mb-5">
        <div className="flex flex-col gap-[3px] h-auto">
          <h2 className="font-semibold text-2xl self-start">Random Blogs</h2>
          <div className="w-5 bg-slate-400 h-[3px]"></div>
        </div>
        <div className="gap-5 p-2 w-full h-auto flex overflow-x-auto no-scrollbar [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%) ">
          {randomBlogs.length > 0 && randomBlogs.map((item, index) => (
            <RecentPost
              key={index}
              id={item._id}
              img={item.image}
              author="Jatin Kumar"
              date="1 Jan 2024"
              title={item.title}
              desc={item.content}
              tags={item.category}
              customecss="min-w-[350px] bg-white animate-infinite-scroll"
            />
          ))}
        </div>
      </section>
      {/* Neswlater */}
      <section className="w-[80%] min-h-[30vh] flex justify-center items-center mx-auto" id="newslater">
        <div className="w-[100%] min-h-[200px] bg-blue-500 rounded-lg flex flex-col justify-center items-center gap-4 md:py-0 py-6">
          <h2 className="text-white font-semibold text-3xl text-center overflow-hidden">
            Get notified about our new blogs!
          </h2>
          <div className="flex gap-2 lg:flex-row flex-col justify-center items-center">
            <form action="" onSubmit={newslaterHandler} className="flex lg:flex-row gap-2 items-center justify-center flex-col">
            <input
              type="email"
              placeholder="Enter your email..."
              name="newslater"
              value={newslater}
              className="px-5 py-3 lg:w-[600px] md:w-[400px] w-[260px] rounded-md outline-none border-none"
              onChange={(e)=>{
                setNewslater(e.target.value)
                console.log(e.target.value)
              }}
            />
            <button className="bg-orange-500 transition-all duration-400 hover:bg-orange-600 text-white font-semibold px-7 lg:py-3 py-2 rounded-md lg:self-auto self-start" type="submit">
              Join Us
            </button>
            </form>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
    ):(
      <div className="w-[100vw] h-[92vh] flex justify-center items-center"><span className="loader"></span></div>
    ) }
     </>
  );
}

