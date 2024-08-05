const shortid=require("shortid");
const url=require("../models/url");

async function handleGenerateNewShortUrl(req,res){
    const body=req.body;
    console.log(body);
    if(!body.url)return res.status(400).json({error:"url is required"});
 console.log(req.user);
   const shortID= shortid();
     await url.create({
    shortId:shortID,
    redirectUrl:body.url,
    visitHistory:[],
    createdBy:req.user._id,
   });
   return res.render("home",{id:shortID,ch:"darl"})

}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await url.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics: result.visitHistory,
    })
}
async function handleRedirect(req,res){
    const shortId=req.params.shortId;
    console.log(shortId);
   const entry= await url.findOneAndUpdate({
        shortId,
    },
    {
        $push:{
           visitHistory:{timestamp:Date.now()}
        }
    });
    console.log(entry);
    res.redirect(entry.redirectUrl);
};
module.exports={
    handleGenerateNewShortUrl, 
    handleGetAnalytics,
    handleRedirect
};