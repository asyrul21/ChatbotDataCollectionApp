var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define schema
var QuestionSchema = new Schema({
    input: {
        type: String,
        required: true
    },
    label: {
        type: String
    }
});

module.exports = QuestionSchema;