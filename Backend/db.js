import mongoose from "mongoose";

const config=require("./config.js")
const configvalue=config.get("staging");
const DB=configvalue["DB"];
var option={
    user:DB.USERNAME,
    pass:DB.PASSWORD
}
const MONGOURL=`mongodb://${DB.HOST}:${DB.PORT}/${DB.DATABASE}`
console.log(MONGOURL);
export const mongoconnection =async ()=>{
    try{
      await mongoose.connect(MONGOURL,option);
        console.log("Database connected")
    }catch(e){
        console.log(e);
        throw 0;
    }
    }
