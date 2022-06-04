import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./Menu.css";
import axios from "axios";
import AuthedNavBar from "../NavBar/AuthedNavBar";
import NavBar from "../../components/NavBar/NavBar";
import food from "../../../img/food.png";
import restaurant from "../../../img/restaurant.png";

export default function RestaurantMenu(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  console.log(state.email);
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
        .get(`http://127.0.0.1:8080/api/menu/${state.id}`)
        .then((res) => {
          console.log(res.data);
          setData(res.data.menu);
          setName(res.data.name);
          setImage(res.data.image);
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
  // if (data !== undefined) {
  for (let i = 0; i < data.length; i += 3) {
    rows.push(
      <div className="restaurant-menu-block">
        {i < data.length && (
          <div className="restaurant-menu-block-content">
            <img className="restaurant-menu-image" src={food} alt="food"></img>
            <div className="restaurant-menu-food-detail">
              <span className="restaurant-menu-name">{data[i].name}</span>
              <span className="restaurant-menu-price">$ {data[i].price}</span>
              <div
                className={
                  mouse === i
                    ? "restaurant-menu-add-cart-onmouse"
                    : "restaurant-menu-add-cart"
                }
                onMouseEnter={() => setMouse(i)}
                onMouseLeave={() => setMouse("")}
                onClick={() => {
                  axios
                    .post(`http://127.0.0.1:8080/api/cart/addtocart`, {
                      restaurant: state.id,
                      user: window.localStorage.getItem("id"),
                      food: data[i].id,
                    })
                    .then((res) => {
                      console.log(res);
                      alert(`${data[i].name} has been added to cart`);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                <span className="restaurant-menu-add-cart-content">
                  Add to cart
                </span>
              </div>
            </div>
          </div>
        )}
        {i + 1 < data.length && (
          <div className="restaurant-menu-block-content">
            <img className="restaurant-menu-image" src={food} alt="food"></img>
            <div className="restaurant-menu-food-detail">
              <span className="restaurant-menu-name">{data[i + 1].name}</span>
              <span className="restaurant-menu-price">
                $ {data[i + 1].price}
              </span>
              <div
                className={
                  mouse === i + 1
                    ? "restaurant-menu-add-cart-onmouse"
                    : "restaurant-menu-add-cart"
                }
                onMouseEnter={() => setMouse(i + 1)}
                onMouseLeave={() => setMouse("")}
                onClick={() => {
                  axios
                    .post(`http://127.0.0.1:8080/api/cart/addtocart`, {
                      restaurant: state.id,
                      user: window.localStorage.getItem("id"),
                      food: data[i + 1].id,
                    })
                    .then((res) => {
                      console.log(res);
                      alert(`${data[i + 1].name} has been added to cart`);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                <span className="restaurant-menu-add-cart-content">
                  Add to cart
                </span>
              </div>
            </div>
          </div>
        )}
        {i + 2 < data.length && (
          <div className="restaurant-menu-block-content">
            <img className="restaurant-menu-image" src={food} alt="food"></img>
            <div className="restaurant-menu-food-detail">
              <span className="restaurant-menu-name">{data[i + 2].name}</span>
              <span className="restaurant-menu-price">
                $ {data[i + 2].price}
              </span>
              <div
                className={
                  mouse === i + 2
                    ? "restaurant-menu-add-cart-onmouse"
                    : "restaurant-menu-add-cart"
                }
                onMouseEnter={() => setMouse(i + 2)}
                onMouseLeave={() => setMouse("")}
                onClick={() => {
                  axios
                    .post(`http://127.0.0.1:8080/api/cart/addtocart`, {
                      restaurant: state.id,
                      user: window.localStorage.getItem("id"),
                      food: data[i + 2].id,
                    })
                    .then((res) => {
                      console.log(res);
                      alert(`${data[i + 2].name} has been added to cart`);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                <span className="restaurant-menu-add-cart-content">
                  Add to cart
                </span>
              </div>
            </div>
          </div>
        )}
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
      <div className="restaurant-menu">
        <div className="restaurant-menu-title">
          <div className="restaurant-menu-title-1">
            <img
              className="restaurant-menu-icon"
              src={restaurant}
              alt="restaurant"
            ></img>
            <span className="restaurant-menu-title-content">{name}</span>
          </div>
          <div className="restaurant-menu-title-2">
            <div
              className={
                mouse === "addfood"
                  ? "restaurant-menu-add-cart-onmouse"
                  : "restaurant-menu-add-cart"
              }
              style={{ justifySelf: "flex-end" }}
              onMouseEnter={() => setMouse("addfood")}
              onMouseLeave={() => setMouse("")}
              onClick={() =>
                navigate(`/user/shoppingcart/${name}`, {
                  state: { id: state.id },
                })
              }
            >
              <span className="restaurant-menu-add-cart-content">
                Shopping cart
              </span>
            </div>
          </div>
        </div>
        <div className="restaurant-menu-line"></div>

        {rows}
      </div>
    </div>
  );
}
