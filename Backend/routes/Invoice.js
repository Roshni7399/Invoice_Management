import express from "express";
import {addinvoice,invoiceget,deleteinvoice,updateinvoice,singleinvoice,getPaid,getUnpaid} from '../controller/Invoice';

const router = express.Router();

router.post("/addinvoice",addinvoice)
router.get("/invoiceget",invoiceget)
router.put("/deleteinvoice", deleteinvoice);
router.put("/updateinvoice",updateinvoice);
router.put("/singleinvoice", singleinvoice);
router.get("/getPaid",getPaid)
router.get("/getUnpaid",getUnpaid)
export default router;