import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import google from "../../../img/google.png";
import MerchantNavBar from "../../components/NavBar/MerchantNavBar";

export default function MerchantSignUp() {
  const [typing, setTyping] = useState("");
  const [mouse, setMouse] = useState("");

  const [restaurant, setrestaurant] = useState("");
  // const [firstname, setFirstname] = useState("");
  // const [lastname, setLastname] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [message, setMessage] = useState("");

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
      restaurant !== "" &&
      zipcode !== "" &&
      email !== "" &&
      confirmPassword !== ""
    ) {
      axios
        .post("http://localhost:8080/api/restaurant/register", {
          name: restaurant,
          zipcode: zipcode,
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

  const navigate = useNavigate();
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
      <div className="signup">
        <span className="signup-restaurant-title">
          Sign up as a restaurant owner
        </span>
        <div className="signup-restaurant-content">
          <span>Already have account?</span>
          <div
            className={
              mouse === "signin"
                ? "signup-restaurant-signin-onmouse"
                : "signup-restaurant-signin"
            }
            onMouseEnter={() => setMouse("signin")}
            onMouseLeave={() => setMouse("")}
            onClick={() => navigate("/merchant/signin")}
          >
            <span>Sign in</span>
          </div>
        </div>
        <div className="signup-restaurant-block">
          <span className="signup-restaurant-content-title">
            restaurant Name
          </span>
          <div
            className={
              typing === "restaurant"
                ? "signup-restaurant-input-block-ontyping"
                : "signup-restaurant-input-block"
            }
            onClick={() => setTyping("restaurant")}
          >
            <input
              className="signup-restaurant-input"
              onChange={(e) => setrestaurant(e.target.value)}
            ></input>
          </div>
        </div>
        {/* <div className="signup-restaurant-names">
          <div className="signup-restaurant-block">
            <span className="signup-restaurant-content-title">First Name</span>
            <div
              className={
                typing === "firstname"
                  ? "signup-restaurant-name-input-block-ontyping"
                  : "signup-restaurant-name-input-block"
              }
              onClick={() => setTyping("firstname")}
            >
              <input
                className="signup-restaurant-name-input"
                onChange={(e) => setFirstname(e.target.value)}
              ></input>
            </div>
          </div>
          <div style={{ width: "20px" }}></div>
          <div className="signup-restaurant-block">
            <span className="signup-restaurant-content-title">Last Name</span>
            <div
              className={
                typing === "lastname"
                  ? "signup-restaurant-name-input-block-ontyping"
                  : "signup-restaurant-name-input-block"
              }
              onClick={() => setTyping("lastname")}
            >
              <input
                className="signup-restaurant-name-input"
                onChange={(e) => setLastname(e.target.value)}
              ></input>
            </div>
          </div>
        </div> */}
        <div className="signup-restaurant-block">
          <span className="signup-restaurant-content-title">Zip code</span>
          <div
            className={
              typing === "zipcode"
                ? "signup-restaurant-input-block-ontyping"
                : "signup-restaurant-input-block"
            }
            onClick={() => setTyping("zipcode")}
          >
            <input
              className="signup-restaurant-input"
              onChange={(e) => setZipcode(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="signup-restaurant-block">
          <span className="signup-restaurant-content-title">Email</span>
          <div
            className={
              typing === "email"
                ? "signup-restaurant-input-block-ontyping"
                : "signup-restaurant-input-block"
            }
            onClick={() => setTyping("email")}
          >
            <input
              className="signup-restaurant-input"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="signup-restaurant-block">
          <span className="signup-restaurant-content-title">Password</span>
          <div
            className={
              passwordError !== ""
                ? "signup-restaurant-input-block-onerror"
                : typing === "password"
                ? "signup-restaurant-input-block-ontyping"
                : "signup-restaurant-input-block"
            }
            onClick={() => setTyping("password")}
          >
            <input
              className="signup-restaurant-input"
              onChange={checkPassword}
              type="password"
            ></input>
          </div>
          {passwordError !== "" && (
            <span className="signup-restaurant-content-error">
              {passwordError}
            </span>
          )}
        </div>
        <div className="signup-restaurant-block">
          <span className="signup-restaurant-content-title">
            Confirm Password
          </span>
          <div
            className={
              confirmPasswordError !== ""
                ? "signup-restaurant-input-block-onerror"
                : typing === "confirmPassword"
                ? "signup-restaurant-input-block-ontyping"
                : "signup-restaurant-input-block"
            }
            onClick={() => setTyping("confirmPassword")}
          >
            <input
              className="signup-restaurant-input"
              onChange={checkConfirmPassword}
              type="password"
            ></input>
          </div>
          {confirmPasswordError !== "" && (
            <span className="signup-restaurant-content-error">
              {confirmPasswordError}
            </span>
          )}
        </div>
        <div
          className={
            mouse === "signup"
              ? "signup-restaurant-submit-onmouse"
              : "signup-restaurant-submit"
          }
          onMouseEnter={() => setMouse("signup")}
          onMouseLeave={() => setMouse("")}
          onClick={handleSubmit}
        >
          <span className="signup-restaurant-google-content">Sign up</span>
        </div>
        <div
          className={
            mouse === "google"
              ? "signup-restaurant-google-onmouse"
              : "signup-restaurant-google"
          }
          onMouseEnter={() => setMouse("google")}
          onMouseLeave={() => setMouse("")}
        >
          <div className="signup-restaurant-google-icon-bg">
            <img
              src={google}
              alt="google"
              className="signup-restaurant-google-icon"
            ></img>
          </div>
          <span className="signup-restaurant-google-content">
            Continue with Google
          </span>
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
