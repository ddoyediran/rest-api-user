const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

var app = express();
var idTracker = 1;

// log requests
app.use(logger('dev'));
// create req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// call this function to create new ids
function genId() {
    return idTracker++;
}

// create a REST API for your users db, defined below:
var users = [
    {
        id: 0,
        name: 'John Doe',
        email: 'john@doe.com',
        password: 'asdf'
    }
];

// clients should be able to create new users, get all users, get a single user,

// create a new users
app.post('/create', function(req, res, next){
  const { name, email, password } = req.body;
  if(typeof name !== 'string'){
    return res.status(400).send('Please, add a name!');
  }

  if(typeof email !== 'string'){
    return res.status(400).send('Please, provide an email!');
  }

  if(typeof password !== 'string'){
    return res.status(400).send('Please, provide a password!');
  }

  const newUser = {
    id: genId(),
    name: name,
    email: email,
    password: password
  };

  users.push(newUser);
  console.log(users);
  //console.log(req.qury);
  return res.sendStatus(200);
})

// get a single user based on id
app.get('/user/:id', function(req, res, next){
  const userId = req.params.id;
  if(users[i].id === +userId) {
    return res.send(users[i]);
  }
  return res.status(404).send("User not found");
});

// get all users
app.get('/users', function(req, res, next){
  res.send(users);
})

// update a user (based on their id)
app.put('/users/:id', function(req, res, next){
  const { name, email, password } = req.body;
  for(let i = 0; i < users.length; i++){
    if(users[i].id === +req.body.id){
      users[i].name = name || users[i].name;
      users[i].email = email || users[i].email;
      users[i].password = password || users[i].password;
      return res.sendStatus(200);
    }
  }

  return res.status(404).send('User not found!!!')
});

// delete a user
app.delete('/users/:id', function(req, res, next){
  for(let i = 0; i < users.length; i++){
    if(users[i].id === +req.params.id){
      users.splice(i, 1);
      return res.sendStatus(200);
    }
  }
  return res.status(404).send('User not found!');
})


var server = app.listen(3000);
console.log('Listening at http://localhost:%s in %s mode',
    server.address().port, app.get('env'));

module.exports = app;

// https://github.com/jhhayashi/bootcamp/blob/master/day1/afternoon/exercises/solutions/practice-rest-api.js
