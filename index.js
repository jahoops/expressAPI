// Import packages
const express = require('express');
const morgan = require('morgan');
// App
const app = express();
// Morgan
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/index.routes'));
// First route
app.use(express.static(__dirname + '/public'));

app.listen(3000,function(){
  console.log("Live at Port 3000");
});