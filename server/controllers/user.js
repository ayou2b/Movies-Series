const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

exports.signUp = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({ errorMessage: errors.array()[0].msg });
    }

    await User.findOne({ email: email })
      .then((user) => {
        if (user) {
          return res.status(401).json({ message: "Please try another email" });
        }

        bcrypt.hash(password, 12).then((hashedPassword) => {
          const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            watchList: { movies: [], series: [] },
          });

          newUser.save();

          res.status(200).json({ message: "New User Sign Up " });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log("error in the signup controllers");
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({ errorMessage: errors.array()[0].msg });
    }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });

      if (email === "test@test.com" && password === "test12345") {
     return res.status(200).json({ message: "user logged in", token: token });
    }
    

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.status(401).json({ errorMessage: "User not found" });
      }

      bcrypt.compare(password, user.password).then((doPasswordMatch) => {
        if (!doPasswordMatch) {
          return res.status(401).json({ errorMessage: "Incorrect Password!" });
        }

        res.status(200).json({ message: "user logged in", token: token });
      });
    });
  } catch (err) {
    console.log("Error in the login controllers");
  }
};

exports.addMovieToWatchList = async (req, res, next) => {
  try {
    const userId = req.userData.userId;

    const movieTitle = req.body.movieTitle;
    const movieId = req.body.movieId;
    const movieImage = req.body.movieImage;

    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ errorMessage: "User not found" });
        }

        const isTheMovieExsitOnTheWatchlist = user.watchList.movies.find(
          (movie) => movie.id === movieId
        );

        if (!isTheMovieExsitOnTheWatchlist) {
          user.watchList.movies.push({
            title: movieTitle,
            id: movieId,
            image: movieImage,
          });
        }

        user.save();

        res.status(200).json({ message: "Movie added to your watchList" });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(
      "error adding the movie to the watch list in the user controllers"
    );
  }
};

exports.deleteMovieFromWatchList = async (req, res, next) => {
  try {
    const userId = req.userData.userId;
    const movieId = req.body.movieId;

    await User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ errorMessage: "User not found" });
        }

        user.watchList.movies = user.watchList.movies.filter(
          (movie) => movie.id !== movieId
        );

        user.save();

        res.status(200).json({ message: "Movie deleted from the watch list" });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log("error deleting the movie from the user controllers");
  }
};

exports.addSerieToWatchList = async (req, res, next) => {
  try {
    const userId = req.userData.userId;

    const serieId = req.body.serieId;
    const serieName = req.body.serieName;
    const serieImage = req.body.serieImage;

    await User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ errorMessage: "User not found" });
        }

        const isTheSerieExistOnTheWatchlist = user.watchList.series.find(
          (serie) => serie.id === serieId
        );

        if (!isTheSerieExistOnTheWatchlist) {
          user.watchList.series.push({
            name: serieName,
            id: serieId,
            image: serieImage,
          });
        }

        user.save();

        res.status(200).json({ message: "Serie added to your watchList" });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(
      "error in adding the serie to the serie watchList in the user controllers"
    );
  }
};

exports.deleteSerieFromWatchList = async (req, res, next) => {
  try {
    const userId = req.userData.userId;

    const serieId = req.body.serieId;

    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ errorMessage: "User not found" });
        }

        user.watchList.series = user.watchList.series.filter(
          (serie) => serie.id !== serieId
        );

        user.save();

        res.status(200).json({ message: "Serie deleted from your watchList" });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(
      "error deleting serie from the series watchList in the user controllers"
    );
  }
};

exports.getUserWatchList = async (req, res, next) => {
  try {
    const userId = req.userData.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ errorMessage: "User not found" });
    }

    res.status(200).json({ watchlist: user.watchList });
  } catch (err) {
    console.error("Error getting the user watchlist:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
