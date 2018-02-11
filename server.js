const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

//Static folder
app.use(express.static(__dirname+'client'));

//API route for recipes
const recipes = require('./routes/recipes');
const index = require('./routes/index');

//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//API location
app.use('/', index);
app.use('/api', recipes);

app.listen(3000);
console.log('Running on port 3000....');
