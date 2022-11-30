import { useState } from "react";
// import "../css/Addcustomer.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addcustomer } from "../Service/Auth.services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Addcustomerform() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    customername: "",
    phone: 0,
    email: "",
  });

  const [valid, setValid] = useState({
    customername: true,
    email: true,
    phone: true,
    customernameError: "",
    emailError: "",
    phoneError: "",
  });

  const validatecustomername = (customername) => {
    if (customername.length === 0) {
      setValid((previousValue) => ({
        ...previousValue,
        customername: false,
        customernameError: "Please Enter your Name",
      }));
    } else {
      setValid((previousValue) => ({
        ...previousValue,
        customername: true,
        customernameError: "",
      }));
    }
  };
  const validatephone = (phone) => {
    if (phone.length == 0) {
      setValid((previousValue) => ({
        ...previousValue,
        phone: false,
        phoneError: "Please Enter your phone Number ",
      }));
    } else {
      setValid((previousValue) => ({
        ...previousValue,
        phone: true,
        phoneError: "",
      }));
    }
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailIsValid = pattern.test(email);

    if (emailIsValid) {
      setValid((previousValue) => ({
        ...previousValue,
        email: true,
        emailError: "",
      }));
    } else {
      setValid((previousValue) => ({
        ...previousValue,
        email: false,
        emailError: "Please Enter Valid Email",
      }));
    }
  };


  const [loading , setLoading] = useState(false);
  
  const addCustomer = async () => {
    const apiResponse = await addcustomer(
      input.customername,
      input.phone,
      input.email
    );
    console.log(apiResponse.data);
    setLoading(true);
    if (apiResponse.data.status === true) {
      toast.success("Customer added successfully");
      setTimeout(()=>{
        navigate("/Managecustomer");
      },1000)
    } else {
      toast.error("Unable to add Customer");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((previousValue) => ({
      ...previousValue,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div class="wrapper fadeInDown mt-4">
      <div id="formContent">
        <h4>Add Customers</h4>

        <form className="form-control" onSubmit={(e) => handleSubmit(e)}>
          <label>Customer Name</label>
          <br />
          <input
            type="text"
            className="form-control"
            name="customername"
            placeholder="Enter your customername"
            onBlur={(e) => validatecustomername(e.target.value)}
            onChange={handleChange}
          />
          <br />
          {!valid.customername && (
            <span className="text-danger">{valid.customernameError}</span>
          )}
          <br />
          <label>Email</label>
          <br />
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Enter your email"
            onBlur={(e) => validateEmail(e.target.value)}
            onChange={handleChange}
          />
          <br />
          {!valid.email && (
            <span className="text-danger">{valid.emailError}</span>
          )}
          <br />
          <br />
          <label>Phone</label>
          <br />
          <input
            type="text"
            className="form-control"
            name="phone"
            placeholder="Enter your phone No."
            onBlur={(e) => validatephone(e.target.value)}
            onChange={handleChange}
          />
          <br />
          {!valid.phone && (
            <span className="text-danger">{valid.phoneError}</span>
          )}
          <br />
          <br />
          <button
            type="submit"
            className="btn btn-success "
            onClick={addCustomer}
          >
            {loading ? <div class= "spinner-border spinner-border-sm" role="status"></div>:"Add Customer"}
          </button>
          &nbsp;
          <Link to="/Managecustomer">
            <button type="button" className="btn btn-info ">
              Back{" "}
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
