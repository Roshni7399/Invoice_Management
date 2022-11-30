import Admin from "../model/Admin";

export const verifyUser = async (req,res,next) => {
    const EMAIL = req.body.email;
    const isValid = await Admin.find({
      email : EMAIL,
      verified:true
    }).count();

    if(isValid){
        next()
    }else{
        res.send({ "status": 200, "message": "Please verify your email to login", result: {} })
    }
} 