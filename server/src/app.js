require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
// const multer = require('multer');

// const formidable = require('formidable');
// const fs = require('fs');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

// const upload = multer({
//   dest: 'uploads/',
//   filename: (req, file, next) => console.log(file)
// });

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Image Recipe Test Server');
});

// app.post('/upload', (req, res, next) => {
//   let form = new formidable.IncomingForm().parse(req);
//   form.on('fileBegin', function(name, file) {
//     file.path = __dirname + '/uploads/' + file.name;
//   });
//   form.on('file', function(name, file) {
//     console.log('Uploaded ' + file.name);
//   });

// });

/**********
   File Upload With Multer 
   **********/

// app.post('/upload', upload.single('foodImage'), (req, res, next) => {
//   res.send('ok');
// });

/* GOOGLE CLOUD UPLOAD */
app.post('/upload', (req, res, next) => {});

app.use(function errorHandler(error, req, res, next) {
  let response =
    NODE_ENV === 'production'
      ? { error: 'server error' }
      : { message: error.message, error };
  res.status(500).json(response);
});

module.exports = app;
