import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  const navigate = useNavigate();

  const getLoggedIn = async () => {
    const loggedInRes = await axios.get("http://localhost:3000/users/loggedIn");
    setLoggedIn(loggedInRes.data);
  };
  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider, AuthContext };
