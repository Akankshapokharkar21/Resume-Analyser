const express=require('express');
const app=express();
const PORT=4000;
const cors =require("cors");
const path =require("path");
require('./conn');
app.use(express.json()); // 👈 REQUIRED
app.use(express.urlencoded({ extended: true }));
 // optional
 app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
 }))

const UserRouter =require("./Routes/user");
const ResumeRouter =require("./Routes/resume");

app.use('/api/user',UserRouter);
app.use('/api/resume',ResumeRouter);

app.use(express.static(path.join(__dirname,"build")));
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});

app.listen(PORT,()=>{
    console.log("our backend is running on ",PORT);  
})

