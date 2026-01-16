

const mongoose = require('mongoose');


mongoose.connect('').then((res)=>{
    console.log("Database Connected Successfully");
}).catch(err=>{
    console.log("Something Error",err);
})
