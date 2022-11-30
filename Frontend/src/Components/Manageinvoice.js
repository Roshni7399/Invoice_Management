import { Link } from "react-router-dom";
import { invoiceget } from "../Service/Auth.services";
import React, { useEffect, useState } from "react";
import { deleteinvoice } from "../Service/Auth.services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jspdf from "jspdf";
import "jspdf-autotable";
import _ from "lodash";

const pageSize = 4;

export default function Manageinvoice() {
  const navigate = useNavigate();
  const [array, setArray] = useState([]);
  const [paginatedArray, setpaginatedArray] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);

  useEffect(() => {
    const fun = async () => {
      const response = await invoiceget();
      setArray(response.data.result);
      setpaginatedArray(
        _(response.data.result).slice(0).take(pageSize).value()
      );
    };
    fun();
  }, []);

  const deleteHandler = async (data) => {
    const response = await deleteinvoice(data._id);
    console.log(response.data.message);
    if (response.data.status) {
      const response = await invoiceget();
      setArray(response.data.result);
      setpaginatedArray(
        _(response.data.result).slice(0).take(pageSize).value()
      );
      toast.error("Deleted Successsfully");
    }
  };

  const updateHandler = async (data) => {
    console.log(data);
    navigate(`/Updateinvoice/${data._id}`);
  };

  // const viewHandler = async () => {
  //   navigate(`/Viewinvoice`);
  // };

  for (let i in paginatedArray) {
    console.log(paginatedArray[i].item);
  }

  // pdf downloader ------------------------------------------------

  const pdfhandel = (data) => {
    var doc = new jspdf("landscape", "px", "a4", "false");
    doc.setFont("Helvertica", "bold");
    doc.text(60, 60, `Customer Name:${data.customername}`);
    doc.text(60, 80, `Status:${data.status}`);
    doc.text(60, 100, `Total:${data.final}`);
    doc.save(`${data.customername}.pdf`);
  };
  ///-----------------------------------------------------------------

  // All pdf start ----------------------------------------------------

  const downloadHandler = () => {
    const doc = new jspdf();
    // doc.text("Invoice List",20,10);
    doc.text(85, 10, "Invoice List");

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
        { header: "Status", dataKey: "status" },
        { header: "Total", dataKey: "total" },
      ],
      body: array,
    });

    doc.save("Invoice List");
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

      <div class="content">
        <br />
        <h1>
          <center>
            <h3>Manage Invoices</h3>
          </center>
        </h1>
        <div>
          <form type="submit">
            <div className="text-center">
              <div>
                <button class="btn btn-outline-dark ">
                  <Link class="nav-link active" to="/Addinvoice">
                    Create Invoice
                  </Link>
                </button>
                &nbsp;
                {/* <button class="btn btn-outline-dark" onClick={downloadHandler}>
                  Pdf all Data
                </button> */}
              </div>
            </div>

            <br />
            <table class="table table-hover table-sm table-responsive text-center">
              <thead class="thead-dark">
                <tr>
                  {/* <th scope="col">Sr.No.</th> */}
                  <th scope="col">Customer Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Total</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedArray.map((data, index) => {
                  return (
                    <tr>
                      {/* <td>{index + 1}</td> */}
                      <td>{data.customername}</td>
                      <td>{data.status}</td>
                      <td>{data?.final}</td>

                      <td>
                        {/* <Link to="/Viewinvoice">
                      <button
                          type="button"
                          class="btn btn-success"
                          // onClick={viewHandler}
                        >
                          View
                        </button></Link>
                        &nbsp;&nbsp; */}
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
                          class="btn btn-info"
                          onClick={(e) => pdfhandel(data)}
                        >
                          Pdf
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
          </form>
        </div>
      </div>
    </div>
  );
}
