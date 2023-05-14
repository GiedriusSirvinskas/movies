import Navigation from "./components/Navigation";
import Home from "./components/Home";
import MyMovies from "./components/MyMovies";
import { Route, Routes, Router } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { AuthContext } from "./../context/AuthContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import UserMovies from "./components/UserMovies";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/theme";

axios.defaults.withCredentials = true;

function App() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<MyMovies />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/movies" element={<UserMovies />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
