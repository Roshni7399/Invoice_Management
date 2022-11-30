import "../css/Addinvoice.css";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { getbyId } from "../Service/Auth.services";
import { addInvoice } from "../Service/Auth.services";
import { Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { customerget } from "../Service/Auth.services";
import DatePicker from "react-datepicker";

export default function Addinvoice() {
  const navigate = useNavigate();
  const [array, setArray] = useState([]);
  const [cust, setCustom] = useState({});
  const [status, setStatus] = useState("");
  const [date, setDate] = useState(new Date());
  const [grandtotal, setGrandTotal] = useState(0);

  // api call in useEffect for getting customer list
  useEffect(() => {
    const test = async () => {
      const response = await customerget();
      setArray(response.data.result);
    };
    test();
  });

  // dropdown
  const dropdownHandler = async (e) => {
    const res = await getbyId(e.target.value);
    setCustom(res.data.result);
  };

  const [loading , setLoading] = useState(false);
  // addinvoice-api
  const addInvoic = async () => {
    const apiResponse = await addInvoice(
      cust.email,
      cust.customername,
      status,
      date,
      formFields,
      grandtotal
    );
    setLoading(true);
    
    toast.info(
      "Invoice Created Successfully.",
      {
        position: toast.POSITION.TOP_RIGHT,
      },
      { autoClose: 1000 }
    );
    setTimeout(()=>{
      navigate("/Manageinvoice");
    },1000)

    console.log(apiResponse);
    
  };

  //Dynamic form---------------------------------------------------------------------

  const [formFields, setFormFields] = useState([
    {
      productname: "",
      quantity: "",
      price: "",
      tax: "",
      total: "",
      grandtotal: " ",
    },
  ]);

  // const handleFormChange = (event, index) => {
  //   let data = [...formFields];
  //   data[index][event.target.name] = event.target.value;
  //   setFormFields(data);

  //   // to calculate final total
  //   let calculate = data[index].price * data[index].quantity;

  //   data[index].total = calculate * 0.01 * data[index].tax + calculate;
  //   console.log(calculate);

  // };

  const onchangeHandler = (e, index) => {
    const updatedItems = formFields.map((item, i) =>
      index == i
        ? Object.assign(item, { [e.target.name]: e.target.value })
        : item
    );

    var final = 0;

    for (let i of updatedItems) {
      var mul = i.price * i.quantity;
      var finalValue = (mul / 100) * i.tax + mul;

      i.total = finalValue;

      final = final + i.total;
    }
    setFormFields(updatedItems);
    console.log(final);
    setGrandTotal(final);
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(formFields);
  };

  // to add fields from dynamic form
  const addFields = () => {
    let object = {
      productname: "",
      quantity: "",
      price: "",
      tax: "",
      total: "",
    };

    setFormFields([...formFields, object]);
  };

  // To remove feilds from dynamic form
  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  console.log(grandtotal);

  return (
    <div class="container ">
      <center>
        <h3>Create Invoice</h3>
      </center>
      <br />
      <br />
      <div class="row centered-form " style={{backgroundColor : "#b7fd96"}}>
        <form  onSubmit={(e) => submit(e)}>
          <div class="row">
            {/* Customer Name */}
            <div
              class="
             btn  dropdown-toggle"
            >
              <label>Choose Customer</label>
              <select class="form-select" onChange={dropdownHandler}>
                <option value="⬇️ Select a Customer ⬇️">
                  {" "}
                  Select Customer{" "}
                </option>
                {array.map((data) => (
                  <option value={data._id}>{data.customername}</option>
                ))}
              </select>
            </div>

            {/*  Email  */}
            <div class="col-sm-4">
              <label>Email :</label>
              <br />
              <input
                type="text"
                class="form-control"
                placeholder="Enter Email"
                value={cust.email}
              />
            </div>

            {/* Date */}
            <div class="col-sm-4">
              <label>Date :</label>
              <DatePicker selected={date} onChange={(date) => setDate(date)} />
            </div>

            <br />
            <br />

            {/* Status */}
            <div class="form-group col-sm-4">
              <label>Status</label>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  value="paid"
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Paid
                </label>
              </div>
              <div class="form-check ">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  value="unpaid"
                  onChange={(e) => setStatus(e.target.value)}
                  checked
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  Unpaid
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />

          {/* Dynamic Form*/}
          {formFields.map((form, index) => {
            return (
              <div key={index}>
                <label>
                  <b>Product name</b>
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>
                  <b>Quantity</b>
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>
                  <b>Price</b>{" "}
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>
                  <b>Tax Percentage</b>
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>
                  <b>Total</b>
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div class="row">
                  <div class="col-sm-2">
                    <input
                      name="productname"
                      class="form-control"
                      placeholder="product Name"
                      // onChange={(event) => handleFormChange(event, index)}
                      onChange={(e) => onchangeHandler(e, index)}
                      value={form.productname}
                    />
                  </div>

                  {/* <label>Quantity</label> */}
                  <div class="col-sm-2">
                    <input
                      name="quantity"
                      class="form-control"
                      placeholder="Quantity"
                      onChange={(e) => onchangeHandler(e, index)}
                      // onChange={(event) => handleFormChange(event, index)}
                      value={form.quantity}
                    />
                  </div>

                  {/* <label>Price</label> */}
                  <div class="col-sm-2">
                    <input
                      name="price"
                      class="form-control"
                      placeholder="Price"
                      onChange={(e) => onchangeHandler(e, index)}
                      // onChange={(event) => handleFormChange(event, index)}
                      value={form.price}
                    />
                  </div>

                  {/* <label>Tax Percentage</label> */}
                  <div class="col-sm-2">
                    <input
                      name="tax"
                      class="form-control"
                      placeholder="Tax Percentage"
                      onChange={(e) => onchangeHandler(e, index)}
                      // onChange={(event) => handleFormChange(event, index)}
                      value={form.tax}
                    />
                  </div>

                  {/* <label>Total</label> */}
                  <div class="col-sm-2">
                    <input
                      name="total"
                      class="form-control"
                      placeholder="Total"
                      // onChange={(event) => handleFormChange(event, index)}
                      value={form.total}
                    />
                  </div>

                  <br />
                  <div class="col-sm-1">
                    <button
                      className="btn btn-delete btn-danger btn-sm"
                      onClick={() => removeFields(index)}
                    >
                      Remove
                    </button>
                  </div>
                  <div class="col-sm-1">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={addFields}
                    >
                      Add
                    </button>
                  </div>
                  <br />
                </div>
              </div>
            );
          })}
          <div></div>
        </form>
        <br />
        <br />
        <center>
          <div class="finaltotal col-sm-2">
           <strong> <label>Grand Total </label></strong>
            <input class="form-control" type="input" value={grandtotal} />
          </div>
        </center>
        <br />

        <center>
          <br />
          <button className="btn btn-delete btn-success " onClick={addFields}>
            Add More
          </button>
          &nbsp;
          <button className="btn btn-delete btn-info" onClick={addInvoic}>
            {loading ? <div class= "spinner-border spinner-border-sm" role="status"></div>:"Save"}
          </button>
          &nbsp;
          <Link to="/Manageinvoice">
            <button className="btn  btn-secondary ">Back</button>
          </Link>
        </center>
        <br />
        <br />
      </div>
    </div>
  );
}
