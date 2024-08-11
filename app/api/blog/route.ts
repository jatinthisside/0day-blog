import {dbConnect} from '@/config/db';
import { NextResponse } from 'next/server';
import Blog from '@/models/blog.model';
import {uploadImage} from '@/config/upload-image';
import { deleteImage } from '@/config/delete-image';

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
    // console.log(response);
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
    console.log("Ready To Create New Blog!");    
    const formData = await req.formData();
    const image = formData.get("image") as File;
    const title = formData.get("title");
    const content = formData.get("content");
    const category = formData.get("category");
    console.log("FormData Got -> ",formData);
    if(!image || !title || !content || !category){
        return NextResponse.json({
            success:false,
            message:"All fields are required!",

        },{status:400})
    }
    if (!image) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }
    console.log("Just Before Cloudinary Image Responce !");
    const uploadResponse = await uploadImage(image,'next/blogs');
    console.log("Cloudinary Image Responce -> ",uploadResponse);

    console.log("Image saved to cloudinary");

      const res = await Blog.create({
        title:title,
        content:content,
        category:category,
        image:uploadResponse.secure_url,
        public_id:uploadResponse.public_id
      })

      console.log("Responce to Db Generated!");

    //   console.log("Responce -> ",res);
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
    try{
        const blog = await Blog.findById(id);
        await deleteImage(blog.public_id);
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