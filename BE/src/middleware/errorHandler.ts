import { Request,Response,NextFunction,ErrorRequestHandler } from "express"

const errorHandler = (err:any,req:Request,res:Response,next:NextFunction) => {
       const statuscode = err.status || 500;
       const message = err.message || "Internal Server Error";

       res.status(statuscode).json({message,statuscode})
}