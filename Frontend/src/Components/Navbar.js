import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { userlogout } from "../Slice/AuthSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem("users");
    localStorage.clear();
    dispatch(userlogout());
    navigate("/");
  };

  return (
    <>
      <nav class="navbar">
        <div class="logo">
          <Link class="nav-link active" to="/">
          &nbsp;&nbsp;
           {" "} Invoice Management System
          </Link>
        </div>

        {userdata.isLoggedIn ? (
          <div>
            <button className="btn btn-md btn-outline-light m-2"> 
              <Link class="nav-link active" to="/Profile">Profile</Link>
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout{" "}
            </button>
            &nbsp;&nbsp;
          </div>
        ) : (
          <div class="menu">
            <Link class="nav-link active" to="/">
              <button className="btn btn-outline-light" name="home">
                Home
              </button>
            </Link>
            <Link class="nav-link active" to="About">
              <button className="btn btn-outline-light" name="aboutus">
                About Us
              </button>
            </Link>
            <Link class="nav-link active" to="Contact">
              <button className="btn btn-outline-light" name="contactus">
                Contact Us
              </button>
            </Link>
            <Link class="nav-link active" to="/admin/login">
              <button className="btn btn-outline-light" name="home">
                Login
              </button>
            </Link>
            &nbsp;
          </div>
        )}
      </nav>
    </>
  );
}
