const express = require("express");

const userControllers = require("../controllers/user");

const { check, body } = require("express-validator");

const isAuth = require("../middleware/Is_Auth");

const route = express.Router();

route.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 6 })
      .withMessage("Your name should be more than 5 characters."),
    check("email").isEmail().withMessage("Please enter a valid email."),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d)/)
      .withMessage("Password must contain both letters and numbers"),
  ],
  userControllers.signUp
);

route.post(
  "/login",
  [check("email").isEmail().withMessage("Please enter a valid email.")],
  userControllers.login
);

route.post("/addMovieToWatchList", isAuth, userControllers.addMovieToWatchList);

route.post(
  "/deleteMovieFromWatchList",
  isAuth,
  userControllers.deleteMovieFromWatchList
);

route.post("/addSerieToWatchList", isAuth, userControllers.addSerieToWatchList);
route.post(
  "/deleteSerieFromWatchList",
  isAuth,
  userControllers.deleteSerieFromWatchList
);

route.get("/userWatchlist", isAuth, userControllers.getUserWatchList);

module.exports = route;
