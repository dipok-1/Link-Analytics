import express from 'express'
const LinkRouter = express.Router();
import random from 'random-string-generator'
import LinkModel from '../models/LinkModel';
import { differenceInDays, differenceInSeconds } from 'date-fns';
import redisClient from '../utils/redis';

LinkRouter.post('/shorten',async(req,res,next)=>{
    const {OriginalUrl, customAlias} = req.body;
    
    if(!OriginalUrl){return res.status(404).json({message:"Empty Long Url"})}
      try {
        if(customAlias){
          const ispresent = await LinkModel.findOne({ShortUrl:customAlias})
          if(ispresent){return res.status(409 ).json({message:"Alias Already Exists."})}
          await LinkModel.create({
            ShortUrl:customAlias,
            OriginalUrl
          })
          return res.status(200).json({message:"Short URL is ready with custom alias.",ShortUrl:`http://localhost:3000/LA/${customAlias}`})
        }
        const isexsit = await LinkModel.findOne({OriginalUrl})
        if(isexsit){
          return res.status(200).json({message:"Short Url is ready",ShortUrl:`http://localhost:3000/LA/${isexsit.ShortUrl}`});
        }
        const GenerateShortUrl_code = random(16,'alphanumeric')
        const ShortUrl = `http://localhost:3000/LA/${GenerateShortUrl_code}`
         await LinkModel.create({
            ShortUrl:GenerateShortUrl_code,
            OriginalUrl
        })
        res.status(200).json({message:"Short URL is ready",ShortUrl:ShortUrl});
      } catch (error) {
        console.log("Link Route Handler:",error)
        next(error);
      }
})
LinkRouter.get('/:code',async(req,res, next)=>{

    const {code} = req.params;
    try {
    const OrgURL = await redisClient.get(code);
    if(OrgURL){
      await LinkModel.updateOne({ShortUrl:code},{$inc:{count:1}})
      return res.status(200).redirect(OrgURL);
    }
    const response = await LinkModel.findOne({ShortUrl:code});
    if(!response){
        return res.status(404).json({message:"Short Url not found"})
    }

    // checking for expiration
    const createdAt  = response.createdAt;
    const currentDate = new Date();
    const diffDays  = differenceInDays(currentDate,createdAt)
    const durationInSeconds = 2 * 24 * 60 * 60; // 2 days in seconds
    const expiresAt = new Date(createdAt.getTime() + durationInSeconds * 1000)
    const diffSeconds_ttl =differenceInSeconds(expiresAt,currentDate)

  // const diffSeconds = differenceInSeconds(currentDate,createdAt) only for testing purpose
  // mongodb document expiration check
    // if(diffSeconds > 60){ // 1 minute for testing purpose
    //   console.log("Short Url expired");
    //     await LinkModel.deleteOne({ShortUrl:code});
    //     return res.redirect('http://localhost:5173/expired')
    // }


    if( diffDays > 2){ 
      console.log("Short Url expired");
        await LinkModel.deleteOne({ShortUrl:code});
        return res.redirect('http://localhost:5173/expired')
    }

    // checking redis TTL & caching
    await redisClient.set(code,response.OriginalUrl,{EX:diffSeconds_ttl});
    const OriginalUrl = response.OriginalUrl;
    await LinkModel.updateOne({ShortUrl:code},{$inc:{count:1}})
    res.status(200).redirect(OriginalUrl);
    
    } catch (error) {
       console.log("Link Route Handler:",error)
        next(error);
    }
})

export default LinkRouter;