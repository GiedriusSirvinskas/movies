const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  year: {
    type: Number,
    required: [true, "Year is required."]
  },
  category: {
    type: String,
    required: [true, "Category is required."]
  },
  imageURL: {
    type: String,
    required: [true, "Image is required."]
  },
  userID: String
});

const Movie = mongoose.model("Movie", expenseSchema);

module.exports = Movie;
