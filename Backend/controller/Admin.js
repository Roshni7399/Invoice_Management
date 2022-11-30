import Admin from "../model/Admin";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {sendMail} from '../middleware/SendMail';
import fetch from 'node-fetch';

// Admin Signup
export const adminSignup = async (req, res) => {
  try {

    const otp = Math.floor(Math.random() * 1234 + 1000);
    const addAdmin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      otp
    });

    const result = await addAdmin.save();
   
    res.send({
      status: true,
      message: " Registered Successfull",
      result: result,
    });
  } catch (err) {
    console.log(err);
  }
};


// Verify OTP
export const verifyOTP = async (req,res) => {
  const EMAIL = req.body.email;
  const OTP = req.body.otp;
  const newotp = Math.floor(Math.random() * 1234 + 1000);
  console.log("Verify working");
  const isValid = await Admin.find({
    email : EMAIL,
    otp: OTP
  }).count();
 
  if(isValid){
    //  update
    const jsondata = {
      verified : true,
      otp: newotp
    }
    await Admin.updateOne({email:EMAIL},
  {$set:jsondata},
  {new:true},
  )
    res.send({ "status": 200, "message": "OTP VERIFIED SUCCESFULLY", result: {} })
  }else{
    res.send({ "status": 200, "message": "Incorrect otp", result: {} })
  }

}


// Admin Login
export const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await Admin.findOne({ email });
    if (!result) {
      res.send({
        status: false,
        message: "Email is Incorrect!!!",
      });
    }

    const isValid = bcrypt.compareSync(password, result.password);

    if (isValid) {
      let payload = {};
      payload._id = result._id;
      payload.email = result.email;

      jwt.sign(
        payload,
        "smartData",
        {
          expiresIn: "24h",
        },
        (err, token) => {
          return res.send({
            status: true,
            message: "Login Success",
            Token: token,
            result: result
          });
        }
      );
    } else {
      return res.send({
        status: false,
        message: "Password is incorrect",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

// get data by ID
export const getUserDataById = async (req, res) => {
  try {
    let dataid = await Admin.findOne({
      _id: mongoose.Types.ObjectId(req.query._id),
    });
    res.send({
      status: "200",
      message: "successfully",
      result: dataid,
    });
  } catch (e) {
    throw e;
  }
};


// fb socail logins
export const facebooklogin = async (req, res,next) => {
  const {userID, accessToken} = req.body;
  let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id, name, email&access_token=${accessToken}`
  console.log(urlGraphFacebook);
  fetch(urlGraphFacebook,{
    method:'GET'
  })
  .then(response =>response.json())
  .then(response=>{
    const{email,name}=response;
    Admin.findOne({email}).exec((err,user)=>{
if(err) {
  return res.status(400).json({
  error: "Something went wrong..."
  })
}else{
  if(user){
     const token =jwt.sign({_id: user._id},"SECRET",{expiresIn:'7d'});
     const {_id,name,email}=user;
     console.log(_id,name,email);
     res.json({
      token,
      user:{_id,name,email}
     })
  }else{
    let password= email+"SECRET";
    let newUser=new Admin({name,email,password});
    newUser.save((err,data)=>{
      if(err){
        return res.status(400).json({
          error:"something went wrong....."
        })
      }
      // // const token =jwt.sign({_id: user._id},"SECRET",{expiresIn:'7d'});
      // const {_id,name,email}=user;
      // res.json({
      //  token,
      //  user:{_id,name,email}
      // })
    }) 
  }
}    
})
  })
  }
