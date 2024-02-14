import { useState } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Notfound from "./components/Notfound";
import Track from "./components/Track";
import { UserContext } from "./contexts/UserContext";
import Private from "./components/Private";
import Diet from "./components/Diet";

export default function App() {
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("nutrify-user")),
  );

  return (
    <>
      <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/track" element={<Private Component={Track} />} />
            <Route path="/diet" element={<Private Component={Diet} />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
