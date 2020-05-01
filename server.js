var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var questions = require('./routes/questions.js');

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static folder
app.use(express.static(path.join(__dirname, 'client')));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
const cors = require('cors')

app.use(cors());

app.use('/', index);
app.use('/api', questions);

app.listen(process.env.PORT || 3000, function () {
    console.log('Server started on port ' + PORT);
});