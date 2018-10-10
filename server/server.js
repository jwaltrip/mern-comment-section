const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//import comments route
const comment = require('./routes/comment.route');

const app = express();

// connect to mongo
const mongoose_uri = "mongodb://mern-user:pass123@ds227853.mlab.com:27853/mern-comment-section";
mongoose.connect(mongoose_uri);
mongoose.Promise = global.Promise;
// db variable
const db = mongoose.connection;

// catch db errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// setup body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// setup comments route thats connected with mongo
app.use('/comments', comment);

app.get('/api/comments', (req, res) => {
  // hardcoded data to start with
  // this data will usually come from mongoDB
  const customers = [
    {id: 1, firstName: 'Jake', lastName: 'Waltrip'},
    {id: 2, firstName: 'Mary', lastName: 'Smith'},
    {id: 3, firstName: 'John', lastName: 'Doe'}
  ];

  const comments = [
    {id: 1, commentText: 'WELL WHADHA YA KNOW?!', author: 'Jake'},
    {id: 2, commentText: "I'M GETTING DATA FROM THA API!", author: 'Jake'},
    {id: 3, commentText: "But it's static :/", author: 'Laurie'},
  ];

  res.json(comments);
});

const port = 5000;

app.listen(port, ()=> console.log(`Server started on port ${port}`));