import Newslater from '@/models/newslater.model';
import { dbConnect } from '@/config/db';
import { NextResponse } from 'next/server';

dbConnect();

export async function POST(req:any){
   try{
    const formData = await req.formData();
    const email = formData.get('email');
    console.log("Done...");
    console.log(email);
    if(!email){
     return NextResponse.json({
         success:false,
         message:"All Fields Are Required!"
     })
    }
    const responce = await Newslater.create({email:email});
    console.log(responce);
    return NextResponse.json({
      success:true,
      message:"Newslater Subscribed!",
      newslaters:responce
    })
   }catch(err:any){
     console.log("Error while subscribing newslater -> ",err.message);
     return NextResponse.json({
        success:false,
        message:"Error creating newslater",
        error:err
     })
   }
}

export async function GET(){
    try{
        const res = await Newslater.find({}).sort({createdAt:-1});
        if(!res){
            return NextResponse.json({
                success:false,
                message:"Error getting newslater"
            })
        }
        return NextResponse.json({
            success:true,
            message:"Successfully retrieved newslater!",
            newslaters:res
        })
    }catch(err){
        return NextResponse.json({
            success:false,
            message:"Error while getting newslaters",
        })
    }
}

export async function DELETE(req:any){
    try{
      const searchParams = req.nextUrl.searchParams;
      const id = searchParams.get('id');
      if(!id){
        return NextResponse.json({success:false,message:"Id is empty!"});
      }
      await Newslater.findByIdAndDelete(id);
      return NextResponse.json({success:true,message:"Succesfully deleted newslater!"});
    }catch(err:any){
        console.log("Error while deleting newslaters --> ",err.message);
        return NextResponse.json({
            success:false,
            message:"Error while deleting newslaters",
            error:err
        })
    }
}