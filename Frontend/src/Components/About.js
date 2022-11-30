import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <center>
        <div className="col-md-12 home bg-light my-5">
          {/* About Us start */}
          <h3 className="text-center">Welcome to Invoice Management System</h3>
          <center>
            <p>
              smartData is a leader in global software business space when it
              comes to business consulting and technology integrations making
              business easier, accessible, secure and meaningful for its target
              segment of startups to small & medium enterprises.
            </p>
          </center>

          <h2 className="text-center" style={{ color: "grey" }}>
            Thank you :)
          </h2>
          <center>
            <Link className="btn btn-outline-success " to="/adminlogin">
              Get Started
            </Link>
          </center>
        </div>
      </center>
      {/* About us end */}
    </div>
  );
}
