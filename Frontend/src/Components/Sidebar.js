import "../css/Sidebar.css";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import {
  invoiceget,
  getPaid,
  getUnpaid,
  customerget,
} from "../Service/Auth.services";
import React, { useEffect, useState } from "react";

export default function Sidebar() {
  const [paidInvoice, setPaidInvoice] = useState([]);
  const [unpaidInvoice, setUnpaidInvoice] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fun = async () => {
      const responses = await customerget();
      setCustomers(responses.data.result);
      const response = await invoiceget();
      setInvoices(response.data.result);
      const paid = await getPaid();
      setPaidInvoice(paid.data.result);
      const unpaid = await getUnpaid();
      setUnpaidInvoice(unpaid.data.result);
    };
    fun();
  }, []);

  var No_of_Invoices = invoices.length;
  var No_of_Customers = customers.length;
  var paid_invoices = paidInvoice.length;
  var unpaid_invoices = unpaidInvoice.length;

  return (
    <div>
      <div class="sidebar">
        <a href="#">
          <Link class="nav-link active" to="/Sidebar">
            Dashboard
          </Link>
        </a>
        <a href="#contact">
          <Link class="nav-link active" to="/Managecustomer">
            Manage Customer
          </Link>
        </a>
        <a href="#about">
          <Link class="nav-link active" to="/Manageinvoice">
            Manage Invoice
          </Link>
        </a>
      </div>

      <div class="content">
        <br />
        <center>
          <h4>Invoice Management System</h4>
        </center>
        <br />
        <div class="row">
          <div class="col-sm-6">
            <div class="card-body card text-white bg-success mb-3 ">
              <h5 class="card-title">Total Number of Customers</h5>
              <p class="card-text">{No_of_Customers}</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card-body card text-white bg-success mb-3 ">
              <h5 class="card-title">Total Number of Invoices Created</h5>
              <p class="card-text">{No_of_Invoices}</p>
            </div>
          </div>
        </div>
        <br />

        <div>
          <Chart
            type="pie"
            width={1000}
            height={400}
            series={[paid_invoices, unpaid_invoices]}
            options={{
              title: {
                text: "Total paid or Unpaid Invoices",
              },
              labels: ["Paid", "UnPaid"],
            }}
          ></Chart>
        </div>
      </div>
    </div>
  );
}
