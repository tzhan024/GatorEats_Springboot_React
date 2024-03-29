import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import axios from "axios";
import MerchantNavBar from "../../components/NavBar/MerchantNavBar";
import google from "../../../img/google.png";

export default function MerchantSignIn() {
  const thisWidth = window.innerWidth;
  const thisHeight = window.innerHeight;
  const [typing, setTyping] = useState("");
  const [mouse, setMouse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [count, setCount] = useState(-1);
  useEffect(() => {
    setCount(count + 1);
    if (window.localStorage.getItem("token") !== null) {
      if (window.localStorage.getItem("type") === "customer") {
        navigate("/user/home");
      } else {
        navigate("/merchant/home");
      }
    }
  }, [value]);
  const onChange = ({ target }) => setValue(target.value);

  const handleSubmit = (e) => {
    // console.log("email:   " + email);
    // console.log("password: " + password);
    axios
      // .post("http://127.0.0.1:5000/react/signin", {
      .post("http://127.0.0.1:8080/api/restaurant/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);

        if (res.data.message === "ok") {
          window.localStorage.setItem("token", res.data.token);
          window.localStorage.setItem("email", email);
          window.localStorage.setItem("id", res.data.id);
          window.localStorage.setItem("type", "restaurant");
          // setErrorMsg("");
          navigate("/merchant/home");
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg("email or password incorrect!");
      });
    // TODO: Add auth
  };

  return (
    <div>
      <MerchantNavBar />
      <div
        style={{
          width: "100%",
          height: "0.1px",
          backgroundColor: "rgb(0, 0, 0, 10%)",
        }}
      ></div>
      <div className="signin">
        <span className="signin-title">Restaurant Sign in</span>
        <div className="signin-content">
          <span>Become our partner?</span>
          <div
            className={
              mouse === "signup" ? "signin-signup-onmouse" : "signin-signup"
            }
            onMouseEnter={() => setMouse("signup")}
            onMouseLeave={() => setMouse("")}
            onClick={() => navigate("/merchant/signup")}
          >
            <span>Join us</span>
          </div>
        </div>
        <span className="signin-error">{errorMsg}</span>
        <div className="signin-block">
          <span className="signin-content-title">Email</span>
          <div
            className={
              typing === "email"
                ? "signin-input-block-ontyping"
                : "signin-input-block"
            }
            onClick={() => setTyping("email")}
          >
            <input
              id="email"
              className="signin-input"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="signin-block">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <span className="signin-content-title">Password</span>
            <span
              className={
                mouse === "forgot"
                  ? "signin-forgotpassword-onmouse"
                  : "signin-forgotpassword"
              }
              onMouseEnter={() => setMouse("forgot")}
              onMouseLeave={() => setMouse("")}
            >
              Forgot your password
            </span>
          </div>
          <div
            className={
              typing === "password"
                ? "signin-input-block-ontyping"
                : "signin-input-block"
            }
            onClick={() => setTyping("password")}
          >
            <input
              id="password"
              type="password"
              className="signup-input"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
        </div>
        <div
          className={
            mouse === "signin" ? "signin-submit-onmouse" : "signin-submit"
          }
          onMouseEnter={() => setMouse("signin")}
          onMouseLeave={() => setMouse("")}
          onClick={handleSubmit}
        >
          <span className="signin-google-content">Sign in</span>
        </div>
        <div
          className={
            mouse === "google" ? "signin-google-onmouse" : "signin-google"
          }
          onMouseEnter={() => setMouse("google")}
          onMouseLeave={() => setMouse("")}
        >
          <div className="signin-google-icon-bg">
            <img src={google} alt="google" className="signin-google-icon"></img>
          </div>
          <span className="signin-google-content">Continue with Google</span>
        </div>
      </div>
    </div>
  );
}
