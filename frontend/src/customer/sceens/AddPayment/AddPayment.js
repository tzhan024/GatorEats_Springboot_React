import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddPayment.css";
import axios from "axios";
import google from "../../../img/google.png";
import AuthedNavBar from "../../components/NavBar/AuthedNavBar";
// import { set } from "mockdate";

export default function AddPayment() {
  const [typing, setTyping] = useState("");
  const [mouse, setMouse] = useState("");

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [expdate, setExpdate] = useState("");
  const [cvv, setCvv] = useState("");

  const [message, setMessage] = useState("");
  const params = useParams();

  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [count, setCount] = useState(-1);
  useEffect(() => {
    setCount(count + 1);
    if (window.localStorage.getItem("token") === null) {
      navigate("/user/signin");
    }
    if (params.id) {
      axios
        .get(`http://localhost:8080/api/payment/getbyid/${params.id}`, {})
        .then((res) => {
          // const token = res.data;
          // this.props.setToken(token);
          // this.setState({loggedIn: true});
          console.log(res.data);
          setName(res.data.name);
          setNumber(res.data.number);
          setExpdate(res.data.expdate);
          setCvv(res.data.cvv);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [value]);
  const onChange = ({ target }) => setValue(target.value);

  const handleSubmit = (e) => {
    if (params.id) {
      axios
        .post(`http://localhost:8080/api/payment/editpayment/`, {
          id: params.id,
          name: name,
          number: number,
          expdate: expdate,
          cvv: cvv,
        })
        .then((res) => {
          // const token = res.data;
          // this.props.setToken(token);
          // this.setState({loggedIn: true});
          console.log(res.data);
          navigate("/user/payment");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`http://localhost:8080/api/payment/addpayment/`, {
          userid: window.localStorage.getItem("id"),
          name: name,
          number: number,
          expdate: expdate,
          cvv: cvv,
        })
        .then((res) => {
          // const token = res.data;
          // this.props.setToken(token);
          // this.setState({loggedIn: true});
          console.log(res.data);
          navigate("/user/payment");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleDelete = (e) => {
    axios
      .get(`http://localhost:8080/api/payment/delete/${params.id}`, {})
      .then((res) => {
        // const token = res.data;
        // this.props.setToken(token);
        // this.setState({loggedIn: true});
        console.log(res.data);
        navigate("/user/payment");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <AuthedNavBar />
      <div
        style={{
          width: "100%",
          height: "0.1px",
          backgroundColor: "rgb(0, 0, 0, 10%)",
        }}
      ></div>
      <div className="addpayment">
        <span className="addpayment-title">
          {params.id ? "Edit Payment" : "Add Payment"}
        </span>

        <div className="addpayment-block">
          <span className="addpayment-content-title">Card Holder</span>
          <div
            className={
              typing === "name"
                ? "addpayment-input-block-ontyping"
                : "addpayment-input-block"
            }
            onClick={() => setTyping("name")}
          >
            <input
              className="addpayment-input"
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
          </div>
        </div>
        <div className="addpayment-block">
          <span className="addpayment-content-title">Number</span>
          <div
            className={
              typing === "number"
                ? "addpayment-input-block-ontyping"
                : "addpayment-input-block"
            }
            onClick={() => setTyping("number")}
          >
            <input
              className="addpayment-input"
              onChange={(e) => setNumber(e.target.value)}
              value={number}
            ></input>
          </div>
        </div>
        <div className="addpayment-short">
          <div className="addpayment-block">
            <span className="addpayment-content-title">Exp Date</span>
            <div
              className={
                typing === "expdate"
                  ? "addpayment-short-input-block-ontyping"
                  : "addpayment-short-input-block"
              }
              onClick={() => setTyping("expdate")}
            >
              <input
                className="addpayment-short-input"
                onChange={(e) => setExpdate(e.target.value)}
                value={expdate}
              ></input>
            </div>
          </div>
          <div style={{ width: "20px" }}></div>
          <div className="addpayment-block">
            <span className="addpayment-content-title">CVV</span>
            <div
              className={
                typing === "cvv"
                  ? "addpayment-short-input-block-ontyping"
                  : "addpayment-short-input-block"
              }
              onClick={() => setTyping("cvv")}
            >
              <input
                className="addpayment-short-input"
                onChange={(e) => setCvv(e.target.value)}
                value={cvv}
              ></input>
            </div>
          </div>
        </div>
        {params.id && (
          <div
            className={
              mouse === "delete"
                ? "addpayment-delete-onmouse"
                : "addpayment-delete"
            }
            onMouseEnter={() => setMouse("delete")}
            onMouseLeave={() => setMouse("")}
            onClick={handleDelete}
          >
            <span className="addpayment-button-content">Delete</span>
          </div>
        )}
        <div
          className={
            mouse === "goback"
              ? "addpayment-button-onmouse"
              : "addpayment-button"
          }
          onMouseEnter={() => setMouse("goback")}
          onMouseLeave={() => setMouse("")}
          onClick={() => navigate("/user/payment")}
        >
          <span className="addpayment-button-content">Go back</span>
        </div>

        <div
          className={
            mouse === "submit"
              ? "addpayment-button-onmouse"
              : "addpayment-button"
          }
          onMouseEnter={() => setMouse("submit")}
          onMouseLeave={() => setMouse("")}
          onClick={handleSubmit}
        >
          <span className="addpayment-button-content">Submit</span>
        </div>
        {/* {message !== "ok" ? (
          <span className="signup-content-error">{message}</span>
        ) : (
          navigate("/user/signin")
        )} */}
      </div>
    </div>
  );
}
