import axios from "axios";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CardActions, Input } from "@mui/material";
import { Button } from "@mui/material";
import { BsPlusSquare } from "react-icons/bs";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import MyCard from "./MyCard";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";

function MyMovies() {
  const [movieList, setMovieList] = useState([]);
  const listURL = "http://localhost:3000/list";
  const movieURL = "http://localhost:3000/movies";
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortModel, setSortModel] = useState("");

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
  };

  async function fetchMoviesBySearchQuery(searchQuery) {
    const response = await axios.get(listURL, {
      params: {
        searchQuery: searchQuery,
      },
    });
    setMovieList(response.data);
  }

  useEffect(() => {
    async function fetchAllMovies() {
      const query = { userID: { $exists: false } };
      const config = { params: { q: JSON.stringify(query) } };
      try {
        const response = await axios.get(listURL, config);
        setMovieList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllMovies();
  }, []);

  useEffect(() => {
    fetchMoviesBySearchQuery(searchQuery);
  }, [searchQuery]);

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  function handleSortChange(e) {
    setSortModel(e.target.value);
  }

  async function fetchData() {
    const query = { userID: { $exists: false } };
    const config = { params: { q: JSON.stringify(query) } };
    await axios
      .get(listURL, config)
      .then((res) => setMovieList(res.data))
      .catch((error) => console.log(error));
  }

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

  let sortedList = [...movieList];
  if (sortModel === "nameDesc") {
    sortedList.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortModel === "nameAsc") {
    sortedList.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortModel === "yearAsc") {
    sortedList.sort((a, b) => a.year - b.year);
  } else if (sortModel === "yearDesc") {
    sortedList.sort((a, b) => b.year - a.year);
  } else if (sortModel === "category") {
    sortedList.sort((a, b) => a.category.localeCompare(b.category));
  }

  let listJSX = sortedList.map((movie) => {
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
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Pavadinimas"
          className="search-input"
        />
        <Box sx={{ minWidth: 200, paddingTop: "5px" }}>
          <FormControl fullWidth>
            <InputLabel>Rikiuoti pagal</InputLabel>
            <Select
              value={sortModel}
              onChange={handleSortChange}
              label="Rikiuoti pagal"
            >
              <MenuItem value="nameAsc">
                <span>Pavadinimą</span>
                <BiUpArrowAlt size={20} />
              </MenuItem>
              <MenuItem value="nameDesc">
                <span>Pavadinimą</span>
                <BiDownArrowAlt size={20} />
              </MenuItem>
              <MenuItem value="yearAsc">
                <span>Metus</span>
                <BiUpArrowAlt size={20} />
              </MenuItem>
              <MenuItem value="yearDesc">
                <span>Metus</span>
                <BiDownArrowAlt size={20} />
              </MenuItem>
              <MenuItem value="category">Kategoriją</MenuItem>
              <MenuItem value="">Nerikiuoti</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
      <div className="movie-list-container">
        <div className="movie-list">{listJSX}</div>
      </div>
    </div>
  );
}

export default MyMovies;
