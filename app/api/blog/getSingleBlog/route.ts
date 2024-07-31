import {dbConnect} from '@/config/db';
import { NextResponse } from 'next/server';
import Blog from '@/models/blog.model';

dbConnect();

export async function GET(req:any){
    try{
        const id =  req.nextUrl.searchParams.get('id');
        if(!id){
          return Response.json({
             sucess: false,
             message:"id is required!"
          })
        }
    const res = await Blog.findById(id);
    return Response.json({
        sucess: true,
        message:"Blog Fetched Successfully!",
        blog:res
    })
    }catch(err:any){
        console.log("Error while fetching blog --> ",err.message);
        return Response.json({
            sucess: false,
            message:"Error while fetching blog",
            error:err
        })
    }
 }