require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const multer = require('multer');
const path = require('path');

//Set Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

//Init Upload
const upload = multer({
  storage
}).single('food');

const app = express();

app.use(express.static('./public'));

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

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

app.post('/upload', (req, res, next) => {
  upload(req, res, err => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(req.file);
      res.send(test);
    }
  });
});

app.use(function errorHandler(error, req, res, next) {
  let response =
    NODE_ENV === 'production'
      ? { error: 'server error' }
      : { message: error.message, error };
  res.status(500).json(response);
});

module.exports = app;
