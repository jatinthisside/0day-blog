import mongoose from "mongoose";

const newslaterSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    }
},{timestamps:true})

const Newslater = mongoose.models.Newslater || mongoose.model('Newslater',newslaterSchema);
export default Newslater;
