// server.js
'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const app = express()
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST');
  next();
});

app.post('/', (req, res) => {
  console.log('Received request');
  fs.writeFile(`./app/contacts.json`, JSON.stringify(req.body), (err) => {
    if (err) throw err;
    console.log('File written to afile.json');
    res.send('File written to afile.json')
  })
});

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.listen(4000, ()=>{
  console.log('Listening on port 4000. Post a file to http://localhost:4000 to save to /afile.json');
});