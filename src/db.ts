import mongoose from "mongoose";
async function MongoDB(){
    try {
        if(process.env.mongouri === undefined){
            throw new Error("MongoDB URI is not defined in environment variables")
        }
        await mongoose.connect(process.env.mongouri)
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.log("MongoDB connection failed",error)
    }
}
export default MongoDB;