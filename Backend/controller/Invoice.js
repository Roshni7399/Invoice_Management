import invoice from "../model/Invoice";
import { sendMail } from "../middleware/SendMail";
import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Add invoices
export const addinvoice = async (req, res) => {
  try {
    const addinvoi = new invoice({
      customername: req.body.customername,
      email: req.body.email,
      date: req.body.date,
      status: req.body.status,
      final: req.body.final,
      item: req.body.item,
    });

    const result = await addinvoi.save();
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "cm",
      format: "a4",
    });

    pdf.setFontSize(18);
    const title = "Invoice Details";
    const headers = [["Sr. No.", "Customer Name", "Status", "Total"]];
    const data = req.body.item.map((data, index) => [
      index + 1,
      req.body.customername,
      req.body.status,
      req.body.final,
    ]);
    let content = {
      startY: 50,
      theme: "grid",
      head: headers,
      body: data,
    };

    pdf.autoTable(content);
    const invoicefilename = Date.now() + "-invoice.pdf";
    pdf.save("output/list.pdf");
    const arr = result.item.map((data) => {
      return `<div>
    <table border="1">
        <thead>
            <tr>
                <th>productname</th>
                <th>price</th>
                <th>quantity</th>
                <th>tax</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
        <tr >
            <td>${data.productname}</td>
            <td>${data.price}</td>
            <td>${data.quantity}</td>
            <td>${data.tax}</td>
            <td>${data.total}</td>
        </tr>
        </tbody>
    </table>
</div>`;
    });

    sendMail(
      "roshnimanmode07@gmail.com",
      req.body.email,
      `Heyyy ${result.customername}`,

      `Your generated invoice is
          Date : ${result.date}
          Status : ${result.status}
          ${arr} `,
      { filename: "Invoice List.pdf" }
    );

    res.send({
      status: true,
      message: "add Successfully",
      result: result,
    });
    // sendMail(
    //   "roshnimanmode07@gmail.com",
    //   req.body.email,
    //   `Heyyy ${result.customername}`,
    //   `Your invoice is generated successfully!!!
    //         Product Name : ${result.item[0].productname}
    //         Product Price : ${result.item[0].price}
    //         Product Quantity : ${result.item[0].quantity}
    //         Product Tax : ${result.item[0].tax}
    //         Product Total : ${result.item[0].total}
    //         Status : ${result.status}`
    // );
  } catch (err) {
    console.log(err);
  }
};

// invoice list
export const invoiceget = async (req, res) => {
  const result = await invoice.find();

  if (result) {
    res.send({
      status: true,
      message: "All data fetched",
      result: result,
    });
    // console.log(result)
  }
};

// export const invoiceget = async (req, res) => {
//   const result = await invoice.paginate({},
//     {
//     // sort:{fname: req.query.sort} ,
//     page:req.query.page,
//     limit:req.query.limit
//     },
//     (err,result)=>{
//         console.log(result)
//     });

//   if (result) {
//     res.send({
//       status: true,
//       message: "All data fetched",
//       result: result,
//     });
//     // console.log(result)
//   }
// };

// delete invoice
export const deleteinvoice = async (req, res) => {
  console.log(req.body._id);

  const deleteApp = await invoice.deleteOne({
    _id: mongoose.Types.ObjectId(req.body._id),
  });

  res.send({
    status: true,
    message: "Deleted Successfully",
  });
};

// update invoice
export const updateinvoice = async (req, res) => {
  console.log(req.body._id);
  console.log(req.body.customername);
  console.log(req.body.status);

  try {
    console.log();
    let jsondata = {};
    if (req.body._id) {
      jsondata._id = req.body._id;
    }

    if (req.body.final) {
      jsondata.final = req.body.final;
    }
    if (req.body.status) {
      jsondata.status = req.body.status;
    }

    if (req.body.item) {
      jsondata.item = req.body.item;
    }

    invoice.updateOne(
      { _id: mongoose.Types.ObjectId(req.body._id) },
      { $set: jsondata },
      { new: true },
      (err, result) => {
        if (err) {
          res.send({ status: false, message: "unsuccefully", result: err });
        } else {
          res.send({ status: true, message: "succefully", result: result });
        }
      }
    );
  } catch (e) {
    throw e;
  }
};

// get by id
export const singleinvoice = async (req, res) => {
  console.log(req.body._id);

  const result = await invoice.findOne({
    _id: mongoose.Types.ObjectId(req.body._id),
  });

  res.send({
    status: true,
    message: " Successfully",
    result: result,
  });
};

// get paid (chart)
export const getPaid = async (req, res) => {
  const result = await invoice.find({ status: "paid" });
  if (result) {
    res.send({
      status: true,
      message: "All fetch",
      result: result,
    });
  }
};

// get unpaid (chart)
export const getUnpaid = async (req, res) => {
  const result = await invoice.find({ status: "unpaid" });
  if (result) {
    res.send({
      status: true,
      message: "All fetch",
      result: result,
    });
  }
};
