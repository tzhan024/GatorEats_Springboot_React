import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./Orders.css";
import axios from "axios";
import AuthedNavBar from "../../components/NavBar/AuthedNavBar";
import { CSSTransition, SwitchTransition } from "react-transition-group";
// import { set } from "mockdate";

export default function Checkout() {
  const [typing, setTyping] = useState("");
  const [mouse, setMouse] = useState("");
  const [select, setSelect] = useState(1);
  const { state } = useLocation();

  const [message, setMessage] = useState("");
  const params = useParams();
  const [progressing, setProgressing] = useState();
  const [delivering, setDelivering] = useState();
  const [delivered, setDelivered] = useState();

  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [count, setCount] = useState(-1);
  let date = new Date();
  useEffect(() => {
    setCount(count + 1);
    if (window.localStorage.getItem("token") === null) {
      navigate("/user/signin");
    }
    axios
      .get(
        `http://127.0.0.1:8080/api/order/getbyuser/inprogress/${window.localStorage.getItem(
          "id"
        )}`
      )
      .then((res) => {
        // console.log(res.data);
        setProgressing(res.data);
      })
      .catch((err) => {
        // console.log("error: " + localStorage.getItem("id"));
        // console.log(err);
      });
    // console.log(state);
  }, [value]);
  const onChange = ({ target }) => setValue(target.value);

  const handleProgressing = (e) => {
    axios
      .get(
        `http://127.0.0.1:8080/api/order/getbyuser/inprogress/${window.localStorage.getItem(
          "id"
        )}`
      )
      .then((res) => {
        // console.log(res.data);
        setProgressing(res.data);
      })
      .catch((err) => {
        // console.log("error: " + localStorage.getItem("id"));
        // console.log(err);
      });

    setSelect(1);
  };
  var pr = [];
  if (progressing !== undefined) {
    // setCard(0);
    for (let i = 0; i < progressing.length; i++) {
      pr.push(
        <div
          className={mouse === i ? "orders-content-onmouse" : "orders-content"}
          onMouseEnter={() => setMouse(i)}
          onMouseLeave={() => setMouse("")}
          onClick={() => navigate(`/orderdetails/${progressing[i].id}`)}
        >
          <div className="orders-content-subblock">
            <span className="orders-content-title">DELIVER TO</span>
            <span className="orders-content-content">
              {progressing[i].name}
            </span>
            <span className="orders-content-content">
              {progressing[i].address}
            </span>
            <span className="orders-content-content">
              {`${progressing[i].city}, ${progressing[i].state}, ${progressing[i].zipcode}`}
            </span>
          </div>
          <div className="orders-content-subblock">
            <span className="orders-content-title">PAYMENT</span>
            <span className="orders-content-content">
              {progressing[i].holder}
            </span>
            <span className="orders-content-content">
              {progressing[i].number}
            </span>
            <span className="orders-content-content">
              {`${progressing[i].exp}`}
            </span>
          </div>
          <div className="orders-content-subblock-2">
            <span className="orders-content-title">
              {`${progressing[i].status}`}
            </span>
            <span className="orders-content-content">
              {`ORDER # ${progressing[i].ordernumber}`}
            </span>
            <span className="orders-content-content">
              {`PLACED ON: ${progressing[i].date}`}
            </span>
            <span className="orders-content-content">
              {`TOTAL $ ${progressing[i].price}`}
            </span>
          </div>
        </div>
      );
    }
  }

  const handleDelivering = (e) => {
    axios
      .get(
        `http://127.0.0.1:8080/api/order/getbyuser/delivering/${window.localStorage.getItem(
          "id"
        )}`
      )
      .then((res) => {
        // console.log(res.data);
        setDelivering(res.data);
      })
      .catch((err) => {
        // console.log("error: " + localStorage.getItem("id"));
        // console.log(err);
      });

    setSelect(2);
  };
  var dr = [];
  if (delivering !== undefined) {
    // setCard(0);
    for (let i = 0; i < delivering.length; i++) {
      dr.push(
        <div
          className={mouse === i ? "orders-content-onmouse" : "orders-content"}
          onMouseEnter={() => setMouse(i)}
          onMouseLeave={() => setMouse("")}
          onClick={() => navigate(`/orderdetails/${delivering[i].id}`)}
        >
          <div className="orders-content-subblock">
            <span className="orders-content-title">DELIVER TO</span>
            <span className="orders-content-content">{delivering[i].name}</span>
            <span className="orders-content-content">
              {delivering[i].address}
            </span>
            <span className="orders-content-content">
              {`${delivering[i].city}, ${delivering[i].state}, ${delivering[i].zipcode}`}
            </span>
          </div>
          <div className="orders-content-subblock">
            <span className="orders-content-title">PAYMENT</span>
            <span className="orders-content-content">
              {delivering[i].holder}
            </span>
            <span className="orders-content-content">
              {delivering[i].number}
            </span>
            <span className="orders-content-content">
              {`${delivering[i].exp}`}
            </span>
          </div>
          <div className="orders-content-subblock-2">
            <span className="orders-content-title">
              {`${delivering[i].status}`}
            </span>
            <span className="orders-content-content">
              {`ORDER # ${delivering[i].ordernumber}`}
            </span>
            <span className="orders-content-content">
              {`PLACED ON: ${delivering[i].date}`}
            </span>
            <span className="orders-content-content">
              {`TOTAL $ ${delivering[i].price}`}
            </span>
          </div>
        </div>
      );
    }
  }
  const handleDelivered = (e) => {
    axios
      .get(
        `http://127.0.0.1:8080/api/order/getbyuser/delivered/${window.localStorage.getItem(
          "id"
        )}`
      )
      .then((res) => {
        // console.log(res.data);
        setDelivered(res.data);
      })
      .catch((err) => {
        // console.log("error: " + localStorage.getItem("id"));
        // console.log(err);
      });

    setSelect(3);
  };
  var dr2 = [];
  if (delivered !== undefined) {
    // setCard(0);
    for (let i = 0; i < delivered.length; i++) {
      dr2.push(
        <div
          className={mouse === i ? "orders-content-onmouse" : "orders-content"}
          onMouseEnter={() => setMouse(i)}
          onMouseLeave={() => setMouse("")}
          onClick={() => navigate(`/orderdetails/${delivered[i].id}`)}
        >
          <div className="orders-content-subblock">
            <span className="orders-content-title">DELIVER TO</span>
            <span className="orders-content-content">{delivered[i].name}</span>
            <span className="orders-content-content">
              {delivered[i].address}
            </span>
            <span className="orders-content-content">
              {`${delivered[i].city}, ${delivered[i].state}, ${delivered[i].zipcode}`}
            </span>
          </div>
          <div className="orders-content-subblock">
            <span className="orders-content-title">PAYMENT</span>
            <span className="orders-content-content">
              {delivered[i].holder}
            </span>
            <span className="orders-content-content">
              {delivered[i].number}
            </span>
            <span className="orders-content-content">
              {`${delivered[i].exp}`}
            </span>
          </div>
          <div className="orders-content-subblock-2">
            <span className="orders-content-title">
              {`${delivered[i].status}`}
            </span>
            <span className="orders-content-content">
              {`ORDER # ${delivered[i].ordernumber}`}
            </span>
            <span className="orders-content-content">
              {`PLACED ON: ${delivered[i].date}`}
            </span>
            <span className="orders-content-content">
              {`TOTAL $ ${delivered[i].price}`}
            </span>
          </div>
        </div>
      );
    }
  }
  //   if (rows.length > 0) {
  //     setCard(0);
  //   }

  return (
    <div className="home">
      <AuthedNavBar />
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "rgb(0, 0, 0, 10%)",
        }}
      ></div>
      <div className="orders-button-block">
        <div
          className={select === 1 ? "orders-button-onselect" : "orders-button"}
          onClick={() => setSelect(1)}
        >
          <span
            className={
              select === 1
                ? "orders-button-title-onselect"
                : "orders-button-title"
            }
          >
            In progress
          </span>
        </div>
        <div
          className={select === 2 ? "orders-button-onselect" : "orders-button"}
          onClick={handleDelivering}
        >
          <span
            className={
              select === 2
                ? "orders-button-title-onselect"
                : "orders-button-title"
            }
          >
            On the way
          </span>
        </div>
        <div
          className={select === 3 ? "orders-button-onselect" : "orders-button"}
          onClick={handleDelivered}
        >
          <span
            className={
              select === 3
                ? "orders-button-title-onselect"
                : "orders-button-title"
            }
          >
            Delivered
          </span>
        </div>
      </div>
      <div className="orders">
        {select === 1
          ? pr.length === 0 && (
              <span
                className="cart-subtitle-content"
                style={{ marginLeft: "100px" }}
              >
                There's no order in progress.
              </span>
            )
          : select === 2
          ? dr.length === 0 && (
              <span
                className="cart-subtitle-content"
                style={{ marginLeft: "100px" }}
              >
                There's no order on the way.
              </span>
            )
          : dr2.length === 0 && (
              <span
                className="cart-subtitle-content"
                style={{ marginLeft: "100px" }}
              >
                There's no order delivered.
              </span>
            )}
        {select === 1 && pr}
        {select === 2 && dr}
        {select === 3 && dr2}
        <div style={{ height: "50px" }}></div>
      </div>
    </div>
  );
}
