const express = require("express")
const bodyParser = require("body-parser")
const movieRouter = require("./router/movieRouter")
const userRouter = require("./router/userRoutes")
const listRouter = require("./router/listRouter")
const cors = require('cors')
const cookieParser = require("cookie-parser")

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true
}


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use('/images', express.static('../front/public/images'));

app.use("/movies", movieRouter)
app.use("/list", listRouter)
app.use("/users", userRouter)


module.exports = app;
