import { Link } from "react-router-dom";
import "../css/Admin.css";
// import { ToastContainer, toast } from 'react-toastify';

export default function Contactus() {
  return (
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <h4>Contact Us</h4>

        <form>
          <label>Name</label>
          <br />
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter your name"
          />
          <br />
          <br />
          <br />

          <label>Message</label>
          <br />
          <input
            type="text"
            className="form-control"
            name="message"
            placeholder="Write Message"
          />
          <br />
          <br />
          <br />

          <button type="submit" className="btn btn-success ">
            Submit{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
