import cloudinary from "./cloudinary";

export const  deleteImage=async(public_id:string)=>{
    // console.log("{{{{ public_id }}}}",public_id);
    try{
      const result = await cloudinary.uploader.destroy(public_id);
      // console.log("Result After Cloudinary Deletion -> ",result);
    }catch(e:any){
        console.log("Error While Deleting Image from Cloudinary! : ",e.message);
        return e;
    }
}