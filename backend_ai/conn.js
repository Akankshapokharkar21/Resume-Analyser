// vG36HcSoU7qqJOuR
// akankshapokharkar21_db_user
// mongodb+srv://akankshapokharkar21_db_user:vG36HcSoU7qqJOuR@cluster0.tpxghod.mongodb.net/?appName=Cluster0

const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://akankshapokharkar21_db_user:akanksha123@cluster0.tpxghod.mongodb.net/test?retryWrites=true&w=majority').then((res)=>{
    console.log("Database Connected Successfully");
}).catch(err=>{
    console.log("Something Error",err);
})