require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
// const multer = require('multer');
// const upload = multer({ dest: './uploads/' });
const formidable = require('formidable');
const fs = require('fs');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello, boilerplate!');
});

app.post('/upload', (req, res, next) => {
  //   upload(req, res, function(err) {
  //     if (err) {
  //       return res.end('Error uploading file.');
  //     }
  //     res.end('File is uploaded');
  //   });
  //   console.log(req.files);
  //   console.log(req);
  //   res.send('Good');

  // new formidable.IncomingForm().parse(req, (err, fields, files) => {
  //   if (err) {
  //     console.error('Error', err);
  //     throw err;
  //   }
  //   console.log('Fields', fields);
  //   console.log('Files', files);
  //   for (const file of Object.entries(files)) {
  //     console.log(file);
  //   }
  // });

  let form = new formidable.IncomingForm();

  form.parse(req);

  form.on('fileBegin', function(name, file) {
    file.path = __dirname + '/uploads/' + file.name;
  });

  form.on('file', function(name, file) {
    console.log('Uploaded ' + file.name);
  });

  res.sendFile(__dirname + '/index.html');
});

app.use(function errorHandler(error, req, res, next) {
  let response =
    NODE_ENV === 'production'
      ? { error: { message: 'server error' } }
      : { message: error.message, error };
  res.status(500).json(response);
});

module.exports = app;
