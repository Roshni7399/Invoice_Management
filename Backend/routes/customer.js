import express from "express";
import {addcustomer,customerget,deletecustomer,updatecustomer,singlecustomer,getbyId} from '../controller/customer';
import {checkEmail} from '../middleware/CustomerCheck';

const router = express.Router();

router.post("/addcustomer",addcustomer)
router.get("/customerget",customerget);
router.put("/deletecustomer", deletecustomer);
router.put("/updatecustomer",updatecustomer);
router.put("/singlecustomer", singlecustomer);
router.get("/getbyId/:id", getbyId);

export default router;