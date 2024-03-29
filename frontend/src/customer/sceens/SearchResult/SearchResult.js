import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./SearchResult.css";
import AuthedNavBar from "../../components/NavBar/AuthedNavBar";
import NavBar from "../../components/NavBar/NavBar";
import restaurant from "../../../img/restaurant.png";

export default function RestaurantResults() {
  const navigate = useNavigate();
  const params = useParams();
  const [resData, setResData] = useState([]);
  const [value, setValue] = useState("");
  const [count, setCount] = useState(-1);
  var rows = [];
  useEffect(() => {
    setCount(count + 1);
    if (params.address) {
      axios
        .get(`http://127.0.0.1:8080/api/restaurant/search/${params.address}`)
        .then((res) => {
          console.log(params.address);
          console.log(res.data);
          const temp = res.data;
          setResData(temp);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(`http://127.0.0.1:8080/api/restaurant/all`)
        .then((res) => {
          console.log(params.address);
          console.log(res.data);
          const temp = res.data;
          setResData(temp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [value]);
  const onChange = ({ target }) => setValue(target.value);
  console.log(1);
  // let resData = [
  //   {
  //     restaurant: "macdonald",
  //     zip: "32608",
  //   },
  //   {
  //     restaurant: "kfc",
  //     zip: "32608",
  //   },
  //   {
  //     restaurant: "tacobell",
  //     zip: "32608",
  //   },
  //   {
  //     restaurant: "popeyes",
  //     zip: "32608",
  //   },
  //   {
  //     restaurant: "xxx",
  //     zip: "32608",
  //   },
  // ];

  // navigate(`/restaurant_menu/${data[i].restaurant}`)
  for (let i = 0; i < resData.length; i += 4) {
    rows.push(
      <div className="restaurant-results-block">
        {i < resData.length && (
          <div
            className="restaurant-results-block-content"
            onClick={() =>
              navigate(`/restaurant/${resData[i].name}`, {
                state: { id: resData[i].id },
              })
            }
          >
            <div
              className="restaurant-results-image"
              // src={resData[i].image === "" ? restaurant : resData[i].image}
              style={{
                backgroundImage: `url("${
                  resData[i].image === "" ? restaurant : resData[i].image
                }")`,
                backgroundSize: "cover",
              }}
              alt="restaurant"
            ></div>
            <span className="restaurant-results-name">{resData[i].name}</span>
          </div>
        )}
        {i + 1 < resData.length && (
          <div
            className="restaurant-results-block-content"
            onClick={() =>
              navigate(`/restaurant/${resData[i + 1].name}`, {
                state: { id: resData[i + 1].id },
              })
            }
          >
            <div
              className="restaurant-results-image"
              // src={
              //   resData[i + 1].image === "" ? restaurant : resData[i + 1].image
              // }
              style={{
                backgroundImage: `url("${
                  resData[i + 1].image === ""
                    ? restaurant
                    : resData[i + 1].image
                }")`,
                backgroundSize: "cover",
              }}
              alt="restaurant"
            ></div>
            <span className="restaurant-results-name">
              {resData[i + 1].name}
            </span>
          </div>
        )}
        {i + 2 < resData.length && (
          <div
            className="restaurant-results-block-content"
            onClick={() =>
              navigate(`/restaurant/${resData[i + 2].name}`, {
                state: { id: resData[i + 2].id },
              })
            }
          >
            <div
              className="restaurant-results-image"
              // src={
              //   resData[i + 2].image === "" ? restaurant : resData[i + 2].image
              // }
              style={{
                backgroundImage: `url("${
                  resData[i + 2].image === ""
                    ? restaurant
                    : resData[i + 2].image
                }")`,
                backgroundSize: "cover",
              }}
              alt="restaurant"
            ></div>
            <span className="restaurant-results-name">
              {resData[i + 2].name}
            </span>
          </div>
        )}
        {i + 3 < resData.length && (
          <div
            className="restaurant-results-block-content"
            onClick={() =>
              navigate(`/restaurant/${resData[i + 3].name}`, {
                state: { id: resData[i + 3].id },
              })
            }
          >
            <div
              className="restaurant-results-image"
              // src={
              //   resData[i + 3].image === "" ? restaurant : resData[i + 3].image
              // }
              style={{
                backgroundImage: `url("${
                  resData[i + 3].image === ""
                    ? restaurant
                    : resData[i + 3].image
                }")`,
                backgroundSize: "cover",
              }}
              alt="restaurant"
            ></div>
            <span className="restaurant-results-name">
              {resData[i + 3].name}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="restaurant-results">
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
      <div className="restaurant-results-title">
        <span className="restaurant-results-title-content">
          {params.address
            ? `Result for "${params.address}"`
            : "All restaurants"}
        </span>
      </div>
      {/* <div className="restaurant-results-block">
        <div className="restaurant-results-block-content"></div>
        <div className="restaurant-results-block-content"></div>
        <div className="restaurant-results-block-content"></div>
      </div> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {rows}
      </div>
    </div>
  );
}
