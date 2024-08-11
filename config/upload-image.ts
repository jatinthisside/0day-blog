import cloudinary from "./cloudinary";

interface UploadResponse {
    secure_url: string;
    public_id: string;
    // Add any other properties that you expect from the Cloudinary response
  }

export const uploadImage = async(file:File,folder:string): Promise<UploadResponse>=>{
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);
    return new Promise(async(resolve,reject) =>{
        await cloudinary.uploader.upload_stream({
            resource_type:"auto",
            folder:folder,
        },async(err,result)=>{
            if(err){
                return reject(err.message);
            }
            return resolve(result as UploadResponse);
        }).end(bytes)
    })
}