import {dbConnect} from '@/config/db';
import { NextResponse } from 'next/server';
import Blog from '@/models/blog.model';

dbConnect();

export async function GET(){
    try{
        const recentBlogs = await Blog.find({}).sort({createdAt:-1}).limit(6);
        const randomBlogs = await Blog.find({}).limit(10);
    if(!recentBlogs && !randomBlogs){
        return Response.json({
            sucess: false,
            message:"Unable to get posts!"
        })
    }
    console.log("Recent Blogs -> ",recentBlogs);
    console.log("Random Blogs -> ",randomBlogs);
    return Response.json({
        sucess: true,
        message:"All Blogs Fetched Successfully!",
        recentBlogs:recentBlogs,
        randomBlogs:randomBlogs
    })
    }catch(err:any){
        console.log("Error while fetching all blogs --> ",err.message);
        return Response.json({
            sucess: false,
            message:"Error while fetching all blogs",
            error:err
        })
    }
 }