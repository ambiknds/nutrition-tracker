import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Login() {
  const loggedInData = useContext(UserContext);
  const navigate = useNavigate();
  const [userCreds, setUserCreds] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({
    type: "invisible",
    text: "",
  });

  function handleInput(event) {
    setUserCreds((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(userCreds);
    fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 404) {
          setMessage({ type: "error", text: "User does not exist" });
        } else if (response.status === 403) {
          setMessage({ type: "error", text: "Incorrect password" });
        }
        setTimeout(() => {
          setMessage({ type: "invisible", text: "" });
        }, 5000);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.token !== undefined && data.token !== null) {
          localstorage.setItem("nutrify-user", JSON.stringify(data));
          loggedInData.setLoggedUser(data);
          navigate("/track");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login To Fitness</h1>
        <input
          className="inp"
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleInput}
          value={userCreds.email}
          required
        />
        <input
          className="inp"
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleInput}
          value={userCreds.password}
          required
        />
        <button className="btn">Login</button>
        <p>
          Don't Have Account ? <Link to="/register">Create Account</Link>
        </p>
        <p className={message.type}>{message.text}</p>
      </form>
    </section>
  );
}
