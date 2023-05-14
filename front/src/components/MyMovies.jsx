import axios from "axios";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";
import { BsPlusSquare } from "react-icons/bs";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import MyCard from "./MyCard";

function MyMovies() {
  const [movieList, setMovieList] = useState([]);
  const listURL = "http://localhost:3000/list";
  const movieURL = "http://localhost:3000/movies";
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
  };

  async function fetchData() {
    const query = { userID: { $exists: false } };
    const config = { params: { q: JSON.stringify(query) } };
    await axios
      .get(listURL, config)
      .then((res) => setMovieList(res.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function postMovie(movie) {
    const movieObject = {
      name: movie.name,
      year: movie.year,
      category: movie.category,
      imageURL: movie.imageURL,
    };
    await axios
      .post(movieURL, movieObject)
      .then((res) => {
        setIsSubmitted(true);
        handleSnackbarOpen("Pridėjai filmą į savo sąrašą!");
        setTimeout(() => setIsSubmitted(false), 2000);
      })
      .catch((error) => {
        setError(error.response.data.error);
        setTimeout(() => setError(null), 2000);
      });
  }

  let listJSX = movieList.map((movie) => {
    return (
      <MyCard
        key={movie._id}
        movie={movie}
        postMovie={postMovie}
        endpoint="/list"
      />
    );
  });

  return (
    <div>
      <div className="header-text shadow-drop-bottom">
        <p>
          Paspausk pliusiuką ir prisidėk filmą prie savo to-watch sąrašo! Yeeee!
        </p>
      </div>
      {error && (
        <Snackbar
          open={error != null}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
      {isSubmitted && (
        <Snackbar
          open={isSubmitted}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success">Pridėjai filmą į savo sąrašą!</Alert>
        </Snackbar>
      )}

      <div className="movie-list">{listJSX}</div>
    </div>
  );
}

export default MyMovies;
