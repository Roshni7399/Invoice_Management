import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/Admin.css";
import { useNavigate } from "react-router-dom";
import { adminLogin } from '../Service/Auth.services';
import { useDispatch } from "react-redux";
import { userlogin } from "../Slice/AuthSlice";
import {toast} from 'react-toastify';
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import FacebookLogin from "../Components/FacebookLogin";

export default function Login() {
 
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });


  const [msg, responseMsg] = useState();
  let navigate = useNavigate();

  // to prevent going to login page when user is logged in
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if(isLoggedIn){
      navigate("/Sidebar")
    }
    
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((previousValue) => ({
      ...previousValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const [loading , setLoading] = useState(false);

  const buttonHandler=async()=>{
  const res = await adminLogin(input.email, input.password);
  console.log(res.data.status)
  setLoading(true);
  if(res.data.status === true){
    dispatch(userlogin(res.data));
    toast.success('Login Successsfull')
    setTimeout(()=>{
      navigate('/Sidebar') 
    },1000)
   
  }
  else{
    toast.error('Check Your Credentials Properly')
  }
  console.log(res.data)
}

// Validations
const [valid, setValid] = useState({
  email: false,
  password: false,
  emailError: "",
  passwordError: "",
});

const validateemail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailIsValid = pattern.test(email);

  if (emailIsValid) {
    setValid((previousValue) => ({
      ...previousValue,
      email: false,
      emailError: "",
    }));
  } else {
    setValid((previousValue) => ({
      ...previousValue,
      email: true,
      emailError: "Please enter your correct email",
    }));
  }
};
const validatepassword = (password) => {
  if (password.length < 1) {
    setValid((previousValue) => ({
      ...previousValue,
      password: true,
      passwordError: "Enter your correct password",
    }));
  } else {
    setValid((previousValue) => ({
      ...previousValue,
      password: false,
      passwordError: "",
    }));
  }
};



  return (
    <>
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <h3>Admin Login</h3><br/>
     
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>Email</label><br/>
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Enter your email"
            onBlur={(e) => validateemail(e.target.value)}
            onChange={handleChange}
          /><br />
          {valid.email && (
            <span className="text-danger">{valid.emailError}</span>
          )}
          <br />
          <br />
          <label>Password</label>
          <input
            type="text"
            className="form-control"
            name="password"
            placeholder="Enter your password"
            onBlur={(e) => validatepassword(e.target.value)}
            onChange={handleChange}
          /><br />
          {valid.password && (
            <span className="text-danger">{valid.passwordError}</span>
          )}
          <br />
          <br />
         
          <button
            type="submit"
            className="btn btn-success "
            onClick={buttonHandler}
          >
            {loading ? <div class= "spinner-border spinner-border-sm" role="status"></div>:"Sign In"}
          </button>
          {<b className="text-info">{responseMsg}</b>}
          <br/>
        </form>
        <br/>
        <FacebookLogin/>
        <div id="formFooter">
          <a class="underlineHover" href="#"><Link class="nav-link active" to="/Forgetpassword  ">
          Forgot Password?
                </Link>
          </a>

        </div>
      </div>
      
    </div>
    </>
  );
}
