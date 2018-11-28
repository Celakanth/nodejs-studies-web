/*
  server.js


*/
//express is the IIS handler for node
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//app creates a holder for the express hosting
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
  //res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Christian',
  //   likes: [
  //     'Holidays',
  //     'Bikes',
  //     'Coding',
  //     'Music'
  //   ]
  // })
res.render('home.hbs',{
  pageTitle: 'Home Page',
  welcomeMessage: 'Welcome to my site'
})

});

app.get('/about',(req,res) =>{
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
})

app.get('/bad', (req,res) =>{
  res.send({
    errorStatus: '400',
    errorMessage: 'Page not found',
    errorDate: '2018-11-27'
  })
})

//app prt binding
app.listen(3000, () =>{
  console.log('Server is running on port 3000');
});
