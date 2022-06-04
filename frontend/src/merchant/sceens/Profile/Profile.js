import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthedMerchantNavBar from "../../components/NavBar/AuthedMerchantNavBar";
import { Button, Col, Form, Nav, Row, Modal } from "react-bootstrap";
import "./Profile.css";
import axios from "axios";
import restaurant from "../../../img/restaurant.png";

export default function Profile() {
  const navigate = useNavigate();
  const [count, setCount] = useState(-1);
  const [value, setValue] = useState("");

  const [email, setEmail] = useState("");
  const [emailDialog, setEmailDialog] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  // const [id, setId] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfrimPassword] = useState("");
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [tab, setTab] = useState("profile");

  useEffect(() => {
    setCount(count + 1);
    if (window.localStorage.getItem("token") === null) {
      navigate("/merchant/signin");
    }
    axios
      .post(`http://127.0.0.1:8080/api/restaurant/profile`, {
        email: window.localStorage.getItem("email"),
      })
      .then((res) => {
        console.log(window.localStorage.getItem("email"));
        console.log(res.data);
        // console.log(params.address);
        setEmail(res.data.email);
        setName(res.data.name);
        setAddress(res.data.address);
        setCity(res.data.city);
        setState(res.data.state);
        setZipcode(res.data.zipcode);
        // setId(window.localStorage.getItem("id"));
      })
      .catch((err) => {
        console.log(window.localStorage.getItem("email"));
        console.log(err);
      });
  }, [value]);
  const onChange = ({ target }) => setValue(target.value);

  const updateProfile = (e) => {
    axios
      .post("http://127.0.0.1:8080/api/restaurant/updateprofile", {
        name: name,
        address: address,
        city: city,
        state: state,
        zipcode: zipcode,
        id: window.localStorage.getItem("id"),
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload(false);
    // TODO: Add auth
  };
  const updateEmail = (e) => {
    axios
      .post("http://127.0.0.1:8080/api/restaurant/changeemail", {
        email: email,
        id: window.localStorage.getItem("id"),
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "ok") {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("type");
          window.localStorage.removeItem("email");
          window.localStorage.removeItem("id");
          window.location.reload(false);
        } else {
          setEmailMessage(res.data.message);
          setEmailDialog(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // TODO: Add auth
  };

  const checkPasswords = (e) => {
    if (newPassword.length > 8) {
      if (newPassword.match(/[a-z]+/) || newPassword.match(/[A-Z]+/)) {
        if (newPassword.match(/[0-9]+/)) {
          setPasswordMessage("");
        } else {
          setPasswordMessage(
            "password has to contains digits, letters, and has to be at least 8 characters"
          );
        }
      } else {
        setPasswordMessage(
          "password has to contains digits, letters, and has to be at least 8 characters"
        );
      }
    } else {
      setPasswordMessage(
        "password has to contains digits, letters, and has to be at least 8 characters"
      );
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage("two passwords not match");
    }
    setPasswordDialog(true);
  };

  const updatePassword = (e) => {
    if (passwordMessage === "") {
      axios
        .post("http://127.0.0.1:8080/api/restaurant/changepassword", {
          oldPassword: oldPassword,
          newPassword: newPassword,
          id: window.localStorage.getItem("id"),
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "ok") {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("type");
            window.localStorage.removeItem("email");
            window.localStorage.removeItem("id");
            window.location.reload(false);
          } else {
            setPasswordError(res.data.message);
            setPasswordDialog(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("please fix the errors first.");
    }

    // TODO: Add auth
  };
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
      <div className="restaurant-menu">
        <div className="restaurant-menu-title">
          <img
            className="restaurant-menu-icon"
            src={restaurant}
            alt="restaurant"
          ></img>
        </div>
        {/* <div className="restaurant-menu-line"></div> */}
      </div>
      <div className="profile-nav">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link
              className={
                tab === "profile"
                  ? "profile-nav-contents-onselect"
                  : "profile-nav-contents"
              }
              onClick={() => setTab("profile")}
            >
              Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={
                tab === "email"
                  ? "profile-nav-contents-onselect"
                  : "profile-nav-contents"
              }
              onClick={() => setTab("email")}
            >
              Change Email
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={
                tab === "password"
                  ? "profile-nav-contents-onselect"
                  : "profile-nav-contents"
              }
              onClick={() => setTab("password")}
            >
              Change Password
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      {tab === "profile" && (
        <Form className="profile-container">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              id="address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>City</Form.Label>
              <Form.Control
                value={city}
                id="city"
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>State</Form.Label>
              <Form.Control
                value={state}
                id="state"
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Zip code</Form.Label>
              <Form.Control
                value={zipcode}
                id="zipcode"
                onChange={(e) => setZipcode(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Button variant="primary" onClick={updateProfile}>
            Update
          </Button>
        </Form>
      )}
      {tab === "email" && (
        <Form className="profile-container">
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={() => setEmailDialog(true)}>
            Change Email
          </Button>
          <span className="profile-error">{emailMessage}</span>
        </Form>
      )}
      {tab === "password" && (
        <Form className="profile-container">
          <Form.Group className="mb-3">
            <Form.Label>Old password</Form.Label>
            <Form.Control
              id="oldpass"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New password</Form.Label>
            <Form.Control
              id="newpass"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm new password</Form.Label>
            <Form.Control
              id="confirmpass"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfrimPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={checkPasswords}>
            Change Password
          </Button>
          <span className="profile-error">{passwordError}</span>
        </Form>
      )}
      <Modal show={emailDialog} onHide={() => setEmailDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Be careful!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Change email may log you out automatically, please login again with
          your new email!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEmailDialog(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={updateEmail}>
            Change
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={passwordDialog} onHide={() => setPasswordDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Attention</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {passwordMessage === ""
            ? "Change password may log you out automatically, please login again with your new email!"
            : passwordMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setPasswordDialog(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={updatePassword}>
            Change
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
