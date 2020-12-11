var express = require("express");
var router = express.Router();
var path = require("path");
var mongooseToCsv = require("mongoose-to-csv");
var fastCsv = require("fast-csv");

// mongojs
// var mongojs = require('mongojs');
// var db = mongojs('mongodb://asyrul:abc123@ds117931.mlab.com:17931/chatbot_training_data', ['inputStrings']);

// mongoose
// https://mongoosejs.com/docs/index.html
var mongoose = require("mongoose");
const fs = require("fs");

// connect
// const connectionString =
//   "mongodb://asyrul:abc123@ds117931.mlab.com:17931/chatbot_training_data";
const connectionString =
  "mongodb+srv://asyrul:abc123@chatbot-training-data.m0ymw.mongodb.net/chatbot_training_data?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// test connection
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connection to MongoDB established!");
});

var QuestionSchema = require("../models/Question");
// mongoose to csv
QuestionSchema.plugin(mongooseToCsv, {
  headers: "Input Label",
  constraints: {
    Input: "input",
    Label: "label",
  },
});
// connect to db collection
var Question = mongoose.model("Question", QuestionSchema);

// The first argument is the singular name of the collection your model is for.
// ** Mongoose automatically looks for the plural, lowercased version of your model name.
// ** Thus, for the example above, the model Question is for the questions collection in the database (mLab).

// Get All questions
router.get("/questions", function (req, res, next) {
  Question.find(function (err, docs) {
    if (err) {
      res.send(err);
    }
    res.json(docs);
  });
});

// insert questions
router.post("/questions", function (req, res, next) {
  var question = req.body;
  const filename = "training_data.csv";

  // new Question instance
  newQuestion = new Question({ input: question.input, label: question.label });

  // save question
  newQuestion.save(function (err, question) {
    if (err) {
      res.send(err);
    } else {
      // save latest collection to csv
      Question.findAndStreamCsv({}).pipe(fs.createWriteStream(filename));
      // return saved Question
      res.json(question);
    }
  });
});

// download data as csv
router.get("/getcsv", function (req, res, next) {
  const filename = "training_data.csv";

  // find the file
  filePath = path.join(__dirname, `../${filename}`);

  res.setHeader("Content-disposition", "attachment; filename=" + filename);
  res.setHeader("Content-Type", "text/csv");

  var filestream = fs.createReadStream(filePath);
  filestream.pipe(res);
});

module.exports = router;
