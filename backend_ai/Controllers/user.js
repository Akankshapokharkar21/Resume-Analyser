const UserModel =require("../Models/User");

exports.register=async (req,res)=>{
    try{
        const {name,email,photoUrl}=req.body;
        const userExist =await UserModel.findOne({email:email});
        if(!userExist){
            let newUser =new UserModel({name,email,photoUrl});
            await newUser.save();
            return res.status(200).json({
                meassage:"user registered successfully",
                user:newUser
            })
            
        }
        return res.status(200).json({
            meassage:"welcome back",
            user:userExist,
        })

    }catch(err){
        console.log(err);
        res.status(500).json({error:"server error",meassage:err.meassage});
    }
}