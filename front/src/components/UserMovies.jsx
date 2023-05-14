import axios from "axios";
import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import MyCard from "./MyCard";

function UserMovies() {
  const movieURL = "http://localhost:3000/movies/";
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");

  async function fetchData() {
    const response = await axios.get(movieURL, {
      params: {
        searchQuery: searchQuery,
      },
    });
    setMovies(response.data);
  }

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  async function deleteMovie(movie) {
    try {
      const response = await axios.delete(movieURL + movie._id);
      setMessage("Filmas ištrintasss!");
      setTimeout(() => {
        fetchData();
        setMessage("");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="search-container shadow-drop-bottom">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Pavadinimas"
          className="search-input"
        />
      </div>
      {message && (
        <Snackbar
          open={!!message}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success">{message}</Alert>
        </Snackbar>
      )}
      <div className="movie-list">
        {movies.map((movie) => (
          <MyCard
            key={movie._id}
            movie={movie}
            deleteMovie={deleteMovie}
            endpoint="/movies"
          />
        ))}
      </div>
    </>
  );
}

export default UserMovies;
