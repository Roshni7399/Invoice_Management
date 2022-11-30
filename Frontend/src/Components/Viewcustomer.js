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

  console.log(update);

  return (
    <div class="container">
      <br />
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <center>
              <div class="card-header">
                <h4>View Customer details</h4>
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
                        readOnly
                      />
                    </div>
                  </div>
                </div>

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
                        readOnly
                      />
                    </div>
                  </div>
                </div>

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
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div class="form-group ">
                  <center>
                    &nbsp;
                    <button
                      type="button"
                      class="btn btn-info btn-md btn-block login-button"
                    >
                      <Link class="nav-link active" to="/Managecustomer">
                        OK
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
