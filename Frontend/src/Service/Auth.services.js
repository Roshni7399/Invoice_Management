import axios from "axios";
import { getInfo } from "./Auth.header";

const TOKEN = getInfo();

const API_URL = "http://localhost:4455/";

let axiosConfig = {
  header: {
    "Content-Type": "application/json",
    Authorization: TOKEN,
  },
};

export const adminLogin = async (email, password) => {
  try {
    const response = await axios.post(
      API_URL + "Admin/adminlogin",
      {
        email,
        password,
      },
      axiosConfig
    );
    if (response.data.status == true) {
      localStorage.setItem("users", JSON.stringify(response.data));

      return response;
    } else {
      return response;
    }
  } catch (e) {
    return null;
  }

  // console.log(email);
  // console.log(password);
};

export const addcustomer = async (customername, phone, email) => {
  return await axios.post(
    API_URL + "customer/addcustomer",
    {
      customername,

      phone,
      email,
    },
    axiosConfig
  );
};

export const customerget = async (id) => {
  return axios.get(API_URL + "customer/customerget", axiosConfig);
};

export const deletecustomer = async (_id) => {
  return axios.put(
    API_URL + "customer/deletecustomer",
    {
      _id,
    },
    axiosConfig
  );
};

export const singleCustomer = async (_id) => {
  return axios.put(
    API_URL + "customer/singlecustomer",
    {
      _id,
    },
    axiosConfig
  );
};

export const updateCustomer = async (_id, customername, phone, email) => {
  // console.log(_id);
  // console.log(customername);
  // console.log(phone);
  // console.log(email);
  return axios.put(
    API_URL + "customer/updatecustomer",
    {
      _id,
      customername,
      phone,
      email,
    },
    axiosConfig
  );
};

export const invoiceget = async (id) => {
  return axios.get(API_URL + "invoice/invoiceget", axiosConfig);
};

export const deleteinvoice = async (_id) => {
  return axios.put(
    API_URL + "invoice/deleteinvoice",
    {
      _id,
    },
    axiosConfig
  );
};

export const getbyId = async (id) => {
  return axios.get(API_URL + `customer/getbyId/${id}`, axiosConfig);
};

export const addInvoice = async (email,customername, status, date, array, final) => {
  console.log(email)
  console.log(customername)
  console.log(status)
  console.log(array)
  console.log(final);
  return await axios.post(
    API_URL + "invoice/addinvoice",
    {email,
      customername,
      status,
      date,
      item: array,
      final,
    },
    axiosConfig
  );
};

export const singleInvoice = async (_id) => {
  return axios.put(
    API_URL + "invoice/singleinvoice",
    {
      _id,
    },
    axiosConfig
  );
};

export const updateInvoice = async (_id, final, status, item) => {
  console.log(_id);
  console.log(final);
 
  return axios.put(
    API_URL + "invoice/updateinvoice",
    {
      _id,
      final,
      status,
      item,
    },
    axiosConfig
  );
};

export const getPaid = async (id) => {
  return axios.get(API_URL + "invoice/getPaid", axiosConfig);
};

export const getUnpaid = async (id) => {
  return axios.get(API_URL + "invoice/getUnpaid", axiosConfig);
};
