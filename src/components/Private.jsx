import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function Provate(props) {
  const loggedData = useContext(UserContext);

  return loggedData.loggedUser !== null ? (
    <props.Commponent />
  ) : (
    <Navigate to="/login" />
  );
}
