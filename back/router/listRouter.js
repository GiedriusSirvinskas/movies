const express = require("express");
const movieController = require("../controller/movieController")
const listRouter = express.Router();
const auth = require("../middleware/auth")


listRouter
.route("/")
.get(movieController.getList)

module.exports = listRouter;