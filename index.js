const express= require("express");
const urlRoute=require("./routes/url");
const cookieParser=require("cookie-parser");
const {connectToMongoDb} =require("./connect");
const path=require("path");
const app= express();
const PORT=8001;
// const {restrictToLoggedInUserOnly,checkAuth}=require("./middleWares/auth");
const {checkForAuthentication,restrictTo}=require("./middleWares/auth");

const url = require("./models/url")
const staticRoute=require("./routes/staticRouter");
const userRoute=require("./routes/user")

connectToMongoDb("mongodb://127.0.0.1:27017/urlShortner")
.then(()=>console.log("mongoDb is connected"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(checkForAuthentication);

// app.use("/url",restrictToLoggedInUserOnly,urlRoute);
app.use("/url",restrictTo(["NORMAL","ADMIN"]),urlRoute);
app.use("/",staticRoute);
// app.use("/user",checkAuth,userRoute)
app.use("/user",userRoute)

app.listen(PORT,()=>{console.log(`server started att port ${PORT}`)});