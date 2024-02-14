import { useState } from "react";
import { Link } from "react-router-dom";
export default function Register() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });
  const [message, setMessage] = useState({
    type: "invisible",
    text: "",
  });
  function handleInput(event) {
    // console.log(event.target.name, event.target.value);
    setUserDetails((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(userDetails);
    fetch("http://localhost:8000/register", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
        setMessage({ type: "success", text: data.message });
        setUserDetails({
          name: "",
          email: "",
          password: "",
          age: "",
        });

        setTimeout(
          () => {
            setMessage({ type: "invisible", text: "" });
          },
          3000,
          5000,
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Start Your Fitness</h1>
        <input
          className="inp"
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleInput}
          valu={userDetails.name}
          requerid
        />
        <input
          className="inp"
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleInput}
          value={userDetails.email}
          requrired
        />
        <input
          className="inp"
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleInput}
          value={userDetails.password}
          requrired
        />
        <input
          className="inp"
          type="number"
          name="age"
          placeholder="Enter Age"
          onChange={handleInput}
          value={userDetails.age}
          required
          min={13}
        />
        <button className="btn">Join</button>
        <p>
          Already Registered ? <Link to="/">Login</Link>
        </p>
        <p className={message.type}>{message.text}</p>
      </form>
    </section>
  );
}
