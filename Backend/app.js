import express from "express";
// var express = require('express'); 
import { mongoconnection } from "./db";
import bodyParser from "body-parser";


const app = express();
mongoconnection();


import cors from "cors";
import Admin from "./routes/Admin";
import customer from "./routes/customer";
import invoice from "./routes/Invoice";
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors({origin:"*"}))

app.use("/Admin",Admin)
app.use("/customer",customer)
app.use("/invoice",invoice)
app.use("/uploads",express.static("uploads"));


export default app;