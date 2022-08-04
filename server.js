if (process.env.NODE_ENV !== 'production')
  require('dotenv').config();

global.mongo = require('mongoose');

const express = require('express');
const manageMethods = require('@lettercms/utils/lib/manageMethods');

const app = express();

const PORT = process.env.PORT || 3007;

const indexGet = require('./lib/index.get');
const indexPost = require('./lib/index.get');
const nameGet = require('./lib/index.get');
const nameDelete = require('./lib/index.get');

app.all('/api/image', manageMethods({
  GET: indexGet,
  POST: indexPost
}));

app.all('/api/image/:name', manageMethods({
  GET: nameGet,
  DELETE: nameDelete
}));

app.listen(PORT, () => console.log(`> App listen on port ${PORT}`));
