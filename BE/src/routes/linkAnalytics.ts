import express from 'express'
const LinkAnalyticRouter = express.Router();
import LinkModel from '../models/LinkModel';

LinkAnalyticRouter.get('/LA/:code',async(req, res, next)=>{
    const {code} = req.params;
    if(!code){return res.status(404).json({message:"Enter a Valid Short URL"})}
     try {
        const userAgent = req.headers['user-agent'];
        const Linkdocument = await LinkModel.findOne({ShortUrl:code})
        if(!Linkdocument){return res.status(404).json({message:"Short Url is not found"})}
        res.status(200).json({message:"success",data:{
            ClickCount:Linkdocument.count,
            userAgent:userAgent
        }})
     } catch (error) {
        console.log("Analytics Routes:",error);
        next(error)
     }
})
export default LinkAnalyticRouter