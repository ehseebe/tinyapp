const express = require('express');
const app = express();
const PORT = 8080; //default port 8080
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//set view engine to ejs
app.set('view engine', 'ejs');

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//Random string generator
const generateRandomString = function() {
  return Math.random().toString(36).substring(2,8);
}

//URLS
app.get('/urls', (req,res) => {
  const templateVars = { urls: urlDatabase };
  res.render('urls_index', templateVars);
});

//NEW URLS - FORM
app.get('/urls/new', (req,res) => {
  res.render('urls_new');
});

//ACTUAL FORM
app.post('/urls', (req, res) => {
  console.log(req.body); //log the post request to the body console
  res.send('Ok'); //respond with 'ok'
})

//SHORT URLS
app.get('/urls/:shortURL', (req,res) => {
  const shortURL = req.params.shortURL;
  const templateVars = {
    shortURL,
    longURL: urlDatabase[shortURL]};
  res.render('urls_show', templateVars);
});

//index page - DELETE
app.get('/', (req, res) => {
  const drinks = [
    { name: 'Bloody Mary', drunkness: 3 },
    { name: 'Martini', drunkness: 5 },
    { name: 'Scotch', drunkness: 10 }
  ];
  const tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

  res.render('pages/index', {
    drinks,
    tagline
  });
});

//about page - DELETE
app.get('/about', (req,res) => {
  res.render('pages/about');
});



//server signal
app.listen(PORT, () => {
  console.log(`${PORT} is the magic port`);
});