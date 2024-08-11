'use client'
import React, { useState, useRef } from 'react';
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});
import axios from 'axios';


export default function TextEditor() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File|null>(null);
  const [data,setData] = useState({
    title:"",
    category:"",
  });

  const editor = useRef(null);
  const onChangeHandler =(e:any)=>{
    setData(prev=>({
      ...prev,
      [e.target.name]:e.target.value
     }))
  }
  const onSubmitHandler =async(e:any)=>{
    e.preventDefault();
    // console.log('Data -> ',{...data,content,image});
    if(data.title==""||data.category==""||!image||content==""){
      alert("All Fields are required!");
      return;
    }
    // console.log("To Check if Validation Working or Not 👍");
    const formData = new FormData();
    formData.append('title',data.title);
    formData.append('category',data.category);
    formData.append('content',content);
    formData.append('image',image);
    // console.log('Formdata -> ',formData);
    try{
      const res = await axios.post("/api/blog",formData);
      // console.log("API Response:", res.data);
    }catch(e:any){
      console.error("Error creating blog:",e.message);
    }
   
    alert("Res Send!!!");
    setData({
      title:"",
      category:""
    })
    
    setImage(null);
    setContent("");
  }
  return (
    <>
      <div className="w-[90%] min-h-[600px] mx-auto relative top-[50%] translate-y-[-50%]">
        <h2 className="text-2xl font-bold py-5">Add New Blog</h2>
        <form
          id="form"
          action=""
          className="flex flex-col gap-5 no-scrollbar h-[85%]"
          onSubmit={onSubmitHandler}
        >
          <div className="flex flex-col gap-2 w-[300px]">
            {/* <label htmlFor="file" className='text-lg font-medium '>thumbnail : </label> */}
            <input
              type="file"
              name="image"
              id="image"
              value=""
              onChange={(e: any) => setImage(e.target.files[0])}
            />
          
          </div>
          <div className="flex flex-col gap-1">
            {/* <label htmlFor="title" className='text-lg font-medium '>title : </label> */}
            <input
              type="text"
              name="title"
              id="title"
              value={data.title}
              onChange={onChangeHandler}
              placeholder="Enter blog title"
              className="py-2 px-3 border-2 border-neutral-300 w-[50%] outline-none"
            />
          </div>
          <div className="flex flex-col gap-1 h-auto">
            {/* <label htmlFor="title" className='text-lg font-medium '>title : </label> */}
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              id="category"
              className="py-2 border border-slate-400 px-2 self-start"
            >
              <option value="" disabled selected>
                Choose Category
              </option>
              <option value="Webdev">WebDev</option>
              <option value="Css">Css</option>
              <option value="Javascript">Javascript</option>
              <option value="Startup">Startup</option>
              <option value="Devops">Devops</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 no-scrollbar h-[80%]">
            {/* <label htmlFor="post" className='text-lg font-medium '>post : </label> */}
            <div className="flex flex-col min-h-[98%] gap-5">
              <JoditEditor
                ref={editor}
                value={content}
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {
                  setContent(newContent);
                }}
              />
              <div className="overflow-hidden flex gap-2 z-40">
                <button
                  className="px-4 py-2 rounded-md text-white font-semibold bg-neutral-600"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
