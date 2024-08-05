const express=require("express");
const router=express.Router();
const {handleGenerateNewShortUrl, handleGetAnalytics,handleRedirect}=require("../controllers/url");
router.post("/",handleGenerateNewShortUrl);
router.get("/analytics/:shortId", handleGetAnalytics);
router.get("/:shortId",handleRedirect);
module.exports=router;