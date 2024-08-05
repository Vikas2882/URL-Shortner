const shortid=require("shortid");
const url=require("../models/url");

async function handleGenerateNewShortUrl(req,res){
    const body=req.body;
    console.log(body);
    if(!body.url)return res.status(400).json({error:"url is required"});
    const shortID=shortid();
     await url.create({
    shortId:shortID,
    redirectUrl:body.url,
    visitHistory:[],
   });
return res.json({id:shortID});
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await url.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

module.exports={
    handleGenerateNewShortUrl, 
    handleGetAnalytics,
};