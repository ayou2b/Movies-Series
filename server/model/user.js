const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  watchList: {
    movies: [
      {
        title: { type: String, required: true },
        id: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    series: [
      {
        name: { type: String, required: true },
        id: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
  },
});

module.exports = mongoose.model("user", userSchema);
