// call express
var express = require('express')
var exphbs = require('express-handlebars');
var app = express();

//setup middleware
var bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json())

//connect to postgres database
var postgres = require('pg')
const Pool = postgres.Pool

let useSSL = false;
if(process.env.DATABASE_URL){
  useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:1234@localhost:5432/reg_num'

const pool = new Pool({
  connectionString,
  ssl:useSSL
})

//start the server

let PORT = process.env.PORT || 4008;

app.listen(PORT, function() {
  console.log('App starting on port', PORT);
});


//Handlebars setup

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  // helpers:{
  //   'message': function(){
  //     if(this.greet_counter == 1){
  //       return 'Hello, ' + this.first_name + ' has been greeted once'
  //     }else{
  //       return 'Hello, ' + this.first_name + ' has been greeted ' + this.greet_counter + ' times';
  //     }
  //   }
  // }

}));

app.set('view engine', 'handlebars');

//call factory function
const Reg = require('./registration_numbers.js');
const registration = Reg()

//get/post

app.get('/', async function(req, res) {
  res.render('registration');
});

app.post('/reg', function(req, res){

  registration.addRegistration(req.body.regInput)
  console.log(registration.mapReg())

  res.render('registration',{regPlate:registration.mapReg()} )

});

app.get('filter/:tag', function(req, res){
  let filteredReg = registration.filterReg(req.params.tag);
  console.log(filteredReg)
  res.render('registration', {filteredReg})
});

// app.get('/filter/filter/:tag', function(req, res){
//   let filteredReg = req.params.tag;
//   res.redirect('/filter/' +filteredReg)
// });
