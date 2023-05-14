const express = require("express");
const movieController = require("./../controller/movieController");
const movieRouter = express.Router();
const auth = require("./../middleware/auth");

movieRouter
  .route("/")
  .get(auth, movieController.getMovies)
  .post(auth, movieController.postMovie);

movieRouter
.route("/:id")
.delete(auth, movieController.deleteMovie);

module.exports = movieRouter;