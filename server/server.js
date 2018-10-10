const express = require('express');

const app = express();

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