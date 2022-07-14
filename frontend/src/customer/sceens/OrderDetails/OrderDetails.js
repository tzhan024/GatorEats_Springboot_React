import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./OrderDetails.css";
import axios from "axios";
import food from "../../../img/food.png";
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
  //   const [progressing, setProgressing] = useState();
  //   const [delivering, setDelivering] = useState();
  //   const [delivered, setDelivered] = useState();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [st, setSt] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [status, setStatus] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");

  const [details, setDetails] = useState("");

  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [count, setCount] = useState(-1);
  //   let date = new Date();
  useEffect(() => {
    setCount(count + 1);
    if (window.localStorage.getItem("token") === null) {
      navigate("/user/signin");
    }
    axios
      .get(`http://127.0.0.1:8080/api/order/details/${params.id}`)
      .then((res) => {
        // console.log(res.data);
        console.log(res.data);
        setName(res.data.name);
        setAddress(res.data.address);
        setCity(res.data.city);
        setSt(res.data.state);
        setZipcode(res.data.zipcode);
        setCardName(res.data.holder);
        setCardNumber(res.data.number);
        setCardExp(res.data.exp);
        setStatus(res.data.status);
        setOrderNumber(res.data.orderNumber);
        setDate(res.data.date);
        setPrice(res.data.price);
        setDetails(res.data.details);
      })
      .catch((err) => {
        // console.log("error: " + localStorage.getItem("id"));
        // console.log(err);
      });
    // console.log(state);
  }, [value]);
  const onChange = ({ target }) => setValue(target.value);

  var rows = [];
  // if (data !== undefined) {
  for (let i = 0; i < details.length; i++) {
    rows.push(
      <div className="order-details-content">
        <div className="cart-block-content-1">
          <div
            className="cart-image"
            style={{
              backgroundImage: `url("${
                details[i].image === "" ? food : details[i].image
              }")`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className="cart-food-detail">
            <span className="cart-name">{details[i].name}</span>
            <span className="cart-price">$ {details[i].price}</span>
          </div>
        </div>
        <div className="cart-block-content-2">
          <span className="cart-price-2">{`Qty ${details[i].qty}`}</span>
          <span className="cart-price-2">
            $ {Number(details[i].price * details[i].qty).toFixed(2)}
          </span>
        </div>
      </div>
    );
  }

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
      <div className="order-details">
        <div className="orders-content">
          <div className="orders-content-subblock">
            <span className="orders-content-title">DELIVER TO</span>
            <span className="orders-content-content">{name}</span>
            <span className="orders-content-content">{address}</span>
            <span className="orders-content-content">
              {`${city}, ${st}, ${zipcode}`}
            </span>
          </div>
          <div className="orders-content-subblock">
            <span className="orders-content-title">PAYMENT</span>
            <span className="orders-content-content">{cardName}</span>
            <span className="orders-content-content">{cardNumber}</span>
            <span className="orders-content-content">{cardExp}</span>
          </div>
          <div className="orders-content-subblock-2">
            <span className="orders-content-title">{status}</span>
            <span className="orders-content-content">
              {`ORDER # ${orderNumber}`}
            </span>
            <span className="orders-content-content">{`PLACED ON: ${date}`}</span>
            <span className="orders-content-content">{`TOTAL $ ${price}`}</span>
          </div>
        </div>
        <div className="order-details-block">
          <span className="cart-subtitle-content">
            Below are the details of this order
          </span>
          {rows}
        </div>
      </div>
    </div>
  );
}
