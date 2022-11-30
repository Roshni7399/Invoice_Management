import React from "react";
import ReactFacebookLogin from "react-facebook-login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FacebookLogin(props) {
  let nav = useNavigate();
  const onResponse = (resp) => {
    console.log(resp);
  };

  const responseFacebook = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "http://localhost:4455/Admin/facebooklogin",
      data: { accessToken: response.accessToken, userID: response.userID },
    }).then((response) => {
      nav("/");
      console.log("Facebook login success,client side", response);
    });
  };

  return (
    <ReactFacebookLogin
      appId="510840667247951"
      autoLoad={false}
      fields="name,email"
      callback={responseFacebook}
      onFailure={onResponse}
      icon="fa-facebook"
    />
  );
}
