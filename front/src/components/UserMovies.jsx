import axios from "axios";
import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, Box } from "@mui/material";
import MyCard from "./MyCard";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";

function UserMovies() {
  const movieURL = "http://localhost:3000/movies/";
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");
  const [sortModel, setSortModel] = useState("");

  async function fetchData() {
    const response = await axios.get(movieURL, {
      params: {
        searchQuery: searchQuery,
      },
    });
    setMovies(response.data);
  }

  function handleSortChange(e) {
    setSortModel(e.target.value);
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

  let sortedList = [...movies];
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
        {sortedList.map((movie) => (
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
