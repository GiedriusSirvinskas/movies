const mongoose = require("mongoose");
const app = require("./app");

const mongoURI =
  "mongodb+srv://giedrius:zA9wtjc6h4d1Lome@cluster0.ywfimym.mongodb.net/movieProject?retryWrites=true&w=majority";

mongoose.connect(mongoURI).then(console.log("DB connection established."));

const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
