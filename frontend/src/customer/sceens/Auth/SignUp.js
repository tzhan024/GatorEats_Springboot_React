import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";
import google from "../../../img/google.png";
import NavBar from "../../components/NavBar/NavBar";

export default function Signup() {
  const [typing, setTyping] = useState("");
  const [mouse, setMouse] = useState("");

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [message, setMessage] = useState("");

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
  const checkPassword = (e) => {
    if (e.target.value.length > 8) {
      if (e.target.value.match(/[a-z]+/) || e.target.value.match(/[A-Z]+/)) {
        if (e.target.value.match(/[0-9]+/)) {
          setPassword(e.target.value);
          setPasswordError("");
        } else {
          setPasswordError("password has to contains digits");
        }
      } else {
        setPasswordError("password has to contains letters");
      }
    } else {
      setPasswordError("password has to be at least 8 characters");
    }
  };
  const checkConfirmPassword = (e) => {
    if (e.target.value === password) {
      setConfirmPassword(e.target.value);
      setConfirmPasswordError("");
    } else {
      setConfirmPasswordError("password donesn't match");
      setConfirmPassword("");
    }
  };
  const handleSubmit = (e) => {
    if (
      firstname !== "" &&
      lastname !== "" &&
      email !== "" &&
      confirmPassword !== ""
    ) {
      axios
        .post("http://localhost:8080/api/user/register", {
          firstName: firstname,
          lastName: lastname,
          email: email,
          password: confirmPassword,
        })
        .then((res) => {
          // const token = res.data;
          // this.props.setToken(token);
          // this.setState({loggedIn: true});
          console.log(res);
          setMessage(res.data.message);
          if (message === "ok") {
            navigate("/user/signin");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setMessage("please check your inputs");
    }
  };

  return (
    <div>
      <NavBar />
      <div
        style={{
          width: "100%",
          height: "0.1px",
          backgroundColor: "rgb(0, 0, 0, 10%)",
        }}
      ></div>
      <div className="signup">
        <span className="signup-title">Sign up</span>
        <div className="signup-content">
          <span>Already have account?</span>
          <div
            className={
              mouse === "signin" ? "signup-signin-onmouse" : "signup-signin"
            }
            onMouseEnter={() => setMouse("signin")}
            onMouseLeave={() => setMouse("")}
            onClick={() => navigate("/user/signin")}
          >
            <span>Sign in</span>
          </div>
        </div>
        <div className="signup-content">
          <span>Partner?</span>
          <div
            className={
              mouse === "signuprestaurant"
                ? "signin-signup-onmouse"
                : "signin-signup"
            }
            onMouseEnter={() => setMouse("signuprestaurant")}
            onMouseLeave={() => setMouse("")}
            onClick={() => navigate("/merchant/signup/")}
          >
            <span>Sign up as restaurant</span>
          </div>
        </div>
        <div className="signup-names">
          <div className="signup-block">
            <span className="signup-content-title">First Name</span>
            <div
              className={
                typing === "firstname"
                  ? "signup-name-input-block-ontyping"
                  : "signup-name-input-block"
              }
              onClick={() => setTyping("firstname")}
            >
              <input
                className="signup-name-input"
                onChange={(e) => setFirstname(e.target.value)}
              ></input>
            </div>
          </div>
          <div style={{ width: "20px" }}></div>
          <div className="signup-block">
            <span className="signup-content-title">Last Name</span>
            <div
              className={
                typing === "lastname"
                  ? "signup-name-input-block-ontyping"
                  : "signup-name-input-block"
              }
              onClick={() => setTyping("lastname")}
            >
              <input
                className="signup-name-input"
                onChange={(e) => setLastname(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div className="signup-block">
          <span className="signup-content-title">Email</span>
          <div
            className={
              typing === "email"
                ? "signup-input-block-ontyping"
                : "signup-input-block"
            }
            onClick={() => setTyping("email")}
          >
            <input
              className="signup-input"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="signup-block">
          <span className="signup-content-title">Password</span>
          <div
            className={
              passwordError !== ""
                ? "signup-input-block-onerror"
                : typing === "password"
                ? "signup-input-block-ontyping"
                : "signup-input-block"
            }
            onClick={() => setTyping("password")}
          >
            <input
              className="signup-input"
              onChange={checkPassword}
              type="password"
            ></input>
          </div>
          {passwordError !== "" && (
            <span className="signup-content-error">{passwordError}</span>
          )}
        </div>
        <div className="signup-block">
          <span className="signup-content-title">Confirm Password</span>
          <div
            className={
              confirmPasswordError !== ""
                ? "signup-input-block-onerror"
                : typing === "confirmPassword"
                ? "signup-input-block-ontyping"
                : "signup-input-block"
            }
            onClick={() => setTyping("confirmPassword")}
          >
            <input
              className="signup-input"
              onChange={checkConfirmPassword}
              type="password"
            ></input>
          </div>
          {confirmPasswordError !== "" && (
            <span className="signup-content-error">{confirmPasswordError}</span>
          )}
        </div>
        <div
          className={
            mouse === "signup" ? "signup-submit-onmouse" : "signup-submit"
          }
          onMouseEnter={() => setMouse("signup")}
          onMouseLeave={() => setMouse("")}
          onClick={handleSubmit}
        >
          <span className="signup-google-content">Sign up</span>
        </div>
        <div
          className={
            mouse === "google" ? "signup-google-onmouse" : "signup-google"
          }
          onMouseEnter={() => setMouse("google")}
          onMouseLeave={() => setMouse("")}
        >
          <div className="signup-google-icon-bg">
            <img src={google} alt="google" className="signup-google-icon"></img>
          </div>
          <span className="signup-google-content">Continue with Google</span>
        </div>
        {message !== "ok" ? (
          <span className="signup-content-error">{message}</span>
        ) : (
          navigate("/user/signin")
        )}
      </div>
    </div>
  );
}
