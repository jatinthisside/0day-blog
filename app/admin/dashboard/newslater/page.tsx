'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';


export default function Page() {
  const [newslaters,setNewslaters]=useState([{
    _id:"",
    email:""
  }]);
  const fetchNewslaters=async()=>{
     const res = await axios.get('/api/newslater');
     console.log(res.data.newslaters);
     setNewslaters(res.data.newslaters);
  }
  useEffect(()=>{
    fetchNewslaters();
  },[])
  useEffect(()=>{
    console.log("Changes in newslaters -> ",newslaters);
  },[newslaters])

  const deleteHandler=async(id:any)=>{
     await axios.delete('/api/newslater',{
       params:{id:id}
     })
     const newNews = await newslaters.filter((newslater)=>{
        return newslater._id !== id;
     })
     setNewslaters(newNews);
     alert("Newslater deleted successfully!");
  }
  return (
    <>
        <div className="w-[90%] h-[650px] mx-auto relative top-[50%] translate-y-[-50%] scrollbar-hide">
          <div className="p-10 flex flex-col justify-center items-center gap-4 h-auto overflow-y-scroll scrollbar-hide">
          
            { newslaters.length > 0 ? newslaters.map((news:any) => (
              <div key={news._id} className="w-[95%] min-h-[70px] bg-neutral-100 drop-shadow-md rounded-lg flex items-center justify-between pr-5">
                <div className="py-4 px-2 flex flex-col gap-2">
                  <p className="text-lg font-medium">{news.email}</p>
                </div>
                <div>
                  <button className="text-lg bg-red-400 py-1 px-3 text-white rounded-full" onClick={()=>deleteHandler(news._id)}>
                    X
                  </button>
                </div>
              </div>
              )): <h1 className="text-4xl font-semibold overflow-hidden">NO ENTRY FOUND!</h1>
            } 
        
          </div>
        </div>
    </>
  );
}
