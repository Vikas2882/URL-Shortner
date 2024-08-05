const mongoose=require("mongoose");
const userS=new mongoose.Schema(
    {
       name: {
           type:String,
           require:true
        },
       role:{
        type:String,
        required:true,
        default:"NORMAL"
       },
       password: {
           type:String,
           require:true
        }
    },{
        timestamps:true
    }
)
const user=mongoose.model(
    "usekr",userS
)
module.exports=user;