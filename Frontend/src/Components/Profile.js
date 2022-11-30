import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const userdata = useSelector((state) => state.auth);
  console.log("vdfd",userdata.data.payload.result);
  return (
    <div>
      <div className="row mb-3 mt-4">
        <div className="col-md-4"></div>
        <br />
        <div className="card bg-muted col-md-4">
          <div>
            <center>
              <h4>My Profile</h4>
            </center>
          </div>
          <div className="card-body text-success">
            <h5 className="card-title">Name : {userdata.data.payload.result.name}</h5>
            <br />
            <h5 className="card-text">Email : {userdata.data.payload.result.email} </h5>
          </div>
          <center>
          <Link to="/Sidebar">
            <button className="btn  btn-secondary ">Back</button>
          </Link>
          </center>
          
        </div>
      </div>
    </div>
  );
}
