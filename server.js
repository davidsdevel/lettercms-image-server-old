if (process.env.NODE_ENV !== 'production')
  require('dotenv').config();

global.mongo = require('mongoose');

const express = require('express');
const manageMethods = require('@lettercms/utils/lib/manageMethods');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3007;

const indexGet = require('./lib/index.get');
const indexPost = require('./lib/index.post');
const nameGet = require('./lib/name.get');
const nameDelete = require('./lib/name.delete');

const corsOpts = {
  origin: true,
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  exposedHeaders: 'Authorization'
}

app.use(cors(corsOpts))
app.all('/api/image', manageMethods({
  GET: indexGet,
  POST: indexPost
}));

app.all('/api/image/:name', manageMethods({
  GET: nameGet,
  DELETE: nameDelete
}));

app.listen(PORT, () => console.log(`> App listen on port ${PORT}`));
