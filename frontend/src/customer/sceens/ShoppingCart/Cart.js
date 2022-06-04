import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./Cart.css";
import axios from "axios";
import AuthedNavBar from "../../components/NavBar/AuthedNavBar";
import NavBar from "../../components/NavBar/NavBar";
import food from "../../../img/food.png";
import restaurant from "../../../img/restaurant.png";

export default function Cart(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  console.log(state.email);
  const [mouse, setMouse] = useState("");
  const [data, setData] = useState([]);
  const [qty, setQty] = useState("");
  const [total, setTotal] = useState("");

  const [value, setValue] = useState("");
  const [count, setCount] = useState(-1);
  useEffect(
    (props) => {
      setCount(count + 1);
      axios
        .post(`http://127.0.0.1:8080/api/cart/shoppingcart`, {
          restaurant: state.id,
          user: window.localStorage.getItem("id"),
        })
        .then((res) => {
          console.log(res.data);
          setData(res.data.data);
          setQty(res.data.qty);
          setTotal(res.data.total);
        })
        .catch((err) => {
          console.log("error: " + localStorage.getItem("id"));
          console.log(err);
        });
    },
    [value]
  );
  const onChange = ({ target }) => setValue(target.value);

  const handleQty = (e) => {
    console.log(e.target.value);
    // axios
    //   .get(`http://localhost:8080/api/cart/delete/${params.id}`)
    //   .then((res) => {
    //     // const token = res.data;
    //     // this.props.setToken(token);
    //     // this.setState({loggedIn: true});
    //     console.log(res);
    //     navigate("/merchant/menu");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  var rows = [];
  // if (data !== undefined) {
  for (let i = 0; i < data.length; i++) {
    rows.push(
      <div className="cart-block-content-0">
        <div className="cart-block-content-1">
          <img className="cart-image" src={food} alt="food"></img>
          <div className="cart-food-detail">
            <span className="cart-name">{data[i].name}</span>
            <span className="cart-price">$ {data[i].price}</span>
            <div
              className={mouse === i ? "cart-delete-onmouse" : "cart-delete"}
              onMouseEnter={() => setMouse(i)}
              onMouseLeave={() => setMouse("")}
              onClick={(e) => {
                axios
                  .get(`http://localhost:8080/api/cart/delete/${data[i].id}`)
                  .then((res) => {
                    // const token = res.data;
                    // this.props.setToken(token);
                    // this.setState({loggedIn: true});
                    console.log(res);
                    // navigate("/merchant/menu");
                    window.location.reload(false);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <span className="cart-delete-content">Delete food</span>
            </div>
          </div>
        </div>
        <div className="cart-block-content-2">
          <select
            value={data[i].qty}
            className="cart-select"
            onChange={(e) => {
              axios
                .post(`http://localhost:8080/api/cart/changeqty`, {
                  id: data[i].id,
                  qty: e.target.value,
                })
                .then((res) => {
                  // const token = res.data;
                  // this.props.setToken(token);
                  // this.setState({loggedIn: true});
                  console.log(res);
                  // navigate("/merchant/menu");
                  window.location.reload(false);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            {/* <option value={data[i].qty}>{data[i].qty}</option> */}
            {Array(data[i].qty + 10)
              .fill()
              .map((_, v) => (
                <option value={v + 1}>{v + 1}</option>
              ))}
            {/* <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option> */}
          </select>
          <span className="cart-price-2">
            $ {Number(data[i].price * data[i].qty).toFixed(2)}
          </span>
        </div>
      </div>
    );
  }
  // }

  return (
    <div>
      {window.localStorage.getItem("token") === null ? (
        <NavBar />
      ) : (
        <AuthedNavBar />
      )}
      <div
        style={{
          width: "100%",
          height: "0.1px",
          backgroundColor: "rgb(0, 0, 0, 10%)",
        }}
      ></div>
      <div className="cart">
        <div className="cart-title">
          <span className="cart-title-content">
            Shopping cart for "{params.restaurant}"
          </span>
        </div>
        {data.length > 0 ? (
          <div className="cart-block">
            <span className="cart-subtitle-content">
              There are {qty} items in your "{params.restaurant}" shopping cart
            </span>
            {rows}
          </div>
        ) : (
          <span
            className="cart-subtitle-content"
            style={{ marginLeft: "100px" }}
          >
            Your "{params.restaurant}" shopping cart is empty.
          </span>
        )}
        {data.length > 0 && (
          <div className="cart-block-2">
            <span className="cart-total-price">
              Total price: $ {Number(total).toFixed(2)}
            </span>
            <div
              className={
                mouse === "checkout"
                  ? "cart-checkout-button-onmouse"
                  : "cart-checkout-button"
              }
              style={{ justifySelf: "flex-end" }}
              onMouseEnter={() => setMouse("checkout")}
              onMouseLeave={() => setMouse("")}
              // onClick={() =>
              //   navigate(`/user/shoppingcart/${name}`, {
              //     state: { id: state.id },
              //   })
              // }
            >
              <span className="cart-checkout-button-content">
                Process to checkout
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
