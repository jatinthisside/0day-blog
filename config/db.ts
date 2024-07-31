import mongoose from 'mongoose';

export const dbConnect=async()=>{
    mongoose.connect(String(process.env.DBURL)).then(()=>{
        console.log("DB Connected Succesfully");
    }).catch((e:any)=>{
        console.log("Error While Connecting to Db -> ",e);
    })
}

