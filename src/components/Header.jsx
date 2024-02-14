import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const loggedData = useContext(UserContext);
  function logout() {
    localStorage.setItem("nutrify-user");
    loggedData.setLoggedUser(null);
    navigate("/login");
  }
  return (
    <div className="header">
      <ul>
        <Link to='/track'><li>Track</li></Link>
        <Link to='/diet'><li>Track</li></Link>
        <li onClick={logout}>Logout</li>
      </ul>
    </div>
  );
}
