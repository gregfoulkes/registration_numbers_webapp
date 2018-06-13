// call express
var express = require('express')
var exphbs = require('express-handlebars');
var app = express();

//flash setup

let flash = require('express-flash');
let session = require('express-session');


//setup middleware
var bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json())

app.use(flash());

app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

//connect to postgres database
var postgres = require('pg')
const Pool = postgres.Pool

let useSSL = false;
if (process.env.DATABASE_URL) {
  useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://gregorybrianfoulkes@localhost:5432/regnum'

const pool = new Pool({
  connectionString,
  ssl: useSSL
})

//start the server

let PORT = process.env.PORT || 4008;

app.listen(PORT, function() {
  console.log('App starting on port', PORT);
});


//Handlebars setup

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    selectedTag: function() {
      if (this.selected) {
        return 'selected'
      }
    }
  }

}));

app.set('view engine', 'handlebars');

//call factory function

const Reg = require('./registration_numbers.js');
const registration = Reg(pool)

//get/post

app.get('/', async function(req, res) {

  let regPlate = await registration.mapReg()
  //req.flash('info', 'Enter a Registration Number');

  res.render('registration', {
    regPlate
  })

});

app.post('/reg', async function(req, res, next) {

  try {

    if(await registration.addRegistration(req.body.regInput)){
      //  console.log(regPlate)
    req.flash('valid', 'Succesfully added registration');


    }else{
    req.flash('invalid', 'Please Enter A valid Registration');

    }
    res.render('registration', {regPlate: await registration.mapReg()})
  }
    catch (err) {
     return next()
   }

});

app.get('/filter/:tag', async function(req, res, next) {

  try {
    let filteredReg = await registration.filterReg(req.params.tag);
    let dropDown = await registration.dropDown(req.params.tag)
    //  console.log(filteredReg)

    res.render('registration', {
      regPlate: filteredReg,
      dropDown:dropDown
    })

  } catch (err) {
    return next()
  }

});

app.get('/reset', async function(req, res, next) {

  try {
    await registration.deleteReg()
    res.redirect('/')

  } catch (err) {
    return next()
  }
});
