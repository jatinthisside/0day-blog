import React from 'react'
import {Dot} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function RecentPost({id,img,title,desc,author,date,tags,customecss}:any) {
  
  const router=useRouter();
  console.log(img);
  const clickHandler=()=>{
     router.push(`/blogs/${id}`);
  }

  return (
    <div
      onClick={clickHandler}
      className={`card w-[350px] py-5 rounded-md flex flex-col gap-3 shadow-2xl shadow-blue-500/20 hover:shadow-[5px_5px_0px_0px_rgba(65,105,125)] ${customecss}`}
    >
      {
        img ? <div className="w-full h-[200px]">
          <Image
            src={img}
            alt="blogImg"
            className="w-full h-full"
            style={{ objectFit: "cover" }}
            width={0}
            sizes='80%'
            height={0}
          />
        </div> :""
      }
      <div className="w-full flex flex-col gap-3 px-3">
        <div className="flex text-semibold text-xs items-center">
          <p className="text-slate-500">{author}</p>
          <Dot />
          <p>{date}</p>
        </div>
        <h2 className="font-semibold text-xl text-left self-start">{title}</h2>
        {/* <div className="text-left text-[12px] text-slate-500" dangerouslySetInnerHTML={{__html:previewContent}}/>  */}
        <div className="flex gap-2 text-[10px]">
          {/* <button className="bg-blue-100 px-2 py-1 rounded-md">Leadership</button>
      <button className="bg-blue-100 px-2 py-1 rounded-md">Management</button> */}
          <button className="bg-blue-100 px-2 py-1 rounded-md">{tags}</button>
        </div>
      </div>
    </div>
  );
}


