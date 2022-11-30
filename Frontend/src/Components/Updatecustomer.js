import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { singleCustomer } from "../Service/Auth.services";
import { updateCustomer } from "../Service/Auth.services";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/Admin.css";

export default function () {
  const navigate = useNavigate();

  const data = useParams();
  const [update, setUpdate] = useState({});

  console.log(data.id);

  useEffect(() => {
    const up = async (id) => {
      const response = await singleCustomer(id);
      console.log(response.data.result);
      setUpdate(response.data.result);
    };
    up(data.id);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdate({ ...update, [name]: value });
  };

  const [loading , setLoading] = useState(false);

  const updateButtonHandler = async () => {
    const response = await updateCustomer(
      update._id,
      update.customername,
      update.phone,
      update.email
    );
    setLoading(true);
    console.log(response.data.status);
    if (response.data.status) {
      toast.success("Updated Successsfully");
      setTimeout(()=>{
        navigate("/Managecustomer"); 
      },1000)
      
    } else {
      toast.error("Unable to Update data of Customer");
    }
  };

  // Validations start----------------------------------------------------------------

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
    if (phone.length === 0) {
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

  // console.log(update);

  return (
    <div class="container">
      <br />
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <center>
              <div class="card-header">
                <h4>Update Customer details</h4>
              </div>
            </center>
            <div class="card-body">
              <form class="form-horizontal" method="post" action="#">
                <div class="form-group">
                  <label for="name" class="cols-sm-2 control-label">
                    Customer Name
                  </label>
                  <div class="cols-sm-10">
                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="fa fa-user fa" aria-hidden="true"></i>
                      </span>
                      <input
                        type="text"
                        class="form-control"
                        name="customername"
                        value={update.customername}
                        onChange={handleInputChange}
                        onBlur={(e) => validatecustomername(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {!valid.customername && (
                  <span className="text-danger">{valid.customernameError}</span>
                )}

                <div class="form-group">
                  <label for="username" class="cols-sm-2 control-label">
                    Phone
                  </label>
                  <div class="cols-sm-10">
                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="fa fa-users fa" aria-hidden="true"></i>
                      </span>
                      <input
                        type="text"
                        class="form-control"
                        name="phone"
                        value={update.phone}
                        onChange={handleInputChange}
                        onBlur={(e) => validatephone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {!valid.phone && (
                  <span className="text-danger">{valid.phoneError}</span>
                )}

                <div class="form-group">
                  <label for="username" class="cols-sm-2 control-label">
                    Email Id
                  </label>
                  <div class="cols-sm-10">
                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="fa fa-users fa" aria-hidden="true"></i>
                      </span>
                      <input
                        type="text"
                        class="form-control"
                        name="email"
                        value={update.email}
                        onChange={handleInputChange}
                        onBlur={(e) => validateEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {!valid.email && (
                  <span className="text-danger">{valid.emailError}</span>
                )}

                <div class="form-group ">
                  <center>
                    <button
                      type="button"
                      class="btn btn-success btn-md btn-block login-button"
                      onClick={updateButtonHandler}
                    >
                      {loading ? <div class= "spinner-border spinner-border-sm" role="status"></div>:"Update Customer"}
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      class="btn btn-info btn-md btn-block login-button"
                    >
                      <Link class="nav-link active" to="/Managecustomer">
                        Back
                      </Link>
                    </button>
                  </center>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
