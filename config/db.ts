import mongoose from 'mongoose';

export const dbConnect=async()=>{
    console.log("Vercel Degub ->",process.env.DBURL);
    console.log("Vercel Degub Type ->", typeof(process.env.DBURL));
    mongoose.connect(String(process.env.DBURL)).then(()=>{
        console.log('Connection String -> ',typeof(process.env.DBURL));
        console.log('Connection String -> ',typeof(String(process.env.DBURL)))
        console.log("DB Connected Succesfully");
    }).catch((e:any)=>{
        console.log("Error While Connecting to Db -> ",e);
    })
}

