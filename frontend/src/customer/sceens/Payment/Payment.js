import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./Payment.css";
import axios from "axios";
import AuthedNavBar from "../../components/NavBar/AuthedNavBar";
import food from "../../../img/food.png";
import restaurant from "../../../img/restaurant.png";
import payment from "../../../img/payment.png";
import edit from "../../../img/edit.png";
import plus from "../../../img/plus.png";

export default function MerchantMenu(props) {
  const navigate = useNavigate();
  const params = useParams();
  const [mouse, setMouse] = useState("");
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [value, setValue] = useState("");
  const [count, setCount] = useState(-1);
  useEffect(
    (props) => {
      setCount(count + 1);
      axios
        .get(
          `http://127.0.0.1:8080/api/payment/getpayment/${window.localStorage.getItem(
            "id"
          )}`
        )
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log("error: " + localStorage.getItem("id"));
          console.log(err);
        });
    },
    [value]
  );
  const onChange = ({ target }) => setValue(target.value);

  // const data = [
  //   {
  //     name: "burger",
  //     price: 2.99,
  //   },
  //   {
  //     name: "fries",
  //     price: 1.99,
  //   },
  //   {
  //     name: "chicken tenders",
  //     price: 3.99,
  //   },
  //   {
  //     name: "soft drink",
  //     price: 1.59,
  //   },
  //   {
  //     name: "ice cream",
  //     price: 0.99,
  //   },
  //   {
  //     name: "hot wings",
  //     price: 7.99,
  //   },
  //   {
  //     name: "salmon sushi",
  //     price: 6.99,
  //   },
  // ];
  var rows = [];
  if (data !== undefined) {
    for (let i = -1; i < data.length; i += 3) {
      if (i < 0) {
        rows.push(
          <div className="payment-block">
            {i < 0 && (
              <div
                className={
                  mouse === "payment"
                    ? "payment-add-block-content-onmouse"
                    : "payment-add-block-content"
                }
                onMouseEnter={() => setMouse("payment")}
                onMouseLeave={() => setMouse("")}
                onClick={() => {
                  navigate(`/user/addpayment`);
                }}
              >
                <img
                  className="payment-block-add-logo"
                  src={plus}
                  alt="plus"
                ></img>
              </div>
            )}

            {i + 1 < data.length && (
              <div className="payment-block-content">
                <div className="payment-block-logo">
                  <div className="payment-block-left">
                    <img
                      className="payment-block-left-logo"
                      src={payment}
                    ></img>
                  </div>
                  <div className="payment-block-right">
                    <div
                      className={
                        mouse === i + 1
                          ? "payment-block-right-logo-bg-onmouse"
                          : "payment-block-right-logo-bg"
                      }
                      onMouseEnter={() => setMouse(i + 1)}
                      onMouseLeave={() => setMouse("")}
                      onClick={() => {
                        navigate(`/user/editpayment/${data[i + 1].id}`);
                      }}
                    >
                      <img
                        className="payment-block-right-logo"
                        src={edit}
                      ></img>
                    </div>
                  </div>
                </div>
                {/* <img src={payment}></img> */}
                <div className="payment-info">
                  <span className="payment-info-detail">
                    {data[i + 1].number}
                  </span>
                  <span className="payment-info-detail">
                    {data[i + 1].expdate}
                  </span>
                  <span className="payment-info-detail">
                    {data[i + 1].name}
                  </span>
                </div>
              </div>
            )}
            {i + 2 < data.length && (
              <div className="payment-block-content">
                <div className="payment-block-logo">
                  <div className="payment-block-left">
                    <img
                      className="payment-block-left-logo"
                      src={payment}
                    ></img>
                  </div>
                  <div className="payment-block-right">
                    <div
                      className={
                        mouse === i + 2
                          ? "payment-block-right-logo-bg-onmouse"
                          : "payment-block-right-logo-bg"
                      }
                      onMouseEnter={() => setMouse(i + 2)}
                      onMouseLeave={() => setMouse("")}
                      onClick={() => {
                        navigate(`/user/editpayment/${data[i + 2].id}`);
                      }}
                    >
                      <img
                        className="payment-block-right-logo"
                        src={edit}
                      ></img>
                    </div>
                  </div>
                </div>
                {/* <img src={payment}></img> */}
                <div className="payment-info">
                  <span className="payment-info-detail">
                    {data[i + 2].number}
                  </span>
                  <span className="payment-info-detail">
                    {data[i + 2].expdate}
                  </span>
                  <span className="payment-info-detail">
                    {data[i + 2].name}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      } else {
        rows.push(
          <div className="payment-block">
            {i < data.length && (
              <div className="payment-block-content">
                <div className="payment-block-logo">
                  <div className="payment-block-left">
                    <img
                      className="payment-block-left-logo"
                      src={payment}
                    ></img>
                  </div>
                  <div className="payment-block-right">
                    <div
                      className={
                        mouse === i
                          ? "payment-block-right-logo-bg-onmouse"
                          : "payment-block-right-logo-bg"
                      }
                      onMouseEnter={() => setMouse(i)}
                      onMouseLeave={() => setMouse("")}
                      onClick={() => {
                        navigate(`/user/editpayment/${data[i].id}`);
                      }}
                    >
                      <img
                        className="payment-block-right-logo"
                        src={edit}
                      ></img>
                    </div>
                  </div>
                </div>
                {/* <img src={payment}></img> */}
                <div className="payment-info">
                  <span className="payment-info-detail">{data[i].number}</span>
                  <span className="payment-info-detail">{data[i].expdate}</span>
                  <span className="payment-info-detail">{data[i].name}</span>
                </div>
              </div>
            )}
            {i + 1 < data.length && (
              <div className="payment-block-content">
                <div className="payment-block-logo">
                  <div className="payment-block-left">
                    <img
                      className="payment-block-left-logo"
                      src={payment}
                    ></img>
                  </div>
                  <div className="payment-block-right">
                    <div
                      className={
                        mouse === i + 1
                          ? "payment-block-right-logo-bg-onmouse"
                          : "payment-block-right-logo-bg"
                      }
                      onMouseEnter={() => setMouse(i + 1)}
                      onMouseLeave={() => setMouse("")}
                      onClick={() => {
                        navigate(`/user/editpayment/${data[i + 1].id}`);
                      }}
                    >
                      <img
                        className="payment-block-right-logo"
                        src={edit}
                      ></img>
                    </div>
                  </div>
                </div>
                {/* <img src={payment}></img> */}
                <div className="payment-info">
                  <span className="payment-info-detail">
                    {data[i + 1].number}
                  </span>
                  <span className="payment-info-detail">
                    {data[i + 1].expdate}
                  </span>
                  <span className="payment-info-detail">
                    {data[i + 1].name}
                  </span>
                </div>
              </div>
            )}
            {i + 2 < data.length && (
              <div className="payment-block-content">
                <div className="payment-block-logo">
                  <div className="payment-block-left">
                    <img
                      className="payment-block-left-logo"
                      src={payment}
                    ></img>
                  </div>
                  <div className="payment-block-right">
                    <div
                      className={
                        mouse === i + 2
                          ? "payment-block-right-logo-bg-onmouse"
                          : "payment-block-right-logo-bg"
                      }
                      onMouseEnter={() => setMouse(i + 2)}
                      onMouseLeave={() => setMouse("")}
                      onClick={() => {
                        navigate(`/user//editpayment/${data[i + 2].id}`);
                      }}
                    >
                      <img
                        className="payment-block-right-logo"
                        src={edit}
                      ></img>
                    </div>
                  </div>
                </div>
                {/* <img src={payment}></img> */}
                <div className="payment-info">
                  <span className="payment-info-detail">
                    {data[i + 2].number}
                  </span>
                  <span className="payment-info-detail">
                    {data[i + 2].expdate}
                  </span>
                  <span className="payment-info-detail">
                    {data[i + 2].name}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      }
    }
  }

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
      <div className="payments-title">
        <span className="payments-title-content">Your payment methods</span>
      </div>
      <div className="payment-list">{rows}</div>
    </div>
  );
}
