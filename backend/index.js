const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const app = express();
const connectDB = require('./db/mongoose');
const controller = require('./routes/controller');

const cuser = require("./models/user");
app.use(express.static('../frontend'));
//database connection
connectDB();


//middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/api', controller);

app.get('/shortx', (req, res) => {
  var html = fs.readFileSync('../frontend/shortx.html', 'utf8')
  res.send(html);
});
app.get('/login', (req, res) => {
  var html = fs.readFileSync('../frontend/index.html', 'utf8')
  res.send(html);
});
app.get('/:id', async (req, res) => {
  const c = await cuser.find({
    short_url: req.params.id
  });
  if (c.length === 0) {
    var html = fs.readFileSync('../frontend/error.html', 'utf8')
    res.send(html);
    return res.status(404);
  }
  // res.render(`<p>redirct</p>`);
  res.status(301).redirect(c[0].url);
})

//port setup
const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});