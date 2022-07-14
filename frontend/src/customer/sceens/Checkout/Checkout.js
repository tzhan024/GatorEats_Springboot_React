import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./Checkout.css";
import axios from "axios";
import AuthedNavBar from "../../components/NavBar/AuthedNavBar";
import { CSSTransition, SwitchTransition } from "react-transition-group";
// import { set } from "mockdate";

export default function Checkout() {
  const [typing, setTyping] = useState("");
  const [mouse, setMouse] = useState("");
  const [select, setSelect] = useState("");
  const { state } = useLocation();

  const [message, setMessage] = useState("");
  const params = useParams();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [st, setSt] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [dropdown, setDropdown] = useState("");
  const [payments, setPayments] = useState([]);
  const [card, setCard] = useState();
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [count, setCount] = useState(-1);
  let date = new Date();
  useEffect(() => {
    setCount(count + 1);
    if (window.localStorage.getItem("token") === null) {
      navigate("/user/signin");
    }
    // console.log(state);
    axios
      .post(`http://127.0.0.1:8080/api/user/profile`, {
        email: window.localStorage.getItem("email"),
      })
      .then((res) => {
        console.log(window.localStorage.getItem("email"));
        console.log(res.data);

        setName(`${res.data.firstname} ${res.data.lastname}`);
        setAddress(res.data.address);
        setCity(res.data.city);
        setSt(res.data.state);
        setZipcode(res.data.zipcode);
      })
      .catch((err) => {
        console.log(window.localStorage.getItem("email"));
        console.log(err);
      });
    axios
      .get(
        `http://127.0.0.1:8080/api/payment/getpayment/${window.localStorage.getItem(
          "id"
        )}`
      )
      .then((res) => {
        console.log(res.data);
        setPayments(res.data);
        if (res.data !== undefined) {
          setCardName(res.data[0].name);
          setCardNumber(res.data[0].number);
          setCardExp(res.data[0].expdate);
          setCardCVV(res.data[0].scode);
          setCard(0);
        }
      })
      .catch((err) => {
        console.log("error: " + localStorage.getItem("id"));
        console.log(err);
      });
  }, [value]);
  const onChange = ({ target }) => setValue(target.value);

  const handleSubmit = (e) => {};
  var rows = [];
  if (payments !== undefined) {
    // setCard(0);
    for (let i = 0; i < payments.length; i++) {
      rows.push(
        <div className="checkout-content-payments-details">
          {/* <img src={payment}></img> */}

          <span className="checkout-content-payments-details-name">
            {payments[i].name}
          </span>
          <span className="checkout-content-payments-details-number">
            {payments[i].number}
          </span>
          <span className="checkout-content-payments-details-number">
            {payments[i].expdate}
          </span>
          <div
            className={
              card === i
                ? "checkout-button-select-onselected"
                : mouse === i
                ? "checkout-button-select-onmouse"
                : "checkout-button-select"
            }
            onMouseEnter={() => setMouse(i)}
            onMouseLeave={() => setMouse("")}
            onClick={() => {
              setCard(i);
              setCardName(payments[i].name);
              setCardNumber(payments[i].number);
              setCardExp(payments[i].expdate);
              setCardCVV(payments[i].scode);
            }}
          >
            <span>{card === i ? "selected" : "select"}</span>
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
          height: "0.1px",
          backgroundColor: "rgb(0, 0, 0, 10%)",
        }}
      ></div>

      <div className="checkout">
        <div className="checkout-content">
          {select === "address" ? (
            <div className="checkout-content-left-onselect">
              <div className="checkout-address-short">
                <div className="checkout-long-block">
                  <span className="checkout-address-short-title">Name</span>
                  <div
                    className={
                      typing === "name"
                        ? "checkout-address-input-block-ontyping"
                        : "checkout-address-input-block"
                    }
                    onClick={() => setTyping("name")}
                  >
                    <input
                      className="checkout-short-input"
                      // onChange={(e) => setFirstname(e.target.value)}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="checkout-address-short">
                <div className="checkout-long-block">
                  <span className="checkout-address-short-title">Address</span>
                  <div
                    className={
                      typing === "address"
                        ? "checkout-address-input-block-ontyping"
                        : "checkout-address-input-block"
                    }
                    onClick={() => setTyping("address")}
                  >
                    <input
                      className="checkout-short-input"
                      // onChange={(e) => setFirstname(e.target.value)}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="checkout-address-short">
                <div className="checkout-short-block">
                  <span className="checkout-address-short-title">City</span>
                  <div
                    className={
                      typing === "city"
                        ? "checkout-address-input-block-ontyping"
                        : "checkout-address-input-block"
                    }
                    onClick={() => setTyping("city")}
                  >
                    <input
                      className="checkout-short-input"
                      // onChange={(e) => setFirstname(e.target.value)}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    ></input>
                  </div>
                </div>
                {/* <div style={{ width: "10px" }}></div> */}
                <div className="checkout-short-block">
                  <span className="checkout-address-short-title">State</span>
                  <div
                    className={
                      typing === "state"
                        ? "checkout-address-input-block-ontyping"
                        : "checkout-address-input-block"
                    }
                    onClick={() => setTyping("state")}
                  >
                    <input
                      className="checkout-short-input"
                      // onChange={(e) => setLastname(e.target.value)}
                      value={st}
                      onChange={(e) => setSt(e.target.value)}
                    ></input>
                  </div>
                </div>
                {/* <div style={{ width: "10px" }}></div> */}
                <div className="checkout-short-block">
                  <span className="checkout-address-short-title">Zipcode</span>
                  <div
                    className={
                      typing === "zipcode"
                        ? "checkout-address-input-block-ontyping"
                        : "checkout-address-input-block"
                    }
                    onClick={() => setTyping("zipcode")}
                  >
                    <input
                      className="checkout-short-input"
                      // onChange={(e) => setLastname(e.target.value)}
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={
                mouse === "address"
                  ? "checkout-content-left-onmouse"
                  : "checkout-content-left"
              }
              onMouseEnter={() => setMouse("address")}
              onMouseLeave={() => setMouse("")}
              onClick={() => setSelect("address")}
            >
              {address !== "" ? (
                <>
                  <span className="checkout-address-name">{name}</span>
                  <span className="checkout-address-address">{address}</span>
                  <span className="checkout-address-address">
                    {`${city}, ${st}, ${zipcode}`}
                  </span>
                </>
              ) : (
                <span className="checkout-address-address">
                  Click to enter your address
                </span>
              )}
            </div>
          )}
          <div
            className={
              select === "payment"
                ? "checkout-content-right-onselect"
                : mouse === "payment"
                ? "checkout-content-right-onmouse"
                : "checkout-content-right"
            }
            onMouseEnter={() => setMouse("payment")}
            onMouseLeave={() => setMouse("")}
            onClick={() => {
              setSelect("payment");
              setTyping("");
            }}
          >
            {rows.length === 0 ? (
              select === "payment" ? (
                <>
                  <div className="checkout-address-short">
                    <div className="checkout-long-block">
                      <span className="checkout-address-short-title">Name</span>
                      <div
                        className={
                          typing === "cardname"
                            ? "checkout-address-input-block-ontyping"
                            : "checkout-address-input-block"
                        }
                        onClick={() => setTyping("cardname")}
                      >
                        <input
                          className="checkout-short-input"
                          // onChange={(e) => setFirstname(e.target.value)}
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="checkout-address-short">
                    <div className="checkout-long-block">
                      <span className="checkout-address-short-title">
                        Card Number
                      </span>
                      <div
                        className={
                          typing === "number"
                            ? "checkout-address-input-block-ontyping"
                            : "checkout-address-input-block"
                        }
                        onClick={() => setTyping("number")}
                      >
                        <input
                          className="checkout-short-input"
                          // onChange={(e) => setFirstname(e.target.value)}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="checkout-address-short">
                    <div className="checkout-short-block">
                      <span className="checkout-address-short-title">
                        Exp Date
                      </span>
                      <div
                        className={
                          typing === "exp"
                            ? "checkout-address-input-block-ontyping"
                            : "checkout-address-input-block"
                        }
                        onClick={() => setTyping("exp")}
                      >
                        <input
                          className="checkout-short-input"
                          // onChange={(e) => setFirstname(e.target.value)}
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    {/* <div style={{ width: "10px" }}></div> */}
                    <div className="checkout-short-block">
                      <span className="checkout-address-short-title">CVV</span>
                      <div
                        className={
                          typing === "cvv"
                            ? "checkout-address-input-block-ontyping"
                            : "checkout-address-input-block"
                        }
                        onClick={() => setTyping("cvv")}
                      >
                        <input
                          className="checkout-short-input"
                          // onChange={(e) => setLastname(e.target.value)}
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    {/* <div style={{ width: "10px" }}></div> */}
                    <div className="checkout-short-block"></div>
                  </div>
                </>
              ) : (
                <>
                  <span className="checkout-address-address">
                    Click here to add payment method
                  </span>
                </>
              )
            ) : (
              <>
                <span className="checkout-address-name">{cardName}</span>

                <span className="checkout-address-address">{cardNumber}</span>
                {/* <span className="checkout-address-address">
                    {`${city}, ${state}, ${zipcode}`}
                    </span> */}
                <span className="checkout-address-address">Exp: 04/25</span>
              </>
            )}
          </div>
        </div>
        {select === "payment" && rows.length > 0 && (
          <div className="checkout-content-payments">
            <div style={{ height: "20px" }}></div>
            {rows}
          </div>
        )}
        <div className="checkout-content-price">
          <span className="cart-total-price">Total price: $ {state.price}</span>
          {name !== "" &&
          address !== "" &&
          city !== "" &&
          state !== "" &&
          zipcode !== "" &&
          cardName !== "" &&
          cardNumber !== "" &&
          cardExp !== "" &&
          cardCVV !== "" ? (
            <div
              className={
                mouse === "checkout"
                  ? "cart-checkout-button-onmouse"
                  : "cart-checkout-button"
              }
              style={{ justifySelf: "flex-end" }}
              onMouseEnter={() => setMouse("checkout")}
              onMouseLeave={() => setMouse("")}
              onClick={() => {
                // console.log("place");
                var parseDate = date.toDateString().split(" ");
                var time = date.toTimeString().split(" ")[0].split(":");
                // console.log(`${parseDate[1]} ${parseDate[2]}, ${parseDate[3]}`);
                // console.log(time);
                axios
                  .post(`http://127.0.0.1:8080/api/order/create`, {
                    user: window.localStorage.getItem("id"),
                    restaurant: state.id,
                    name: name,
                    address: address,
                    city: city,
                    state: st,
                    zipcode: zipcode,
                    date: `${parseDate[1]} ${parseDate[2]}, ${parseDate[3]}`,
                    time: `${time[0]}:${time[1]}`,
                    price: state.price,
                    holder: cardName,
                    number: cardNumber,
                    exp: cardExp,
                    cvv: cardCVV,
                  })
                  .then((res) => {
                    // console.log(window.localStorage.getItem("email"));
                    console.log(res);
                    navigate("/user/orders");
                  })
                  .catch((err) => {
                    console.log(window.localStorage.getItem("email"));
                    console.log(err);
                  });
              }}
            >
              <span className="cart-checkout-button-content">
                place your order
              </span>
            </div>
          ) : (
            <div
              className="cart-checkout-button-onmouse"
              style={{ justifySelf: "flex-end" }}
            >
              <span className="cart-checkout-button-content">
                place your order
              </span>
            </div>
          )}
        </div>
        {/* <span>{`${date.toTimeString().split(" ")[0]}`}</span>
        <span>{`${date.getHours()}:${date.getMinutes()}`}</span> */}
      </div>
    </div>
  );
}
