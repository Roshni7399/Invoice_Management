import { Link } from "react-router-dom";
import { customerget } from "../Service/Auth.services";
import React, { useEffect, useState } from "react";
import { deletecustomer } from "../Service/Auth.services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jspdf from "jspdf";
import "jspdf-autotable";
import _ from "lodash";

const pageSize = 5;

export default function Managecustomer() {
  const navigate = useNavigate();
  const [array, setArray] = useState([]);
  const [paginatedArray, setpaginatedArray] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);

  useEffect(() => {
    const up = async () => {
      const response = await customerget();
      setArray(response.data.result);
      setpaginatedArray(
        _(response.data.result).slice(0).take(pageSize).value()
      );
    };
    up();
  }, []);

  const deleteHandler = async (data) => {
    const response = await deletecustomer(data._id);
    console.log(response.data.message);
    if (response.data.status) {
      const response = await customerget();
      setArray(response.data.result);
      setpaginatedArray(
        _(response.data.result).slice(0).take(pageSize).value()
      );
      toast.error("Deleted Successsfully");
    } 
  };
  const viewHandler = async (data) => {
    console.log(data);
    navigate(`/Viewcustomer/${data._id}`);
  };

  const updateHandler = async (data) => {
    console.log(data);
    navigate(`/Updatecustomer/${data._id}`);
  };

  // All pdf start ----------------------------------------------------

  const downloadHandler = () => {
    const doc = new jspdf();
    // doc.text("Invoice List",20,10);
    doc.text(85, 10, "Customer List");

    doc.autoTable({
      theme: "grid",
      startY: 15,
      html: ".tftable",
      styles: { halign: "center" },
      headStyles: { fillColor: [124, 95, 240] },
      alternateRowStyles: { fillColor: [231, 2, 252] },
      tableLineColor: [124, 95, 240],
      tableLineWidth: 0.1,
    });

    //use headStyles to bring styles to the table head, and alternateRowStyles to color the rows but one yes and one no
    doc.autoTable({
      columns: [
        { header: "Customer Name", dataKey: "customername" },
        { header: "Email", dataKey: "email" },
        { header: "Phone", dataKey: "phone" },
      ],
      body: array,
    });

    doc.save("customer list");
  };

  // All pdf end -----------------------------------------------------

  // pagination -------------------------------------------------------

  const pageCount = array ? Math.ceil(array.length / pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setcurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const newArray = _(array).slice(startIndex).take(pageSize).value();
    setpaginatedArray(newArray);
  };
  console.log(paginatedArray);

  //----------------------------------------------------------------------

  return (
    <div>
      {/* Sidebar Start */}
      <div class="sidebar">
        <a href="#news">
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
      {/* Sidebar End */}

      <div class="content">
        <br />
        <h1>
          <center>
            <h3>Manage Customers</h3>
          </center>
        </h1>
        <div>
          <form type="submit">
            <div className="text-center">
              <button class="btn btn-outline-dark ">
                {" "}
                <Link class="nav-link active" to="/Addcustomer">
                  Add Customer
                </Link>
              </button>
              &nbsp;
              <button class="btn btn-outline-dark" onClick={downloadHandler}>
                PDF Download
              </button>
            </div>

            <br />
            <table class="table table-hover table-sm table-responsive text-center">
              <thead>
                <tr>
                  {/* <th scope="col">Sr.No.</th> */}
                  <th scope="col">Customer Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedArray.map((data, index) => {
                  return (
                    <tr>
                      {/* <td>{index + 1}</td> */}
                      <td>{data.customername}</td>
                      <td>{data.email}</td>
                      <td>{data.phone}</td>

                      <td>
                        {" "}
                        <button
                          type="button"
                          class="btn btn-warning"
                          onClick={(e) => updateHandler(data)}
                        >
                          Update
                        </button>
                        &nbsp;&nbsp;
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={(e) => deleteHandler(data)}
                        >
                          Delete
                        </button>
                        &nbsp;&nbsp;
                        <button
                          type="button"
                          class="btn btn-success"
                          onClick={(e) => viewHandler(data)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* pagination start */}
            <nav className="d-flex justify-content-center">
              <ul className="pagination">
                {pages.map((page) => (
                  <li
                    className={
                      page === currentPage ? "page-item active" : "page-item"
                    }
                  >
                    <p className="page-link" onClick={() => pagination(page)}>
                      {page}
                    </p>
                  </li>
                ))}
              </ul>
            </nav>
            {/* pagination end */}
          </form>
        </div>
      </div>
    </div>
  );
}
