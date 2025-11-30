import mongoose from "mongoose";
const Schema = mongoose.Schema;


const LinkSchema = new Schema({
    ShortUrl: { type:String,required:true, unique:true},
    OriginalUrl:{ type:String, required: true},
    count: { type:Number, default:0}
},{timestamps:true})

const LinkModel =  mongoose.model('Link',LinkSchema)

export default LinkModel
