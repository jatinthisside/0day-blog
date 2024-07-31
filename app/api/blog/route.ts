import {dbConnect} from '@/config/db';
import { NextResponse } from 'next/server';
import path from "path";
import { writeFile,unlink } from "fs/promises";
import type { NextApiRequest, NextApiResponse } from 'next';
import Blog from '@/models/blog.model';
import mongoose from 'mongoose';

dbConnect();

 export async function GET(){
    try{
        const response = await Blog.find({}).sort({createdAt:-1});
    if(!response){
        return Response.json({
            sucess: false,
            message:"Unable to get posts!"
        })
    }
    console.log(response);
    return Response.json({
        sucess: true,
        message:"All Blogs Fetched Successfully!",
        blogs: response,
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

 export async function POST(req:any){
    try{
    const formData = await req.formData();
    const image = formData.get("image");
    const title = formData.get("title");
    const content = formData.get("content");
    const category = formData.get("category");
    if(!image || !title || !content || !category){
        return NextResponse.json({
            success:false,
            message:"All fields are required!",

        },{status:400})
    }
    if (!image) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }
    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = Date.now() + image.name.replaceAll(" ", "_");
    console.log(filename);
    await writeFile(
        path.join(process.cwd(), "/public/uploads/" + filename),
        buffer
      );
      const ImageUrl = filename;
      const res = await Blog.create({
        title:title,
        content:content,
        category:category,
        image:ImageUrl
      })
      console.log(res);
    return NextResponse.json({
        success: true,
        message:"Succesfully created Post!",
        data:res
    })
       
    }catch(err:any){
        console.log("Error While Creating New Post! -> ",err.message);
        return NextResponse.json({ 
            success: false,
            message:"Error while creating new post",
            error: err
        })
    }
 }


 export async function DELETE(req:any){
    const id =  req.nextUrl.searchParams.get('id');
    // const objId = new mongoose.Types.ObjectId(id);
    console.log('Printing id -> ',id);
    try{
        const blog = await Blog.findById(id);
        console.log("Printing Blog -> ", blog);
        console.log('blog image -> ',blog.image);
        unlink(`./public/uploads/${blog.image}`);
        console.log("error nhi aya..");
        await Blog.findByIdAndDelete(id);
    }catch(err:any){
        console.log("Error while deleting blog --> ",err.message);
        return NextResponse.json({
            success:false,
            message:"Error While Deleteing Blog!",
            Error:err
        })
    }
    console.log(id);
    return NextResponse.json({
        success:true,
        message:"OK",
        id:id
    })
 }