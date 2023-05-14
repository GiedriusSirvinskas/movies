const express = require("express");
const userController = require("./../controller/userController");
const userRouter = express.Router();
const auth = require("./../middleware/auth")

userRouter
.route("/")
.get(userController.getUsers)

userRouter
.route("/:id")
.patch(userController.editUser)
.delete(userController.deleteUser)

userRouter
.route("/signup")
.post(userController.signup)

userRouter
.route("/login")
.post(userController.login)

userRouter
.route("/logout")
.get(userController.logout)

userRouter
.route("/loggedIn")
.get(userController.loggedIn)

userRouter
.route("/getName")
.get(userController.getName)

module.exports = userRouter;