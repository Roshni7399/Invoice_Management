import express from "express";
import {adminlogin,adminSignup,getUserDataById,verifyOTP,facebooklogin} from '../controller/Admin';
import {checkEmail,checkToken} from '../middleware/AdminCheck';
import {verifyToken} from '../middleware/VerifyToken';
import {verifyUser} from '../middleware/isVerified';

const router = express.Router();

// router.post("/adminlogin",[verifyUser],adminlogin);
router.post("/adminlogin",adminlogin);
router.post("/adminSignup", adminSignup);
router.get("/getUserDataById",verifyToken,getUserDataById);
router.post("/verifyOTP", verifyOTP);
router.post("/facebooklogin", facebooklogin);



export default router;