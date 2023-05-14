const Movie = require("./../model/movieModel");

exports.getList = (req, res) => {
  try {
    const query = { userID: { $exists: false } };
    Movie.find(query)
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((error) => res.status(404).json(error));
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.getMovies = (req, res) => {
  try {
    let query = { userID: req.userID };
    if (req.query.searchQuery) {
      query.name = { $regex: req.query.searchQuery, $options: "i" };
    }
    Movie.find(query)
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((error) => res.status(404).json(error));
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.postMovie = (req, res) => {
  try {
    let { name, year, category, imageURL } = req.body;
    let movie = new Movie({
      name: name,
      year: year,
      category: category,
      imageURL: imageURL,
      userID: req.userID,
    });

    Movie.findOne({ name: name, userID: req.userID })
      .then((doc) => {
        if (doc) {
          res.status(409).json({ error: "Šį filmą jau išsisaugojai!" });
        } else {
          // Movie does not exist, save it to user's list
          movie.save().then((doc) => {
            res.status(200).json(doc);
          });
        }
      })
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.deleteMovie = (req, res) => {
  let { id } = req.params;
  Movie.findByIdAndDelete(id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};
