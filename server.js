const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const { graphql } = require('graphql');
const authCtrl = require('./server/controllers/authController.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userCtrl = require('./server/controllers/userController')
const dbController = require('./dbController/createDb');


import gqlTestSchema from './compiler/a1b2c3_schema.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/client/main.css'))


app.get('/', (req, res) => {
  console.log("got /")
  res.sendFile(path.join(__dirname, '/client/index.html'));
})

app.get('/main.css', (req, res) => {
  console.log("got /")
  res.sendFile(path.join(__dirname, '/client/main.css'));
})

app.post('/signup', (req, res) => {
  console.log('hit sign up')
  res.end();
})

// app.get('/authorize', authCtrl.authUser, authCtrl.setCookie, (req, res) => {
//   res.redirect('http://localhost:8100/#/profile');
// })

app.post('/data', (req, res) => {
  console.log(req.body)
  res.end();
})

app.post('/edit/:devid', (req, res) => {
  console.log("this is the dev id", req.params.devid);
  //should call db_compiler
  //should call gqlschema_compilter

  res.end();
})

app.post('/signup', (req, res) => {

})
//works
// app.use('/graphql', graphqlHTTP({
//   schema: gqlTestSchema,
//   graphiql: true
// }))

app.post('/graphql/:id', (req, res) => {
  graphql(gqlTestSchema, '{person {firstName} }')
    .then(result => {
      console.log(result);
      res.json(result);
    })
})

app.post('/createdb', (req, res) => {
  const devDb = req.body;
  console.log("this is the req body", devDb);
  dbController.createDevUserDb(devDb.dbname)
  res.end();
})


app.listen(3000, () => console.log('started server at 3000'));


