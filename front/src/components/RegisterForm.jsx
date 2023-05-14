import { useFormik } from "formik";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./../../context/AuthContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const registerURL = "http://localhost:3000/users/signup";
  const [error, setError] = useState("");

  const { loggedIn, getLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await axios.post(registerURL, values);
        await getLoggedIn();
      } catch (error) {
        setError(error.response.data.error);
      }
    },
  });
  return (
    <div className="form-container">
      <h3>Registracija</h3>
      <form onSubmit={formik.handleSubmit} className="form">
        <input
          type="text"
          className=""
          placeholder="Vardas"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <input
          type="email"
          className=""
          placeholder="El. paštas"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <input
          type="password"
          className=""
          placeholder="Slaptažodis"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <button type="submit" className="">
          Užsiregistruoti
        </button>
        <Link to="/login" className="">
          Atgal
        </Link>
      </form>
      <div className="error">{error}</div>
    </div>
  );
}

export default RegisterForm;
