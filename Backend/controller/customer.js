import customer from "../model/customer";
import mongoose from "mongoose";
import { sendEMail } from "../middleware/SendMailCust";

// Add Customer
export const addcustomer = async (req, res) => {
  try {
    const addcust = new customer({
      customername: req.body.customername,
      phone: req.body.phone,
      email: req.body.email,
    });

    // let emailss = await customer.find({},{email: 1,_id:0});
    // let sendToMails = [];
    // for(let i in emailss){
    //   sendToMails.push(emailss[i].email);
    // }
   
    const result = await addcust.save();

    // sendEMail(
    //   "Roshni Manmode <roshnimanmode07@gmail.com>" ,
    //   sendToMails,
    //   "Customer Registered Successfully",
    //   "Welcome to our Invoice Management Portal !!"
    // )

    res.send({
      status: true,
      message: "add Successfull",
      result: result,
    });
  } catch (err) {
    // console.log(err);
  }
};

// Customer List
export const customerget = async (req, res) => {
  const result = await customer.find();

  if (result) {
    res.send({
      status: true,
      message: "All data fetched",
      result: result,
    });
  }
};

// Update Customer
export const updatecustomer = async (req, res) => {
  try {
    let jsondata = {};
    if (req.body._id) {
      jsondata._id = req.body._id;
    }

    if (req.body.customername) {
      jsondata.customername = req.body.customername;
    }
    if (req.body.phone) {
      jsondata.phone = req.body.phone;
    }

    if (req.body.email) {
      jsondata.email = req.body.email;
    }

    customer.updateOne(
      { _id: mongoose.Types.ObjectId(req.body._id) },
      { $set: jsondata },
      { new: true },
      (err, result) => {
        if (err) {
          res.send({ status: false, message: "unsuccefully", result: err });
        } else {
          res.send({ status: true, message: "succefully", result: result });
        }
      }
    );
  } catch (e) {
    throw e;
  }
};

// Get Single Customer- findOne
export const singlecustomer = async (req, res) => {
  console.log(req.body._id);
  const result = await customer.findOne({
    _id: mongoose.Types.ObjectId(req.body._id),
  });

  res.send({
    status: true,
    message: " Successfully",
    result: result,
  });
};

// Delete Customer
export const deletecustomer = async (req, res) => {
  console.log(req.body._id);

  const deleteApp = await customer.deleteOne({
    _id: mongoose.Types.ObjectId(req.body._id),
  });

  res.send({
    status: true,
    message: "Deleted Successfully",
  });
};

// Get Customer by ID
export const getbyId = async (req, res) => {
  const { id } = req.params;
  const result = await customer.findById({ _id: id });

  if (result) {
    res.send({
      status: true,
      message: "Find",
      result: result,
    });
  }
};

