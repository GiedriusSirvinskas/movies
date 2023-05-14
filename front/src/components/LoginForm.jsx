import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const loginURL = "http://localhost:3000/users/login";
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
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await axios
        .post(loginURL, values)
        .catch((error) => setError(error.response.data.error));
      await getLoggedIn();
    },
  });
  return (
    <div className="form-container">
      <h3>Prisijungti</h3>
      <form onSubmit={formik.handleSubmit} className="form">
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
          Prisijungti
        </button>
        <p>
          Neturi paskyros? Tada greit{" "}
          <Link to="/register" className="">
            užsiregistruojam!
          </Link>
        </p>
      </form>

      <div className="error">{error}</div>
    </div>
  );
}

export default LoginPage;
