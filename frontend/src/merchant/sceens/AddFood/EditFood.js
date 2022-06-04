import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddFood.css";
import axios from "axios";
import google from "../../../img/google.png";
import AuthedMerchantNavBar from "../../components/NavBar/AuthedMerchantNavBar";
import food from "../../../img/food.png";

export default function MerchantSignUp() {
  const [typing, setTyping] = useState("");
  const [mouse, setMouse] = useState("");

  const params = useParams();

  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [message, setMessage] = useState("");

  const [value, setValue] = useState("");
  const [count, setCount] = useState(-1);

  useEffect(() => {
    setCount(count + 1);
    if (window.localStorage.getItem("token") !== null) {
      if (window.localStorage.getItem("type") === "customer") {
        navigate("/user/home");
      }
    } else {
      navigate("/");
    }
    axios
      .get(`http://127.0.0.1:8080/api/menu/getfood/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setPrice(res.data.price);
        setName(res.data.name);
        setImage(res.data.image);
      })
      .catch((err) => {
        console.log("error: " + localStorage.getItem("id"));
        console.log(err);
      });
  }, [value]);
  const onChange = ({ target }) => setValue(target.value);

  const handleSubmit = (e) => {
    if (name !== "" && price !== "") {
      axios
        .post("http://localhost:8080/api/menu/editfood", {
          food: params.id,
          name: name,
          price: price,
          image: image,
        })
        .then((res) => {
          // const token = res.data;
          // this.props.setToken(token);
          // this.setState({loggedIn: true});
          console.log(res);
          navigate("/merchant/menu");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setMessage("please check your inputs");
    }
  };
  const handleDelete = (e) => {
    axios
      .get(`http://localhost:8080/api/menu/delete/${params.id}`)
      .then((res) => {
        // const token = res.data;
        // this.props.setToken(token);
        // this.setState({loggedIn: true});
        console.log(res);
        navigate("/merchant/menu");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();
  return (
    <div>
      <AuthedMerchantNavBar />
      <div
        style={{
          width: "100%",
          height: "0.1px",
          backgroundColor: "rgb(0, 0, 0, 10%)",
        }}
      ></div>
      <div className="addfood">
        <div className="addfood-inputs">
          {/* <img className="addfood-image-onmouse" src={food} alt="food"></img> */}
          <div
            className="addfood-image"
            onClick={() => alert("changing image")}
            onMouseEnter={() => setMouse("image")}
            onMouseLeave={() => setMouse("")}
            style={{
              backgroundImage: `url("${food}")`,
              backgroundSize: "cover",
            }}
          >
            {mouse === "image" && (
              <div className="addfood-image-onmouse">
                <span className="addfood-restaurant-image-title">
                  Click to Change image
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="addfood-inputs">
          <div className="addfood-restaurant-block">
            <span className="addfood-restaurant-content-title">Food Name</span>
            <div
              className={
                typing === "food"
                  ? "addfood-restaurant-input-block-ontyping"
                  : "addfood-restaurant-input-block"
              }
              onClick={() => setTyping("food")}
            >
              <input
                className="addfood-restaurant-input"
                onChange={(e) => setName(e.target.value)}
                value={name}
              ></input>
            </div>
          </div>

          <div className="addfood-restaurant-block">
            <span className="addfood-restaurant-content-title">Price</span>
            <div
              className={
                typing === "price"
                  ? "addfood-restaurant-input-block-ontyping"
                  : "addfood-restaurant-input-block"
              }
              onClick={() => setTyping("price")}
            >
              <input
                className="addfood-restaurant-input"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className="addfood-inputs">
        <div
          className={
            mouse === "delete"
              ? "addfood-restaurant-delete-onmouse"
              : "addfood-restaurant-delete"
          }
          onMouseEnter={() => setMouse("delete")}
          onMouseLeave={() => setMouse("")}
          onClick={handleDelete}
        >
          <span className="addfood-restaurant-google-content">Delete food</span>
        </div>
      </div>
      <div className="addfood-inputs">
        <div
          className={
            mouse === "goback"
              ? "addfood-restaurant-submit-onmouse"
              : "addfood-restaurant-submit"
          }
          onMouseEnter={() => setMouse("goback")}
          onMouseLeave={() => setMouse("")}
          onClick={() => navigate("/merchant/menu")}
        >
          <span className="addfood-restaurant-google-content">Go back</span>
        </div>
      </div>

      <div className="addfood-inputs">
        <div
          className={
            mouse === "submit"
              ? "addfood-restaurant-submit-onmouse"
              : "addfood-restaurant-submit"
          }
          onMouseEnter={() => setMouse("submit")}
          onMouseLeave={() => setMouse("")}
          onClick={handleSubmit}
        >
          <span className="addfood-restaurant-google-content">Submit</span>
        </div>
        {message !== "ok" && (
          <span className="signup-content-error">{message}</span>
        )}
      </div>
    </div>
  );
}
