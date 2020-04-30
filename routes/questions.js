var express = require('express');
var router = express.Router();

// mongo
var mongojs = require('mongojs');
var db = mongojs('mongodb://asyrul:abc123@ds117931.mlab.com:17931/chatbot_training_data', ['inputStrings']);


// Get All questions
router.get('/questions', function (req, res, next) {
    // res.send('Questions API!');
    db.inputStrings.find(function (err, docs) {
        if (err) {
            res.send(err);
        }
        res.json(docs);
    });
});

// insert questions
router.post('/questions', function (req, res, next) {
    var question = req.body;
    if (!question.input) {
        res.status(400);
        res.json({
            "error": "Bad Data!"
        })
    }
    else {
        db.inputStrings.save(question, function (err, question) {
            if (err) {
                res.send(err);
            } else {
                res.json(question);
            }
        })
    }
});

module.exports = router;