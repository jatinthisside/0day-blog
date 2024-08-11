import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    public_id:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
}, { timestamps: true })

const Blog = mongoose.models.Blog || mongoose.model('Blog',blogSchema);
export default Blog;