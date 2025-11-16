import express from 'express'
const LinkRouter = express.Router();
import random from 'random-string-generator'
import LinkModel from '../models/LinkModel';

LinkRouter.post('/link',async(req,res,next)=>{
    const {OriginalUrl} = req.body;
    if(!OriginalUrl){return res.status(404).json({message:"Empty Long Url"})}
      try {
        const GenerateShortUrl_code = random(4,'alphanumeric')
        const ShortUrl = `http://localhost:3000/api/LA/${GenerateShortUrl_code}`
        const response = await LinkModel.create({
            ShortUrl:GenerateShortUrl_code,
            OriginalUrl
        })
        console.log(response)
        res.status(200).json({message:"Short Url is ready",ShortUrl});
      } catch (error) {
        next(error);
      }
})
LinkRouter.get('/LA/:code',async(req,res)=>{
    const {code} = req.params;
    const response = await LinkModel.findOne({ShortUrl:code});
    if(!response){
        return res.status(404).json({message:"Short Url not found"})
    }
    const OriginalUrl = response.OriginalUrl;
    res.status(200).redirect(OriginalUrl);
})

export default LinkRouter;