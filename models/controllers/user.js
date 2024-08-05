const user = require("../models/user");
const{setUser,getUser} =require("../services/auth");
const {v4:uuidv4}=require("uuid");
async function handleSignUp(req,res){
    const{name,password}=req.body;
   
    console.log(req.body,name,password);

    await user.create({
        name:name,
        password:password
    });
   
    return res.render("home");
}
async function handleLogin(req,res){
   const{password}=req.body;
  const use=user.findOne({password});
  if(!use) return res.render("login",{error:"Invalid user name or Password"});
//   const sessionId=uuidv4();
//    setUser(sessionId,use);
const token=setUser(user);
   res.cookie("uid",token,{
    domain: ".divya.com"
   });
  return res.redirect("/");
}
module.exports={handleSignUp,handleLogin};