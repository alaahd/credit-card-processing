var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var cardsRouter = require("./routes/cards");

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// connect to mongodb database
app.use(function(req, res, next) {
  const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

  const client = new MongoClient(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  client.connect(err => {
    if (err) {
      res.status(400).send("Error connecting to mongodb " + err.message);
    }
    console.log("connected to database");
    app.locals.database = client.db("psdatabase");
    next();
  });
});

app.use(logger("dev"));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

module.exports = app;
