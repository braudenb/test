const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


//Middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = now + req.method + req.url;
  fs.appendFile('server.log', log + '\n');
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance');
// })

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.send({
    name: "Brauden",
    lastname: "Bach"
  });
});

app.get('/about', (req, res) => {
  res.render('aboutMe', {
    pageTitle: 'About page',
    welcomeMessage: 'hi this is welcome message'
  });
});

app.get('/new', (req, res) => {
  res.render('new.hbs');
});


app.listen(port, () => {
  console.log('Server is running on ' + port);
});
