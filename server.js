const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');


//app.use() is how you register middleware
//next exist to tell when you middleware function is done. It must be called
//else other handlers wont run
app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
      console.log('Unable to append to server.log.');
    }
  });

  next();
});

app.use((req, res, next)=>{
  res.render('maintenance.hbs');
});

//app.use() is how you register middleware
//Express Middleware help you configure how your express app works
//Built in middleware use()
//express.static() takes the absolute path to the folder you want to serve up
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//using hbs with a of key 'view engine' on express
app.set('view engine', 'hbs');


//setup a page handler for a http get request
//root of app '/'
app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to this site'
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

//bad request route
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
})

//listening port
//option second argument
app.listen(3000, ()=> {
  console.log('Server running on port 3000')
});
