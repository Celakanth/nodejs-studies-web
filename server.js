/*
  server.js


*/
//express is the IIS handler for node
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//app creates a holder for the express hosting

// cont for port number from environment
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('screemIt', (text) => {
  return text.toUpperCase();
})
app.set('view engine','hbs');

//app routing
//Registering middleware
app.use((req,res,next) => {
  var now = new Date().toString();

  var log = `${now}: ${req.method}  ${req.url}`
  fs.appendFile('requestdata.log', log + '\n', (err) =>{
    if (err) {
        console.log('There was an error logging');
    }
  })
  console.log(log);

  next();
})

// app.use((req,res,next) =>{
//   res.render('maintance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/',(req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my site'
  })
});

app.get('/about',(req,res) =>{
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/portfolio',(req,res) => {
  res.render('portfolio.hbs', {
    pageTitle: 'Portfolio page'
  });
});

app.get('/maintance',(req,res) => {
  res.render('maintance.hbs', {
    pageTitle: 'maintance page'
  });
});

app.get('/bad', (req,res) =>{
  res.send({
    errorStatus: '400',
    errorMessage: 'Page not found',
    errorDate: '2018-11-27'
  })
});

//app prt binding
app.listen(port, () =>{
  console.log(`Server is running on port ${port}`);
});
